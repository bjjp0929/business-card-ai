
const translations = {
  "zh-TW": {
    pageTitle: "免費名片辨識器",
    uiLanguage: "介面語言",
    eyebrow: "100% 免費・瀏覽器本機 OCR",
    title: "名片掃描 → Excel",
    subtitle: "上傳多張名片，辨識中／英／韓文字，人工確認後匯出 Excel。",
    privacy: "🔒 圖片不會上傳到本網站伺服器",
    dropTitle: "點擊或拖曳名片圖片到這裡",
    dropHint: "支援 JPG、PNG、WEBP，可一次選多張",
    ocrLanguage: "OCR 語言",
    scan: "開始辨識",
    export: "匯出 Excel",
    clear: "清空",
    ready: "準備中",
    resultsTitle: "辨識結果",
    resultsHint: "OCR 不會永遠乖巧，匯出前請快速校對。",
    footer: "第一次辨識某個語言時，瀏覽器需要下載免費 OCR 語言模型，可能稍等一會兒。",
    filename: "檔名",
    name: "姓名",
    company: "公司",
    companyEnglish: "公司英文名字",
    department: "部門",
    titleCol: "職位",
    mobile: "手機",
    phone: "電話",
    fax: "傳真",
    email: "郵箱",
    website: "網站",
    address: "地址",
    rawText: "原始辨識文字",
    actions: "",
    empty: "尚未辨識名片",
    count: (n) => `${n} 筆`,
    scanning: (i, total, name) => `辨識 ${i}/${total}：${name}`,
    completed: "辨識完成，請校對欄位",
    failed: "辨識失敗",
    copy: "複製",
    copyTitle: "複製此欄",
    copied: "已複製",
    blank: "空白",
    copyRow: "複製整筆",
    swap: "姓名／公司互換",
    delete: "刪除",
    sheetName: "名片資料",
    filePrefix: "名片辨識",
    labels: {
      name: "姓名", mobile: "手機", phone: "電話", fax: "傳真", email: "郵箱",
      company: "公司", department: "部門", title: "職位", companyEnglish: "公司英文名字",
      website: "網址", address: "地址"
    }
  },
  ko: {
    pageTitle: "무료 명함 인식기",
    uiLanguage: "화면 언어",
    eyebrow: "100% 무료 · 브라우저 로컬 OCR",
    title: "명함 스캔 → Excel",
    subtitle: "여러 장의 명함을 업로드하고 중문·영문·한글을 인식한 뒤 확인하여 Excel로 내보냅니다.",
    privacy: "🔒 이미지는 본 사이트 서버에 업로드되지 않습니다",
    dropTitle: "명함 이미지를 클릭하거나 여기로 드래그하세요",
    dropHint: "JPG, PNG, WEBP 지원 · 여러 장 선택 가능",
    ocrLanguage: "OCR 언어",
    scan: "인식 시작",
    export: "Excel 내보내기",
    clear: "초기화",
    ready: "준비 중",
    resultsTitle: "인식 결과",
    resultsHint: "OCR 결과는 완벽하지 않을 수 있으니 내보내기 전에 확인해 주세요.",
    footer: "처음 사용하는 언어는 무료 OCR 언어 모델을 다운로드하므로 잠시 시간이 걸릴 수 있습니다.",
    filename: "파일명",
    name: "이름",
    company: "회사",
    companyEnglish: "회사 영문명",
    department: "부서",
    titleCol: "직함",
    mobile: "휴대전화",
    phone: "전화",
    fax: "팩스",
    email: "이메일",
    website: "웹사이트",
    address: "주소",
    rawText: "원본 인식 텍스트",
    actions: "",
    empty: "인식된 명함이 없습니다",
    count: (n) => `${n}건`,
    scanning: (i, total, name) => `인식 중 ${i}/${total}: ${name}`,
    completed: "인식 완료. 항목을 확인해 주세요.",
    failed: "인식 실패",
    copy: "복사",
    copyTitle: "이 항목 복사",
    copied: "복사됨",
    blank: "비어 있음",
    copyRow: "전체 복사",
    swap: "이름／회사 바꾸기",
    delete: "삭제",
    sheetName: "명함 데이터",
    filePrefix: "명함인식",
    labels: {
      name: "이름", mobile: "휴대전화", phone: "전화", fax: "팩스", email: "이메일",
      company: "회사", department: "부서", title: "직함", companyEnglish: "회사 영문명",
      website: "웹사이트", address: "주소"
    }
  },
  en: {
    pageTitle: "Free Business Card OCR",
    uiLanguage: "Interface language",
    eyebrow: "100% free · Browser-based OCR",
    title: "Business Cards → Excel",
    subtitle: "Upload multiple cards, recognize Chinese, English, and Korean text, review the fields, and export to Excel.",
    privacy: "🔒 Images are not uploaded to this site's server",
    dropTitle: "Click or drag business card images here",
    dropHint: "Supports JPG, PNG, and WEBP · Multiple files allowed",
    ocrLanguage: "OCR language",
    scan: "Start recognition",
    export: "Export Excel",
    clear: "Clear",
    ready: "Ready",
    resultsTitle: "Recognition results",
    resultsHint: "OCR is not always perfect. Please review the fields before exporting.",
    footer: "The first recognition for a language may take a moment while the free OCR language model downloads.",
    filename: "File name",
    name: "Name",
    company: "Company",
    companyEnglish: "Company English Name",
    department: "Department",
    titleCol: "Title",
    mobile: "Mobile",
    phone: "Phone",
    fax: "Fax",
    email: "Email",
    website: "Website",
    address: "Address",
    rawText: "Raw OCR text",
    actions: "",
    empty: "No cards recognized yet",
    count: (n) => `${n} record${n === 1 ? "" : "s"}`,
    scanning: (i, total, name) => `Recognizing ${i}/${total}: ${name}`,
    completed: "Recognition complete. Please review the fields.",
    failed: "Recognition failed",
    copy: "Copy",
    copyTitle: "Copy this field",
    copied: "Copied",
    blank: "Blank",
    copyRow: "Copy row",
    swap: "Swap name/company",
    delete: "Delete",
    sheetName: "Business Cards",
    filePrefix: "business_cards",
    labels: {
      name: "Name", mobile: "Mobile", phone: "Phone", fax: "Fax", email: "Email",
      company: "Company", department: "Department", title: "Title", companyEnglish: "Company English Name",
      website: "Website", address: "Address"
    }
  }
};

const uiLanguageSelect = document.getElementById("uiLanguage");
const uiLanguageLabel = document.getElementById("uiLanguageLabel");
let currentUiLanguage = localStorage.getItem("businessCardUiLanguage") || "zh-TW";

function t(key) {
  return translations[currentUiLanguage][key];
}

function applyLanguage(language) {
  currentUiLanguage = translations[language] ? language : "zh-TW";
  localStorage.setItem("businessCardUiLanguage", currentUiLanguage);
  document.documentElement.lang = currentUiLanguage;
  document.title = t("pageTitle");
  uiLanguageSelect.value = currentUiLanguage;
  uiLanguageLabel.textContent = t("uiLanguage");

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const value = t(key);
    if (typeof value === "string") element.textContent = value;
  });

  renderTable();

  if (
    typeof progressWrap !== "undefined" &&
    !progressWrap.classList.contains("hidden") &&
    rows.length === 0
  ) {
    progressText.textContent = t("ready");
  }
}

uiLanguageSelect.addEventListener("change", (event) => {
  applyLanguage(event.target.value);
});

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

  // 依檔名自然排序，例如 1.jpg、2.jpg、10.jpg
  selectedFiles.sort((a, b) =>
    a.name.localeCompare(b.name, undefined, {
      numeric: true,
      sensitivity: "base"
    })
  );

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
    progressText.textContent = t("scanning")(i + 1, selectedFiles.length, file.name);
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
        filename: file.name, name: "", mobile: "", phone: "", fax: "", email: "",
        company: "", department: "", title: "", companyEnglish: "", website: "", address: "",
        rawText: `${t("failed")}：${error.message || error}`
      });
    }
    renderTable();
  }

  progressBar.style.width = "100%";
  progressPercent.textContent = "100%";
  progressText.textContent = t("completed");
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

  const faxKeywords = /(fax|facsimile|傳真|传真|팩스|전송)/i;
  const faxMatches = unique(
    lines
      .filter(line => faxKeywords.test(line))
      .flatMap(line => line.match(/(?:\+?\d[\d\s().-]{6,}\d)/g) || [])
      .map(x => x.trim())
  );

  const faxDigits = new Set(faxMatches.map(x => x.replace(/\D/g, "")));
  const mobiles = [];
  const phones = [];

  phoneMatches.forEach(p => {
    const digits = p.replace(/\D/g, "");
    if (faxDigits.has(digits)) return;
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

  const companyEnglishLine =
    useful.find(line =>
      line !== companyLine &&
      /^[A-Za-z0-9&.,'’()\- ]{3,}$/.test(line) &&
      (
        companyKeywords.test(line) ||
        /^[A-Z0-9&.,'’()\- ]{3,}$/.test(line)
      )
    ) || "";

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
    mobile: unique(mobiles).join(" / "),
    phone: unique(phones).join(" / "),
    fax: faxMatches.join(" / "),
    email: emails.join(" / "),
    company: companyLine,
    department: departmentLine,
    title: titleLine,
    companyEnglish: companyEnglishLine,
    website: websites.join(" / "),
    address: addressLine,
    rawText: text.trim()
  };
}

const columns = [
  ["name", "姓名"],
  ["mobile", "手機"],
  ["phone", "電話"],
  ["fax", "傳真"],
  ["email", "郵箱"],
  ["company", "公司"],
  ["department", "部門"],
  ["title", "職位"],
  ["companyEnglish", "公司英文名字"],
  ["website", "網址"],
  ["address", "地址"],
  ["filename", "檔名"],
  ["rawText", "原始辨識文字"]
];

async function copyToClipboard(value, button) {
  const text = value || "";
  if (!text.trim()) {
    flashCopyState(button, t("blank"));
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    flashCopyState(button, t("copied"));
  } catch (error) {
    const helper = document.createElement("textarea");
    helper.value = text;
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.appendChild(helper);
    helper.select();
    document.execCommand("copy");
    helper.remove();
    flashCopyState(button, t("copied"));
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
  const labels = t("labels");
  return [
    [labels.name, row.name],
    [labels.mobile, row.mobile],
    [labels.phone, row.phone],
    [labels.fax, row.fax],
    [labels.email, row.email],
    [labels.company, row.company],
    [labels.department, row.department],
    [labels.title, row.title],
    [labels.companyEnglish, row.companyEnglish],
    [labels.website, row.website],
    [labels.address, row.address]
  ]
    .filter(([, value]) => value && value.trim())
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");
}

function renderTable() {
  resultBody.innerHTML = "";
  if (!rows.length) {
    resultBody.innerHTML = `<tr class="empty-row"><td colspan="14">${t("empty")}</td></tr>`;
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
        copy.textContent = t("copy");
        copy.title = t("copyTitle");
        copy.addEventListener("click", () => copyToClipboard(rows[rowIndex][key], copy));

        fieldWrap.append(control, copy);
        td.appendChild(fieldWrap);
        tr.appendChild(td);
      });

      const actionTd = document.createElement("td");

      const copyRow = document.createElement("button");
      copyRow.className = "delete-row";
      copyRow.textContent = t("copyRow");
      copyRow.addEventListener("click", () => {
        copyToClipboard(rowToClipboardText(rows[rowIndex]), copyRow);
      });

      const swap = document.createElement("button");
      swap.className = "delete-row";
      swap.textContent = t("swap");
      swap.addEventListener("click", () => {
        const temp = rows[rowIndex].name;
        rows[rowIndex].name = rows[rowIndex].company;
        rows[rowIndex].company = temp;
        renderTable();
      });

      const del = document.createElement("button");
      del.className = "delete-row";
      del.textContent = t("delete");
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

  countBadge.textContent = t("count")(rows.length);
  exportBtn.disabled = rows.length === 0;
  clearBtn.disabled = selectedFiles.length === 0 && rows.length === 0;
}

function exportExcel() {
  const labels = t("labels");
  const data = rows.map(row => ({
    [labels.name]: row.name,
    [labels.mobile]: row.mobile,
    [labels.phone]: row.phone,
    [labels.fax]: row.fax,
    [labels.email]: row.email,
    [labels.company]: row.company,
    [labels.department]: row.department,
    [labels.title]: row.title,
    [labels.companyEnglish]: row.companyEnglish,
    [labels.website]: row.website,
    [labels.address]: row.address,
    [t("filename")]: row.filename,
    [t("rawText")]: row.rawText
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  ws["!cols"] = [
    {wch: 16}, {wch: 18}, {wch: 18}, {wch: 18}, {wch: 28},
    {wch: 28}, {wch: 20}, {wch: 20}, {wch: 32}, {wch: 28},
    {wch: 42}, {wch: 22}, {wch: 60}
  ];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, t("sheetName"));
  const date = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(wb, `${t("filePrefix")}_${date}.xlsx`);
}

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
    catCursor.classList.toggle("active", Boolean(interactiveElement));
  });

  function animateCatCursor() {
    cursorX += (mouseX - cursorX) * 0.75;
    cursorY += (mouseY - cursorY) * 0.75;
    catCursor.style.left = `${cursorX}px`;
    catCursor.style.top = `${cursorY}px`;
    requestAnimationFrame(animateCatCursor);
  }

  animateCatCursor();
}

applyLanguage(currentUiLanguage);

renderTable();
