import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './assets/css/main.css';
import Header from './components/Common/Header'; 
import Footer from './components/Common/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import ForgetPasswordPage from './pages/ForgotPasswordPage';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import About from './pages/About'; 
import ProductDetailPage from './pages/ProductDetailPage';
import ProductListPage from './pages/ProductListPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProductManagementPage from './pages/ProductManagementPage';
import './assets/bootstrap-5.2.3-dist/js/bootstrap.bundle.min.js';
import { CartProvider } from './components/ShoppingCart/CartContext';
import { AuthProvider } from './context/AuthContext';

const App = () => {

    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <div>
                        <Header /> {/* Include Header component */}
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} /> 
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/forget-password" element={<ForgetPasswordPage />}/>
                            <Route path="/products/:id" element={<ProductDetailPage />}/>
                            <Route path="/products" element={<ProductListPage />} />
                            <Route path="/cart" element={<ShoppingCartPage />} />
                            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                            <Route path="/admin/products" element={<ProductManagementPage />} />
                            <Route path="/dashboard" element={<PrivateRoute />}>
                                <Route path="/dashboard" element={<Dashboard />} />
                            </Route>
                        </Routes>
                        <Footer /> {/* Include Footer component */}
                    </div>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
};


export default App;
