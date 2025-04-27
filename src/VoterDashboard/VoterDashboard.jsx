import React, { useState, useEffect } from 'react';
import './VoterDashboard.css';
import { Area, AreaChart, BarChart, Bar, PieChart, Pie, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

function VoterDashboard({ onNavigate }) {
  // 假設這些是從API獲取的數據
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30d");
  
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

  // 折線圖數據
  const lineChartData = [
    { date: '週一', desktop: 120, mobile: 80 },
    { date: '週二', desktop: 75, mobile: 50 },
    { date: '週三', desktop: 95, mobile: 70 },
    { date: '週四', desktop: 55, mobile: 40 },
    { date: '週五', desktop: 85, mobile: 60 },
    { date: '週六', desktop: 125, mobile: 90 },
  ];

  // 區域分布數據
  const locationData = [
    { name: '大安區', value: 1450 },
    { name: '松山區', value: 950 },
    { name: '信義區', value: 1200 },
    { name: '北投區', value: 700 },
    { name: '中山區', value: 1700 },
    { name: '文山區', value: 570 },
    { name: '南港區', value: 950 },
    { name: '萬華區', value: 1060 },
    { name: '士林區', value: 820 },
    { name: '內湖區', value: 1360 },
  ];

  // 轉換率數據
  const conversionData = [
    { month: '一月', value: 30 },
    { month: '二月', value: 50 },
    { month: '三月', value: 70 },
    { month: '四月', value: 80 },
    { month: '五月', value: 90 },
    { month: '六月', value: 85 },
  ];

  // 陳情類別分布數據
  const petitionData = [
    { name: '環境問題', value: 45 },
    { name: '交通問題', value: 32 },
    { name: '治安問題', value: 25 },
    { name: '民生服務', value: 20 },
    { name: '其他問題', value: 5 },
  ];

  // 互動頻率折線圖數據 (更多數據點)
  const interactionData = [
    { date: '2024-01-01', visitors: 400 },
    { date: '2024-02-01', visitors: 300 },
    { date: '2024-03-01', visitors: 500 },
    { date: '2024-04-01', visitors: 280 },
    { date: '2024-05-01', visitors: 200 },
    { date: '2024-06-01', visitors: 450 },
    { date: '2024-07-01', visitors: 380 },
    { date: '2024-08-01', visitors: 420 },
    { date: '2024-09-01', visitors: 350 },
    { date: '2024-10-01', visitors: 490 },
    { date: '2024-11-01', visitors: 520 },
    { date: '2024-12-01', visitors: 550 },
  ];

  // 定義藍綠色調
  const blueGreenColors = ['#3b82f6', '#10b981', '#0ea5e9', '#14b8a6', '#0d9488'];
  
  // 每個區域的顏色
  const locationColors = [
    '#3b82f6', '#10b981', '#0ea5e9', '#14b8a6', '#0d9488',
    '#0369a1', '#059669', '#0284c7', '#0f766e', '#047857'
  ];

  // 圓餅圖的顏色
  const pieColors = ['#3b82f6', '#10b981', '#0ea5e9', '#14b8a6', '#0d9488'];

  // 自定義工具提示
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
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
      
      {/* 將統計數字卡片保留在最上方 */}
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
      
      {/* 新增折線圖 - 顯示總訪問量 */}
      <div className="chart-card">
        <div className="chart-header">
          <h3>總訪問量</h3>
          <div className="chart-actions">
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className="chart-time-select"
            >
              <option value="90d">過去三個月</option>
              <option value="30d">過去30天</option>
              <option value="7d">過去7天</option>
            </select>
          </div>
        </div>
        <div className="chart-body">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={interactionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString('zh-TW', { month: 'short' });
                }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="visitors" 
                stroke="#3b82f6" 
                fillOpacity={1} 
                fill="url(#colorVisitors)" 
                name="訪問數"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="dashboard-grid">
        {/* 第一行：Line官方帳號互動頻率 (折線圖) */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Line官方帳號互動頻率</h3>
          </div>
          
          <div className="card-content">
            {isLoading ? (
              <div className="loading-skeleton linechart"></div>
            ) : (
              <div className="interaction-chart chart-container">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={lineChartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="date" 
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="desktop" 
                      stroke="#3b82f6" 
                      strokeWidth={2} 
                      activeDot={{ r: 8 }}
                      name="桌面"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="mobile" 
                      stroke="#10b981" 
                      strokeWidth={2} 
                      activeDot={{ r: 8 }}
                      name="移動端"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
        
        {/* 第一行：互動轉換率 (折線圖) */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>互動轉換率</h3>
          </div>
          
          <div className="card-content">
            {isLoading ? (
              <div className="loading-skeleton linechart"></div>
            ) : (
              <div className="conversion-chart chart-container">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={conversionData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="month" 
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#0ea5e9" 
                      strokeWidth={2} 
                      activeDot={{ r: 8 }}
                      name="轉換率"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
        
        {/* 第二行：選民地理分布 (柱状图) */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>選民地理分布</h3>
          </div>
          
          <div className="card-content">
            {isLoading ? (
              <div className="loading-skeleton barchart"></div>
            ) : (
              <div className="location-chart chart-container">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={locationData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      tickLine={false}
                      axisLine={false}
                      fontSize={11}
                    />
                    <YAxis 
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" name="人數">
                      {locationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={locationColors[index % locationColors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
        
        {/* 第二行：陳情類別分布 (餅图) */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>陳情類別分布</h3>
          </div>
          
          <div className="card-content">
            {isLoading ? (
              <div className="loading-skeleton barchart"></div>
            ) : (
              <div className="petition-chart chart-container">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={petitionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {petitionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoterDashboard;