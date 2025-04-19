import React, { useState } from 'react';
import './AdminDashboard.css';
import CaseDetailModal from '../CaseDetailModal/CaseDetailModal.jsx';

function AdminDashboard({ onLogout }) {
  // 模擬從後端獲取的數據
  const [caseData, setCaseData] = useState([
    { id: 'ENV-20230615-001', title: '中正公園清潔問題', category: '環境問題', reporter: '王小明', date: '2023/06/15', status: '處理中' },
    { id: 'TRA-20230614-002', title: '中山路紅綠燈故障', category: '交通問題', reporter: '李大華', date: '2023/06/14', status: '已完成' },
    { id: 'SEC-20230615-003', title: '社區設備不足', category: '治安問題', reporter: '張美玲', date: '2023/06/15', status: '待處理' },
    { id: 'LIV-20230613-004', title: '社區活動中心設施維修', category: '民生服務', reporter: '陳大明', date: '2023/06/13', status: '處理中' }
  ]);
  
  // 當前頁碼
  const [currentPage, setCurrentPage] = useState(1);
  // 當前激活的頁籤
  const [activeTab, setActiveTab] = useState('全部案件');
  // 控制案件詳情視窗顯示狀態
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 當前選中的案件
  const [selectedCase, setSelectedCase] = useState(null);
  
  // 登出功能
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };
  
  // 狀態標籤樣式映射
  const statusClass = (status) => {
    switch(status) {
      case '處理中':
        return 'status-processing';
      case '已完成':
        return 'status-completed';
      case '待處理':
        return 'status-waiting';
      default:
        return '';
    }
  };
  
  // 頁籤點擊處理
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  
  // 點擊查看案件詳情
  const handleViewCase = (caseItem) => {
    setSelectedCase(caseItem);
    setIsModalOpen(true);
  };
  
  // 關閉案件詳情視窗
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>後台管理系統</h1>
        <button className="logout-btn" onClick={handleLogout}>
          <span className="logout-icon"></span>
          登出
        </button>
      </div>
      
      {/* 儀表板統計卡片 */}
      <div className="statistics-cards">
        <div className="stat-card red">
          <div className="stat-icon">⏰</div>
          <div className="stat-content">
            <div className="stat-title">待處理案件</div>
            <div className="stat-number">12</div>
          </div>
        </div>
        
        <div className="stat-card blue">
          <div className="stat-icon">🔄</div>
          <div className="stat-content">
            <div className="stat-title">處理中案件</div>
            <div className="stat-number">24</div>
          </div>
        </div>
        
        <div className="stat-card green">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-title">已完成案件</div>
            <div className="stat-number">127</div>
          </div>
        </div>
        
        <div className="stat-card yellow">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <div className="stat-title">今日新增</div>
            <div className="stat-number">8</div>
          </div>
        </div>
      </div>
      
      {/* 案件列表頁籤 */}
      <div className="case-tabs">
        <div 
          className={`tab ${activeTab === '全部案件' ? 'active' : ''}`} 
          onClick={() => handleTabClick('全部案件')}
        >
          全部案件
        </div>
        <div 
          className={`tab ${activeTab === '待處理' ? 'active' : ''}`} 
          onClick={() => handleTabClick('待處理')}
        >
          待處理
        </div>
        <div 
          className={`tab ${activeTab === '處理中' ? 'active' : ''}`} 
          onClick={() => handleTabClick('處理中')}
        >
          處理中
        </div>
        <div 
          className={`tab ${activeTab === '已完成' ? 'active' : ''}`} 
          onClick={() => handleTabClick('已完成')}
        >
          已完成
        </div>
      </div>
      
      {/* 過濾器 */}
      <div className="filters">
        <div className="filter-group">
          <label>類別:</label>
          <select>
            <option>全部</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>日期:</label>
          <select>
            <option>全部</option>
          </select>
        </div>
        
        <div className="search-box">
          <input type="text" placeholder="搜尋案件..." />
        </div>
      </div>
      
      {/* 案件列表 */}
      <div className="case-table">
        <div className="table-header">
          <div className="col-case-id">案件編號</div>
          <div className="col-title">標題</div>
          <div className="col-category">類別</div>
          <div className="col-reporter">報案人</div>
          <div className="col-date">接收日期</div>
          <div className="col-status">狀態</div>
          <div className="col-actions">操作</div>
        </div>
        
        <div className="table-body">
          {caseData.map((item) => (
            <div key={item.id} className="table-row">
              <div className="col-case-id">{item.id}</div>
              <div className="col-title">{item.title}</div>
              <div className="col-category">{item.category}</div>
              <div className="col-reporter">{item.reporter}</div>
              <div className="col-date">{item.date}</div>
              <div className="col-status">
                <span className={`status-tag ${statusClass(item.status)}`}>{item.status}</span>
              </div>
              <div className="col-actions">
                <button className="btn-view" onClick={() => handleViewCase(item)}>查看</button>
                <button className="btn-edit">編輯</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 分頁 */}
      <div className="pagination">
        <div className="page-info">顯示 1 到 4 筆，共 163 筆</div>
        <div className="page-controls">
          <button className="btn-first-page">上一頁</button>
          <button className="btn-page active">1</button>
          <button className="btn-page">2</button>
          <button className="btn-page">3</button>
          <span className="ellipsis">...</span>
          <button className="btn-page">41</button>
          <button className="btn-next-page">下一頁</button>
        </div>
      </div>
      
      {/* 案件詳情彈出視窗 */}
      <CaseDetailModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default AdminDashboard;