import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './assets/css/main.css';
import Header from './components/Common/Header'; // Import Header component
import Footer from './components/Common/Footer'; // Import Footer component
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About'; 
import ProductDetailPage from './pages/ProductDetailPage';
import ProductListPage from './pages/ProductListPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProductManagementPage from './pages/ProductManagementPage';
import './assets/js/bootstrap.bundle.min.js';

const App = () => {
  return (
      <Router>
          <div>
              <Header /> {/* Include Header component */}
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} /> 
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/products/:id" element={<ProductDetailPage />}/>
                  <Route path="/products" element={<ProductListPage />} />
                  <Route path="/cart" element={<ShoppingCartPage />} />
                  <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                  <Route path="/admin/products" element={<ProductManagementPage />} />
              </Routes>
              <Footer /> {/* Include Footer component */}
          </div>
      </Router>
  );
};


export default App;
