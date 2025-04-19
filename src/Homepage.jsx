import React from 'react';
import './Homepage.css';

function Homepage() {
  return (
    <div className="app-container">
      {/* 頂部導航欄 */}
      <header className="navbar">
        <div className="logo">
          <span className="icon-clock"></span>
          <span>智能選服幕僚系統</span>
        </div>
        <nav className="nav-links">
          <a href="#" className="active">首頁</a>
          <a href="#">民眾陳情</a>
          <a href="#">政績展示</a>
          <a href="#">後台管理</a>
        </nav>
      </header>

      {/* 主要內容區 */}
      <main>
        {/* 歡迎區塊 */}
        <section className="welcome-section">
          <h1>歡迎使用智能選服幕僚系統</h1>
          <p>連結民眾與政治人物，提供即時服務與政績展示</p>
        </section>

        {/* 卡片區塊 */}
        <div className="card-container">
          {/* 左側卡片：Line 官方帳號 */}
          <div className="card">
            <h2>加入我們的 Line 官方帳號</h2>
            <p>請掃下方 QR Code，立即加入我們的 Line 官方帳號，隨時掌握最新資訊，並可直接透過 Line 提出您的需求與建議。</p>
            
            <div className="qr-code">
              {/* 這裡放置 QR Code 圖片 */}
              <div className="qr-placeholder">
                <div className="qr-top-left"></div>
                <div className="qr-top-right"></div>
                <div className="qr-center"></div>
                <div className="qr-bottom-left"></div>
                <div className="qr-dots"></div>
              </div>
            </div>
            
            <button className="green-button" onClick={() => alert('即將開啟最新動態頁面')}>
              <span className="icon-chat"></span>
              查看最新動態
            </button>
          </div>

          {/* 右側卡片：系統功能介紹 */}
          <div className="card">
            <h2>系統功能介紹</h2>
            
            <div className="feature-list">
              <div className="feature-item">
                <span className="icon-check"></span>
                <div className="feature-content">
                  <h3>民眾陳情服務</h3>
                  <p>透過 Line 受理民眾陳情，快速提交您的陳情需求，系統自動分類並追蹤處理進度。</p>
                </div>
              </div>
              
              <div className="feature-item">
                <span className="icon-check"></span>
                <div className="feature-content">
                  <h3>法律諮詢</h3>
                  <p>提供基本法律諮詢服務，解答民眾常見法律問題，必要時將介專業律師協助。</p>
                </div>
              </div>
              
              <div className="feature-item">
                <span className="icon-check"></span>
                <div className="feature-content">
                  <h3>政績展示</h3>
                  <p>查看最新政績與活動資訊，了解我們為您服務所做的努力與成果。</p>
                </div>
              </div>
              
              <div className="feature-item">
                <span className="icon-check"></span>
                <div className="feature-content">
                  <h3>進度追蹤</h3>
                  <p>隨時查詢您提交的陳情案件處理進度，系統會主動通知最新狀態更新。</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Line 機器人功能展示區塊 */}
        <section className="chatbot-demo">
          <h2>Line 機器人功能展示</h2>
          
          <ChatboxDemo />
        </section>
      </main>

      {/* 頁腳區域 */}
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
    </div>
  );
}

// 聊天框組件
function ChatboxDemo() {
  const scrollChat = (direction) => {
    const chatMessages = document.querySelector('.chat-messages');
    if (chatMessages) {
      chatMessages.scrollTop += direction * 100;
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="chat-message received">
          <div className="message-content">
            您好！我是智能選服幕僚系統，很高興為您服務。請問有什麼我可以幫助您的嗎？
          </div>
        </div>
        
        <div className="chat-message sent">
          <div className="message-content">
            我想要陳情
          </div>
        </div>
        
        <div className="chat-message received">
          <div className="message-content">
            感謝您的陳情意願。請問您的陳情是關於以下哪一類問題？<br />
            1. 交通問題<br />
            2. 治安問題<br />
            3. 環境問題<br />
            4. 民生服務<br />
            5. 其他問題
          </div>
        </div>

        <div className="chat-message sent">
          <div className="message-content">
            3
          </div>
        </div>

        <div className="chat-message received">
          <div className="message-content">
            了解，您的陳情是關於環境問題。請簡述您遇到的環境問題，越詳細越好，以便我們能更好地協助您。
          </div>
        </div>

        <div className="chat-message sent">
          <div className="message-content">
            我家附近的公園最近垃圾很多，希望能增加清潔頻率
          </div>
        </div>

        <div className="chat-message received">
          <div className="message-content">
            感謝您的回報。為了更好地處理您的陳情，請提供以下資訊：<br />
            1. 公園名稱或確切位置<br />
            2. 您的姓名<br />
            3. 聯絡電話或 Email
          </div>
        </div>

        <div className="chat-message sent">
          <div className="message-content">
            1. 中正公園 2. 王小明 3. 0912345678
          </div>
        </div>
        
        <div className="chat-message received">
          <div className="message-content">
            感謝您提供的資訊，王小明先生/女士。您關於中正公園清潔問題的陳情已成功建立，案件編號為 ENV-20230615-001。<br /><br />
            我們將儘快處理您的陳情，並在有進展時通知您。您也可以隨時使用「查詢案件」功能，輸入案件編號查詢最新進度。<br /><br />
            還有其他我可以幫助您的嗎？
          </div>
        </div>
      </div>
      
      {/* 聊天室上下捲動指示器 */}
      <div className="scroll-indicators">
        <div className="scroll-up" onClick={() => scrollChat(-1)}>▲</div>
        <div className="scroll-down" onClick={() => scrollChat(1)}>▼</div>
      </div>
    </div>
  );
}

export default Homepage;