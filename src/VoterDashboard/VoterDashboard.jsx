import React, { useState, useEffect } from 'react';
import './VoterDashboard.css';

function VoterDashboard({ onNavigate }) {
  // 假設這些是從API獲取的數據
  const [isLoading, setIsLoading] = useState(true);
  
  // 模擬數據加載
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // 返回後台管理頁面
  const navigateBack = () => {
    if (onNavigate) {
      onNavigate('admin');
    }
  };

  return (
    <div className="voter-dashboard">
      <div className="dashboard-header">
        <h1>選民資料分析</h1>
        <div className="dashboard-actions">
          <select className="period-select">
            <option>最近30天</option>
            <option>最近90天</option>
            <option>最近半年</option>
            <option>最近一年</option>
          </select>
          <button className="refresh-btn">
            <span className="refresh-icon">↻</span>
            重新整理
          </button>
          <button className="back-btn" onClick={navigateBack}>
            <span className="back-icon">←</span>
            返回管理頁面
          </button>
        </div>
      </div>
      
      {/* 將統計數字卡片移到最上方 */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-value">4,521</div>
          <div className="stat-label">總選民數</div>
          <div className="stat-change increase">+12.5%</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">3,789</div>
          <div className="stat-label">Line好友數</div>
          <div className="stat-change increase">+8.3%</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">2,345</div>
          <div className="stat-label">月活躍用戶</div>
          <div className="stat-change decrease">-2.1%</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">687</div>
          <div className="stat-label">本月陳情數</div>
          <div className="stat-change increase">+32.8%</div>
        </div>
      </div>
      
      <div className="dashboard-grid">
        {/* 第一行：Line官方帳號互動頻率 (折線圖) */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Line官方帳號互動頻率</h3>
            <div className="card-actions">
              <button className="card-action-btn">⋮</button>
            </div>
          </div>
          
          <div className="card-content">
            {isLoading ? (
              <div className="loading-skeleton linechart"></div>
            ) : (
              <div className="interaction-chart chart-container">
                <div className="line-chart">
                  <svg viewBox="0 0 400 200" className="line-graph">
                    {/* 背景網格 */}
                    <g className="grid-lines">
                      <line x1="40" y1="20" x2="40" y2="180" stroke="#e5e7eb" />
                      <line x1="40" y1="180" x2="380" y2="180" stroke="#e5e7eb" />
                      <line x1="40" y1="140" x2="380" y2="140" stroke="#e5e7eb" strokeDasharray="4" />
                      <line x1="40" y1="100" x2="380" y2="100" stroke="#e5e7eb" strokeDasharray="4" />
                      <line x1="40" y1="60" x2="380" y2="60" stroke="#e5e7eb" strokeDasharray="4" />
                      <line x1="40" y1="20" x2="380" y2="20" stroke="#e5e7eb" strokeDasharray="4" />
                    </g>
                    
                    {/* Y軸標籤 */}
                    <g className="y-labels">
                      <text x="35" y="180" textAnchor="end" fontSize="10" fill="#6b7280">0</text>
                      <text x="35" y="140" textAnchor="end" fontSize="10" fill="#6b7280">25</text>
                      <text x="35" y="100" textAnchor="end" fontSize="10" fill="#6b7280">50</text>
                      <text x="35" y="60" textAnchor="end" fontSize="10" fill="#6b7280">75</text>
                      <text x="35" y="20" textAnchor="end" fontSize="10" fill="#6b7280">100</text>
                    </g>
                    
                    {/* X軸標籤 */}
                    <g className="x-labels">
                      <text x="90" y="195" textAnchor="middle" fontSize="10" fill="#6b7280">週一</text>
                      <text x="140" y="195" textAnchor="middle" fontSize="10" fill="#6b7280">週二</text>
                      <text x="190" y="195" textAnchor="middle" fontSize="10" fill="#6b7280">週三</text>
                      <text x="240" y="195" textAnchor="middle" fontSize="10" fill="#6b7280">週四</text>
                      <text x="290" y="195" textAnchor="middle" fontSize="10" fill="#6b7280">週五</text>
                      <text x="340" y="195" textAnchor="middle" fontSize="10" fill="#6b7280">週六</text>
                    </g>
                    
                    {/* 折線 */}
                    <path 
                      d="M90,115 L140,75 L190,95 L240,55 L290,85 L340,125" 
                      fill="none" 
                      stroke="#3b82f6" 
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="line-path"
                    />
                    
                    {/* 折線上的點 */}
                    <g className="data-points">
                      <circle cx="90" cy="115" r="5" fill="#3b82f6" />
                      <circle cx="140" cy="75" r="5" fill="#3b82f6" />
                      <circle cx="190" cy="95" r="5" fill="#3b82f6" />
                      <circle cx="240" cy="55" r="5" fill="#3b82f6" />
                      <circle cx="290" cy="85" r="5" fill="#3b82f6" />
                      <circle cx="340" cy="125" r="5" fill="#3b82f6" />
                    </g>
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* 第一行：互動轉換率 (改為折線圖) - 與地理分布交換位置 */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>互動轉換率</h3>
            <div className="card-actions">
              <button className="card-action-btn">⋮</button>
            </div>
          </div>
          
          <div className="card-content">
            {isLoading ? (
              <div className="loading-skeleton linechart"></div>
            ) : (
              <div className="conversion-chart chart-container">
                <div className="line-chart">
                  <svg viewBox="0 0 400 200" className="line-graph">
                    {/* 背景網格 */}
                    <g className="grid-lines">
                      <line x1="40" y1="20" x2="40" y2="180" stroke="#e5e7eb" />
                      <line x1="40" y1="180" x2="380" y2="180" stroke="#e5e7eb" />
                      <line x1="40" y1="140" x2="380" y2="140" stroke="#e5e7eb" strokeDasharray="4" />
                      <line x1="40" y1="100" x2="380" y2="100" stroke="#e5e7eb" strokeDasharray="4" />
                      <line x1="40" y1="60" x2="380" y2="60" stroke="#e5e7eb" strokeDasharray="4" />
                      <line x1="40" y1="20" x2="380" y2="20" stroke="#e5e7eb" strokeDasharray="4" />
                    </g>
                    
                    {/* Y軸標籤 */}
                    <g className="y-labels">
                      <text x="35" y="180" textAnchor="end" fontSize="10" fill="#6b7280">0%</text>
                      <text x="35" y="140" textAnchor="end" fontSize="10" fill="#6b7280">25%</text>
                      <text x="35" y="100" textAnchor="end" fontSize="10" fill="#6b7280">50%</text>
                      <text x="35" y="60" textAnchor="end" fontSize="10" fill="#6b7280">75%</text>
                      <text x="35" y="20" textAnchor="end" fontSize="10" fill="#6b7280">100%</text>
                    </g>
                    
                    {/* X軸標籤 */}
                    <g className="x-labels">
                      <text x="90" y="195" textAnchor="middle" fontSize="10" fill="#6b7280">一月</text>
                      <text x="140" y="195" textAnchor="middle" fontSize="10" fill="#6b7280">二月</text>
                      <text x="190" y="195" textAnchor="middle" fontSize="10" fill="#6b7280">三月</text>
                      <text x="240" y="195" textAnchor="middle" fontSize="10" fill="#6b7280">四月</text>
                      <text x="290" y="195" textAnchor="middle" fontSize="10" fill="#6b7280">五月</text>
                      <text x="340" y="195" textAnchor="middle" fontSize="10" fill="#6b7280">六月</text>
                    </g>
                    
                    {/* 折線 */}
                    <path 
                      d="M90,130 L140,100 L190,80 L240,70 L290,60 L340,65" 
                      fill="none" 
                      stroke="#e91e63" 
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="line-path"
                    />
                    
                    {/* 折線上的點 */}
                    <g className="data-points">
                      <circle cx="90" cy="130" r="5" fill="#e91e63" />
                      <circle cx="140" cy="100" r="5" fill="#e91e63" />
                      <circle cx="190" cy="80" r="5" fill="#e91e63" />
                      <circle cx="240" cy="70" r="5" fill="#e91e63" />
                      <circle cx="290" cy="60" r="5" fill="#e91e63" />
                      <circle cx="340" cy="65" r="5" fill="#e91e63" />
                    </g>
                    
                    {/* 當前轉換率值標註 */}
                    <text x="350" y="45" fontSize="18" fill="#e91e63" fontWeight="bold">75%</text>
                  </svg>
                </div>
                
                <div className="chart-legend">
                  <div className="legend-item">
                    <span className="legend-color" style={{backgroundColor: '#e91e63'}}></span>
                    <span className="legend-label">圖文閱讀轉陳情</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* 第二行：選民地理分布 (柱状图) - 與互動轉換率交換位置 */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>選民地理分布</h3>
            <div className="card-actions">
              <button className="card-action-btn">⋮</button>
            </div>
          </div>
          
          <div className="card-content">
            {isLoading ? (
              <div className="loading-skeleton barchart"></div>
            ) : (
              <div className="location-chart chart-container">
                <div className="compact-bar-chart">
                  <svg viewBox="0 0 400 200" className="bar-graph">
                    {/* 背景網格 */}
                    <g className="grid-lines">
                      <line x1="40" y1="20" x2="40" y2="180" stroke="#e5e7eb" />
                      <line x1="40" y1="180" x2="380" y2="180" stroke="#e5e7eb" />
                      <line x1="40" y1="140" x2="380" y2="140" stroke="#e5e7eb" strokeDasharray="4" />
                      <line x1="40" y1="100" x2="380" y2="100" stroke="#e5e7eb" strokeDasharray="4" />
                      <line x1="40" y1="60" x2="380" y2="60" stroke="#e5e7eb" strokeDasharray="4" />
                    </g>
                    
                    {/* Y軸標籤 */}
                    <g className="y-labels">
                      <text x="35" y="180" textAnchor="end" fontSize="10" fill="#6b7280">0</text>
                      <text x="35" y="140" textAnchor="end" fontSize="10" fill="#6b7280">500</text>
                      <text x="35" y="100" textAnchor="end" fontSize="10" fill="#6b7280">1000</text>
                      <text x="35" y="60" textAnchor="end" fontSize="10" fill="#6b7280">1500</text>
                    </g>
                    
                    {/* 柱狀圖 */}
                    <g className="bars">
                      <rect x="50" y="45" width="24" height="135" fill="#3b82f6" className="bar-rect">
                        <title>大安區: 1450</title>
                      </rect>
                      <rect x="80" y="85" width="24" height="95" fill="#3b82f6" className="bar-rect">
                        <title>松山區: 950</title>
                      </rect>
                      <rect x="110" y="65" width="24" height="115" fill="#3b82f6" className="bar-rect">
                        <title>信義區: 1200</title>
                      </rect>
                      <rect x="140" y="110" width="24" height="70" fill="#3b82f6" className="bar-rect">
                        <title>北投區: 700</title>
                      </rect>
                      <rect x="170" y="30" width="24" height="150" fill="#3b82f6" className="bar-rect">
                        <title>中山區: 1700</title>
                      </rect>
                      <rect x="200" y="125" width="24" height="55" fill="#3b82f6" className="bar-rect">
                        <title>文山區: 570</title>
                      </rect>
                      <rect x="230" y="85" width="24" height="95" fill="#3b82f6" className="bar-rect">
                        <title>南港區: 950</title>
                      </rect>
                      <rect x="260" y="75" width="24" height="105" fill="#3b82f6" className="bar-rect">
                        <title>萬華區: 1060</title>
                      </rect>
                      <rect x="290" y="100" width="24" height="80" fill="#3b82f6" className="bar-rect">
                        <title>士林區: 820</title>
                      </rect>
                      <rect x="320" y="55" width="24" height="125" fill="#3b82f6" className="bar-rect">
                        <title>內湖區: 1360</title>
                      </rect>
                    </g>
                    
                    {/* X軸標籤 */}
                    <g className="x-labels">
                      <text x="62" y="195" textAnchor="middle" fontSize="9" fill="#6b7280">大安區</text>
                      <text x="92" y="195" textAnchor="middle" fontSize="9" fill="#6b7280">松山區</text>
                      <text x="122" y="195" textAnchor="middle" fontSize="9" fill="#6b7280">信義區</text>
                      <text x="152" y="195" textAnchor="middle" fontSize="9" fill="#6b7280">北投區</text>
                      <text x="182" y="195" textAnchor="middle" fontSize="9" fill="#6b7280">中山區</text>
                      <text x="212" y="195" textAnchor="middle" fontSize="9" fill="#6b7280">文山區</text>
                      <text x="242" y="195" textAnchor="middle" fontSize="9" fill="#6b7280">南港區</text>
                      <text x="272" y="195" textAnchor="middle" fontSize="9" fill="#6b7280">萬華區</text>
                      <text x="302" y="195" textAnchor="middle" fontSize="9" fill="#6b7280">士林區</text>
                      <text x="332" y="195" textAnchor="middle" fontSize="9" fill="#6b7280">內湖區</text>
                    </g>
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* 第二行：陳情類別分布 (柱状图) */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>陳情類別分布</h3>
            <div className="card-actions">
              <button className="card-action-btn">⋮</button>
            </div>
          </div>
          
          <div className="card-content">
            {isLoading ? (
              <div className="loading-skeleton barchart"></div>
            ) : (
              <div className="petition-chart chart-container">
                <div className="category-bar-chart">
                  <svg viewBox="0 0 400 200" className="bar-graph">
                    {/* 背景網格 */}
                    <g className="grid-lines">
                      <line x1="40" y1="20" x2="40" y2="180" stroke="#e5e7eb" />
                      <line x1="40" y1="180" x2="380" y2="180" stroke="#e5e7eb" />
                      <line x1="40" y1="140" x2="380" y2="140" stroke="#e5e7eb" strokeDasharray="4" />
                      <line x1="40" y1="100" x2="380" y2="100" stroke="#e5e7eb" strokeDasharray="4" />
                      <line x1="40" y1="60" x2="380" y2="60" stroke="#e5e7eb" strokeDasharray="4" />
                    </g>
                    
                    {/* Y軸標籤 */}
                    <g className="y-labels">
                      <text x="35" y="180" textAnchor="end" fontSize="10" fill="#6b7280">0%</text>
                      <text x="35" y="140" textAnchor="end" fontSize="10" fill="#6b7280">25%</text>
                      <text x="35" y="100" textAnchor="end" fontSize="10" fill="#6b7280">50%</text>
                      <text x="35" y="60" textAnchor="end" fontSize="10" fill="#6b7280">75%</text>
                    </g>
                    
                    {/* 柱狀圖 */}
                    <g className="bars">
                      <rect x="75" y="105" width="40" height="75" fill="#3B82F6" className="bar-rect">
                        <title>環境問題: 45%</title>
                      </rect>
                      <rect x="135" y="115" width="40" height="65" fill="#10B981" className="bar-rect">
                        <title>交通問題: 32%</title>
                      </rect>
                      <rect x="195" y="135" width="40" height="45" fill="#F59E0B" className="bar-rect">
                        <title>治安問題: 25%</title>
                      </rect>
                      <rect x="255" y="145" width="40" height="35" fill="#EF4444" className="bar-rect">
                        <title>民生服務: 20%</title>
                      </rect>
                      <rect x="315" y="165" width="40" height="15" fill="#8B5CF6" className="bar-rect">
                        <title>其他問題: 5%</title>
                      </rect>
                    </g>
                    
                    {/* 柱狀圖上的數值標籤 */}
                    <g className="bar-labels">
                      <text x="95" y="100" textAnchor="middle" fontSize="12" fill="#fff" fontWeight="bold">45%</text>
                      <text x="155" y="110" textAnchor="middle" fontSize="12" fill="#fff" fontWeight="bold">32%</text>
                      <text x="215" y="130" textAnchor="middle" fontSize="12" fill="#fff" fontWeight="bold">25%</text>
                      <text x="275" y="140" textAnchor="middle" fontSize="12" fill="#fff" fontWeight="bold">20%</text>
                      <text x="335" y="160" textAnchor="middle" fontSize="12" fill="#8B5CF6" fontWeight="bold">5%</text>
                    </g>
                    
                    {/* X軸標籤 */}
                    <g className="x-labels">
                      <text x="95" y="195" textAnchor="middle" fontSize="10" fill="#6b7280">環境問題</text>
                      <text x="155" y="195" textAnchor="middle" fontSize="10" fill="#6b7280">交通問題</text>
                      <text x="215" y="195" textAnchor="middle" fontSize="10" fill="#6b7280">治安問題</text>
                      <text x="275" y="195" textAnchor="middle" fontSize="10" fill="#6b7280">民生服務</text>
                      <text x="335" y="195" textAnchor="middle" fontSize="10" fill="#6b7280">其他問題</text>
                    </g>
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoterDashboard;