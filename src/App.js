import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import './assets/css/main.css';
import './assets/css/style.css';
import './assets/css/ServiceScope.css';
import './assets/css/ProductsPage.css';
import './assets/css/EventPage.css';
import './assets/css/AboutPage.css';
import './assets/css/DoctorPage.css';

import Header from './components/Common/Header';
import Footer from './components/Common/Footer';

// Admin Components
import AdminHeader from './components/Common/admin/header';
import AdminFooter from './components/Common/admin/footer';
import AdminLoginPage from './pages/admin/adminLoginPage';
import AdminPrivateRoute from './components/PrivateRoute/AdminPrivateRoute';
import AdminPage from './pages/admin/adminPage';

import Home from './pages/Home';
import EventPage from './pages/EventPage';
import EventDetailPage from './pages/EventDetailPage';
import ServiceScope from './pages/ServiceScope';
import Login from './pages/Login';
import ForgetPasswordPage from './pages/ForgotPasswordPage';
import Register from './pages/Register';
import DoctorPage from './pages/DoctorPage';
import About from './pages/AboutPage';
import LearningPage from './pages/LearningPage';
import LearningDescriptionPage from './pages/LearningDescriptionPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductListPage from './pages/ProductListPage';
import ShoppingCartPage from './pages/ShoppingCartPage';

import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import MyAppointmentsPage from './components/Account/MyAppointmentsPage';
import Dashboard from './components/Account/Dashboard';
import AccountPage from './components/Account/AccountPage';
import EditAccount from './components/Account/EditAccount';
import ChangePassword from './components/Account/ChangePassword';
import EditAddress from './components/Account/EditAddress';
import EditWishlist from './components/Account/EditWishlist';
import OrderHistory from './components/Account/OrderHistory';
import Subscription from './components/Account/Subscription';
import Logout from './components/Account/Logout';

import './assets/bootstrap-5.2.3-dist/js/bootstrap.bundle.min.js';
import { CartProvider } from './components/ShoppingCart/CartContext';
import { AuthProvider } from './context/AuthContext';
import { AdminAuthProvider } from './context/AdminAuthContext';

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <AdminAuthProvider>
                    <CartProvider>
                        <Routes>
                            {/* Admin Routes */}
                            <Route path="/admin/login" element={<AdminLoginPage />} /> {/* Admin login page */}
                            <Route
                                path="/admin/*"
                                element={
                                    <AdminPrivateRoute> {/* Protect admin pages */}
                                        <div>
                                            <AdminHeader /> {/* Admin-specific header */}
                                            <Outlet /> {/* Render nested admin routes here */}
                                            <AdminFooter /> {/* Admin-specific footer */}
                                        </div>
                                    </AdminPrivateRoute>
                                }
                            >
                                <Route path="adminPage" element={<AdminPage />} />
                            </Route>

                            {/* General User Routes */}
                            <Route
                                path="/*"
                                element={
                                    <div>
                                        <Header /> {/* General header */}
                                        <Routes>
                                            <Route path="/" element={<Home />} />
                                            <Route path="/about" element={<About />} />
                                            <Route path="/service" element={<ServiceScope />} />
                                            <Route path="/login" element={<Login />} /> {/* Customer login page */}
                                            <Route path="/register" element={<Register />} />
                                            <Route path="/forget-password" element={<ForgetPasswordPage />} />
                                            <Route path="/events" element={<EventPage />} />
                                            <Route path="/events/:post_id" element={<EventDetailPage />} />
                                            <Route path="/products/:id" element={<ProductDetailPage />} />
                                            <Route path="/products" element={<ProductListPage />} />
                                            <Route path="/cart" element={<ShoppingCartPage />} />
                                            <Route path="/doctors" element={<DoctorPage />} />
                                            <Route path="/learning" element={<LearningPage />} />
                                            <Route path="/learning/:post_id" element={<LearningDescriptionPage />} />

                                            <Route path="/dashboard" element={<PrivateRoute />}>
                                                <Route index element={<Dashboard />} />
                                                <Route path="my-appointments" element={<MyAppointmentsPage />} />
                                                <Route path="account" element={<AccountPage />} />
                                                <Route path="edit-account" element={<EditAccount />} />
                                                <Route path="change-password" element={<ChangePassword />} />
                                                <Route path="edit-address" element={<EditAddress />} />
                                                <Route path="edit-wishlist" element={<EditWishlist />} />
                                                <Route path="order-history" element={<OrderHistory />} />
                                                <Route path="subscription" element={<Subscription />} />
                                                <Route path="logout" element={<Logout />} />
                                            </Route>
                                        </Routes>
                                        <Footer /> {/* General footer */}
                                    </div>
                                }
                            />
                        </Routes>
                    </CartProvider>
                </AdminAuthProvider>
            </AuthProvider>
        </Router>
    );
};

export default App;
