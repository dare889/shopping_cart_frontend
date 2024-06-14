import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../components/ShoppingCart/CartContext';
import config from '../config';

const ProductDetailPage = () => {
    const { id } = useParams(); // Extract product id from URL params
    const { addToCart } = useContext(CartContext); // Use addToCart from CartContext
    const [product, setProduct] = useState(null); // State to store product details
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch product details from the backend
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${config.apiBaseUrl}api/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                setError('Product not found');
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    // Return a message if the product is not found
    if (error) {
        return <div>{error}</div>;
    }

    // Show loading message if product is not yet fetched
    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <section className="py-5">
            <div className="container px-4 px-lg-5 my-5">
                <div className="row gx-4 gx-lg-5 align-items-center">
                    <div className="col-md-6">
                        <img className="card-img-top mb-5 mb-md-0" src={product.image} alt={product.name} />
                    </div>
                    <div className="col-md-6">
                        <div className="small mb-1">SKU: {product.sku || 'N/A'}</div>
                        <h1 className="display-5 fw-bolder">{product.name}</h1>
                        <div className="fs-5 mb-5">
                            <span className="text-decoration-line-through">${product.original_price}</span>
                            <span>${product.price}</span>
                        </div>
                        <p className="lead">{product.description}</p>
                        <div className="d-flex">
                            <input className="form-control text-center me-3" id="inputQuantity" type="number" defaultValue="1" style={{maxWidth: '3rem'}} />
                            <button className="btn btn-outline-dark flex-shrink-0" type="button" onClick={() => addToCart(product)}>
                                <i className="bi-cart-fill me-1"></i>
                                Add to cart
                            </button>
                            <Link to="/products" className="btn btn-dark mx-3">Back to Products</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetailPage;
