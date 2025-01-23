import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/AccountPage.css'; // Create and style this CSS file as needed

const AccountPage = () => {
    return (
        <div className="account-page">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <strong>我的賬戶</strong>
                            </li>
                            <li className="list-group-item">
                                <Link to="/my-appointments">
                                    <i className="fa fa-list"></i> 我的醫師預約記錄
                                </Link>
                            </li>
                            <li className="list-group-item">
                                <Link to="/edit-account">
                                    <i className="fa fa-edit"></i> 編輯我的賬戶信息
                                </Link>
                            </li>
                            <li className="list-group-item">
                                <Link to="/change-password">
                                    <i className="fa fa-lock"></i> 修改我的密碼
                                </Link>
                            </li>
                            <li className="list-group-item">
                                <Link to="/edit-address">
                                    <i className="fa fa-map-marker"></i> 修改我的收貨地址
                                </Link>
                            </li>
                            <li className="list-group-item">
                                <Link to="/edit-wishlist">
                                    <i className="fa fa-heart"></i> 修改我的收藏列表
                                </Link>
                            </li>
                            <li className="list-group-item">
                                <Link to="/logout">
                                    <i className="fa fa-sign-out"></i> 退出登錄
                                </Link>
                            </li>
                            <li className="list-group-item">
                                <strong>我的訂單</strong>
                            </li>
                            <li className="list-group-item">
                                <Link to="/order-history">
                                    <i className="fa fa-history"></i> 查看我的歷史訂單
                                </Link>
                            </li>
                            <li className="list-group-item">
                                <strong>我的訂閱</strong>
                            </li>
                            <li className="list-group-item">
                                <Link to="/subscription">
                                    <i className="fa fa-envelope"></i> 訂閱 / 退訂咨詢
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-9">
                        {/* Here you can render the content for the selected account section */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountPage;
