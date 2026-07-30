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
  const companyKeywords = /(股份有限公司|有限公司|公司|企業|集團|協會|基金會|大學|銀行|科技|國際|corp\.?|corporation|company|co\.?,?\s*ltd\.?|ltd\.?|inc\.?|llc|group|association|foundation|university|bank|주식회사|\(주\)|㈜|회사|재단|협회|대학교|은행)/i;
  const addressKeywords = /(台北|臺北|新北|桃園|台中|臺中|高雄|路|街|巷|弄|號|樓|區|市|縣|Taiwan|Taipei|Road|Rd\.|Street|St\.|Ave\.|Floor|F\.|대한민국|서울|부산|대구|인천|로|길|동|구|시)/i;

  const useful = lines.filter(line =>
    !emails.some(e => line.includes(e)) &&
    !websites.some(w => line.includes(w)) &&
    !phoneMatches.some(p => line.includes(p))
  );

  const titleLine = useful.find(l => titleKeywords.test(l)) || "";
  const departmentLine = useful.find(l => deptKeywords.test(l) && l !== titleLine) || "";
  const companyLine = useful.find(l => companyKeywords.test(l) && l !== titleLine && l !== departmentLine) || "";
  const addressLine = useful.find(l => addressKeywords.test(l) && l.length >= 8 && l !== companyLine) || "";

  const excluded = new Set([titleLine, departmentLine, companyLine, addressLine].filter(Boolean));
  const nameCandidates = useful.filter(l => {
    if (excluded.has(l)) return false;
    if (l.length > 35) return false;
    if (/\d/.test(l)) return false;
    if (companyKeywords.test(l) || titleKeywords.test(l) || deptKeywords.test(l)) return false;
    return /[\p{L}]/u.test(l);
  });

  let name = "";
  if (nameCandidates.length) {
    name = [...nameCandidates].sort((a, b) => {
      const aScore = (/^[\u4e00-\u9fff]{2,4}$/.test(a) ? 6 : 0) + (/^[가-힣]{2,5}$/.test(a) ? 6 : 0) + (a.split(" ").length <= 4 ? 2 : 0) - a.length / 30;
      const bScore = (/^[\u4e00-\u9fff]{2,4}$/.test(b) ? 6 : 0) + (/^[가-힣]{2,5}$/.test(b) ? 6 : 0) + (b.split(" ").length <= 4 ? 2 : 0) - b.length / 30;
      return bScore - aScore;
    })[0];
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

function renderTable() {
  resultBody.innerHTML = "";
  if (!rows.length) {
    resultBody.innerHTML = '<tr class="empty-row"><td colspan="12">尚未辨識名片</td></tr>';
  } else {
    rows.forEach((row, rowIndex) => {
      const tr = document.createElement("tr");
      columns.forEach(([key]) => {
        const td = document.createElement("td");
        const control = key === "rawText" ? document.createElement("textarea") : document.createElement("input");
        control.value = row[key] || "";
        control.addEventListener("input", e => rows[rowIndex][key] = e.target.value);
        td.appendChild(control);
        tr.appendChild(td);
      });
      const actionTd = document.createElement("td");
      const del = document.createElement("button");
      del.className = "delete-row";
      del.textContent = "刪除";
      del.addEventListener("click", () => {
        rows.splice(rowIndex, 1);
        renderTable();
      });
      actionTd.appendChild(del);
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
