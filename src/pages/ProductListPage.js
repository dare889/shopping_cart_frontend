import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link


const ProductListPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products from backend API when the component mounts
        const fetchProducts = async () => {
            try {
                //const response = await axios.get('/api/products');
                //setProducts(response.data);
                const mockProducts = [
                    {
                        id: 1,
                        name: 'Mock Product 1',
                        description: 'Description for Mock Product 1',
                        price: 10.99,
                        image: 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg'
                    },
                    {
                        id: 2,
                        name: 'Mock Product 2',
                        description: 'Description for Mock Product 2',
                        price: 20.99,
                        image: 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg'
                    },
                    // Add more mock products as needed
                ];

                setProducts(mockProducts); 
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []); // Empty dependency array ensures useEffect runs only once

    return (
        <section className="py-5">
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    {products.map(product => (
                        <div key={product.id} className="col mb-5">
                            <div className="card h-100">
                                <img className="card-img-top" src={product.image} alt={product.name} />
                                <div className="card-body p-4">
                                    <div className="text-center">
                                        <h5 className="fw-bolder">{product.name}</h5>
                                        <p>Description: {product.description}</p>
                                        <p>Price: ${product.price}</p>
                                    </div>
                                </div>
                                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div className="text-center">
                                        <Link className="btn btn-outline-dark mt-auto" to={`/products/${product.id}`}>View options</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductListPage;
