import React, { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import ShoppingCart from './components/ShoppingCart';
import CartPage from './components/CartPage';
import OrderConfirmation from './components/OrderConfirmation';
import { products as initialProducts } from './data/products';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [products, setProducts] = useState(initialProducts);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('selection'); // 'selection', 'customer-login', 'admin-login', 'shop', 'cart', 'confirmation'
  const [orderData, setOrderData] = useState(null);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUserData(userData);
    setCurrentPage('shop');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdminLoggedIn(false);
    setUserData(null);
    setCartItems([]);
    setIsCartOpen(false);
    setCurrentPage('selection');
    setOrderData(null);
  };

  const handleAdminLogin = (adminData) => {
    setIsAdminLoggedIn(true);
    setUserData(adminData);
  };

  const addProduct = (newProduct) => {
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  const updateProduct = (productId, updatedProduct) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId ? { ...product, ...updatedProduct } : product
      )
    );
  };

  const deleteProduct = (productId) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
  };

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const updateCartQuantity = (productId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const goToCartPage = () => {
    setCurrentPage('cart');
    setIsCartOpen(false);
  };

  const goToShop = () => {
    setCurrentPage('shop');
  };

  const handleCheckoutComplete = (orderData) => {
    setOrderData(orderData);
    setCartItems([]);
    setCurrentPage('confirmation');
  };

  const viewProductDetails = (product) => {
    // For now, just log the product. In a real app, this would navigate to a product detail page
    console.log('Viewing product details:', product);
    alert(`Viewing details for: ${product.name}\nPrice: $${product.price}\nDescription: ${product.description}`);
  };

  const renderMainContent = () => {
    if (currentPage === 'confirmation') {
      return (
        <OrderConfirmation
          orderData={orderData}
          onBackToShop={goToShop}
        />
      );
    }

    if (currentPage === 'cart') {
      return (
        <CartPage
          cartItems={cartItems}
          onUpdateQuantity={updateCartQuantity}
          onRemoveItem={removeFromCart}
          onAddToCart={addToCart}
          onBackToShop={goToShop}
          onCheckoutComplete={handleCheckoutComplete}
        />
      );
    }

    return (
      <main className="main-content">
        <div className="hero-section">
          <div className="hero-content">
            <h1>Welcome to JSeven</h1>
            <p>Premium Electrical Supplies</p>
          </div>
        </div>
        
        <ProductGrid
          products={products}
          onAddToCart={addToCart}
          onViewDetails={viewProductDetails}
        />
      </main>
    );
  };

  return (
    <div className="App">
      {!isLoggedIn && !isAdminLoggedIn ? (
        currentPage === 'customer-login' ? (
          <LoginForm onLogin={handleLogin} onBack={() => setCurrentPage('selection')} />
        ) : currentPage === 'admin-login' ? (
          <AdminLogin onLogin={handleAdminLogin} onBack={() => setCurrentPage('selection')} />
        ) : (
          <div className="login-selection">
            <div className="login-options">
              <h2>Welcome to JSeven</h2>
              <p>Please select your login type:</p>
              <div className="login-buttons">
                <button 
                  className="customer-login-btn"
                  onClick={() => setCurrentPage('customer-login')}
                >
                  Customer Login
                </button>
                <button 
                  className="admin-login-btn"
                  onClick={() => setCurrentPage('admin-login')}
                >
                  Admin Login
                </button>
              </div>
            </div>
          </div>
        )
      ) : isAdminLoggedIn ? (
        <AdminDashboard
          products={products}
          onUpdateProduct={updateProduct}
          onDeleteProduct={deleteProduct}
          onAddProduct={addProduct}
          onLogout={handleLogout}
        />
      ) : (
        <div className="ecommerce-app">
          {currentPage !== 'confirmation' && (
            <Header
              cartItemCount={getCartItemCount()}
              onCartClick={currentPage === 'shop' ? openCart : goToCartPage}
              onLogout={handleLogout}
              userData={userData}
            />
          )}
          
          {renderMainContent()}

          {currentPage === 'shop' && (
            <ShoppingCart
              cartItems={cartItems}
              onUpdateQuantity={updateCartQuantity}
              onRemoveItem={removeFromCart}
              onClose={closeCart}
              isOpen={isCartOpen}
              onViewCart={goToCartPage}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App; 