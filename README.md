# 免費名片辨識器

完全靜態網站，可部署到 GitHub Pages。

## 功能
- 多張名片圖片
- Tesseract.js 本機 OCR
- 繁體中文、英文、韓文
- 自動初步拆分欄位
- 人工修改
- 匯出 Excel

## 免費原理
- 無 OpenAI API
- 無後端伺服器
- 無資料庫
- 圖片在瀏覽器內處理
- 使用 GitHub Pages 免費託管

## GitHub Pages 部署
1. 將本資料夾內所有檔案上傳到 repository 根目錄。
2. Repository → Settings → Pages。
3. Build and deployment 的 Source 選 Deploy from a branch。
4. Branch 選 main，資料夾選 /(root)。
5. 按 Save。
6. 等待數分鐘後，GitHub 會顯示網站網址。

## 限制
Tesseract OCR 是免費開源 OCR，不等於大型視覺 AI。名片如果反光、字太小、排版複雜或多語混排，欄位需要人工修正。
