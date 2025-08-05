import React, { useState, useEffect } from 'react';
import './CartPage.css';
import CheckoutForm from './CheckoutForm';
import RelatedProducts from './RelatedProducts';
import { products } from '../data/products';

const CartPage = ({ 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onAddToCart, 
  onBackToShop,
  onCheckoutComplete 
}) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const calculateShipping = () => {
    return calculateSubtotal() > 100 ? 0 : 9.99; // Free shipping over $100
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping();
  };

  const formatPrice = (price) => {
    return `₱${price.toFixed(2)}`;
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity >= 1) {
      onUpdateQuantity(itemId, newQuantity);
    }
  };

  const handleProceedToCheckout = () => {
    setShowCheckout(true);
  };

  const handleBackToCart = () => {
    setShowCheckout(false);
  };

  const handleCheckoutComplete = (orderData) => {
    onCheckoutComplete(orderData);
  };

  // Get related products based on cart items
  useEffect(() => {
    if (cartItems.length > 0) {
      const cartCategories = [...new Set(cartItems.map(item => item.category))];
      const related = products
        .filter(product => 
          cartCategories.includes(product.category) && 
          !cartItems.some(cartItem => cartItem.id === product.id)
        )
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [cartItems]);

  if (showCheckout) {
    return (
      <CheckoutForm
        cartItems={cartItems}
        subtotal={calculateSubtotal()}
        tax={calculateTax()}
        shipping={calculateShipping()}
        total={calculateTotal()}
        onBack={handleBackToCart}
        onComplete={handleCheckoutComplete}
      />
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-page-header">
        <button className="back-btn" onClick={onBackToShop}>
          ← Back to Shop
        </button>
        <h1>JSeven Cart</h1>
      </div>

      <div className="cart-page-content">
        <div className="cart-main">
          {cartItems.length === 0 ? (
            <div className="empty-cart-page">
              <div className="empty-cart-icon">🛒</div>
              <h2>Your cart is empty</h2>
              <p>Start building your dream PC with JSeven hardware!</p>
              <button className="continue-shopping-btn" onClick={onBackToShop}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items-section">
                <h2>Cart Items ({cartItems.length})</h2>
                <div className="cart-items-list">
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-page-item">
                      <div className="cart-item-image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      
                      <div className="cart-item-info">
                        <h3 className="cart-item-name">{item.name}</h3>
                        <p className="cart-item-category">{item.category}</p>
                        <p className="cart-item-description">{item.description}</p>
                        
                        <div className="cart-item-price-info">
                          <span className="cart-item-price">{formatPrice(item.price)}</span>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <span className="cart-item-original-price">
                              {formatPrice(item.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="cart-item-quantity">
                        <label>Quantity:</label>
                        <div className="quantity-controls">
                          <button 
                            className="quantity-btn"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="quantity-display">{item.quantity}</span>
                          <button 
                            className="quantity-btn"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      
                      <div className="cart-item-total">
                        <span className="item-total-price">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <button 
                          className="remove-item-btn"
                          onClick={() => onRemoveItem(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cart-summary">
                <h2>Order Summary</h2>
                <div className="summary-details">
                  <div className="summary-row">
                    <span>Subtotal ({cartItems.reduce((total, item) => total + item.quantity, 0)} items)</span>
                    <span>{formatPrice(calculateSubtotal())}</span>
                  </div>
                  <div className="summary-row">
                    <span>Tax (8%)</span>
                    <span>{formatPrice(calculateTax())}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping</span>
                    <span>{calculateShipping() === 0 ? 'Free' : formatPrice(calculateShipping())}</span>
                  </div>
                  {calculateShipping() > 0 && (
                    <div className="free-shipping-notice">
                      <span>Add ${formatPrice(100 - calculateSubtotal())} more for free shipping!</span>
                    </div>
                  )}
                  <div className="summary-row total-row">
                    <span>Total</span>
                    <span className="total-amount">{formatPrice(calculateTotal())}</span>
                  </div>
                </div>
                
                <div className="cart-actions">
                  <button 
                    className="proceed-checkout-btn"
                    onClick={handleProceedToCheckout}
                  >
                    Proceed to Checkout
                  </button>
                  <button 
                    className="continue-shopping-btn"
                    onClick={onBackToShop}
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {cartItems.length > 0 && relatedProducts.length > 0 && (
          <RelatedProducts 
            products={relatedProducts}
            onAddToCart={onAddToCart}
          />
        )}
      </div>
    </div>
  );
};

export default CartPage; 