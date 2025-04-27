import React, { useState, useEffect } from 'react';
import './CaseDetailModal.css';

function CaseDetailModal({ isOpen, onClose, caseData }) {
  const [statusValue, setStatusValue] = useState('處理中');
  const [updateNote, setUpdateNote] = useState('');
  const [notifyUser, setNotifyUser] = useState(false);
  
  // 處理記錄數據
  const [processLogs, setProcessLogs] = useState([
    {
      staff: '李晉偉',
      time: '2023/06/15 15:20',
      content: '已聯繫環保局，安排增加清潔頻率，預計下週一開始實施。'
    },
    {
      staff: '張晉偉',
      time: '2023/06/16 10:45',
      content: '環保局回覆將增加每日清潔次數從1次到2次，並增設2個垃圾桶。'
    }
  ]);
  
  // 通知設置
  const [notificationSettings, setNotificationSettings] = useState({
    method: '電話',
    reminderDate: '',
    reminderMessage: '',
    sendMultipleNotices: false
  });
  
  // 日曆同步狀態
  const [calendarSynced, setCalendarSynced] = useState(false);
  
  // 各種載入狀態
  const [loading, setLoading] = useState(false);
  const [calendarLoading, setCalendarLoading] = useState(false);
  const [notificationLoading, setNotificationLoading] = useState(false);
  
  // 成功通知狀態
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  
  useEffect(() => {
    // 當案件資料變更時，更新狀態
    if (caseData) {
      setStatusValue(caseData.status || '處理中');
    }
  }, [caseData]);

  if (!isOpen || !caseData) return null;
  
  // 處理通知設定變更
  const handleNotificationChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // 儲存進度紀錄
  const handleSaveLog = () => {
    if (!updateNote.trim()) return;
    
    setLoading(true);
    
    // 模擬保存操作
    setTimeout(() => {
      const currentDate = new Date();
      const formattedTime = `${currentDate.getFullYear()}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${String(currentDate.getDate()).padStart(2, '0')} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}`;
      
      // 添加新紀錄
      const newLog = {
        staff: '許旭升',
        time: formattedTime,
        content: updateNote
      };
      
      setProcessLogs([...processLogs, newLog]);
      setUpdateNote('');
      setLoading(false);
      
      // 如果勾選了通知用戶
      if (notifyUser) {
        // 顯示通知成功訊息
        showAlert('已通知民眾最新處理進度');
      }
    }, 800);
  };
  
  // 同步至 Google 行事曆
  const handleSyncCalendar = () => {
    if (!notificationSettings.reminderDate) {
      showAlert('請先設定提醒日期');
      return;
    }
    
    setCalendarLoading(true);
    
    // 模擬同步
    setTimeout(() => {
      setCalendarLoading(false);
      setCalendarSynced(true);
      showAlert('已成功同步至 Google 行事曆');
    }, 1000);
  };
  
  // 發送通知
  const handleSendNotification = () => {
    if (!notificationSettings.reminderDate) {
      showAlert('請先設定提醒日期');
      return;
    }
    
    if (notificationSettings.method !== '電話' && !notificationSettings.reminderMessage) {
      showAlert('請輸入通知訊息內容');
      return;
    }
    
    setNotificationLoading(true);
    
    // 模擬發送通知
    setTimeout(() => {
      setNotificationLoading(false);
      showAlert(notificationSettings.sendMultipleNotices ? 
        '已安排多次通知提醒' : '已安排通知提醒');
    }, 800);
  };
  
  // 通知提示
  const showAlert = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div className="modal-overlay">
      <div className="case-detail-modal">
        <div className="modal-header">
          <h2>案件詳情</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-content">
          <div className="case-info-grid">
            <div className="info-row">
              <div className="info-group">
                <label>案件編號</label>
                <div className="info-value">{caseData.id || 'ENV-20230615-001'}</div>
              </div>
              <div className="info-group">
                <label>受理日期</label>
                <div className="info-value">{caseData.date || '2023/06/15'}</div>
              </div>
            </div>
            
            <div className="info-row">
              <div className="info-group">
                <label>案件類別</label>
                <div className="info-value">{caseData.category || '環境問題'}</div>
              </div>
              <div className="info-group">
                <label>狀態</label>
                <div className="info-value status-select">
                  <select 
                    value={statusValue} 
                    onChange={(e) => setStatusValue(e.target.value)}
                    className={`status-${statusValue === '處理中' ? 'processing' : statusValue === '已完成' ? 'completed' : 'waiting'}`}
                  >
                    <option value="處理中">處理中</option>
                    <option value="已完成">已完成</option>
                    <option value="待處理">待處理</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="info-row">
              <div className="info-group">
                <label>受理人員</label>
                <div className="info-value">{caseData.receiverStaff || '李晉偉'}</div>
              </div>
              <div className="info-group">
                <label>承辦人</label>
                <div className="info-value">{caseData.assignee || '張晉偉'}</div>
              </div>
            </div>
            
            <div className="info-row">
              <div className="info-group">
                <label>陳情方式</label>
                <div className="info-value">{caseData.contactMethod || '電話'}</div>
              </div>
              <div className="info-group">
                <label>住家里別</label>
                <div className="info-value">{caseData.neighborhoodVillage || '大安里'}</div>
              </div>
            </div>
            
            <div className="info-full-width">
              <label>陳情事件</label>
              <div className="info-value">{caseData.title || '中正公園清潔問題'}</div>
            </div>
            
            <div className="info-row">
              <div className="info-group full-content">
                <label>陳情內容</label>
                <div className="info-value content-box">
                  {caseData.content || '我家附近的中正公園最近垃圾很多，希望能增加清潔頻率，特別是週末人潮較多時，垃圾桶常常滿出來，造成環境髒亂，也容易引發蚊蟲。建議增加垃圾桶數量，並提高清潔頻率。'}
                </div>
              </div>
            </div>
            
            <div className="info-row">
              <div className="info-group">
                <label>相關地點</label>
                <div className="info-value location-tag">{caseData.location || '中正公園'}</div>
              </div>
              <div className="info-group">
                <label>附件</label>
                <div className="info-value">{caseData.hasAttachment === 'yes' ? '有' : '無'}</div>
              </div>
            </div>
            
            <div className="info-row contact-persons">
              <div className="info-group">
                <label>聯絡人 1</label>
                <div className="info-value">{caseData.contactPerson1 || caseData.reporter || '王小明'}</div>
                <div className="info-value contact-info">{caseData.contactPerson1Phone || caseData.contact || '0912345678'}</div>
              </div>
              <div className="info-group">
                <label>聯絡人 2</label>
                <div className="info-value">{caseData.contactPerson2 || '沒有第二聯絡人'}</div>
                <div className="info-value contact-info">{caseData.contactPerson2Phone || ''}</div>
              </div>
            </div>
          </div>
          
          {/* 處理流程與時間軸 */}
          <div className="case-process-timeline">
            <h3>處理流程</h3>
            
            <div className="timeline">
              <div className="timeline-item completed">
                <div className="timeline-icon">✓</div>
                <div className="timeline-content">
                  <div className="timeline-title">案件建立</div>
                  <div className="timeline-time">{caseData.date || '2023/06/15 14:32'}</div>
                </div>
              </div>
              
              <div className="timeline-item completed">
                <div className="timeline-icon">✓</div>
                <div className="timeline-content">
                  <div className="timeline-title">案件指派</div>
                  <div className="timeline-time">2023/06/15 15:00</div>
                  <div className="timeline-detail">已指派給 {caseData.assignee || '李晉偉'} 處理</div>
                </div>
              </div>
              
              <div className="timeline-item active">
                <div className="timeline-icon">●</div>
                <div className="timeline-content">
                  <div className="timeline-title">處理中</div>
                  <div className="timeline-time">2023/06/15 - 至今</div>
                  <div className="timeline-detail">環保局協調中</div>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-icon">○</div>
                <div className="timeline-content">
                  <div className="timeline-title">案件結案</div>
                  <div className="timeline-time">待完成</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 聯絡單位和行事曆設定 */}
          <div className="contact-calendar-section">
            <div className="contact-info">
              <h3>聯絡單位資訊</h3>
              <div className="contact-detail">
                <span className="contact-label">主要聯絡單位:</span>
                <span className="contact-value">環保局清潔隊</span>
              </div>
              <div className="contact-detail">
                <span className="contact-label">聯絡人:</span>
                <span className="contact-value">林科長</span>
              </div>
              <div className="contact-detail">
                <span className="contact-label">聯絡方式:</span>
                <span className="contact-value">02-2345-6789 分機 123</span>
              </div>
            </div>
            
            <div className="notification-settings">
              <h3>通知與行事曆設定</h3>
              <div className="notification-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="notificationMethod">通知方式</label>
                    <select
                      id="notificationMethod"
                      name="method"
                      value={notificationSettings.method}
                      onChange={handleNotificationChange}
                    >
                      <option value="電話">電話</option>
                      <option value="簡訊">簡訊</option>
                      <option value="電子郵件">電子郵件</option>
                      <option value="Line">Line</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="reminderDate">提醒日期時間</label>
                    <input
                      type="datetime-local"
                      id="reminderDate"
                      name="reminderDate"
                      value={notificationSettings.reminderDate}
                      onChange={handleNotificationChange}
                    />
                  </div>
                </div>
                
                {notificationSettings.method !== '電話' && (
                  <div className="form-group">
                    <label htmlFor="reminderMessage">通知訊息</label>
                    <textarea
                      id="reminderMessage"
                      name="reminderMessage"
                      rows="3"
                      value={notificationSettings.reminderMessage}
                      onChange={handleNotificationChange}
                      placeholder={`請輸入通知訊息內容，將透過${notificationSettings.method}發送...`}
                    ></textarea>
                  </div>
                )}
                
                <div className="multi-notification-option">
                  <input 
                    type="checkbox" 
                    id="sendMultipleNotices" 
                    name="sendMultipleNotices"
                    checked={notificationSettings.sendMultipleNotices}
                    onChange={handleNotificationChange}
                  />
                  <label htmlFor="sendMultipleNotices">
                    設定多次提醒（會在設定時間前1天、當天和逾期時自動發送通知）
                  </label>
                </div>
                
                <div className="notification-actions">
                  <button 
                    className={`calendar-btn ${calendarSynced ? 'synced' : ''}`}
                    onClick={handleSyncCalendar}
                    disabled={calendarLoading}
                  >
                    {calendarLoading ? (
                      <span className="loading-spinner"></span>
                    ) : (
                      <span className="calendar-icon">📅</span>
                    )}
                    {calendarLoading ? '同步中...' : 
                     calendarSynced ? '已同步至行事曆' : '同步至 Google 行事曆'}
                  </button>
                  
                  <button 
                    className="notification-btn"
                    onClick={handleSendNotification}
                    disabled={notificationLoading}
                  >
                    {notificationLoading ? (
                      <span className="loading-spinner"></span>
                    ) : (
                      <span className="notification-icon">🔔</span>
                    )}
                    {notificationLoading ? '發送中...' : '發送通知'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* 處理經過和結果區塊 */}
          <div className="process-results-section">
            <h3>處理經過與結果</h3>
            <div className="process-record">
              <textarea
                className="record-content"
                value={caseData.processRecord || '2023/06/15 15:20 李晉偉：已聯繫環保局，安排增加清潔頻率，預計下週一開始實施。\n2023/06/16 10:45 張晉偉：環保局回覆將增加每日清潔次數從1次到2次，並增設2個垃圾桶。'}
                readOnly
              ></textarea>
            </div>
          </div>
          
          {/* 處理紀錄日誌 */}
          <div className="case-logs">
            <h3>處理紀錄</h3>
            
            {processLogs.map((log, index) => (
              <div key={index} className="log-entry">
                <div className="log-header">
                  <span className="staff-name">{log.staff}</span>
                  <span className="log-time">{log.time}</span>
                </div>
                <div className="log-content">
                  {log.content}
                </div>
              </div>
            ))}
          </div>
          
          {/* 新增紀錄 */}
          <div className="new-log">
            <h3>新增處理紀錄</h3>
            <textarea 
              placeholder="輸入處理進度..." 
              value={updateNote}
              onChange={(e) => setUpdateNote(e.target.value)}
            ></textarea>
            
            <div className="log-actions">
              <div className="notify-option">
                <input 
                  type="checkbox" 
                  id="notify-user" 
                  checked={notifyUser}
                  onChange={(e) => setNotifyUser(e.target.checked)}
                />
                <label htmlFor="notify-user">通知民眾此更新</label>
              </div>
              
              <button 
                className="save-log-btn" 
                onClick={handleSaveLog}
                disabled={loading || !updateNote.trim()}
              >
                {loading ? (
                  <span className="loading-spinner"></span>
                ) : ''}
                {loading ? '儲存中...' : '儲存紀錄'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* 成功通知提示 */}
      {showNotification && (
        <div className="notification-toast">
          <div className="notification-content">
            <span className="notification-icon">✓</span>
            <span className="notification-message">{notificationMessage}</span>
          </div>
          <button className="notification-close" onClick={() => setShowNotification(false)}>×</button>
        </div>
      )}
    </div>
  );
}

export default CaseDetailModal;