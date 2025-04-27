import React, { useState, useEffect } from 'react';
import './CreateCaseModal.css';

const CreateCaseModal = ({ isOpen, onClose, onSave }) => {
  // 初始狀態
  const initialState = {
    caseNumber: generateCaseNumber(), // 自動生成案件編號
    receiveDate: getCurrentDate(),
    receiverStaff: '',
    contactMethod: '',
    category: '',
    location: '',
    content: '',
    fullText: '',
    contactPerson1: '',
    contactPerson1Phone: '',
    contactPerson2: '',
    contactPerson2Phone: '',
    hasAttachment: 'no',
    processRecord: '',
    completionDate: '',
    assignee: '',
    neighborhoodVillage: '',
    priority: '一般'
  };

  // 案件資料狀態
  const [caseData, setCaseData] = useState(initialState);
  
  // 輸入模式狀態
  const [useFullText, setUseFullText] = useState(false);
  
  // 通知設定狀態
  const [notificationSettings, setNotificationSettings] = useState({
    method: '電話',
    reminderDate: '',
    reminderMessage: '',
    sendMultipleNotices: false
  });
  
  // 各種載入狀態
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [calendarLoading, setCalendarLoading] = useState(false);
  
  // 通知提示狀態
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  
  // 日曆同步狀態
  const [calendarSynced, setCalendarSynced] = useState(false);
  
  // AI 推薦結果
  const [aiRecommendations, setAiRecommendations] = useState({
    category: '',
    receiverStaff: '',
    assignee: '',
    contactPerson1: '',
    contactPerson1Phone: '',
    neighborhoodVillage: ''
  });
  
  // 可選的員工列表
  const staffOptions = [
    '李晉偉',
    '張晉偉',
    '陳秘書',
    '林科長',
    '許旭升',
    '王幹事',
    '未指派'
  ];
  
  // 接收陳情方式選項
  const contactMethodOptions = [
    'Line',
    'FB',
    '電話',
    '現場',
    'Email',
    '其他'
  ];
  
  // 案件類別選項
  const categoryOptions = [
    '交通問題',
    '環境問題',
    '治安問題',
    '民生服務',
    '法律諮詢',
    '其他問題'
  ];
  
  // 模擬自動生成案件編號
  function generateCaseNumber() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `CASE-${year}${month}${day}-${randomNum}`;
  }
  
  // 取得當前日期 (YYYY-MM-DD)
  function getCurrentDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
  
  // 當彈窗打開時重置狀態
  useEffect(() => {
    if (isOpen) {
      setCaseData(initialState);
      setUseFullText(false);
      setAiRecommendations({
        category: '',
        receiverStaff: '',
        assignee: '',
        contactPerson1: '',
        contactPerson1Phone: '',
        neighborhoodVillage: ''
      });
      setCalendarSynced(false);
    }
  }, [isOpen]);
  
  // 輸入變更處理
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCaseData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // 通知設定變更處理
  const handleNotificationChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // 通知提示
  const showAlert = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };
  
  // 切換輸入模式
  const toggleInputMode = () => {
    setUseFullText(!useFullText);
  };
  
  // AI 萃取資訊
  const handleAIExtract = () => {
    if (caseData.fullText.trim() === '') {
      showAlert('請先輸入案件資訊文字');
      return;
    }
    
    setAiLoading(true);
    
    // 模擬 AI 處理過程
    setTimeout(() => {
      // 模擬 AI 從文字中萃取資訊
      const extractedTitle = caseData.fullText.split('\n')[0] || '路燈維修申請';
      const hasLocation = caseData.fullText.includes('地點') || caseData.fullText.includes('地址');
      const extractedLocation = hasLocation ? '大安區和平東路二段' : '';
      
      const isTraffic = caseData.fullText.includes('交通') || caseData.fullText.includes('路燈') || caseData.fullText.includes('道路');
      const isEnvironment = caseData.fullText.includes('環境') || caseData.fullText.includes('垃圾') || caseData.fullText.includes('公園');
      const isSecurity = caseData.fullText.includes('治安') || caseData.fullText.includes('安全') || caseData.fullText.includes('犯罪');
      
      // 根據關鍵字判斷類別
      let category = '';
      if (isTraffic) category = '交通問題';
      else if (isEnvironment) category = '環境問題';
      else if (isSecurity) category = '治安問題';
      else category = '民生服務';
      
      // 判斷里別
      let neighborhoodVillage = '';
      if (caseData.fullText.includes('大安')) neighborhoodVillage = '大安里';
      else if (caseData.fullText.includes('和平')) neighborhoodVillage = '和平里';
      else if (caseData.fullText.includes('龍安')) neighborhoodVillage = '龍安里';
      else neighborhoodVillage = '未知';
      
      // 更新 AI 推薦
      const recommendations = {
        category: category,
        receiverStaff: category === '交通問題' ? '李晉偉' : category === '環境問題' ? '許旭升' : '陳秘書',
        assignee: category === '交通問題' ? '張晉偉' : category === '環境問題' ? '林科長' : '王幹事',
        contactPerson1: caseData.fullText.includes('王') ? '王小明' : '李大華',
        contactPerson1Phone: '0912345678',
        neighborhoodVillage: neighborhoodVillage
      };
      
      setAiRecommendations(recommendations);
      
      // 更新案件資料
      setCaseData(prev => ({
        ...prev,
        content: extractedTitle,
        category: recommendations.category,
        location: extractedLocation,
        receiverStaff: recommendations.receiverStaff,
        assignee: recommendations.assignee,
        contactPerson1: recommendations.contactPerson1,
        contactPerson1Phone: recommendations.contactPerson1Phone,
        neighborhoodVillage: recommendations.neighborhoodVillage
      }));
      
      setAiLoading(false);
      
      // 自動切換到逐欄位填寫模式
      setUseFullText(false);
      
      showAlert('AI 成功萃取案件資訊！已切換至逐欄位模式');
    }, 1500);
  };
  
  // 同步至 Google 行事曆
  const handleSyncCalendar = () => {
    if (!notificationSettings.reminderDate) {
      showAlert('請先設定提醒日期');
      return;
    }
    
    setCalendarLoading(true);
    
    // 模擬同步過程
    setTimeout(() => {
      setCalendarLoading(false);
      setCalendarSynced(true);
      showAlert('已成功同步至 Google 行事曆');
    }, 1200);
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
    
    // 模擬發送通知
    showAlert(notificationSettings.sendMultipleNotices ? 
      '已安排多次通知提醒' : '已安排通知提醒');
  };
  
  // 儲存案件
  const handleSave = () => {
    // 基本驗證
    if (!caseData.receiveDate || !caseData.receiverStaff || !caseData.category || !caseData.content) {
      showAlert('請填寫必要欄位：受理日期、受理人員、案件類別和陳情事件');
      return;
    }
    
    setLoading(true);
    
    // 模擬儲存過程
    setTimeout(() => {
      setLoading(false);
      
      if (onSave) {
        // 根據類別生成前綴
        let prefix = '';
        switch(caseData.category) {
          case '交通問題': prefix = 'TRA'; break;
          case '環境問題': prefix = 'ENV'; break;
          case '治安問題': prefix = 'SEC'; break;
          default: prefix = 'LIV'; break;
        }
        
        // 取得日期部分
        const dateComponents = caseData.receiveDate.split('-');
        const formattedDate = `${dateComponents[0]}/${dateComponents[1]}/${dateComponents[2]}`;
        
        // 使用生成的案件編號或者自定義前綴
        const caseId = caseData.caseNumber.startsWith('CASE-') ?
          `${prefix}-${caseData.caseNumber.substring(5)}` :
          caseData.caseNumber;
        
        onSave({
          ...caseData,
          id: caseId,
          status: '待處理',
          date: formattedDate,
          reporter: caseData.contactPerson1,
          contact: caseData.contactPerson1Phone,
          title: caseData.content
        });
      }
      
      onClose();
      showAlert('案件已成功建立！');
    }, 1000);
  };
  
  // 如果彈窗沒有打開，不渲染任何內容
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay">
      <div className="create-case-modal">
        <div className="modal-header">
          <h2>新增陳情案件</h2>
          <div className="input-mode-toggle">
            <button 
              className={`toggle-btn ${!useFullText ? 'active' : ''}`} 
              onClick={() => setUseFullText(false)}
            >
              逐欄位填寫
            </button>
            <button 
              className={`toggle-btn ${useFullText ? 'active' : ''}`} 
              onClick={() => setUseFullText(true)}
            >
              全文輸入
            </button>
          </div>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-content">
          {useFullText ? (
            /* 全文輸入模式 */
            <div className="fulltext-input-section">
              <div className="form-group full-width">
                <label htmlFor="fullText">陳情內容全文</label>
                <textarea
                  id="fullText"
                  name="fullText"
                  rows="8"
                  value={caseData.fullText}
                  onChange={handleChange}
                  placeholder="請貼上陳情內容全文，系統將自動萃取關鍵資訊..."
                ></textarea>
              </div>
              
              <div className="ai-extract-section">
                <button 
                  className="ai-extract-btn" 
                  onClick={handleAIExtract}
                  disabled={aiLoading}
                >
                  {aiLoading ? (
                    <span className="loading-spinner"></span>
                  ) : (
                    <span className="ai-icon">🤖</span>
                  )}
                  {aiLoading ? 'AI 正在分析...' : 'AI 萃取資訊'}
                </button>
                
                {aiRecommendations.category && (
                  <div className="ai-recommendations">
                    <h3>AI 推薦</h3>
                    <div className="recommendation-item">
                      <span className="recommendation-label">案件類別:</span>
                      <span className="recommendation-value">{aiRecommendations.category}</span>
                    </div>
                    <div className="recommendation-item">
                      <span className="recommendation-label">受理人建議:</span>
                      <span className="recommendation-value">{aiRecommendations.receiverStaff}</span>
                    </div>
                    <div className="recommendation-item">
                      <span className="recommendation-label">承辦人建議:</span>
                      <span className="recommendation-value">{aiRecommendations.assignee}</span>
                    </div>
                    <div className="recommendation-item">
                      <span className="recommendation-label">聯絡人:</span>
                      <span className="recommendation-value">{aiRecommendations.contactPerson1}</span>
                    </div>
                    <div className="recommendation-item">
                      <span className="recommendation-label">里別:</span>
                      <span className="recommendation-value">{aiRecommendations.neighborhoodVillage}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* 逐欄位填寫模式 */
            <div className="form-container">
              <div className="form-section">
                <h3>基本資訊</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="caseNumber">案件編號</label>
                    <input
                      type="text"
                      id="caseNumber"
                      name="caseNumber"
                      value={caseData.caseNumber}
                      onChange={handleChange}
                      readOnly
                      className="readonly-field"
                      title="系統自動生成案件編號"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="receiveDate">受理日期 <span className="required">*</span></label>
                    <input
                      type="date"
                      id="receiveDate"
                      name="receiveDate"
                      value={caseData.receiveDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="receiverStaff">受理人員 <span className="required">*</span></label>
                    <select
                      id="receiverStaff"
                      name="receiverStaff"
                      value={caseData.receiverStaff}
                      onChange={handleChange}
                      required
                    >
                      <option value="">請選擇受理人員</option>
                      {staffOptions.map(staff => (
                        <option key={staff} value={staff}>{staff}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="contactMethod">陳情方式 <span className="required">*</span></label>
                    <select
                      id="contactMethod"
                      name="contactMethod"
                      value={caseData.contactMethod}
                      onChange={handleChange}
                      required
                    >
                      <option value="">請選擇陳情方式</option>
                      {contactMethodOptions.map(method => (
                        <option key={method} value={method}>{method}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="category">案件類別 <span className="required">*</span></label>
                    <select
                      id="category"
                      name="category"
                      value={caseData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">請選擇類別</option>
                      {categoryOptions.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="neighborhoodVillage">住家里別</label>
                    <input
                      type="text"
                      id="neighborhoodVillage"
                      name="neighborhoodVillage"
                      value={caseData.neighborhoodVillage}
                      onChange={handleChange}
                      placeholder="請輸入里別（如：大安里）"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="priority">優先等級</label>
                    <select
                      id="priority"
                      name="priority"
                      value={caseData.priority}
                      onChange={handleChange}
                    >
                      <option value="低">低</option>
                      <option value="一般">一般</option>
                      <option value="緊急">緊急</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="hasAttachment">是否有附件</label>
                    <select
                      id="hasAttachment"
                      name="hasAttachment"
                      value={caseData.hasAttachment}
                      onChange={handleChange}
                    >
                      <option value="no">無</option>
                      <option value="yes">有</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="form-section">
                <h3>聯絡人資訊</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="contactPerson1">聯絡人1</label>
                    <input
                      type="text"
                      id="contactPerson1"
                      name="contactPerson1"
                      value={caseData.contactPerson1}
                      onChange={handleChange}
                      placeholder="請輸入聯絡人姓名"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="contactPerson1Phone">聯絡人1電話</label>
                    <input
                      type="text"
                      id="contactPerson1Phone"
                      name="contactPerson1Phone"
                      value={caseData.contactPerson1Phone}
                      onChange={handleChange}
                      placeholder="請輸入聯絡人電話"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="contactPerson2">聯絡人2</label>
                    <input
                      type="text"
                      id="contactPerson2"
                      name="contactPerson2"
                      value={caseData.contactPerson2}
                      onChange={handleChange}
                      placeholder="請輸入第二聯絡人姓名（選填）"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="contactPerson2Phone">聯絡人2電話</label>
                    <input
                      type="text"
                      id="contactPerson2Phone"
                      name="contactPerson2Phone"
                      value={caseData.contactPerson2Phone}
                      onChange={handleChange}
                      placeholder="請輸入第二聯絡人電話（選填）"
                    />
                  </div>
                </div>
              </div>
              
              <div className="form-section">
                <h3>陳情內容</h3>
                <div className="form-group full-width">
                  <label htmlFor="content">陳情事件 <span className="required">*</span></label>
                  <textarea
                    id="content"
                    name="content"
                    rows="4"
                    value={caseData.content}
                    onChange={handleChange}
                    placeholder="請詳細描述陳情事件內容"
                    required
                  ></textarea>
                </div>
                
                <div className="form-group full-width">
                  <label htmlFor="location">相關地點</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={caseData.location}
                    onChange={handleChange}
                    placeholder="請輸入相關地點（如：大安區和平東路二段）"
                  />
                </div>
                
                <div className="form-group full-width">
                  <label htmlFor="processRecord">處理經過和結果</label>
                  <textarea
                    id="processRecord"
                    name="processRecord"
                    rows="4"
                    value={caseData.processRecord}
                    onChange={handleChange}
                    placeholder="請記錄處理經過、聯絡單位及回覆情況"
                  ></textarea>
                </div>
              </div>
              
              <div className="form-section">
                <h3>結案與承辦資訊</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="completionDate">結案日期</label>
                    <input
                      type="date"
                      id="completionDate"
                      name="completionDate"
                      value={caseData.completionDate}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="assignee">承辦人</label>
                    <select
                      id="assignee"
                      name="assignee"
                      value={caseData.assignee}
                      onChange={handleChange}
                    >
                      <option value="">請選擇承辦人</option>
                      {staffOptions.map(staff => (
                        <option key={staff} value={staff}>{staff}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* 通知設定區域 - 所有模式下都顯示 */}
          <div className="notification-settings">
            <h3>通知與行事曆設定</h3>
            <div className="settings-grid">
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
              
              <div className="form-group">
                <div className="action-buttons">
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
                  >
                    <span className="notification-icon">🔔</span>
                    發送通知
                  </button>
                </div>
              </div>
            </div>
            
            {/* 非電話聯絡時顯示訊息編輯框 */}
            {notificationSettings.method !== '電話' && (
              <div className="message-template">
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
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>取消</button>
          <button 
            className="save-btn" 
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? (
              <span className="loading-spinner"></span>
            ) : ''}
            {loading ? '處理中...' : '建立案件'}
          </button>
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
};

export default CreateCaseModal;