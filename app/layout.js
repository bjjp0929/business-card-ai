import './styles.css';

export const metadata = {
  title: 'AI 名片掃描器',
  description: '掃描名片、AI 辨識並匯出 Excel'
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
