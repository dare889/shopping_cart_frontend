import React, { useState , useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../ShoppingCart/CartContext';
import importAll from '../../assets/units/importImages';

const images = importAll(require.context('../../assets/images', false, /\.(png|jpe?g|svg)$/));

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const { cart } = useContext(CartContext);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        // Navigate to the products page with the search query
        navigate(`/products?search=${searchQuery}`);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div>
            <div id="top-bar">
                <div class="container">
                    <div>
                        <span class="">
                            <i class=""><img style={{ marginRight: '5px' }} src={images['header_Time.png']} alt="" title="" class="" /></i>
                            <span class="no-link">星期一至五：09:00am-18:30pm</span>
                        </span>
                        <a href="tel:+85227719951" class="">
                            <i class=""><img style={{ marginRight: '5px' }} src={images['header_Phone.png']} alt="" title="" class="" /></i> 
                            <span class="top-menu-link no-link">+852 2771 9951</span>
                        </a>
                    </div>
                    <div className="text-white top-menu-navbar">
                        <form className="d-flex" onSubmit={handleSearchSubmit}>
                            <input
                                className="me-2"
                                type="search"
                                placeholder="搜索"
                                aria-label="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button className="btn btn-light" type="submit">搜索</button>
                        </form>
                        <ul className="top-menu-navbar-nav navbar-nav mb-2 mb-lg-0">
                            {token ? (
                                <>
                                    <li className="nav-item top-menu-navbar-nav-item">
                                        <Link className="nav-link" to="/dashboard">Dashboard</Link>
                                    </li>
                                    <li className="nav-item top-menu-navbar-nav-item">
                                        <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item top-menu-navbar-nav-item">
                                        <Link className="nav-link" to="/login"><img style={{ marginRight: '5px' }} src={images['header_man.png']} alt="" title="" class="" /> 登入</Link>
                                    </li>
                                    <li className="nav-item top-menu-navbar-nav-item">
                                        <Link className="nav-link" to="/register"><img style={{ marginRight: '5px' }} src={images['header_Register.png']} alt="" title="" class="" /> 註冊</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    <form className="d-flex" action="/cart">
                        <button className="btn" type="submit">
                            <img style={{ marginRight: '5px' }} src={images['header_shopping.png']} alt="" title="" class="" />
                            <span className="bi-cart-fill me-1 text-white">購物車</span>
                            
                            <span className="badge bg-dark text-white ms-1 rounded-pill">{cart.length}</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <nav id="nav-bar" className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div id="logo">
                    <Link className="navbar-brand" to="/">
                        <img src={images['mocm_logo.png']} width="600" height="280" alt="藥師堂" title="藥師堂" class="logo-1x"/>
                    </Link>
                </div>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                        <li className="nav-item main-menu-item">
                            <a className="nav-link" href="/">首頁</a>
                        </li>
                        <li className="nav-item main-menu-item">
                            <a className="nav-link" href="./doctors">醫師介紹</a>
                        </li>
                        <li className="nav-item main-menu-item">
                            <a className="nav-link" href="./service">服務範圍</a>
                        </li>
                        <li className="nav-item main-menu-item">
                            <a className="nav-link" href="/products">購買中藥產品</a>
                        </li>
                        <li className="nav-item main-menu-item">
                            <a className="nav-link" href="/events">每月活動</a>
                        </li>
                        <li className="nav-item main-menu-item">
                            <a className="nav-link" href="/learning">中醫智慧</a>
                        </li>
                        <li className="nav-item main-menu-item">
                            <a className="nav-link" href="/about">聯絡我們</a>
                        </li>
                    </ul>
                    <Link to="/my-appointments">
                        <button className="btn main-menu-item">預約網上視診</button>
                    </Link>
                </div>
            </div>
        </nav>
        </div>
    );
};

export default Header;
