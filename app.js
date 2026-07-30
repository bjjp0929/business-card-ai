const fileInput = document.getElementById("fileInput");
const dropzone = document.getElementById("dropzone");
const previewList = document.getElementById("previewList");
const scanBtn = document.getElementById("scanBtn");
const exportBtn = document.getElementById("exportBtn");
const clearBtn = document.getElementById("clearBtn");
const languageSelect = document.getElementById("language");
const resultBody = document.getElementById("resultBody");
const countBadge = document.getElementById("countBadge");
const progressWrap = document.getElementById("progressWrap");
const progressText = document.getElementById("progressText");
const progressPercent = document.getElementById("progressPercent");
const progressBar = document.getElementById("progressBar");

let selectedFiles = [];
let rows = [];

fileInput.addEventListener("change", () => addFiles([...fileInput.files]));
["dragenter", "dragover"].forEach(name => dropzone.addEventListener(name, e => {
  e.preventDefault(); dropzone.classList.add("dragging");
}));
["dragleave", "drop"].forEach(name => dropzone.addEventListener(name, e => {
  e.preventDefault(); dropzone.classList.remove("dragging");
}));
dropzone.addEventListener("drop", e => addFiles([...e.dataTransfer.files].filter(f => f.type.startsWith("image/"))));

function addFiles(files) {
  const seen = new Set(selectedFiles.map(f => `${f.name}-${f.size}-${f.lastModified}`));
  files.forEach(file => {
    const key = `${file.name}-${file.size}-${file.lastModified}`;
    if (file.type.startsWith("image/") && !seen.has(key)) {
      selectedFiles.push(file);
      seen.add(key);
    }
  });
  renderPreviews();
}

function renderPreviews() {
  previewList.innerHTML = "";
  selectedFiles.forEach((file, index) => {
    const card = document.createElement("div");
    card.className = "preview-card";
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    const name = document.createElement("div");
    name.textContent = file.name;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "×";
    btn.addEventListener("click", () => {
      selectedFiles.splice(index, 1);
      renderPreviews();
    });
    card.append(img, name, btn);
    previewList.appendChild(card);
  });
  scanBtn.disabled = selectedFiles.length === 0;
  clearBtn.disabled = selectedFiles.length === 0 && rows.length === 0;
}

scanBtn.addEventListener("click", scanAll);
clearBtn.addEventListener("click", () => {
  selectedFiles = [];
  rows = [];
  fileInput.value = "";
  renderPreviews();
  renderTable();
});
exportBtn.addEventListener("click", exportExcel);

async function scanAll() {
  scanBtn.disabled = true;
  exportBtn.disabled = true;
  progressWrap.classList.remove("hidden");
  rows = [];
  renderTable();

  for (let i = 0; i < selectedFiles.length; i++) {
    const file = selectedFiles[i];
    progressText.textContent = `辨識 ${i + 1}/${selectedFiles.length}：${file.name}`;
    try {
      const result = await Tesseract.recognize(
        file,
        languageSelect.value,
        {
          logger: m => {
            const local = typeof m.progress === "number" ? m.progress : 0;
            const total = ((i + local) / selectedFiles.length) * 100;
            progressBar.style.width = `${Math.max(1, total)}%`;
            progressPercent.textContent = `${Math.round(total)}%`;
          }
        }
      );
      rows.push(parseBusinessCard(result.data.text, file.name));
    } catch (error) {
      console.error(error);
      rows.push({
        filename: file.name, name: "", company: "", department: "", title: "",
        mobile: "", phone: "", email: "", website: "", address: "",
        rawText: `辨識失敗：${error.message || error}`
      });
    }
    renderTable();
  }

  progressBar.style.width = "100%";
  progressPercent.textContent = "100%";
  progressText.textContent = "辨識完成，請校對欄位";
  scanBtn.disabled = false;
  exportBtn.disabled = rows.length === 0;
  clearBtn.disabled = false;
}

function cleanLines(text) {
  return text
    .replace(/\r/g, "")
    .split("\n")
    .map(s => s.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function parseBusinessCard(text, filename) {
  const lines = cleanLines(text);
  const joined = lines.join(" ");

  const emails = unique(joined.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) || []);
  const websites = unique(joined.match(/(?:https?:\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+(?:\/[^\s]*)?/gi) || [])
    .filter(x => !x.includes("@") && !emails.some(e => e.includes(x)));

  const phoneMatches = unique(joined.match(/(?:\+?\d[\d\s().-]{6,}\d)/g) || [])
    .map(x => x.trim())
    .filter(x => x.replace(/\D/g, "").length >= 7);

  const mobiles = [];
  const phones = [];
  phoneMatches.forEach(p => {
    const digits = p.replace(/\D/g, "");
    if (/^(886)?09\d{8}$/.test(digits) || /^(82)?10\d{7,8}$/.test(digits)) mobiles.push(p);
    else phones.push(p);
  });

  const titleKeywords = /(董事長|副董事長|執行長|總經理|副總|協理|經理|副理|主任|專員|秘書|顧問|工程師|設計師|代表|會長|理事|監事|chairman|ceo|president|director|manager|assistant|specialist|consultant|engineer|designer|대표이사|대표|회장|사장|이사|부장|차장|과장|대리|주임|사원|매니저|팀장)/i;
  const deptKeywords = /(部|處|室|組|中心|事業群|department|division|team|office|센터|본부|사업부|부서|팀)$/i;
  const companyKeywords = /(股份有限公司|有限公司|公司|企業|集團|協會|基金會|大學|銀行|科技|國際|實業|貿易|顧問|工作室|corp\.?|corporation|company|co\.?,?\s*ltd\.?|ltd\.?|inc\.?|llc|group|association|foundation|university|bank|studio|technology|tech|global|주식회사|\(주\)|㈜|회사|재단|협회|대학교|은행|테크|그룹)/i;
  const addressKeywords = /(台北|臺北|新北|桃園|台中|臺中|高雄|路|街|巷|弄|號|樓|區|市|縣|Taiwan|Taipei|Road|Rd\.|Street|St\.|Ave\.|Floor|F\.|대한민국|서울|부산|대구|인천|로|길|동|구|시)/i;

  const useful = lines.filter(line =>
    !emails.some(e => line.includes(e)) &&
    !websites.some(w => line.includes(w)) &&
    !phoneMatches.some(p => line.includes(p))
  );

  const titleLine = useful.find(l => titleKeywords.test(l)) || "";
  const departmentLine = useful.find(l => deptKeywords.test(l) && l !== titleLine) || "";
  const addressLine = useful.find(l => addressKeywords.test(l) && l.length >= 8) || "";

  const excludedBase = new Set([titleLine, departmentLine, addressLine].filter(Boolean));

  function companyScore(line, index) {
    if (!line || excludedBase.has(line)) return -999;
    if (/\d/.test(line) && !companyKeywords.test(line)) return -8;

    let score = 0;
    if (companyKeywords.test(line)) score += 12;
    if (/^[A-Z0-9&.,'’\- ]{3,}$/.test(line) && /[A-Z]/.test(line)) score += 5;
    if (/[A-Za-z]/.test(line) && /[\u4e00-\u9fff가-힣]/.test(line)) score += 3;
    if (line.length >= 5 && line.length <= 35) score += 2;
    if (index <= 2) score += 2;
    if (/^[\u4e00-\u9fff]{2,4}$/.test(line)) score -= 5;
    if (/^[가-힣]{2,5}$/.test(line)) score -= 5;
    if (/^[A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3}$/.test(line)) score -= 4;
    if (titleKeywords.test(line) || deptKeywords.test(line)) score -= 10;
    return score;
  }

  let companyLine = "";
  const companyCandidates = useful
    .map((line, index) => ({ line, score: companyScore(line, index) }))
    .sort((a, b) => b.score - a.score);

  if (companyCandidates.length && companyCandidates[0].score >= 4) {
    companyLine = companyCandidates[0].line;
  }

  const excludedForName = new Set([titleLine, departmentLine, addressLine, companyLine].filter(Boolean));

  function nameScore(line) {
    if (!line || excludedForName.has(line)) return -999;
    if (companyKeywords.test(line) || titleKeywords.test(line) || deptKeywords.test(line)) return -999;
    if (/\d/.test(line) || line.length > 30) return -999;

    let score = 0;
    if (/^[\u4e00-\u9fff]{2,4}$/.test(line)) score += 12;
    if (/^[가-힣]{2,5}$/.test(line)) score += 12;
    if (/^[A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3}$/.test(line)) score += 9;
    if (/^[A-Za-z][A-Za-z .'-]{2,24}$/.test(line) && line.split(/\s+/).length <= 4) score += 4;
    if (/^[A-Z0-9&.,'’\- ]{3,}$/.test(line)) score -= 8;
    if (line.length <= 12) score += 2;
    return score;
  }

  const nameCandidates = useful
    .map(line => ({ line, score: nameScore(line) }))
    .filter(x => x.score > -999)
    .sort((a, b) => b.score - a.score);

  const name = nameCandidates.length && nameCandidates[0].score >= 4
    ? nameCandidates[0].line
    : "";

  // If no company was found, choose the strongest remaining non-name line as fallback.
  if (!companyLine) {
    const fallback = useful
      .filter(l => l !== name && !excludedBase.has(l))
      .map((line, index) => ({ line, score: companyScore(line, index) }))
      .sort((a, b) => b.score - a.score);
    if (fallback.length && fallback[0].score >= 1) companyLine = fallback[0].line;
  }

  return {
    filename,
    name,
    company: companyLine,
    department: departmentLine,
    title: titleLine,
    mobile: unique(mobiles).join(" / "),
    phone: unique(phones).join(" / "),
    email: emails.join(" / "),
    website: websites.join(" / "),
    address: addressLine,
    rawText: text.trim()
  };
}

const columns = [
  ["filename", "檔名"], ["name", "姓名"], ["company", "公司"], ["department", "部門"],
  ["title", "職稱"], ["mobile", "手機"], ["phone", "電話"], ["email", "Email"],
  ["website", "網站"], ["address", "地址"], ["rawText", "原始辨識文字"]
];

async function copyToClipboard(value, button) {
  const text = value || "";
  if (!text.trim()) {
    flashCopyState(button, "空白");
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    flashCopyState(button, "已複製");
  } catch (error) {
    const helper = document.createElement("textarea");
    helper.value = text;
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.appendChild(helper);
    helper.select();
    document.execCommand("copy");
    helper.remove();
    flashCopyState(button, "已複製");
  }
}

function flashCopyState(button, message) {
  const original = button.textContent;
  button.textContent = message;
  button.classList.add("copied");
  window.setTimeout(() => {
    button.textContent = original;
    button.classList.remove("copied");
  }, 1100);
}

function rowToClipboardText(row) {
  return [
    ["姓名", row.name],
    ["公司", row.company],
    ["部門", row.department],
    ["職稱", row.title],
    ["手機", row.mobile],
    ["電話", row.phone],
    ["Email", row.email],
    ["網站", row.website],
    ["地址", row.address]
  ]
    .filter(([, value]) => value && value.trim())
    .map(([label, value]) => `${label}：${value}`)
    .join("\n");
}

function renderTable() {
  resultBody.innerHTML = "";
  if (!rows.length) {
    resultBody.innerHTML = '<tr class="empty-row"><td colspan="12">尚未辨識名片</td></tr>';
  } else {
    rows.forEach((row, rowIndex) => {
      const tr = document.createElement("tr");
      columns.forEach(([key]) => {
        const td = document.createElement("td");
        const fieldWrap = document.createElement("div");
        fieldWrap.className = "field-wrap";

        const control = key === "rawText" ? document.createElement("textarea") : document.createElement("input");
        control.value = row[key] || "";
        control.addEventListener("input", e => rows[rowIndex][key] = e.target.value);

        const copy = document.createElement("button");
        copy.type = "button";
        copy.className = "copy-field";
        copy.textContent = "複製";
        copy.title = "複製此欄";
        copy.addEventListener("click", () => copyToClipboard(rows[rowIndex][key], copy));

        fieldWrap.append(control, copy);
        td.appendChild(fieldWrap);
        tr.appendChild(td);
      });
      const actionTd = document.createElement("td");

      const copyRow = document.createElement("button");
      copyRow.className = "delete-row";
      copyRow.textContent = "複製整筆";
      copyRow.addEventListener("click", () => {
        copyToClipboard(rowToClipboardText(rows[rowIndex]), copyRow);
      });

      const swap = document.createElement("button");
      swap.className = "delete-row";
      swap.textContent = "姓名／公司互換";
      swap.addEventListener("click", () => {
        const temp = rows[rowIndex].name;
        rows[rowIndex].name = rows[rowIndex].company;
        rows[rowIndex].company = temp;
        renderTable();
      });

      const del = document.createElement("button");
      del.className = "delete-row";
      del.textContent = "刪除";
      del.addEventListener("click", () => {
        rows.splice(rowIndex, 1);
        renderTable();
      });

      actionTd.append(
        copyRow,
        document.createElement("br"),
        swap,
        document.createElement("br"),
        del
      );
      tr.appendChild(actionTd);
      resultBody.appendChild(tr);
    });
  }
  countBadge.textContent = `${rows.length} 筆`;
  exportBtn.disabled = rows.length === 0;
  clearBtn.disabled = selectedFiles.length === 0 && rows.length === 0;
}

function exportExcel() {
  const data = rows.map(row => ({
    "檔名": row.filename,
    "姓名": row.name,
    "公司": row.company,
    "部門": row.department,
    "職稱": row.title,
    "手機": row.mobile,
    "電話": row.phone,
    "Email": row.email,
    "網站": row.website,
    "地址": row.address,
    "原始辨識文字": row.rawText
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  ws["!cols"] = [
    {wch: 22}, {wch: 16}, {wch: 28}, {wch: 20}, {wch: 20},
    {wch: 18}, {wch: 18}, {wch: 28}, {wch: 28}, {wch: 42}, {wch: 60}
  ];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "名片資料");
  const date = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(wb, `名片辨識_${date}.xlsx`);
}

renderTable();

// 小貓掌鼠標
const catCursor = document.getElementById("catCursor");

if (catCursor && window.matchMedia("(pointer: fine)").matches) {
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    catCursor.classList.add("visible");
  });

  document.addEventListener("mouseleave", () => {
    catCursor.classList.remove("visible");
  });

  document.addEventListener("mousedown", () => {
    catCursor.classList.add("clicking");
  });

  document.addEventListener("mouseup", () => {
    catCursor.classList.remove("clicking");
  });

  document.addEventListener("mouseover", (event) => {
    const interactiveElement = event.target.closest(
      "a, button, input, textarea, select, label, .dropzone"
    );

    catCursor.classList.toggle(
      "active",
      Boolean(interactiveElement)
    );
  });

  function animateCatCursor() {
    cursorX += (mouseX - cursorX) * 0.24;
    cursorY += (mouseY - cursorY) * 0.24;

    catCursor.style.left = `${cursorX}px`;
    catCursor.style.top = `${cursorY}px`;

    requestAnimationFrame(animateCatCursor);
  }

  animateCatCursor();
}
