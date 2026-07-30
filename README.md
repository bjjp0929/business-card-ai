# AI 名片掃描器

上傳名片圖片，透過 OpenAI 影像模型辨識中、韓、英文欄位，人工核對後匯出 Excel。

## 功能

- 多張圖片批次辨識
- 中文、韓文、英文名片
- 可編輯辨識結果
- 匯出 XLSX
- 無資料庫，重新整理頁面後資料即消失
- API Key 僅存在伺服器端

## 本機執行

1. 安裝 Node.js 20 以上版本。
2. 在專案資料夾執行：

```bash
npm install
```

3. 複製環境變數範例：

```bash
copy .env.example .env.local
```

macOS / Linux：

```bash
cp .env.example .env.local
```

4. 編輯 `.env.local`，填入 OpenAI API Key。
5. 啟動：

```bash
npm run dev
```

6. 開啟 `http://localhost:3000`。

## 推到 GitHub

```bash
git init
git add .
git commit -m "Initial business card scanner"
git branch -M main
git remote add origin 你的GitHub倉庫網址
git push -u origin main
```

請確認 `.env.local` 沒有被加入 Git。此專案的 `.gitignore` 已排除它。

## 部署到 Vercel

GitHub Pages 只能託管純前端，不能安全保存 OpenAI API Key。因此建議：

1. 把專案推到 GitHub。
2. 登入 Vercel，選擇 `Add New Project`。
3. 匯入 GitHub Repository。
4. 在 Environment Variables 加入：
   - `OPENAI_API_KEY`
   - `OPENAI_MODEL`，可填 `gpt-4.1-mini`
5. 按 Deploy。

之後每次 push 到 GitHub，Vercel 會自動重新部署。

## 隱私提醒

- 圖片會送至 OpenAI API 辨識。
- 本專案不建立資料庫，也不主動保存圖片與辨識結果。
- 正式處理公司名片前，請確認公司個資與雲端服務政策。
