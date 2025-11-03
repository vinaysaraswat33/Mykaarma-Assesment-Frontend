import React from 'react';

const ProductCard = ({ 
  product, 
  isSelected, 
  onSelect, 
  comparisonMode, 
  formatPrice, 
  getImageUrl, 
  renderRating 
}) => {
  return (
    <div 
      className={`product-card ${isSelected ? 'selected' : ''} ${comparisonMode ? 'comparison-mode' : ''}`}
      onClick={() => onSelect(product)}
    >
      <div className="product-image">
        <img src={getImageUrl(product.image)} alt={product.name} />
        {isSelected && <div className="selected-indicator">✓</div>}
      </div>
      
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="brand">{product.brand}</p>
        <p className="price">{formatPrice(product.priceInr)}</p>
        
        <div className="product-specs">
          <span>{product.display.sizeInches}" {product.display.type}</span>
          <span>{product.ramGB}GB RAM / {product.storageGB}GB</span>
          <span>{product.soc}</span>
        </div>
        
        <div className="product-scores">
          {renderRating(product.scores.value)}
        </div>
        
        <div className="product-tags">
          {product.tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;