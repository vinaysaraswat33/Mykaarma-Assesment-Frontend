// App.jsx
import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000';

// Define the data structure matching your backend
const CATALOG = [
  {
    "id": "pixel-8a",
    "name": "Google Pixel 8a",
    "brand": "Google",
    "priceInr": 52999,
    "os": "Android 14 (Pixel UI)",
    "soc": "Tensor G3",
    "ramGB": 8,
    "storageGB": 128,
    "display": { "sizeInches": 6.1, "type": "OLED", "refreshHz": 120, "resolution": "1080x2400" },
    "batteryMah": 4492,
    "chargingWatt": 18,
    "cameras": { "mainMP": 64, "ultraMP": 13, "teleMP": 0, "ois": true, "eis": true, "selfieMP": 13 },
    "features": { "fiveG": true, "nfc": true, "wirelessCharging": true, "ipRating": "IP67" },
    "dims": { "height": 152.1, "width": 72.7, "thickness": 8.9, "weight": 188 },
    "release": "2024",
    "tags": ["camera", "compact", "stock-android"],
    "scores": { "camera": 9.4, "battery": 7.2, "performance": 8.0, "display": 8.7, "value": 7.5 },
    "image": "/img/pixel8a.jpg",
    "url": "https://store.google.com"
  },
  {
    "id": "oneplus-12r",
    "name": "OnePlus 12R",
    "brand": "OnePlus",
    "priceInr": 39999,
    "os": "Android 14 (OxygenOS)",
    "soc": "Snapdragon 8 Gen 2",
    "ramGB": 8,
    "storageGB": 128,
    "display": { "sizeInches": 6.78, "type": "AMOLED", "refreshHz": 120, "resolution": "1264x2780" },
    "batteryMah": 5500,
    "chargingWatt": 100,
    "cameras": { "mainMP": 50, "ultraMP": 8, "teleMP": 0, "ois": true, "eis": true, "selfieMP": 16 },
    "features": { "fiveG": true, "nfc": true, "wirelessCharging": false, "ipRating": "IP64" },
    "dims": { "height": 163.3, "width": 75.3, "thickness": 8.8, "weight": 207 },
    "release": "2024",
    "tags": ["performance", "battery", "fast-charging"],
    "scores": { "camera": 8.2, "battery": 9.2, "performance": 9.5, "display": 9.0, "value": 8.8 },
    "image": "/img/op12r.jpg",
    "url": "https://www.oneplus.in"
  },
  {
    "id": "redmi-note-13-pro-plus",
    "name": "Redmi Note 13 Pro+",
    "brand": "Xiaomi",
    "priceInr": 29999,
    "os": "Android 14 (HyperOS)",
    "soc": "Dimensity 7200-Ultra",
    "ramGB": 8,
    "storageGB": 256,
    "display": { "sizeInches": 6.67, "type": "AMOLED", "refreshHz": 120, "resolution": "1220x2712" },
    "batteryMah": 5000,
    "chargingWatt": 120,
    "cameras": { "mainMP": 200, "ultraMP": 8, "teleMP": 2, "ois": true, "eis": true, "selfieMP": 16 },
    "features": { "fiveG": true, "nfc": true, "wirelessCharging": false, "ipRating": "IP68" },
    "dims": { "height": 161.4, "width": 74.2, "thickness": 8.9, "weight": 204 },
    "release": "2024",
    "tags": ["camera", "fast-charging", "value"],
    "scores": { "camera": 8.7, "battery": 8.7, "performance": 8.1, "display": 8.6, "value": 9.0 },
    "image": "/img/rn13pplus.jpg",
    "url": "https://www.mi.com"
  },
  {
    "id": "poco-x6-pro",
    "name": "Poco X6 Pro",
    "brand": "Poco",
    "priceInr": 26999,
    "os": "Android 14 (HyperOS)",
    "soc": "Dimensity 8300-Ultra",
    "ramGB": 8,
    "storageGB": 256,
    "display": { "sizeInches": 6.67, "type": "AMOLED", "refreshHz": 120, "resolution": "1220x2712" },
    "batteryMah": 5000,
    "chargingWatt": 67,
    "cameras": { "mainMP": 64, "ultraMP": 8, "teleMP": 2, "ois": true, "eis": true, "selfieMP": 16 },
    "features": { "fiveG": true, "nfc": true, "wirelessCharging": false, "ipRating": "IP54" },
    "dims": { "height": 160.5, "width": 74.3, "thickness": 8.3, "weight": 186 },
    "release": "2024",
    "tags": ["performance", "gaming", "value"],
    "scores": { "camera": 7.8, "battery": 8.3, "performance": 9.2, "display": 8.5, "value": 9.1 },
    "image": "/img/pocox6pro.jpg",
    "url": "https://www.poco.in"
  },
  {
    "id": "iqoo-z9",
    "name": "iQOO Z9",
    "brand": "iQOO",
    "priceInr": 19999,
    "os": "Android 14 (Funtouch)",
    "soc": "Dimensity 7200",
    "ramGB": 8,
    "storageGB": 128,
    "display": { "sizeInches": 6.67, "type": "AMOLED", "refreshHz": 120, "resolution": "1080x2400" },
    "batteryMah": 5000,
    "chargingWatt": 44,
    "cameras": { "mainMP": 50, "ultraMP": 2, "teleMP": 0, "ois": true, "eis": true, "selfieMP": 16 },
    "features": { "fiveG": true, "nfc": false, "wirelessCharging": false, "ipRating": "" },
    "dims": { "height": 164.6, "width": 75.7, "thickness": 7.8, "weight": 188 },
    "release": "2024",
    "tags": ["value", "camera"],
    "scores": { "camera": 8.1, "battery": 8.0, "performance": 8.2, "display": 8.1, "value": 9.2 },
    "image": "/img/iqooz9.jpg",
    "url": "https://www.iqoo.com"
  },
  {
    "id": "nothing-phone-2a",
    "name": "Nothing Phone (2a)",
    "brand": "Nothing",
    "priceInr": 23999,
    "os": "Android 14 (Nothing OS)",
    "soc": "Dimensity 7200 Pro",
    "ramGB": 8,
    "storageGB": 128,
    "display": { "sizeInches": 6.7, "type": "AMOLED", "refreshHz": 120, "resolution": "1080x2412" },
    "batteryMah": 5000,
    "chargingWatt": 45,
    "cameras": { "mainMP": 50, "ultraMP": 50, "teleMP": 0, "ois": false, "eis": true, "selfieMP": 32 },
    "features": { "fiveG": true, "nfc": true, "wirelessCharging": false, "ipRating": "IP54" },
    "dims": { "height": 161.7, "width": 76.3, "thickness": 8.6, "weight": 190 },
    "release": "2024",
    "tags": ["design", "value"],
    "scores": { "camera": 7.9, "battery": 8.1, "performance": 8.0, "display": 8.2, "value": 8.8 },
    "image": "/img/nothing2a.jpg",
    "url": "https://in.nothing.tech"
  },
  {
    "id": "samsung-a15",
    "name": "Samsung Galaxy A15 5G",
    "brand": "Samsung",
    "priceInr": 14999,
    "os": "Android 14 (One UI)",
    "soc": "Dimensity 6100+",
    "ramGB": 6,
    "storageGB": 128,
    "display": { "sizeInches": 6.5, "type": "Super AMOLED", "refreshHz": 90, "resolution": "1080x2340" },
    "batteryMah": 5000,
    "chargingWatt": 25,
    "cameras": { "mainMP": 50, "ultraMP": 5, "teleMP": 0, "ois": false, "eis": true, "selfieMP": 13 },
    "features": { "fiveG": true, "nfc": false, "wirelessCharging": false, "ipRating": "" },
    "dims": { "height": 160.1, "width": 76.8, "thickness": 8.4, "weight": 200 },
    "release": "2024",
    "tags": ["budget", "battery"],
    "scores": { "camera": 7.2, "battery": 8.2, "performance": 6.8, "display": 7.8, "value": 8.5 },
    "image": "/img/a15.jpg",
    "url": "https://www.samsung.com"
  },
  {
    "id": "samsung-s23-fe",
    "name": "Samsung Galaxy S23 FE",
    "brand": "Samsung",
    "priceInr": 49999,
    "os": "Android 14 (One UI)",
    "soc": "Exynos 2200",
    "ramGB": 8,
    "storageGB": 128,
    "display": { "sizeInches": 6.4, "type": "Dynamic AMOLED", "refreshHz": 120, "resolution": "1080x2340" },
    "batteryMah": 4500,
    "chargingWatt": 25,
    "cameras": { "mainMP": 50, "ultraMP": 12, "teleMP": 8, "ois": true, "eis": true, "selfieMP": 10 },
    "features": { "fiveG": true, "nfc": true, "wirelessCharging": true, "ipRating": "IP68" },
    "dims": { "height": 158.0, "width": 76.5, "thickness": 8.2, "weight": 209 },
    "release": "2023",
    "tags": ["camera", "extras", "compact"],
    "scores": { "camera": 8.6, "battery": 7.6, "performance": 8.5, "display": 8.8, "value": 7.6 },
    "image": "/img/s23fe.jpg",
    "url": "https://www.samsung.com"
  },
  {
    "id": "moto-edge-50-fusion",
    "name": "Moto Edge 50 Fusion",
    "brand": "Motorola",
    "priceInr": 25999,
    "os": "Android 14 (MyUX)",
    "soc": "Snapdragon 7s Gen 2",
    "ramGB": 8,
    "storageGB": 128,
    "display": { "sizeInches": 6.7, "type": "pOLED", "refreshHz": 144, "resolution": "1080x2400" },
    "batteryMah": 5000,
    "chargingWatt": 68,
    "cameras": { "mainMP": 50, "ultraMP": 13, "teleMP": 0, "ois": true, "eis": true, "selfieMP": 32 },
    "features": { "fiveG": true, "nfc": true, "wirelessCharging": false, "ipRating": "IP68" },
    "dims": { "height": 161.9, "width": 73.6, "thickness": 7.9, "weight": 174 },
    "release": "2024",
    "tags": ["display", "clean-ui", "value"],
    "scores": { "camera": 8.0, "battery": 8.4, "performance": 8.0, "display": 9.0, "value": 8.9 },
    "image": "/img/motoedge50fusion.jpg",
    "url": "https://www.motorola.in"
  },
  {
    "id": "realme-narzo-70-pro",
    "name": "Realme Narzo 70 Pro",
    "brand": "Realme",
    "priceInr": 18999,
    "os": "Android 14 (Realme UI)",
    "soc": "Dimensity 7050",
    "ramGB": 8,
    "storageGB": 128,
    "display": { "sizeInches": 6.67, "type": "AMOLED", "refreshHz": 120, "resolution": "1080x2400" },
    "batteryMah": 5000,
    "chargingWatt": 67,
    "cameras": { "mainMP": 50, "ultraMP": 8, "teleMP": 2, "ois": false, "eis": true, "selfieMP": 16 },
    "features": { "fiveG": true, "nfc": false, "wirelessCharging": false, "ipRating": "IP54" },
    "dims": { "height": 162.6, "width": 75.4, "thickness": 8.1, "weight": 190 },
    "release": "2024",
    "tags": ["value", "charging"],
    "scores": { "camera": 7.6, "battery": 8.3, "performance": 7.8, "display": 8.2, "value": 8.9 },
    "image": "/img/narzo70pro.jpg",
    "url": "https://www.realme.com"
  },
  {
    "id": "oneplus-nord-ce4",
    "name": "OnePlus Nord CE 4",
    "brand": "OnePlus",
    "priceInr": 24999,
    "os": "Android 14 (OxygenOS)",
    "soc": "Snapdragon 7 Gen 3",
    "ramGB": 8,
    "storageGB": 128,
    "display": { "sizeInches": 6.7, "type": "AMOLED", "refreshHz": 120, "resolution": "1080x2412" },
    "batteryMah": 5500,
    "chargingWatt": 100,
    "cameras": { "mainMP": 50, "ultraMP": 8, "teleMP": 0, "ois": true, "eis": true, "selfieMP": 16 },
    "features": { "fiveG": true, "nfc": true, "wirelessCharging": false, "ipRating": "" },
    "dims": { "height": 162.5, "width": 75.2, "thickness": 8.5, "weight": 186 },
    "release": "2024",
    "tags": ["battery", "charging", "value"],
    "scores": { "camera": 8.0, "battery": 9.0, "performance": 8.7, "display": 8.4, "value": 9.0 },
    "image": "/img/nordce4.jpg",
    "url": "https://www.oneplus.in"
  },
  {
    "id": "vivo-v30",
    "name": "Vivo V30",
    "brand": "Vivo",
    "priceInr": 32999,
    "os": "Android 14 (Funtouch)",
    "soc": "Snapdragon 7 Gen 3",
    "ramGB": 8,
    "storageGB": 256,
    "display": { "sizeInches": 6.78, "type": "AMOLED", "refreshHz": 120, "resolution": "1260x2800" },
    "batteryMah": 5000,
    "chargingWatt": 80,
    "cameras": { "mainMP": 50, "ultraMP": 50, "teleMP": 0, "ois": true, "eis": true, "selfieMP": 50 },
    "features": { "fiveG": true, "nfc": true, "wirelessCharging": false, "ipRating": "IP54" },
    "dims": { "height": 164.4, "width": 75.1, "thickness": 7.5, "weight": 186 },
    "release": "2024",
    "tags": ["camera", "portrait"],
    "scores": { "camera": 8.5, "battery": 8.3, "performance": 8.5, "display": 8.9, "value": 8.1 },
    "image": "/img/vivov30.jpg",
    "url": "https://www.vivo.com"
  }
];

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

// Product Card Component with error handling
const ProductCard = ({ product, isSelected, onSelect, comparisonMode, formatPrice, getImageUrl, renderRating }) => {
  if (!product) {
    return null; // Don't render if product is undefined
  }

  return (
    <div 
      className={`product-card ${isSelected ? 'selected' : ''} ${comparisonMode ? 'comparison-mode' : ''}`}
      onClick={() => onSelect(product)}
    >
      <div className="product-image">
        <img src={getImageUrl(product.image)} alt={product.name} />
        {comparisonMode && (
          <div className="selection-indicator">
            {isSelected ? '✓' : '+'}
          </div>
        )}
      </div>
      <div className="product-info">
        <h3>{product.name || 'Unknown Phone'}</h3>
        <p className="brand">{product.brand || 'Unknown Brand'}</p>
        <p className="price">{formatPrice(product.priceInr || 0)}</p>
        {renderRating(product.scores?.value || 0)}
        <div className="specs">
          <span>{product.display?.sizeInches || '?'}" {product.display?.type || 'Display'}</span>
          <span>{product.ramGB || '?'}GB RAM / {product.storageGB || '?'}GB</span>
          <span>{product.cameras?.mainMP || '?'}MP Main Camera</span>
        </div>
        <div className="features">
          {(product.tags || []).slice(0, 3).map((tag, index) => (
            <span key={index} className="feature-tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Comparison View Component
const ComparisonView = ({ products, onClose, formatPrice, getImageUrl, renderRating }) => {
  const [product1, product2] = products;

  const comparisonFields = [
    { label: 'Price', key: 'priceInr', format: (value) => formatPrice(value) },
    { label: 'Display', key: 'display', format: (value) => `${value.sizeInches}" ${value.type} ${value.refreshHz}Hz` },
    { label: 'Processor', key: 'soc', format: (value) => value },
    { label: 'RAM/Storage', key: 'storage', format: (product) => `${product.ramGB}GB / ${product.storageGB}GB` },
    { label: 'Battery', key: 'batteryMah', format: (value) => `${value}mAh` },
    { label: 'Charging', key: 'chargingWatt', format: (value) => `${value}W` },
    { label: 'Main Camera', key: 'cameras', format: (value) => `${value.mainMP}MP` },
    { label: 'OS', key: 'os', format: (value) => value },
    { label: 'IP Rating', key: 'features', format: (value) => value.ipRating || 'None' }
  ];

  return (
    <div className="comparison-overlay">
      <div className="comparison-modal">
        <div className="comparison-header">
          <h2>Phone Comparison</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="comparison-grid">
          <div className="comparison-column">
            <div className="comparison-product">
              <img src={getImageUrl(product1.image)} alt={product1.name} />
              <h3>{product1.name}</h3>
              <p className="brand">{product1.brand}</p>
              {renderRating(product1.scores?.value || 0)}
            </div>
          </div>
          
          <div className="comparison-column">
            <div className="comparison-features">
              {comparisonFields.map(field => (
                <div key={field.label} className="feature-row">
                  <span className="feature-label">{field.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="comparison-column">
            <div className="comparison-product">
              <img src={getImageUrl(product2.image)} alt={product2.name} />
              <h3>{product2.name}</h3>
              <p className="brand">{product2.brand}</p>
              {renderRating(product2.scores?.value || 0)}
            </div>
          </div>
        </div>

        <div className="comparison-details">
          {comparisonFields.map(field => (
            <div key={field.label} className="detail-row">
              <div className="detail-value">
                {field.key === 'display' ? field.format(product1.display || {}) :
                 field.key === 'storage' ? field.format(product1) :
                 field.key === 'cameras' ? field.format(product1.cameras || {}) :
                 field.key === 'features' ? field.format(product1.features || {}) :
                 field.format(product1[field.key] || 'N/A')}
              </div>
              <div className="detail-label">{field.label}</div>
              <div className="detail-value">
                {field.key === 'display' ? field.format(product2.display || {}) :
                 field.key === 'storage' ? field.format(product2) :
                 field.key === 'cameras' ? field.format(product2.cameras || {}) :
                 field.key === 'features' ? field.format(product2.features || {}) :
                 field.format(product2[field.key] || 'N/A')}
              </div>
            </div>
          ))}
        </div>

        <div className="comparison-scores">
          <h3>Performance Scores</h3>
          <div className="scores-grid">
            {Object.entries(product1.scores || {}).map(([key, score]) => (
              <div key={key} className="score-row">
                <div className="score-value">{typeof score === 'number' ? score.toFixed(1) : 'N/A'}</div>
                <div className="score-label">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
                <div className="score-value">{typeof product2.scores?.[key] === 'number' ? product2.scores[key].toFixed(1) : 'N/A'}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="comparison-features-list">
          <div className="features-column">
            <h4>Key Features</h4>
            {(product1.tags || []).map((tag, index) => (
              <div key={index} className="feature-item">✓ {tag}</div>
            ))}
          </div>
          <div className="features-column">
            <h4>Key Features</h4>
            {(product2.tags || []).map((tag, index) => (
              <div key={index} className="feature-item">✓ {tag}</div>
            ))}
          </div>
        </div>

        <div className="comparison-actions">
          <button className="close-comparison-btn" onClick={onClose}>
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;