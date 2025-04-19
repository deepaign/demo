import React from 'react';
import './AchievementsPage.css';

function AchievementsPage() {
  return (
    <main>
      {/* 政績展示標題 */}
      <section className="welcome-section">
        <h1>政績展示</h1>
        <p>林聰明議員致力於改善社區環境、促進居民福祉，以下是近期完成的重要政績</p>
      </section>

      {/* 政績卡片區塊 */}
      <div className="achievements-grid">
        {/* 政績卡片 1 */}
        <div className="achievement-card blue-bg">
          <div className="achievement-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-building">
              <path d="M8 2H16V4H8V2Z" fill="currentColor" />
              <path d="M4 4H20V8H4V4Z" fill="currentColor" />
              <path d="M4 10V22H8V18H16V22H20V10H4Z" fill="currentColor" />
              <path d="M10 12H14V16H10V12Z" fill="currentColor" />
            </svg>
          </div>
          <div className="achievement-details">
            <div className="achievement-category">建設項目</div>
            <h3>中正公園改造計畫</h3>
            <p>完成中正公園環境改造，增設休閒設施與綠化空間，提升居民生活品質。</p>
            <div className="achievement-meta">
              <div className="achievement-date">2023年6月完成</div>
              <button className="view-details-button">查看詳情</button>
            </div>
          </div>
        </div>

        {/* 政績卡片 2 */}
        <div className="achievement-card green-bg">
          <div className="achievement-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-energy">
              <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM16.7 11.3L10.7 17.3C10.5 17.5 10.3 17.5 10 17.5C9.8 17.5 9.5 17.4 9.3 17.3L7.3 15.3C7.1 15.1 7 14.8 7 14.5C7 14.2 7.1 13.9 7.3 13.7C7.5 13.5 7.8 13.4 8.1 13.4C8.4 13.4 8.6 13.5 8.8 13.7L10 14.9L15.2 9.7C15.4 9.5 15.7 9.4 16 9.4C16.3 9.4 16.5 9.5 16.7 9.7C17.1 10.1 17.1 10.9 16.7 11.3Z" fill="currentColor" />
            </svg>
          </div>
          <div className="achievement-details">
            <div className="achievement-category">環保永續</div>
            <h3>社區太陽能計畫</h3>
            <p>推動社區太陽能發電設計，已完成15棟公共建築的綠能轉型，年減碳量達500噸。</p>
            <div className="achievement-meta">
              <div className="achievement-date">2023年5月完成</div>
              <button className="view-details-button">查看詳情</button>
            </div>
          </div>
        </div>

        {/* 政績卡片 3 */}
        <div className="achievement-card purple-bg">
          <div className="achievement-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-book">
              <path d="M21 18H6C5.4 18 5 17.6 5 17V5C5 4.4 5.4 4 6 4H21V18Z" fill="currentColor" />
              <path d="M3 6V20C3 20.6 3.4 21 4 21H21V19H5C4.4 19 4 18.6 4 18V6C4 5.4 3.6 5 3 5C3 5 3 5.6 3 6Z" fill="currentColor" />
            </svg>
          </div>
          <div className="achievement-details">
            <div className="achievement-category">教育文化</div>
            <h3>社區圖書館揭幕</h3>
            <p>完成社區圖書館裝修工程，新增兒童閱讀區與教育學習中心，提升社區教育資源。</p>
            <div className="achievement-meta">
              <div className="achievement-date">2023年4月完成</div>
              <button className="view-details-button">查看詳情</button>
            </div>
          </div>
        </div>

        {/* 政績卡片 4 */}
        <div className="achievement-card orange-bg">
          <div className="achievement-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-healthcare">
              <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" fill="currentColor" />
              <path d="M10.5 17H13.5V13.5H17V10.5H13.5V7H10.5V10.5H7V13.5H10.5V17Z" fill="white" />
            </svg>
          </div>
          <div className="achievement-details">
            <div className="achievement-category">健康醫療</div>
            <h3>社區健康服務中心</h3>
            <p>建立社區健康服務中心，提供居民基本醫療諮詢與健康檢測服務，服務超過2000人次。</p>
            <div className="achievement-meta">
              <div className="achievement-date">2023年3月完成</div>
              <button className="view-details-button">查看詳情</button>
            </div>
          </div>
        </div>

        {/* 政績卡片 5 */}
        <div className="achievement-card teal-bg">
          <div className="achievement-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-transit">
              <path d="M12 2C7.58 2 4 2.5 4 6V16C4 17.1 4.9 18 6 18L5 19V20H6L8 18H16L18 20H19V19L18 18C19.1 18 20 17.1 20 16V6C20 2.5 16.42 2 12 2ZM7.5 17C6.67 17 6 16.33 6 15.5C6 14.67 6.67 14 7.5 14C8.33 14 9 14.67 9 15.5C9 16.33 8.33 17 7.5 17ZM16.5 17C15.67 17 15 16.33 15 15.5C15 14.67 15.67 14 16.5 14C17.33 14 18 14.67 18 15.5C18 16.33 17.33 17 16.5 17ZM18 11H6V6H18V11Z" fill="currentColor" />
            </svg>
          </div>
          <div className="achievement-details">
            <div className="achievement-category">交通建設</div>
            <h3>社區巴士路線優化</h3>
            <p>完成社區巴士路線優化規劃，新增3條路線並提高班次頻率，方便居民通勤與出行。</p>
            <div className="achievement-meta">
              <div className="achievement-date">2023年2月完成</div>
              <button className="view-details-button">查看詳情</button>
            </div>
          </div>
        </div>

        {/* 政績卡片 6 */}
        <div className="achievement-card red-bg">
          <div className="achievement-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-security">
              <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z" fill="currentColor" />
            </svg>
          </div>
          <div className="achievement-details">
            <div className="achievement-category">社區安全</div>
            <h3>社區監控系統升級</h3>
            <p>完成社區監控系統升級，安裝高清攝像頭與智能預警系統，增強夜間安全防護能力。</p>
            <div className="achievement-meta">
              <div className="achievement-date">2023年1月完成</div>
              <button className="view-details-button">查看詳情</button>
            </div>
          </div>
        </div>
      </div>

      {/* 近期活動區塊 */}
      <section className="events-section">
        <h2>近期活動</h2>
        
        <div className="event-list">
          {/* 活動卡片 1 */}
          <div className="event-card">
            <div className="event-date">
              <div className="event-day">25</div>
              <div className="event-month">六月</div>
            </div>
            <div className="event-content">
              <h3>社區環保講座</h3>
              <p className="event-location">地點：中正社區活動中心</p>
              <p className="event-description">邀請環保專家分享居家減塑與資源回收的實用技巧，歡迎社區居民踴躍參加。</p>
            </div>
          </div>
          
          {/* 活動卡片 2 */}
          <div className="event-card">
            <div className="event-date">
              <div className="event-day">30</div>
              <div className="event-month">六月</div>
            </div>
            <div className="event-content">
              <h3>里民座談會</h3>
              <p className="event-location">地點：區公所大禮堂</p>
              <p className="event-description">針對近期社區發展計畫與道路建設進行討論，歡迎里民提出建議與意見。</p>
            </div>
          </div>
          
          {/* 活動卡片 3 */}
          <div className="event-card">
            <div className="event-date">
              <div className="event-day">05</div>
              <div className="event-month">七月</div>
            </div>
            <div className="event-content">
              <h3>社區健康日</h3>
              <p className="event-location">地點：中正公園</p>
              <p className="event-description">提供免費健康檢查與健康諮詢服務，包含血壓測量、血糖檢測等基礎健康項目。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 政績統計區塊 */}
      <section className="statistics-section">
        <h2>政績統計</h2>
        
        <div className="statistics-grid">
          <div className="statistic-card">
            <div className="statistic-number">127</div>
            <div className="statistic-label">已完成陳情案件</div>
          </div>
          
          <div className="statistic-card">
            <div className="statistic-number">15</div>
            <div className="statistic-label">社區改善計畫</div>
          </div>
          
          <div className="statistic-card">
            <div className="statistic-number">8</div>
            <div className="statistic-label">公共建設項目</div>
          </div>
          
          <div className="statistic-card">
            <div className="statistic-number">42</div>
            <div className="statistic-label">社區活動舉辦</div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AchievementsPage;