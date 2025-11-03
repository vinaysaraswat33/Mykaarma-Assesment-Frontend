import React from 'react';

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
              {/* UPDATED LINE - added product1 as second parameter */}
              <img src={getImageUrl(product1.image, product1)} alt={product1.name} />
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
              {/* UPDATED LINE - added product2 as second parameter */}
              <img src={getImageUrl(product2.image, product2)} alt={product2.name} />
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

export default ComparisonView;