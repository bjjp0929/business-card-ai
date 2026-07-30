'use client';

import { useMemo, useState } from 'react';
import * as XLSX from 'xlsx';

const columns = [
  ['name_zh', '中文姓名'],
  ['name_ko', '韓文姓名'],
  ['name_en', '英文姓名'],
  ['company', '公司'],
  ['department', '部門'],
  ['title', '職稱'],
  ['mobile', '手機'],
  ['phone', '公司電話'],
  ['fax', '傳真'],
  ['email', 'Email'],
  ['website', '網站'],
  ['address', '地址'],
  ['notes', '備註'],
  ['source_file', '來源檔案']
];

const emptyCard = Object.fromEntries(columns.map(([key]) => [key, '']));

export default function Home() {
  const [files, setFiles] = useState([]);
  const [rows, setRows] = useState([]);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const previews = useMemo(
    () => files.map((file) => ({ file, url: URL.createObjectURL(file) })),
    [files]
  );

  function updateCell(index, key, value) {
    setRows((current) => current.map((row, i) => i === index ? { ...row, [key]: value } : row));
  }

  function removeRow(index) {
    setRows((current) => current.filter((_, i) => i !== index));
  }

  async function scanCards() {
    if (!files.length) {
      setStatus('請先選擇名片圖片。');
      return;
    }

    setLoading(true);
    setStatus(`正在辨識 ${files.length} 張名片…`);

    try {
      const results = [];
      for (let i = 0; i < files.length; i += 1) {
        const formData = new FormData();
        formData.append('image', files[i]);

        setStatus(`正在辨識第 ${i + 1} / ${files.length} 張：${files[i].name}`);
        const response = await fetch('/api/scan', { method: 'POST', body: formData });
        const data = await response.json();

        if (!response.ok) throw new Error(data.error || '辨識失敗');
        results.push({ ...emptyCard, ...data.card, source_file: files[i].name });
      }

      setRows((current) => [...current, ...results]);
      setStatus(`完成，共新增 ${results.length} 筆。請先核對再匯出 Excel。`);
    } catch (error) {
      setStatus(`發生錯誤：${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  function exportExcel() {
    if (!rows.length) {
      setStatus('目前沒有可匯出的資料。');
      return;
    }

    const data = rows.map((row) => Object.fromEntries(
      columns.map(([key, label]) => [label, row[key] || ''])
    ));

    const sheet = XLSX.utils.json_to_sheet(data);
    sheet['!cols'] = columns.map(([key]) => ({ wch: Math.max(12, ...rows.map((r) => String(r[key] || '').length + 2)) }));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, '名片資料');
    XLSX.writeFile(workbook, `名片資料_${new Date().toISOString().slice(0, 10)}.xlsx`);
  }

  return (
    <main className="shell">
      <section className="hero">
        <div>
          <span className="eyebrow">CARD → DATA → EXCEL</span>
          <h1>AI 名片掃描器</h1>
          <p>批次上傳名片，AI 辨識中、韓、英文資料，核對後直接匯出 Excel。</p>
        </div>
        <div className="badge">資料不存入資料庫</div>
      </section>

      <section className="panel uploadPanel">
        <label className="dropzone">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(event) => setFiles(Array.from(event.target.files || []))}
          />
          <strong>點此選擇名片圖片</strong>
          <span>支援 JPG、PNG、WEBP，可一次選多張</span>
        </label>

        {previews.length > 0 && (
          <div className="previews">
            {previews.map(({ file, url }) => (
              <figure key={`${file.name}-${file.lastModified}`}>
                <img src={url} alt={file.name} />
                <figcaption>{file.name}</figcaption>
              </figure>
            ))}
          </div>
        )}

        <div className="actions">
          <button className="primary" onClick={scanCards} disabled={loading}>
            {loading ? '辨識中…' : `開始辨識${files.length ? `（${files.length} 張）` : ''}`}
          </button>
          <button onClick={() => { setFiles([]); setStatus(''); }}>清除圖片</button>
          <button className="export" onClick={exportExcel}>匯出 Excel</button>
        </div>
        {status && <p className="status">{status}</p>}
      </section>

      <section className="panel tablePanel">
        <div className="sectionTitle">
          <div>
            <h2>辨識結果</h2>
            <p>AI 也會看走眼，請把這裡當成出貨前的品管桌。</p>
          </div>
          <button onClick={() => setRows((current) => [...current, { ...emptyCard }])}>＋新增空白列</button>
        </div>

        {rows.length === 0 ? (
          <div className="empty">尚無資料。名片們還在門外排隊。</div>
        ) : (
          <div className="tableWrap">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  {columns.map(([key, label]) => <th key={key}>{label}</th>)}
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td>{rowIndex + 1}</td>
                    {columns.map(([key]) => (
                      <td key={key}>
                        <input
                          value={row[key] || ''}
                          onChange={(event) => updateCell(rowIndex, key, event.target.value)}
                        />
                      </td>
                    ))}
                    <td><button className="danger" onClick={() => removeRow(rowIndex)}>刪除</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <footer>
        名片圖片只在辨識時送往 OpenAI API，本專案本身不建立資料庫。請勿將 API Key 寫進前端程式碼。
      </footer>
    </main>
  );
}
