import React from 'react';
import './Header.css';

const Header = ({ cartItemCount, onCartClick, onLogout, userData }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <h1 className="logo">JSeven</h1>
          <nav className="nav-menu">
            <a href="#home" className="nav-link">Home</a>
            <a href="#testEquipment" className="nav-link">Test Equipment</a>
            <a href="#circuitProtection" className="nav-link">Circuit Protection</a>
            <a href="#wireCable" className="nav-link">Wire & cable</a>
            <a href="#conduitFittings" className="nav-link">Conduit & fittings</a>
            <a href="#plugsConnectors" className="nav-link">Plugs and Connectors</a>
            <a href="#deals" className="nav-link">Deals</a>
          </nav>
        </div>

        <div className="header-right">
          <div className="user-actions">
            <div className="cart-icon-container" onClick={onCartClick}>
              <span className="cart-icon">🛒</span>
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </div>

            {userData && (
              <div className="user-menu">
                <span className="user-greeting">Hi, {userData.username}!</span>
                <button className="logout-btn" onClick={onLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 