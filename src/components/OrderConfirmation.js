import React from 'react';
import './OrderConfirmation.css';

const OrderConfirmation = ({ orderData, onBackToShop }) => {
  const formatPrice = (price) => {
    return `₱${price.toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="order-confirmation">
      <div className="confirmation-header">
        <div className="success-icon">✓</div>
        <h1>JSeven Order Confirmed!</h1>
        <p>Thank you for choosing JSeven. Your order has been successfully placed.</p>
      </div>

      <div className="confirmation-content">
        <div className="order-details">
          <h2>Order Details</h2>
          
          <div className="order-info">
            <div className="info-row">
              <span className="label">Order ID:</span>
              <span className="value">{orderData.orderId}</span>
            </div>
            <div className="info-row">
              <span className="label">Order Date:</span>
              <span className="value">{formatDate(orderData.orderDate)}</span>
            </div>
            <div className="info-row">
              <span className="label">Total Amount:</span>
              <span className="value total-amount">{formatPrice(orderData.totals.total)}</span>
            </div>
          </div>

          <div className="customer-info">
            <h3>Shipping Information</h3>
            <div className="address-details">
              <p><strong>{orderData.customer.firstName} {orderData.customer.lastName}</strong></p>
              <p>{orderData.customer.address.street}</p>
              <p>{orderData.customer.address.city}, {orderData.customer.address.state} {orderData.customer.address.zipCode}</p>
              <p>Email: {orderData.customer.email}</p>
              <p>Phone: {orderData.customer.phone}</p>
            </div>
          </div>

          <div className="payment-info">
            <h3>Payment Information</h3>
            <div className="payment-details">
              <p><strong>Card ending in:</strong> {orderData.payment.cardNumber}</p>
              <p><strong>Cardholder:</strong> {orderData.payment.cardName}</p>
            </div>
          </div>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          
          <div className="order-items">
            {orderData.items.map((item) => (
              <div key={item.id} className="order-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p className="item-category">{item.category}</p>
                  <div className="item-price-qty">
                    <span className="item-price">{formatPrice(item.price)}</span>
                    <span className="item-qty">Qty: {item.quantity}</span>
                  </div>
                </div>
                <div className="item-total">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="order-totals">
            <div className="total-row">
              <span>Subtotal</span>
              <span>{formatPrice(orderData.totals.subtotal)}</span>
            </div>
            <div className="total-row">
              <span>Tax (8%)</span>
              <span>{formatPrice(orderData.totals.tax)}</span>
            </div>
            <div className="total-row">
              <span>Shipping</span>
              <span>{orderData.totals.shipping === 0 ? 'Free' : formatPrice(orderData.totals.shipping)}</span>
            </div>
            <div className="total-row final-total">
              <span>Total</span>
              <span>{formatPrice(orderData.totals.total)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="confirmation-actions">
        <button className="back-to-shop-btn" onClick={onBackToShop}>
          Continue Shopping
        </button>
        <div className="order-notes">
          <p>📧 A confirmation email has been sent to {orderData.customer.email}</p>
          <p>📦 You will receive a shipping confirmation once your order is processed</p>
          <p>⏰ Estimated delivery: 2-3 business days</p>
          <p>🎁 Free JSeven hardware support and build assistance included</p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation; 