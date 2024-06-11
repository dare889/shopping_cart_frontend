import React from 'react';
import image1 from '../../assets/images/logo.png'; 

const Footer = () => {
    return (
        <footer>
            <div className="container-fluid bg-light py-3">
                <div className="container">
                    <div className="row mt-3">
                        <div className="col d-flex justify-content-center">
                            <nav>
                                <ul className="list-inline">
                                    <li className="list-inline-item"><a href="/">About</a></li>
                                    <li className="list-inline-item"><a href="/">Service</a></li>
                                    <li className="list-inline-item"><a href="/">Product</a></li>
                                    <li className="list-inline-item"><a href="/">Our Work</a></li>
                                    <li className="list-inline-item"><a href="/">Other</a></li>
                                    <li className="list-inline-item"><a href="/">Contact Us</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <img className="img-fluid" src={image1} alt="Logo" />
                        </div>
                        <div className="col-md-8 d-flex justify-content-end">
                            <div className="d-flex flex-column align-items-start me-5">
                                <span className="fw-bold">Open Time (Booking)：</span>
                                <span>Monday to Friday: 09:30am-19:30pm</span>
                            </div>
                            <div className="d-flex align-items-center me-5">
                                <i className="bi bi-whatsapp me-2"></i>
                                <span>+000 0000 0000</span>
                            </div>
                            <div className="d-flex align-items-center me-5">
                                <i className="bi bi-envelope me-2"></i>
                                <span>info@test.com</span>
                            </div>
                            <div className="d-flex flex-column align-items-start">
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-geo-alt me-2"></i>
                                    <span>Address test (Address 1）</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-telephone me-2"></i>
                                    <span>+000 0000 0000</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-dark py-5">
            <div class="container"><p class="m-0 text-center text-white">Copyright &copy; Your Website 2023</p></div>
            </div>
        </footer>
    );
};

export default Footer;
