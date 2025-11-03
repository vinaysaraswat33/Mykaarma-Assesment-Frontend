import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import ComparisonView  from './components/Comparison.jsx';
import ProductCard from './components/ProductCard.jsx';
import CATALOG from './components/catlog.jsx';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000';


const App = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your mobile shopping assistant. How can I help you find the perfect phone today?",
      sender: 'bot',
      timestamp: new Date(),
      items: []
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [comparisonView, setComparisonView] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [chatContext, setChatContext] = useState({
    lastItemIds: [],
    selectedPhoneId: null
  });
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
      items: []
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Prepare request body matching your backend schema
      const requestBody = {
        messages: [
          {
            role: 'user',
            content: inputValue
          }
        ],
        context: chatContext
      };

      const response = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Update context from response
      if (data.intent?.targetPhoneId) {
        setChatContext(prev => ({
          ...prev,
          selectedPhoneId: data.intent.targetPhoneId
        }));
      }

      if (data.items && data.items.length > 0) {
        setChatContext(prev => ({
          ...prev,
          lastItemIds: data.items.map(item => item.id)
        }));
      }

      const botMessage = {
        id: Date.now() + 1,
        text: data.text || "I understand you're looking for mobile phones. Here are some recommendations:",
        sender: 'bot',
        timestamp: new Date(),
        items: data.items || [],
        intent: data.intent
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Fallback to local filtering if API fails
      const filteredItems = filterProductsLocally(inputValue);
      const botMessage = {
        id: Date.now() + 1,
        text: generateFallbackResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
        items: filteredItems,
        intent: { task: 'search' }
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const filterProductsLocally = (query) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('camera') || lowerQuery.includes('photo')) {
      return CATALOG
        .filter(product => product.scores.camera >= 8.5)
        .sort((a, b) => b.scores.camera - a.scores.camera)
        .slice(0, 3);
    } else if (lowerQuery.includes('budget') || lowerQuery.includes('cheap') || lowerQuery.includes('under')) {
      return CATALOG
        .filter(product => product.priceInr <= 25000)
        .sort((a, b) => a.priceInr - b.priceInr)
        .slice(0, 3);
    } else if (lowerQuery.includes('gaming') || lowerQuery.includes('performance')) {
      return CATALOG
        .filter(product => product.scores.performance >= 8.5)
        .sort((a, b) => b.scores.performance - a.scores.performance)
        .slice(0, 3);
    } else if (lowerQuery.includes('battery')) {
      return CATALOG
        .filter(product => product.scores.battery >= 8.5)
        .sort((a, b) => b.scores.battery - a.scores.battery)
        .slice(0, 3);
    } else {
      // Return some popular phones by default
      return CATALOG
        .sort((a, b) => b.scores.value - a.scores.value)
        .slice(0, 3);
    }
  };

  const generateFallbackResponse = (query) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('camera')) {
      return "Based on your interest in camera quality, here are some excellent options with great camera performance:";
    } else if (lowerQuery.includes('budget')) {
      return "Here are some great budget-friendly options that offer excellent value for money:";
    } else if (lowerQuery.includes('gaming')) {
      return "For gaming and performance, these phones offer excellent processors and smooth displays:";
    } else if (lowerQuery.includes('battery')) {
      return "If battery life is important to you, these phones offer excellent endurance:";
    } else {
      return "I'd be happy to help you find the perfect mobile phone! Here are some popular options. You can ask me about specific features like camera, battery, gaming performance, or budget options.";
    }
  };

  const handleProductSelect = (product) => {
    setSelectedProducts(prev => {
      if (prev.find(p => p.id === product.id)) {
        return prev.filter(p => p.id !== product.id);
      } else if (prev.length < 2) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const handleCompare = () => {
    if (selectedProducts.length === 2) {
      setComparisonView(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getImageUrl = (imagePath) => {
    if (imagePath.startsWith('http')) return imagePath;
    // Use placeholder images for now - in production, you'd serve these from your backend
    return `https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&q=80`;
  };

  // Safe rating display function
  const renderRating = (score) => {
    // Ensure score is between 0 and 5
    const safeScore = Math.max(0, Math.min(5, score || 0));
    const fullStars = Math.floor(safeScore);
    const hasHalfStar = safeScore - fullStars >= 0.5;
    
    return (
      <div className="rating">
        {'★'.repeat(fullStars)}
        {hasHalfStar && '½'}
        {'☆'.repeat(5 - fullStars - (hasHalfStar ? 1 : 0))}
        <span>({safeScore.toFixed(1)})</span>
      </div>
    );
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📱 Mobile Shopping Assistant</h1>
        <p>Find your perfect phone with AI help</p>
      </header>

      <div className="chat-container">
        <div className="messages-container">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className="message-content">
                <p>{message.text}</p>
                <span className="timestamp">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>

              {message.items && message.items.length > 0 && (
                <>
                  <div className="products-grid">
                    {message.items.map(product => (
                      <ProductCard 
                        key={product.id}
                        product={product}
                        isSelected={selectedProducts.some(p => p.id === product.id)}
                        onSelect={handleProductSelect}
                        comparisonMode={selectedProducts.length > 0}
                        formatPrice={formatPrice}
                        getImageUrl={getImageUrl}
                        renderRating={renderRating}
                      />
                    ))}
                  </div>

                  {selectedProducts.length === 2 && (
                    <button className="compare-btn" onClick={handleCompare}>
                      Compare Selected Phones
                    </button>
                  )}
                </>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="message bot">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-container">
          <div className="input-wrapper">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about phones, compare models, or get recommendations..."
              disabled={isLoading}
            />
            <button 
              onClick={handleSendMessage} 
              disabled={!inputValue.trim() || isLoading}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      </div>

      {comparisonView && selectedProducts.length === 2 && (
        <ComparisonView 
          products={selectedProducts}
          onClose={() => {
            setComparisonView(false);
            setSelectedProducts([]);
          }}
          formatPrice={formatPrice}
          getImageUrl={getImageUrl}
          renderRating={renderRating}
        />
      )}
    </div>
  );
};

export default App;
