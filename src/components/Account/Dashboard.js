import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="container mt-5">
            <h1 className="mb-4">Dashboard</h1>
            <div className="list-group">
                <Link to="/dashboard/my-appointments" className="list-group-item list-group-item-action">
                    我的醫師預約記錄
                </Link>
                <Link to="/dashboard/account" className="list-group-item list-group-item-action">
                    編輯我的賬戶信息
                </Link>
                <Link to="/dashboard/change-password" className="list-group-item list-group-item-action">
                    修改我的密碼
                </Link>
                <Link to="/dashboard/edit-address" className="list-group-item list-group-item-action">
                    修改我的收貨地址
                </Link>
                <Link to="/dashboard/edit-wishlist" className="list-group-item list-group-item-action">
                    修改我的收藏列表
                </Link>
                <Link to="/dashboard/order-history" className="list-group-item list-group-item-action">
                    查看我的歷史訂單
                </Link>
                <Link to="/dashboard/subscription" className="list-group-item list-group-item-action">
                    訂閱 / 退訂咨詢
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
