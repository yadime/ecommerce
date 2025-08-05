import React, { useState } from 'react';
import ProductEditForm from './ProductEditForm';
import './AdminDashboard.css';

const AdminDashboard = ({ products, onUpdateProduct, onDeleteProduct, onAddProduct, onLogout }) => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...new Set(products.map(product => product.category))];

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsAddingProduct(false);
  };

  const handleAdd = () => {
    setIsAddingProduct(true);
    setEditingProduct(null);
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setIsAddingProduct(false);
  };

  const handleSave = (productData) => {
    if (isAddingProduct) {
      const newProduct = {
        ...productData,
        id: Date.now(), // Simple ID generation for demo
        reviews: 0
      };
      onAddProduct(newProduct);
    } else {
      onUpdateProduct(editingProduct.id, productData);
    }
    handleCancel();
  };

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      onDeleteProduct(productId);
    }
  };

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="admin-header-content">
          <h1>JSeven Admin Dashboard</h1>
          <div className="admin-actions">
            <button className="add-product-btn" onClick={handleAdd}>
              + Add New Product
            </button>
            <button className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="admin-content">
        <div className="admin-filters">
          <div className="search-section">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search"
            />
          </div>
          
          <div className="filter-section">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-filter"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="products-table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Original Price</th>
                <th>Discount</th>
                <th>Rating</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id}>
                  <td>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="product-thumbnail"
                    />
                  </td>
                  <td>
                    <div className="product-name-cell">
                      <strong>{product.name}</strong>
                      <p className="product-description">{product.description}</p>
                    </div>
                  </td>
                  <td>
                    <span className="category-badge">{product.category}</span>
                  </td>
                  <td>
                    <span className="price">{formatPrice(product.price)}</span>
                  </td>
                  <td>
                    <span className="original-price">{formatPrice(product.originalPrice)}</span>
                  </td>
                  <td>
                    {product.discount > 0 && (
                      <span className="discount-badge">-{product.discount}%</span>
                    )}
                  </td>
                  <td>
                    <div className="rating-cell">
                      <span className="rating">{product.rating}</span>
                      <span className="reviews">({product.reviews})</span>
                    </div>
                  </td>
                  <td>
                    <span className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="edit-btn"
                        onClick={() => handleEdit(product)}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <div className="no-products">
              <p>No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {(editingProduct || isAddingProduct) && (
        <ProductEditForm
          product={editingProduct}
          isAdding={isAddingProduct}
          onSave={handleSave}
          onCancel={handleCancel}
          categories={categories.filter(cat => cat !== 'All')}
        />
      )}
    </div>
  );
};

export default AdminDashboard; 