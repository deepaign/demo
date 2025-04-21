import React, { useState } from 'react';
import Homepage from './Homepage/Homepage';
import PetitionPage from './PetitionPage/PetitionPage';
import AchievementsPage from './AchievementsPage/AchievementsPage';
import AdminLogin from './AdminLogin/AdminLogin';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import VoterDashboard from './VoterDashboard/VoterDashboard'; // 選民資料分析頁面
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
  const [currentPage, setCurrentPage] = useState('home');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // 處理登入成功
  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
  };

  // 處理登出
  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setCurrentPage('home');
  };

  // 簡單的頁面路由處理
  const renderPage = () => {
    switch(currentPage) {
      case 'petition':
        return <PetitionPage />;
      case 'achievements':
        return <AchievementsPage />;
      case 'admin':
        // 如果已登入顯示儀表板，否則顯示登入頁面
        return isAdminLoggedIn 
          ? <AdminDashboard onLogout={handleLogout} /> 
          : <AdminLogin onLoginSuccess={handleLoginSuccess} />;
      case 'voter-dashboard': // 選民資料分析頁面
        return isAdminLoggedIn 
          ? <VoterDashboard /> 
          : <AdminLogin onLoginSuccess={() => {
              handleLoginSuccess();
              setCurrentPage('voter-dashboard');
            }} />;
      case 'home':
      default:
        return <Homepage />;
    }
  };

  return (
    <div className="app-container">
      {/* 頂部導航欄 */}
      <header className="navbar">
        <div className="logo" onClick={() => setCurrentPage('home')} style={{ cursor: 'pointer' }}>
          <span className="icon-clock"></span>
          <span>智能選服幕僚系統</span>
        </div>
        <nav className="nav-links">
          <a 
            href="#" 
            className={currentPage === 'home' ? 'active' : ''} 
            onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}
          >
            首頁
          </a>
          <a 
            href="#" 
            className={currentPage === 'petition' ? 'active' : ''} 
            onClick={(e) => { e.preventDefault(); setCurrentPage('petition'); }}
          >
            民眾陳情
          </a>
          <a 
            href="#" 
            className={currentPage === 'achievements' ? 'active' : ''} 
            onClick={(e) => { e.preventDefault(); setCurrentPage('achievements'); }}
          >
            政績展示
          </a>
          <a 
            href="#" 
            className={currentPage === 'voter-dashboard' ? 'active' : ''} 
            onClick={(e) => { e.preventDefault(); setCurrentPage('voter-dashboard'); }}
          >
            選民資料分析
          </a>
          <a 
            href="#" 
            className={currentPage === 'admin' ? 'active' : ''} 
            onClick={(e) => { e.preventDefault(); setCurrentPage('admin'); }}
          >
            後台管理
          </a>
        </nav>
      </header>

      {/* 頁面內容 */}
      {renderPage()}

      {/* 頁腳 - 在後台儀表板頁面和選民資料分析頁面不顯示 */}
      {!(currentPage === 'admin' && isAdminLoggedIn) && 
       !(currentPage === 'voter-dashboard' && isAdminLoggedIn) && (
        <footer>
          <div className="footer-content">
            <div className="footer-section">
              <h3>關於我們</h3>
              <p>Deepaign 力求提供優質的交流平台，讓政治人物與民眾共同打造更美好的社區環境。</p>
            </div>
            
            <div className="footer-section">
              <h3>聯絡資訊</h3>
              <p>地址：台北市大安區羅斯福路四段1號</p>
              <p>電話：(02) 2345-6789</p>
              <p>Email：deepaign.tw@gmail.com</p>
            </div>
            
            <div className="footer-section">
              <h3>服務時間</h3>
              <p>週一至週五：9:00 - 18:00</p>
              <p>週六：9:00 - 12:00（僅電話服務）</p>
              <p>Line 機器人：24小時服務</p>
            </div>
          </div>
          
          <div className="copyright">
            © 2025 Deepaign. All rights reserved.
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;