import React, { useState } from 'react';
import './AdminLogin.css';

function AdminLogin({ onLoginSuccess }) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // 模擬登入請求 - 不做實際驗證，隨便輸入都可以登入
    setTimeout(() => {
      setLoading(false);
      // 呼叫登入成功回調，跳轉到儀表板
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    }, 1000);
  };

  return (
    <main className="admin-main">
      <div className="login-container">
        <h2>後台管理登入</h2>
        
        {error && <div className="login-error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">帳號</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
              autoComplete="off"
              placeholder="請輸入管理員帳號"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">密碼</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              placeholder="請輸入管理員密碼"
            />
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? '登入中...' : '登入'}
          </button>
        </form>
        
        <div className="login-footer">
          <a href="#" className="forgot-password">忘記密碼？</a>
          <div className="help-text">
            <p>若遇到登入問題，請聯絡系統管理員</p>
            <p>電話：(02) 2345-6789</p>
          </div>
        </div>
      </div>
      
      <div className="system-info">
        <div className="system-version">版本 1.0.0</div>
      </div>
    </main>
  );
}

export default AdminLogin;