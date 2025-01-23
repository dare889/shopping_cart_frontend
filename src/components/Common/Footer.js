import React from 'react';
import importAll from '../../assets/units/importImages';
const images = importAll(require.context('../../assets/images', false, /\.(png|jpe?g|svg)$/));

const Footer = () => {
    return (
        <footer id="footer">
            <div className="container">
                <div className="logo-nav">
                    <div className="logo">
                        <img src={images['mocm_logo.png']} alt="藥師堂" title="藥師堂" />
                    </div>
                    <div className="nav-links">
                        <a href="./doctors">醫師介紹</a>
                        <a href="./service">服務範圍</a>
                        <a href="./products">購買中藥產品</a>
                        <a href="./events">每月活動</a>
                        <a href="./learning">中醫智慧</a>
                        <a href="./about">聯絡我們</a>
                    </div>
                </div>
                <div className="info-section">
                    <div>
                        <p>開診時間(敬請預約)：</p>
                        <p>星期一至六：09:30am-19:30pm</p>
                    </div>
                    <div className="contact-info">
                        <p><i className="fa fa-whatsapp"><img src={images['whatsapp_icon.png']} alt="whatsapp" title="whatsapp" /> </i> +852 9201 6255</p>
                        <p><i className="fa fa-envelope"><img src={images['email_icon.png']} alt="email" title="email" /> </i> info@mocmhk.com</p>
                    </div>
                    <div>
                        <p><i className="fa fa-map-marker"><img src={images['gps_icon.png']} alt="map" title="map" /> </i> 九龍彌敦道521-523號禮基大廈12樓C</p>
                        <p>(港鐵油麻地站B1出口)</p>
                        <p><i className="fa fa-phone"><img src={images['tel_icon.png']} alt="tel" title="tel" /> </i> +852 2771 9951</p>
                    </div>
                </div>
            </div>
            <div className="bottom-bar">
                <p>版權所有 © 2021 Mocm International Development Limited. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
