import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../components/ShoppingCart/CartContext';
import config from '../config';

const ProductDetailPage = () => {
    const { id } = useParams(); // Extract product id from URL params
    const { addToCart } = useContext(CartContext); // Use addToCart from CartContext
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null); // State to store product details
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch product details from the backend
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${config.backendUrl}/api/products/${id}`);
                setProduct(response.data);

                const recommendedResponse = await axios.get(`${config.backendUrl}/api/products/recommended`);
                setRecommendedProducts(recommendedResponse.data);

            } catch (error) {
                setError('Product not found');
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        addToCart({ ...product, quantity });
    };

    const handleQuantityChange = (amount) => {
        setQuantity(prevQuantity => Math.max(1, prevQuantity + amount));
    };

    // Return a message if the product is not found
    if (error) {
        return <div>{error}</div>;
    }

    // Show loading message if product is not yet fetched
    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <img src={product.image} className="img-fluid" alt={product.model} />
                </div>
                <div className="col-md-6">
                    <h2>{product.model}</h2>
                    <h3>HK${product.price}</h3>
                    <p>詳情請聯繫WhatsApp咨詢：9201 6255</p>
                    <div>
                        <div className="input-group">
                            <button className="btn btn-secondary" onClick={() => handleQuantityChange(-1)}>-</button>
                            <input type="number" className="form-control" value={quantity} readOnly />
                            <button className="btn btn-secondary" onClick={() => handleQuantityChange(1)}>+</button>
                        </div>
                        <button className="btn btn-primary mt-3" onClick={handleAddToCart}>加入購物車</button>
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <h3>推薦產品</h3>
                <div className="row">
                    {recommendedProducts.map((product) => (
                        <div key={product.product_id} className="col-md-2">
                            <div className="card">
                                <img src={product.image} className="card-img-top" alt={product.model} />
                                <div className="card-body">
                                    <h5 className="card-title">{product.model}</h5>
                                    <p className="card-text">HK${(product.price * 0.8).toFixed(2)}</p>
                                    <button className="btn btn-primary" onClick={() => addToCart(product)}>加入購物車</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
