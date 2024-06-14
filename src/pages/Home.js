import React, { useEffect, useState } from 'react';
import axios from 'axios';
import importAll from '../assets/units/importImages';
import config from '../config'; // Make sure to create a config file for API base URL

// Dynamically import all images from the assets/images directory
const images = importAll(require.context('../assets/images', false, /\.(png|jpe?g|svg)$/));

const Home = () => {
    const [hotItems, setHotItems] = useState([]);

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
        fetchHotItems();
    }, []);

    const carouselItems = [
        {
            src: images['6c757d2.jpg'],
            alt: 'Slide 1'
        },
        {
            src: images['6c757d2.jpg'],
            alt: 'Slide 2'
        },
        {
            src: images['6c757d2.jpg'],
            alt: 'Slide 3'
        }
    ];

    const hotItemsList1 = hotItems.slice(0, 3);
    const hotItemsList2 = hotItems.slice(3, 11);

    return (
        <div className="container px-4 px-lg-5">
            {/* Heading Row */}
            <div className="row gx-4 gx-lg-5 align-items-center my-5">
                <div className="col-lg-7">
                    <img className="img-fluid rounded mb-4 mb-lg-0" src={images['6c757d2.jpg']} alt="..." />
                </div>
                <div className="col-lg-5">
                    <h1 className="font-weight-light">Business Name or Tagline</h1>
                    <p>This is a template that is great for small businesses. It doesn't have too much fancy flare to it, but it makes a great use of the standard Bootstrap core components. Feel free to use this template for any project you want!</p>
                    <a className="btn btn-primary" href="#!">Call to Action!</a>
                </div>
            </div>
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

            {/* Call to Action */}
            <div className="card text-white bg-secondary my-5 py-4 text-center">
                <div className="card-body"><p className="text-white m-0">This call to action card is a great place to showcase some important information or display a clever tagline!</p></div>
            </div>
            {/* Content Row */}
            <div className="row gx-4 gx-lg-5">
                <div className="col-md-4 mb-5">
                    <div className="card h-100">
                        <div className="card-body">
                            <h2 className="card-title">Card One</h2>
                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem magni quas ex numquam, maxime minus quam molestias corporis quod, ea minima accusamus.</p>
                        </div>
                        <div className="card-footer"><a className="btn btn-primary btn-sm" href="#!">More Info</a></div>
                    </div>
                </div>
                <div className="col-md-4 mb-5">
                    <div className="card h-100">
                        <div className="card-body">
                            <h2 className="card-title">Card Two</h2>
                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod tenetur ex natus at dolorem enim! Nesciunt pariatur voluptatem sunt quam eaque, vel, non in id dolore voluptates quos eligendi labore.</p>
                        </div>
                        <div className="card-footer"><a className="btn btn-primary btn-sm" href="#!">More Info</a></div>
                    </div>
                </div>
                <div className="col-md-4 mb-5">
                    <div className="card h-100">
                        <div className="card-body">
                            <h2 className="card-title">Card Three</h2>
                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem magni quas ex numquam, maxime minus quam molestias corporis quod, ea minima accusamus.</p>
                        </div>
                        <div className="card-footer"><a className="btn btn-primary btn-sm" href="#!">More Info</a></div>
                    </div>
                </div>
            </div>
            {/* Content Row Hot item list 1 Show 3 random items */}
            <div className="row gx-4 gx-lg-5">
                {hotItemsList1.map(item => (
                    <div key={item.id} className="col-md-4 mb-5">
                        <div className="card h-100">
                            <div className="card-header">
                                <h2 className="card-title">{item.name}</h2>
                                <h5 className="card-subtitle mb-2 text-muted">Nectar Price</h5>
                                <p className="card-text">£{item.price}</p>
                            </div>
                            <img className="card-img-top" src={item.image} alt={item.name} />
                            <div className="card-body">
                                <p className="card-text">Without Nectar £{item.original_price}</p>
                                <button className="btn btn-primary btn-sm">Add</button>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">Delivery by {item.delivery_date}</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Hot item list 2 Show 8 random items */}
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5">
                    {hotItemsList2.map((item, index) => (
                        <div key={item.id} className="col-md-3 mb-5">
                            <div className="card h-100">
                                <div className="card-header">
                                    <h2 className="card-title">{item.name}</h2>
                                    <h5 className="card-subtitle mb-2 text-muted">Nectar Price</h5>
                                    <p className="card-text">£{item.price}</p>
                                </div>
                                <img className="card-img-top" src={item.image} alt={item.name} />
                                <div className="card-body">
                                    <p className="card-text">Without Nectar £{item.original_price}</p>
                                    <button className="btn btn-primary btn-sm">Add</button>
                                </div>
                                <div className="card-footer">
                                    <small className="text-muted">Delivery by {item.delivery_date}</small>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
