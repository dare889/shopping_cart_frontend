import React, { useEffect, useState } from 'react';
import axios from 'axios';
import importAll from '../assets/units/importImages';
import config from '../config'; // Make sure to create a config file for API base URL

// Dynamically import all images from the assets/images directory
const images = importAll(require.context('../assets/images', false, /\.(png|jpe?g|svg)$/));
const productImages = importAll(require.context('../assets/images/home_products', false, /\.(png|jpe?g|svg)$/));

const Home = () => {
    const [hotItems, setHotItems] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [products, setProducts] = useState([]);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    useEffect(() => {
        const fetchHotItems = async () => {
            try {
                const response = await axios.get(`${config.apiBaseUrl}/api/products`);
                const hotItemsData = response.data.filter(item => item.hot_item);
                setHotItems(shuffleArray(hotItemsData));
            } catch (error) {
                console.error('Error fetching hot items:', error);
            }
        };

        const fetchDoctors = async () => {
            try {
                const response = await axios.get(`${config.backendUrl}/api/doctors`);
                const doctorData = response.data.slice(0, 4); // Get only the first 4 doctors
                setDoctors(doctorData);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${config.backendUrl}/api/products`);
                const productData = response.data.slice(0, 8); // Get only the first 8 products
                setProducts(productData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchHotItems();
        fetchDoctors();
        fetchProducts();
    }, []);

    const carouselItems = [
        {
            src: images['banner1.png'],
            alt: '藥師堂中醫綜合診所 專業團隊，有保障',
            caption: '藥師堂中醫綜合診所',
            text: '專業團隊，有保障'
        },
        {
            src: images['banner2.png'],
            alt: '藥師堂中醫綜合診所 藥專科學貴精誠 師承國粹滙精英',
            caption: '藥師堂中醫綜合診所',
            text: '藥專科學貴精誠 師承國粹滙精英'
        },
        // Add more slides as needed
    ];

    const hotItemsList1 = hotItems.slice(0, 3);
    const hotItemsList2 = hotItems.slice(3, 11);



    const articles = [
        {
            title: '亞健康',
            image: images['v101_256.png'],
            date: '10/10/2021',
            url: '/learning/3'
        },
        {
            title: '20個運動減肥方法',
            image: images['v101_272.png'],
            date: '10/10/2021',
            url: '/learning/4'
        },
        {
            title: '個人衛生',
            image: images['v101_285.png'],
            date: '10/10/2021',
            url: '/learning/7'
        },
        {
            title: '近視問題',
            image: images['v101_298.png'],
            date: '10/10/2021',
            url: '/learning/8'
        }
    ];

    return (
        <div className="container px-4 px-lg-5">

            {/* Carousel (Slideshow) */}
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    {carouselItems.map((item, index) => (
                        <button
                            key={index}
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to={index}
                            className={index === 0 ? 'active' : ''}
                            aria-current={index === 0 ? 'true' : 'false'}
                            aria-label={`Slide ${index + 1}`}
                        ></button>
                    ))}
                </div>
                <div className="carousel-inner">
                    {carouselItems.map((item, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <img src={item.src} className="d-block w-100" alt={item.alt} />
                            <div className="carousel-caption d-none d-md-block">
                                <p>{item.caption}</p>
                                <h5>{item.text}</h5>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            {/* Info Section */}
            <div className="info-section xs-100 sm-100 md-100 lg-100 xl-100">
                <div className="left">
                    <div className="intro">
                        <h3>關於我們</h3>
                        <h2>中醫門診部簡介</h2>
                        <p>「藥師堂中醫門診」於2003年創辦，為發展中醫藥業訂下目標及宗旨，弘揚中醫中藥，造福社群健康；本診所由多位具有專業資格及大學畢業的全科註冊中醫師主理，配藥員亦受專業培訓。</p>
                    </div>
                </div>
                <div className="right">
                    <div class="item">
                        <div class="space">&nbsp;</div>

                        <div class="txt">
                            <div class="icon"><img alt="" src={images['help2x.png']} /></div>

                            <div class="del">
                                <h2>有什麼可以幫到您？</h2>
                                <p>內科、婦科、男科、兒科、針灸、骨傷、皮膚科、 腫瘤科、理療推拿、刮痧拔罐</p>
                            </div>
                        </div>

                        <div class="feature">
                            <a href="/service"><span>服務範圍</span> <img alt="" src={images['enter12x.png']} /> </a>
                        </div>
                    </div>

                    <div class="item">
                        <div class="space">&nbsp;</div>

                        <div class="txt">
                            <div class="icon"><img alt="" src={images['address2x.png']} /></div>

                            <div class="del">
                                <h2>我們的地址</h2>
                                <p>九龍彌敦道521-523號禮基大廈12樓C（港鐵油麻地站B1出口）</p>
                            </div>
                        </div>

                        <div class="feature">
                            <a href="/about"><span>聯絡我們</span> <img alt="" src={images['enter12x.png']} /> </a>
                        </div>
                    </div>

                    <div class="item">
                        <div class="space">&nbsp;</div>

                        <div class="txt">
                            <div class="icon"><img alt="" src={images['protect2x.png']} /></div>

                            <div class="del">
                                <h2>怎樣可以保障健康？</h2>
                                <p>本所產品經過嚴格把控，可以放心選購，品質保證。</p>
                            </div>
                        </div>

                        <div class="feature">
                            <a href="/products"><span>保健產品</span> <img alt="" src={images['enter12x.png']} /> </a>
                        </div>
                    </div>
                </div>
            </div>

        {/* Doctors Section */}
        <div className="doctors-section">
            <div className="content">
                <h2>我們的醫療權威專家</h2>
                <h3>網上視診服務</h3>
                <div className="doctors">
                    {doctors.map((doctor, index) => (
                        <div className="doctor" key={index}>
                            <img src={`${config.backendUrl}/${doctor.image}`} alt={doctor.name} />
                            <h4>{doctor.name}</h4>
                            <div className="doctor-info">
                                <p>{doctor.doctor_category}</p>
                                <p>{doctor.introductory}</p>
                                <a href="#" className="book-button">立即預約</a>
                            </div>
                        </div>
                    ))}
                </div>
                <a href="/doctors" className="more-button">更多醫生 →</a>
            </div>
        </div>

        {/* Products Section */}
        <div className="product-section">
            <h2>產品中心</h2>
            <div className="products">
                {products.map((product, index) => (
                    <div className="product" key={index}>
                        <a href={`/products/${product.product_id}`}>
                            <img
                                src={product.image}
                                title={product.name}
                                alt={product.name}
                                width="240"
                                height="240"
                            />
                        </a>
                        <div className="discount-label">-20%</div>
                        <div className="product-info">
                            <h4>{product.model}</h4>
                            <p className="price"><span className="price-old">{product.discount_price}</span> <span className="price-new">{product.price}</span></p>
                            <a href={`/products/${product.product_id}`} className="view-button">查看產品</a>
                        </div>
                    </div>
                ))}
            </div>
            <a href="/products" className="more-button">更多產品 →</a>
        </div>

        {/* Articles Section */}
        <div className="health-section">
            <h2>健康小百科</h2>
            <div className="articles">
                {articles.map((article, index) => (
                    <div className="article" key={index}>
                        <a href={article.url}>
                            <img src={article.image} alt={article.title} width={500}/>
                            <div className="overlay">
                                <h4>{article.title}</h4>
                                <p>{article.date}</p>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
            <a href="/learning" className="more-button">中醫智慧 →</a>
        </div>
    </div>
    );
}

export default Home;
