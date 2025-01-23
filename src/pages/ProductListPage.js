import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CartContext } from '../components/ShoppingCart/CartContext';
import axios from 'axios';
import config from '../config';

import importAll from '../assets/units/importImages';

const productImages = importAll(require.context('../assets/images/products', false, /\.(PNG|JPG|jpg|png|jpe?g|svg)$/));

const ProductListPage = () => {
    const { addToCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [productToCategoryData, setProductToCategoryData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [inputQuantities, setInputQuantities] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedTypes, setExpandedTypes] = useState({});
    const productsPerPage = 15;

    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsResponse = await axios.get(`${config.backendUrl}/api/products`);
                const categoriesResponse = await axios.get(`${config.backendUrl}/api/categories`);
                const productToCategoryResponse = await axios.get(`${config.backendUrl}/api/product_to_category`);

                setProducts(productsResponse.data);
                setCategories(categoriesResponse.data);
                setProductToCategoryData(productToCategoryResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const search = searchParams.get('search')?.toLowerCase() || '';
        setSearchQuery(search);

        const type = searchParams.get('type')?.toLowerCase() || '';
        setTypeFilter(type);
    }, [location.search]);

    const getProductsByCategory = (categoryId) => {
        return products.filter(product => {
            const productCategories = productToCategoryData.filter(pc => pc.product_id === product.product_id).map(pc => pc.category_id);
            return productCategories.includes(categoryId);
        });
    };
    

    const groupCategoriesByParent = (categories) => {
        const grouped = {};
        categories.forEach(category => {
            if (category.status == [1]) {
                if (!grouped[category.parent_id]) {
                    grouped[category.parent_id] = [];
                }
                grouped[category.parent_id].push(category);
            }
        });
        return grouped;
    };

    const groupedCategories = groupCategoriesByParent(categories);

    const filteredProducts = products.filter(product =>
        (product.model.toLowerCase().includes(searchQuery) ||
            product.type?.toLowerCase().includes(searchQuery)) &&
        (typeFilter === '' || getProductsByCategory(parseInt(typeFilter)).some(p => p.product_id === product.product_id)) &&
        (minPrice === '' || product.price >= parseFloat(minPrice)) &&
        (maxPrice === '' || product.price <= parseFloat(maxPrice))
    );

    const handleInputQuantityChange = (productId, quantity) => {
        setInputQuantities(prevState => ({
            ...prevState,
            [productId]: quantity
        }));
    };

    const handleAddToCart = (product) => {
        const quantity = inputQuantities[product.product_id] || 1;
        addToCart(product, quantity);
    };

    const toggleExpand = (categoryId) => {
        setExpandedTypes(prevState => ({
            ...prevState,
            [categoryId]: !prevState[categoryId]
        }));
    };

    const handleCategoryClick = (categoryId) => {
        if (!groupedCategories[categoryId] || groupedCategories[categoryId].length === 0) {
            setTypeFilter(categoryId.toString());
            setCurrentPage(1);
        } else {
            toggleExpand(categoryId);
        }
    };

    const getCategorieIdByParentId = (parentId) => {
        return categories
            .filter(category => category.parent_id === parentId)
            .map(category => category.category_id);
    };

    const mainCategoryIds = getCategorieIdByParentId(0); 
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const startIdx = (currentPage - 1) * productsPerPage;
    const currentProducts = filteredProducts.slice(startIdx, startIdx + productsPerPage);

    return (
        <section className="py-5">
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5">
                    <div className="col-lg-3">
                        <h5>商品分類</h5>
                        <ul className="list-group">
                            <li className="list-group-item" onClick={() => setTypeFilter('')}>
                                <strong>全部</strong>
                            </li>
                            {groupedCategories[mainCategoryIds]?.map((category) => (
                                <li key={category.category_id} className="list-group-item">
                                    <div onClick={() => handleCategoryClick(category.category_id)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <strong>{category.name}</strong>
                                        {groupedCategories[category.category_id] && groupedCategories[category.category_id].length > 0 && (
                                            <span className="toggle-icon">{expandedTypes[category.category_id] ? '-' : '+'}</span>
                                        )}
                                    </div>
                                    {expandedTypes[category.category_id] && groupedCategories[category.category_id] && (
                                        <ul className="list-group">
                                            {groupedCategories[category.category_id].map((subCategory) => (
                                                <li
                                                    key={subCategory.category_id}
                                                    className={`list-group-item ${typeFilter === subCategory.category_id.toString() && 'active'}`}
                                                    onClick={() => { setTypeFilter(subCategory.category_id.toString()); setCurrentPage(1); }}
                                                >
                                                    {subCategory.name}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-lg-9">
                        <div className="row gx-4 gx-lg-5 mb-4">
                            <div className="col-md-4 mb-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="col-md-2 mb-4">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Min Price"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                />
                            </div>
                            <div className="col-md-2 mb-4">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Max Price"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-5">
                            {currentProducts.map(product => (
                                <div key={product.product_id} className="col mb-5">
                                    <div className="card h-100 product-card">
                                        <Link to={`/products/${product.product_id}`}>
                                            <div className="badge bg-red text-white position-absolute" style={{ top: '10px', right: '10px' }}>-20%</div>
                                            <img className="card-img-top product-image" src={productImages[product.image]} alt={product.model} />
                                        </Link>
                                        <div className="card-body p-4">
                                            <div className="text-center">
                                            <Link to={`/products/${product.product_id}`}>
                                                    <h5 className="fw-bolder">{product.model}</h5>
                                                </Link>
                                                <p className="old-price">HK${product.price}</p>
                                                <p className="new-price">HK${(product.price * 0.8).toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                            <div className="text-center">
                                                <input
                                                    type="number"
                                                    min="1"
                                                    className="form-control mb-2"
                                                    placeholder="Quantity"
                                                    value={inputQuantities[product.product_id] || 1}
                                                    onChange={(e) => handleInputQuantityChange(product.product_id, parseInt(e.target.value))}
                                                />
                                                <button className="btn btn-primary mt-2 cart-button" onClick={() => handleAddToCart(product)}>加入購物車</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <nav>
                            <ul className="pagination justify-content-center">
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <li key={i + 1} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                                        <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                                            {i + 1}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductListPage;
