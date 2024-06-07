import React from 'react';
import { useParams, Link } from 'react-router-dom';

const ProductDetailPage = () => {
    const { id } = useParams(); // Extract product id from URL params

    const productId = parseInt(id); // Convert id to integer

    // Dummy product data (replace with actual data from your API)
    const products = [
        {
            id: 1,
            name: 'Premium T-Shirt',
            description: 'High-quality cotton t-shirt with a stylish design.',
            price: 19.99,
            image: 'https://dummyimage.com/600x700/dee2e6/6c757d.jpg',
            sku: 'BST-498'
        },
        {
            id: 2,
            name: 'Casual Sneakers',
            description: 'Comfortable sneakers for everyday wear.',
            price: 39.99,
            image: 'https://dummyimage.com/600x700/dee2e6/6c757d.jpg',
            sku: 'BST-499'
        }
    ];

    // Find the product with the matching id
    const product = products.find(product => product.id === productId);

    // Return a message if the product is not found
    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <section className="py-5">
            <div className="container px-4 px-lg-5 my-5">
                <div className="row gx-4 gx-lg-5 align-items-center">
                    <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0" src={product.image} alt={product.name} /></div>
                    <div className="col-md-6">
                        <div className="small mb-1">SKU: {product.sku}</div>
                        <h1 className="display-5 fw-bolder">{product.name}</h1>
                        <div className="fs-5 mb-5">
                            <span className="text-decoration-line-through">${product.price + 5}.00</span>
                            <span>${product.price}</span>
                        </div>
                        <p className="lead">{product.description}</p>
                        <div className="d-flex">
                            <input className="form-control text-center me-3" id="inputQuantity" type="num" defaultValue="1" style={{maxWidth: '3rem'}} />
                            <button className="btn btn-outline-dark flex-shrink-0" type="button">
                                <i className="bi-cart-fill me-1"></i>
                                Add to cart
                            </button>
                            <Link to="/products" className="btn btn-dark mx-3">Back to Products</Link> {/* Add Back button */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductDetailPage;
