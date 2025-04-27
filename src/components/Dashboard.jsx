// ChartAreaComponent.jsx
import React, { useState, useEffect } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

// 模擬數據
const generateChartData = () => {
  const data = [];
  const today = new Date();
  
  for (let i = 90; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      desktop: Math.floor(Math.random() * 400) + 50,
      mobile: Math.floor(Math.random() * 350) + 100
    });
  }
  
  return data;
};

export const ChartAreaComponent = () => {
  const [timeRange, setTimeRange] = useState("30d");
  const [chartData, setChartData] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setChartData(generateChartData());
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile && timeRange === "90d") {
      setTimeRange("7d");
    }
  }, [isMobile, timeRange]);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date(chartData[chartData.length - 1]?.date || new Date());
    let daysToSubtract = 90;
    
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h2 className="card-title">總訪問量</h2>
          <div className="card-description">
            <span className="hidden md:block">過去三個月的總訪問量</span>
            <span className="md:hidden">過去三個月</span>
          </div>
        </div>
        <div className="time-filter">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="time-select"
          >
            <option value="90d">過去三個月</option>
            <option value="30d">過去30天</option>
            <option value="7d">過去7天</option>
          </select>
        </div>
      </div>
      <div className="card-content">
        <div className="chart-container">
          <AreaChart 
            data={filteredData}
            width={800}
            height={300}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={1.0} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#e5e7eb" />
            <XAxis 
              dataKey="date" 
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("zh-TW", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <Area 
              type="monotone" 
              dataKey="mobile" 
              fill="url(#fillMobile)" 
              stroke="#10b981" 
              strokeWidth={2}
              stackId="1"
            />
            <Area 
              type="monotone" 
              dataKey="desktop" 
              fill="url(#fillDesktop)" 
              stroke="#3b82f6" 
              strokeWidth={2}
              stackId="1"
            />
          </AreaChart>
        </div>
      </div>
    </div>
  );
};

// StatCard 組件
export const StatCard = ({ title, value, change, icon, color }) => {
  const isIncrease = change > 0;
  
  return (
    <div className={`stat-card ${color}`}>
      <div className="stat-content">
        <div className="stat-title">{title}</div>
        <div className="stat-number">{value}</div>
        <div className={`stat-change ${isIncrease ? 'increase' : 'decrease'}`}>
          {isIncrease ? '↑' : '↓'} {Math.abs(change)}%
        </div>
      </div>
    </div>
  );
};

// SectionCards 組件 - 匯總了4個統計卡片
export const SectionCards = () => {
  return (
    <div className="stats-container">
      <StatCard 
        title="總收入" 
        value="$1,250.00" 
        change={12.5} 
        color="blue-bg" 
      />
      <StatCard 
        title="新客戶" 
        value="1,234" 
        change={-20} 
        color="red-bg" 
      />
      <StatCard 
        title="活躍帳戶" 
        value="45,678" 
        change={12.5} 
        color="green-bg" 
      />
      <StatCard 
        title="成長率" 
        value="4.5%" 
        change={4.5} 
        color="purple-bg" 
      />
    </div>
  );
};

// Dashboard 主組件
export const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <SectionCards />
      <ChartAreaComponent />
    </div>
  );
};