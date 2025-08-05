# ShopHub - E-commerce Platform

A modern, responsive e-commerce platform built with React that allows users to browse products, view pricing, and manage a shopping cart.

## Features

### 🛍️ Product Management
- **Product Grid**: Display products in a responsive grid layout
- **Product Cards**: Beautiful cards showing product images, prices, ratings, and descriptions
- **Discount Badges**: Visual indicators for products on sale
- **Stock Status**: Clear indication of product availability

### 🔍 Search & Filtering
- **Search Products**: Real-time search by product name or description
- **Category Filtering**: Filter products by category (Electronics, Clothing, Fashion, Home & Garden)
- **Sorting Options**: Sort by price (low/high), rating, name, or discount percentage
- **Results Counter**: Shows number of products found

### 🛒 Shopping Cart
- **Add to Cart**: Add products with quantity management
- **Cart Sidebar**: Sliding cart panel with item details
- **Quantity Controls**: Increase/decrease item quantities
- **Remove Items**: Remove individual items from cart
- **Cart Total**: Real-time calculation of total price
- **Clear Cart**: Option to clear all items at once

### 👤 User Authentication
- **Login System**: Secure login with validation
- **User Session**: Maintain user state throughout the session
- **Logout Functionality**: Secure logout with cart clearing

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern Styling**: Beautiful gradients, shadows, and animations
- **Interactive Elements**: Hover effects and smooth transitions
- **Loading States**: Visual feedback during operations

## Demo Credentials

Use these credentials to log in:
- **Username**: `demo`
- **Password**: `password123`

## Sample Products

The platform includes 8 sample products across different categories:

### Electronics
- Wireless Bluetooth Headphones ($89.99)
- Smart Fitness Watch ($199.99)
- Wireless Charging Pad ($39.99)
- Wireless Gaming Mouse ($69.99)

### Clothing & Fashion
- Organic Cotton T-Shirt ($24.99)
- Leather Crossbody Bag ($79.99)

### Home & Garden
- Stainless Steel Water Bottle ($19.99)
- Smart LED Light Bulb ($29.99)

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd login-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/
│   ├── Header.js              # Navigation header with cart icon
│   ├── Header.css
│   ├── LoginForm.js           # User authentication form
│   ├── LoginForm.css
│   ├── ProductCard.js         # Individual product display
│   ├── ProductCard.css
│   ├── ProductGrid.js         # Product grid with filters
│   ├── ProductGrid.css
│   ├── ShoppingCart.js        # Shopping cart sidebar
│   └── ShoppingCart.css
├── data/
│   └── products.js            # Sample product data
├── App.js                     # Main application component
├── App.css                    # Global styles
├── index.js                   # Application entry point
└── index.css                  # Base styles
```

## Key Components

### ProductCard
- Displays product image, name, price, rating, and description
- Shows discount badges for products on sale
- Handles "Add to Cart" and "View Details" actions
- Responsive design with hover effects

### ProductGrid
- Manages product filtering and sorting
- Implements search functionality
- Displays products in responsive grid layout
- Shows "No products found" state when filters return empty results

### ShoppingCart
- Sliding sidebar cart interface
- Quantity management for cart items
- Real-time total calculation
- Empty cart state with call-to-action

### Header
- Navigation menu with cart icon
- Search bar for quick product search
- User greeting and logout functionality
- Responsive design for mobile devices

## Technologies Used

- **React**: Frontend framework
- **CSS3**: Styling with modern features (Grid, Flexbox, Animations)
- **JavaScript ES6+**: Modern JavaScript features
- **Unsplash Images**: High-quality product images

## Future Enhancements

- Product detail pages
- User registration
- Wishlist functionality
- Product reviews and ratings
- Payment integration
- Order history
- Admin panel for product management
- Real-time inventory tracking

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

---

**ShopHub** - Your one-stop destination for amazing products! 🛍️✨ "# ecommerce" 
