import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation
import { CartContext } from '../components/ShoppingCart/CartContext';
import axios from 'axios';
import config from '../config';

const ProductListPage = () => {
    const { addToCart } = useContext(CartContext); 
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [subTypeFilter, setSubTypeFilter] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [uniqueTypes, setUniqueTypes] = useState([]);
    const [uniqueSubTypes, setUniqueSubTypes] = useState([]);

    const location = useLocation(); // Use useLocation to capture search query from URL

    useEffect(() => {
        // Fetch products from backend API when the component mounts
        const fetchProducts = async () => {
            try {
                const mockProducts = [
                    {
                        id: 1,
                        name: 'Mock Product 1',
                        description: 'Description for Mock Product 1',
                        price: 10.99,
                        image: 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg',
                        type: 'Electronics',
                        subType: 'Mobile Phones'
                    },
                    {
                        id: 2,
                        name: 'Mock Product 2',
                        description: 'Description for Mock Product 2',
                        price: 20.99,
                        image: 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg',
                        type: 'Clothing',
                        subType: 'T-shirts'
                    },
                    {
                        id: 3,
                        name: 'Mock Product 3',
                        description: 'Description for Mock Product 3',
                        price: 15.99,
                        image: 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg',
                        type: 'Electronics',
                        subType: 'Laptops'
                    }
                ];

                //setProducts(mockProducts);

                const response = await axios.get(`${config.apiBaseUrl}api/products`);
                const products = response.data;
                
                setProducts(products);

                // Get unique types and subtypes from the products
                const types = [...new Set(mockProducts.map(product => product.type))];
                const subTypes = [...new Set(mockProducts.filter(product => product.type === typeFilter).map(product => product.subType))];
                setUniqueTypes(types);
                setUniqueSubTypes(subTypes);

            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, [typeFilter]); // Re-run the effect when typeFilter changes

    useEffect(() => {
        // Update search query from URL
        const searchParams = new URLSearchParams(location.search);
        const search = searchParams.get('search')?.toLowerCase() || '';
        setSearchQuery(search);

        // Set typeFilter and subTypeFilter if present in the URL
        const type = searchParams.get('type')?.toLowerCase() || '';
        const subType = searchParams.get('subtype')?.toLowerCase() || '';
        setTypeFilter(type);
        setSubTypeFilter(subType);
    }, [location.search]);

    // Filter products based on the search query, type, subtype, and price range
    const filteredProducts = products.filter(product =>
        (product.name.toLowerCase().includes(searchQuery) ||
        product.type.toLowerCase().includes(searchQuery) ||
        product.subType.toLowerCase().includes(searchQuery)) &&
        (typeFilter === '' || product.type.toLowerCase() === typeFilter.toLowerCase()) &&
        (subTypeFilter === '' || product.subType.toLowerCase() === subTypeFilter.toLowerCase()) &&
        (minPrice === '' || product.price >= parseFloat(minPrice)) &&
        (maxPrice === '' || product.price <= parseFloat(maxPrice))
    );

    return (
        <section className="py-5">
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5">
                    {/* Search input field for product name */}
                    <div className="col-md-4 mb-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    {/* Dropdown select box for item type */}
                    <div className="col-md-4 mb-4">
                        <select
                            className="form-select"
                            value={typeFilter}
                            onChange={(e) => {
                                setTypeFilter(e.target.value);
                                setSubTypeFilter('');
                            }}
                        >
                            <option value="">All Types</option>
                            {uniqueTypes.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                    {/* Dropdown select box for item subtype */}
                    <div className="col-md-4 mb-4">
                        <select
                            className="form-select"
                            value={subTypeFilter}
                            onChange={(e) => setSubTypeFilter(e.target.value)}
                        >
                            <option value="">All Subtypes</option>
                            {uniqueSubTypes.map((subType, index) => (
                                <option key={index} value={subType}>{subType}</option>
                            ))}
                        </select>
                    </div>
                    {/* Input field for minimum price */}
                    <div className="col-md-2 mb-4">
                        <input
                            type="number"
                            id="minPrice"
                            className="form-control"
                            placeholder="Min Price"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                    </div>
                    {/* Input field for maximum price */}
                    <div className="col-md-2 mb-4">
                        <input
                            type="number"
                            id="maxPrice"
                            className="form-control"
                            placeholder="Max Price"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="col mb-5">
                            <div className="card h-100">
                                <img className="card-img-top" src={product.image} alt={product.name} />
                                <div className="card-body p-4">
                                    <div className="text-center">
                                        <h5 className="fw-bolder">{product.name}</h5>
                                        <p>Description: {product.description}</p>
                                        <p>Price: ${product.price}</p>
                                        <p>Type: {product.type}</p>
                                        <p>Sub-Type: {product.subType}</p>
                                    </div>
                                </div>
                                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div className="text-center">
                                        <Link className="btn btn-outline-dark mt-auto" to={`/products/${product.id}`}>View options</Link>
                                        <button className="btn btn-primary mt-2" onClick={() => addToCart(product)}>Add to Cart</button>
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