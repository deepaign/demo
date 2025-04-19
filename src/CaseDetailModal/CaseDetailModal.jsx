import React, { useState } from 'react';
import './CaseDetailModal.css';

function CaseDetailModal({ isOpen, onClose }) {
  const [statusValue, setStatusValue] = useState('處理中');
  const [updateNote, setUpdateNote] = useState('');
  const [notifyUser, setNotifyUser] = useState(false);

  if (!isOpen) return null;

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
                <div className="info-value">ENV-20230615-001</div>
              </div>
              <div className="info-group">
                <label>接收日期</label>
                <div className="info-value">2023/06/15 14:32</div>
              </div>
            </div>
            
            <div className="info-row">
              <div className="info-group">
                <label>陳情人</label>
                <div className="info-value">王小明</div>
              </div>
              <div className="info-group">
                <label>聯絡方式</label>
                <div className="info-value">0912345678</div>
              </div>
            </div>
            
            <div className="info-row">
              <div className="info-group">
                <label>類別</label>
                <div className="info-value">環境問題</div>
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
            
            <div className="info-full-width">
              <label>標題</label>
              <div className="info-value">中正公園清潔問題</div>
            </div>
            
            <div className="info-full-width">
              <label>陳情內容</label>
              <div className="info-value content-box">
                我家附近的中正公園最近垃圾很多，希望能增加清潔頻率，特別是週末人潮較多時，垃圾桶常常滿出來，造成環境髒亂，也容易引發蚊蟲。建議增加垃圾桶數量，並提高清潔頻率。
              </div>
            </div>
            
            <div className="info-full-width">
              <label>相關地點</label>
              <div className="info-value location-tag">中正公園</div>
            </div>
          </div>
          
          <div className="case-logs">
            <h3>處理紀錄</h3>
            
            <div className="log-entry">
              <div className="log-header">
                <span className="staff-name">李晉偉</span>
                <span className="log-time">2023/06/15 15:20</span>
              </div>
              <div className="log-content">
                已聯繫環保局，安排增加清潔頻率，預計下週一開始實施。
              </div>
            </div>
            
            <div className="log-entry">
              <div className="log-header">
                <span className="staff-name">張晉偉</span>
                <span className="log-time">2023/06/16 10:45</span>
              </div>
              <div className="log-content">
                環保局回覆將增加每日清潔次數從1次到2次，並增設2個垃圾桶。
              </div>
            </div>
          </div>
          
          <div className="new-log">
            <h3>新增處理紀錄</h3>
            <textarea 
              placeholder="輸入處理進度..." 
              value={updateNote}
              onChange={(e) => setUpdateNote(e.target.value)}
            ></textarea>
            
            <div className="notify-option">
              <input 
                type="checkbox" 
                id="notify-user" 
                checked={notifyUser}
                onChange={(e) => setNotifyUser(e.target.checked)}
              />
              <label htmlFor="notify-user">通知民眾此更新</label>
            </div>
            
            <button className="save-log-btn">儲存紀錄</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaseDetailModal;