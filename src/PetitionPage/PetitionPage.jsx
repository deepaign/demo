import React, { useState } from 'react';
import './PetitionPage.css';

function PetitionPage() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    category: '',
    location: '',
    content: '',
    detail: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [caseNumber, setCaseNumber] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // 生成隨機案件編號
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const caseNum = `CASE-${year}${month}${day}-${randomNum}`;
    setCaseNumber(caseNum);
    setSubmitted(true);
  };
  
  const resetForm = () => {
    setFormData({
      name: '',
      contact: '',
      category: '',
      location: '',
      content: '',
      detail: ''
    });
    setSubmitted(false);
  };

  return (
    <main>
      {/* 民眾陳情標題 */}
      <section className="welcome-section">
        <h1>民眾陳情</h1>
        <p>您的意見是我們進步的動力，請填寫以下表單提交您的陳情或建議</p>
      </section>

      {submitted ? (
        // 提交成功顯示
        <div className="card">
          <h2>陳情提交成功</h2>
          <div className="success-message">
            <div className="icon-success">✓</div>
            <p>感謝您的意見！您的陳情已成功提交，案件編號為：<strong>{caseNumber}</strong></p>
            <p>我們將儘快處理您的案件，並會在處理過程中通知您最新進度。</p>
            <p>您也可以隨時透過「案件查詢」功能，輸入案件編號查詢處理進度。</p>
            <button className="green-button" onClick={resetForm}>
              提交新陳情
            </button>
          </div>
        </div>
      ) : (
        // 陳情表單
        <div className="card">
          <h2>陳情表單</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">姓名</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact">聯絡方式（電話或Email）</label>
              <input 
                type="text" 
                id="contact" 
                name="contact" 
                value={formData.contact}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">陳情類別</label>
              <select 
                id="category" 
                name="category" 
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">請選擇類別</option>
                <option value="traffic">交通問題</option>
                <option value="security">治安問題</option>
                <option value="environment">環境問題</option>
                <option value="publicService">民生服務</option>
                <option value="other">其他問題</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="location">陳情地點</label>
              <input 
                type="text" 
                id="location" 
                name="location" 
                value={formData.location}
                onChange={handleChange}
                placeholder="請填寫相關問題發生的地點（如有）" 
              />
            </div>

            <div className="form-group">
              <label htmlFor="content">陳情內容</label>
              <textarea 
                id="content" 
                name="content" 
                rows="5" 
                value={formData.content}
                onChange={handleChange}
                required
                placeholder="請詳細描述您遇到的問題或建議"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="detail">補充地點（若適用）</label>
              <input 
                type="text" 
                id="detail" 
                name="detail" 
                value={formData.detail}
                onChange={handleChange}
                placeholder="請提供更多細節，例如明確地址、路段等" 
              />
            </div>

            <button type="submit" className="green-button">
              提交陳情
            </button>
          </form>
        </div>
      )}

      {/* 陳情處理流程 */}
      <section className="process-section">
        <h2>陳情處理流程</h2>
        
        <div className="process-timeline">
          <div className="process-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>提交陳情</h3>
              <p>您可填寫表單或透過Line機器人提交您的陳情內容，系統會自動分類並建立案件。</p>
            </div>
          </div>
          
          <div className="process-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>案件受理</h3>
              <p>負責團隊收到您的陳情後，會進行初步審核確認，您將收到案件已受理通知。</p>
            </div>
          </div>
          
          <div className="process-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>處理中</h3>
              <p>負責團隊會與相關單位聯繫，協調解決您的問題，並定期更新處理進度。</p>
            </div>
          </div>
          
          <div className="process-step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>結案通知</h3>
              <p>問題解決後，您將收到結案通知，若有需要還可提供滿意度回饋，協助我們持續改進。</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default PetitionPage;