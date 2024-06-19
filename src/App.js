import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
import AdminDashboardPage from './components/Admin/AdminDashboard';
import ProductManagementPage from './components/Admin/ProductManagement';
import OrderManagementPage from './components/Admin/OrderManagement';
import UserManagementPage from './components/Admin/UserManagement';
import AdminLogin from './components/Admin/AdminLogin'; 
import './assets/bootstrap-5.2.3-dist/js/bootstrap.bundle.min.js';
import { CartProvider } from './components/ShoppingCart/CartContext';
import { AuthProvider } from './context/AuthContext';
import { AdminAuthProvider, AdminAuthContext } from './context/AdminAuthContext';

const AdminRoute = ({ children }) => {
    const { user } = useContext(AdminAuthContext);
    return user && (user.admin_type === 'admin' || user.admin_type === 'super_admin') ? children : <Navigate to="/admin/login" />;
};

const App = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <AdminAuthProvider>
                    <Router>
                        <div>
                            <Header /> {/* Include Header component */}
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/forget-password" element={<ForgetPasswordPage />} />
                                <Route path="/products/:id" element={<ProductDetailPage />} />
                                <Route path="/products" element={<ProductListPage />} />
                                <Route path="/cart" element={<ShoppingCartPage />} />
                                <Route path="/dashboard" element={<PrivateRoute />}>
                                    <Route path="/dashboard" element={<Dashboard />} />
                                </Route>
                                <Route path="/admin/login" element={<AdminLogin />} />
                                <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
                                <Route path="/admin/products" element={<AdminRoute><ProductManagementPage /></AdminRoute>} />
                                <Route path="/admin/orders" element={<AdminRoute><OrderManagementPage /></AdminRoute>} />
                                <Route path="/admin/users" element={<AdminRoute><UserManagementPage /></AdminRoute>} />
                            </Routes>
                            <Footer /> {/* Include Footer component */}
                        </div>
                    </Router>
                </AdminAuthProvider>
            </CartProvider>
        </AuthProvider>
    );
};

export default App;
