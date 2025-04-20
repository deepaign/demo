import React, { useState, useEffect, useRef } from 'react';

// 聊天框組件
function ChatboxDemo() {
  // 預設的對話內容
  const allMessages = [
    { type: 'received', content: '您好！我是智能選服幕僚系統，很高興為您服務。請問有什麼我可以幫助您的嗎？' },
    { type: 'sent', content: '我想要陳情' },
    { type: 'received', content: '感謝您的陳情意願。請問您的陳情是關於以下哪一類問題？<br />1. 交通問題<br />2. 治安問題<br />3. 環境問題<br />4. 民生服務<br />5. 其他問題' },
    { type: 'sent', content: '3' },
    { type: 'received', content: '了解，您的陳情是關於環境問題。請簡述您遇到的環境問題，越詳細越好，以便我們能更好地協助您。' },
    { type: 'sent', content: '我家附近的公園最近垃圾很多，希望能增加清潔頻率' },
    { type: 'received', content: '感謝您的回報。為了更好地處理您的陳情，請提供以下資訊：<br />1. 公園名稱或確切位置<br />2. 您的姓名<br />3. 聯絡電話或 Email' },
    { type: 'sent', content: '1. 中正公園 2. 王小明 3. 0912345678' },
    { type: 'received', content: '感謝您提供的資訊，王小明先生/女士。您關於中正公園清潔問題的陳情已成功建立，案件編號為 ENV-20230615-001。<br /><br />我們將儘快處理您的陳情，並在有進展時通知您。您也可以隨時使用「查詢案件」功能，輸入案件編號查詢最新進度。<br /><br />還有其他我可以幫助您的嗎？' }
  ];

  // 目前顯示的訊息數量
  const [visibleMessages, setVisibleMessages] = useState([]);
  
  // 是否已開始顯示
  const [started, setStarted] = useState(false);

  // 自動滾動到底部
  const chatMessagesRef = useRef(null);

  // 處理滾動
  const scrollToBottom = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  };

  // 當用戶進入聊天區域視圖時，開始播放訊息
  const handleIntersection = (entries) => {
    if (entries[0].isIntersecting && !started) {
      setStarted(true);
    }
  };

  // 設置 Intersection Observer 來檢測元素是否在視窗中
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.3  // 當元素有 30% 進入視窗時觸發
    });
    
    if (chatMessagesRef.current) {
      observer.observe(chatMessagesRef.current);
    }
    
    return () => {
      if (chatMessagesRef.current) {
        observer.unobserve(chatMessagesRef.current);
      }
    };
  }, []);

  // 控制訊息逐條顯示
  useEffect(() => {
    if (!started) return;
    
    let currentIndex = visibleMessages.length;
    
    if (currentIndex < allMessages.length) {
      // 設置不同類型訊息的延遲時間
      const delay = allMessages[currentIndex].type === 'received' ? 2000 : 1500;
      
      const timer = setTimeout(() => {
        setVisibleMessages(prev => [...prev, allMessages[currentIndex]]);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [visibleMessages, started, allMessages]);

  // 當訊息更新時，滾動到底部
  useEffect(() => {
    scrollToBottom();
  }, [visibleMessages]);

  // 手動控制聊天區域的滾動
  const scrollChat = (direction) => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop += direction * 100;
    }
  };

  // 重置並重新播放對話
  const restartChat = () => {
    setVisibleMessages([]);
    setStarted(true);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages" ref={chatMessagesRef}>
        {visibleMessages.map((message, index) => (
          <div key={index} className={`chat-message ${message.type}`}>
            <div className="message-content" 
                 dangerouslySetInnerHTML={{ __html: message.content }}>
            </div>
          </div>
        ))}
        
        {/* 打字指示器 - 當還有訊息要顯示且最後一條是「sent」時顯示 */}
        {visibleMessages.length < allMessages.length && 
         visibleMessages.length > 0 &&
         visibleMessages[visibleMessages.length - 1].type === 'sent' && (
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>
      
      {/* 重新播放按鈕 */}
      {visibleMessages.length === allMessages.length && (
        <button className="replay-button" onClick={restartChat}>
          重新播放對話
        </button>
      )}
      
      {/* 聊天室上下捲動指示器 */}
      <div className="scroll-indicators">
        <div className="scroll-up" onClick={() => scrollChat(-1)}>▲</div>
        <div className="scroll-down" onClick={() => scrollChat(1)}>▼</div>
      </div>
    </div>
  );
}

// 確保正確匯出組件
export default ChatboxDemo;