import React from 'react';
import './RelatedProducts.css';

const RelatedProducts = ({ products, onAddToCart }) => {
  const formatPrice = (price) => {
    return `₱${price.toFixed(2)}`;
  };

  const handleAddToCart = (product) => {
    onAddToCart(product);
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="related-products">
      <div className="related-products-header">
        <h2>Other Electrical Hardware</h2>
        <p>Recommended hardware components based on your cart</p>
      </div>
      
      <div className="related-products-grid">
        {products.map((product) => (
          <div key={product.id} className="related-product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
              {product.discount && (
                <div className="discount-badge">
                  -{product.discount}%
                </div>
              )}
              {!product.inStock && (
                <div className="out-of-stock-badge">
                  Out of Stock
                </div>
              )}
            </div>
            
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-category">{product.category}</p>
              
              <div className="product-rating">
                <div className="stars">
                  {[...Array(5)].map((_, index) => (
                    <span 
                      key={index} 
                      className={`star ${index < Math.floor(product.rating) ? 'filled' : ''}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="rating-text">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              
              <div className="product-price">
                <span className="current-price">{formatPrice(product.price)}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="original-price">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              
              <button 
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(product)}
                disabled={!product.inStock}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts; 