import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import CaseDetailModal from '../CaseDetailModal/CaseDetailModal.jsx';
import CreateCaseModal from '../CreateCaseModal/CreateCaseModal.jsx';

function AdminDashboard({ onLogout }) {
  // 模擬從後端獲取的數據
  const [caseData, setCaseData] = useState([
    { 
      id: 'ENV-20230615-001', 
      title: '中正公園清潔問題', 
      category: '環境問題', 
      reporter: '王小明', 
      contact: '0912345678',
      date: '2023/06/15', 
      status: '處理中',
      priority: '一般',
      location: '中正公園',
      assignee: '李晉偉'
    },
    { 
      id: 'TRA-20230614-002', 
      title: '中山路紅綠燈故障', 
      category: '交通問題', 
      reporter: '李大華', 
      contact: '0923456789',
      date: '2023/06/14', 
      status: '已完成',
      priority: '緊急',
      location: '中山路與和平路口',
      assignee: '張晉偉'
    },
    { 
      id: 'SEC-20230615-003', 
      title: '社區設備不足', 
      category: '治安問題', 
      reporter: '張美玲', 
      contact: 'example@mail.com',
      date: '2023/06/15', 
      status: '待處理',
      priority: '低',
      location: '大安社區',
      assignee: '未指派'
    },
    { 
      id: 'LIV-20230613-004', 
      title: '社區活動中心設施維修', 
      category: '民生服務', 
      reporter: '陳大明', 
      contact: '0934567890',
      date: '2023/06/13', 
      status: '處理中',
      priority: '一般',
      location: '信義活動中心',
      assignee: '許旭升'
    }
  ]);
  
  // 當前頁碼
  const [currentPage, setCurrentPage] = useState(1);
  // 當前激活的頁籤
  const [activeTab, setActiveTab] = useState('全部案件');
  // 控制案件詳情視窗顯示狀態
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 控制新增案件視窗顯示狀態
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  // 當前選中的案件
  const [selectedCase, setSelectedCase] = useState(null);
  // 類別篩選狀態
  const [categoryFilter, setCategoryFilter] = useState('全部');
  // 日期篩選狀態
  const [dateFilter, setDateFilter] = useState('全部');
  // 成功通知狀態
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  
  // 搜尋關鍵字
  const [searchKeyword, setSearchKeyword] = useState('');
  
  // 登出功能
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };
  
  // 處理搜尋
  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
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
  
  // 優先級標籤樣式映射
  const priorityClass = (priority) => {
    switch(priority) {
      case '緊急':
        return 'priority-high';
      case '一般':
        return 'priority-medium';
      case '低':
        return 'priority-low';
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
  
  // 打開新增案件視窗
  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };
  
  // 關閉新增案件視窗
  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };
  
  // 處理新增案件
  const handleSaveCase = (newCase) => {
    setCaseData(prevData => [newCase, ...prevData]);
    
    // 顯示通知
    setNotificationMessage(`案件 ${newCase.id} 已成功新增！`);
    setShowNotification(true);
    
    // 設置自動關閉通知
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };
  
  // 關閉通知
  const handleCloseNotification = () => {
    setShowNotification(false);
  };
  
  // 過濾案件列表
  const filteredCases = caseData.filter(item => {
    // 基於頁籤過濾
    if (activeTab !== '全部案件' && item.status !== activeTab) {
      return false;
    }
    
    // 基於類別過濾
    if (categoryFilter !== '全部' && item.category !== categoryFilter) {
      return false;
    }
    
    // 基於搜尋關鍵字過濾
    if (searchKeyword && !item.title.includes(searchKeyword) && 
        !item.id.includes(searchKeyword) && 
        !item.reporter.includes(searchKeyword)) {
      return false;
    }
    
    // 日期過濾邏輯
    if (dateFilter !== '全部') {
      const today = new Date();
      const caseDate = new Date(item.date.replace(/\//g, '-'));
      
      if (dateFilter === '本週') {
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        if (caseDate < startOfWeek) return false;
      } else if (dateFilter === '本月') {
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        if (caseDate < startOfMonth) return false;
      } else if (dateFilter === '上個月') {
        const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        if (caseDate < startOfLastMonth || caseDate > endOfLastMonth) return false;
      }
    }
    
    return true;
  });
  
  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>後台管理系統</h1>
        <div className="dashboard-actions">
          {/* 新增「新增案件」按鈕 */}
          <button className="create-case-btn" onClick={openCreateModal}>
            <span className="plus-icon">+</span>
            新增案件
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            <span className="logout-icon"></span>
            登出
          </button>
        </div>
      </div>
      
      {/* 儀表板統計卡片 */}
      <div className="statistics-cards">
        <div className="stat-card red">
          <div className="stat-icon icon-waiting"></div>
          <div className="stat-content">
            <div className="stat-title">待處理案件</div>
            <div className="stat-number">12</div>
          </div>
        </div>
        
        <div className="stat-card blue">
          <div className="stat-icon icon-processing"></div>
          <div className="stat-content">
            <div className="stat-title">處理中案件</div>
            <div className="stat-number">24</div>
          </div>
        </div>
        
        <div className="stat-card green">
          <div className="stat-icon icon-completed"></div>
          <div className="stat-content">
            <div className="stat-title">已完成案件</div>
            <div className="stat-number">127</div>
          </div>
        </div>
        
        <div className="stat-card yellow">
          <div className="stat-icon icon-today"></div>
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
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="全部">全部</option>
            <option value="環境問題">環境問題</option>
            <option value="交通問題">交通問題</option>
            <option value="治安問題">治安問題</option>
            <option value="民生服務">民生服務</option>
            <option value="其他問題">其他問題</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>日期:</label>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="全部">全部</option>
            <option value="本週">本週</option>
            <option value="本月">本月</option>
            <option value="上個月">上個月</option>
          </select>
        </div>
        
        <div className="search-box">
          <input 
            type="text" 
            placeholder="搜尋案件..." 
            value={searchKeyword}
            onChange={handleSearch}
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>
      
      {/* 案件卡片列表 - 優化後的呈現方式 */}
      <div className="case-cards">
        {filteredCases.length > 0 ? (
          filteredCases.map((item) => (
            <div key={item.id} className="case-card">
              <div className="card-header">
                <div className="case-id">{item.id}</div>
                <div className={`case-priority ${priorityClass(item.priority)}`}>{item.priority}</div>
              </div>
              
              <div className="card-body">
                <h3 className="case-title">{item.title}</h3>
                
                <div className="case-meta">
                  <div className="meta-item">
                    <span className="meta-label">陳情人:</span>
                    <span className="meta-value">{item.reporter}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">聯絡方式:</span>
                    <span className="meta-value">{item.contact}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">地點:</span>
                    <span className="meta-value">{item.location}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">類別:</span>
                    <span className="meta-value">{item.category}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">處理人:</span>
                    <span className="meta-value">{item.assignee}</span>
                  </div>
                </div>
              </div>
              
              <div className="card-footer">
                <div className="case-date">{item.date}</div>
                <div className="case-status">
                  <span className={`status-tag ${statusClass(item.status)}`}>{item.status}</span>
                </div>
                <div className="case-actions">
                  <button className="action-btn view-btn" onClick={() => handleViewCase(item)}>查看詳情</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <p>沒有符合條件的案件</p>
          </div>
        )}
      </div>
      
      {/* 分頁 */}
      <div className="pagination">
        <div className="page-info">顯示 1 到 {filteredCases.length} 筆，共 {caseData.length} 筆</div>
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
      <CaseDetailModal isOpen={isModalOpen} onClose={closeModal} caseData={selectedCase} />
      
      {/* 新增案件彈出視窗 */}
      <CreateCaseModal 
        isOpen={isCreateModalOpen} 
        onClose={closeCreateModal} 
        onSave={handleSaveCase}
      />
      
      {/* 通知提示 */}
      {showNotification && (
        <div className="notification-toast">
          <div className="notification-content">
            <span className="notification-icon">✓</span>
            <span className="notification-message">{notificationMessage}</span>
          </div>
          <button className="notification-close" onClick={handleCloseNotification}>×</button>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;