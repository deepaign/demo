import React from 'react';
import { createRoot } from 'react-dom/client';
import Homepage from './Homepage';
import './index.css';

// 添加全局樣式，包括字體引入
const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&display=swap');
`;

// 創建樣式標籤
const styleElement = document.createElement('style');
styleElement.innerHTML = globalStyle;
document.head.appendChild(styleElement);

// 應用主組件
function App() {
  return (
    <Homepage />
  );
}

// 渲染應用
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;