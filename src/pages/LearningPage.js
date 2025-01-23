import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import '../assets/css/LearningPage.css';

const LearningPage = () => {
    const [categories, setCategories] = useState([]);
    const [learningPages, setLearningPages] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${config.backendUrl}/api/learning/categories`);
                setCategories(response.data);

                // Set the selected category based on URL query or default to the first category
                const queryParams = new URLSearchParams(location.search);
                const category = queryParams.get('category');
                if (category) {
                    setSelectedCategory(parseInt(category, 10));
                } else if (response.data.length > 0) {
                    setSelectedCategory(response.data[0].category_id);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchLearningPages = async () => {
            try {
                const response = await axios.get(`${config.backendUrl}/api/learning`);
                setLearningPages(response.data);
            } catch (error) {
                console.error('Error fetching learning pages:', error);
            }
        };

        fetchCategories();
        fetchLearningPages();
    }, [location.search]);

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
        navigate(`/learning?category=${categoryId}`);
    };

    const filteredLearningPages = learningPages.filter(page => page.category_id === selectedCategory);

    return (
        <section className="py-5">
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row">
                    <div className="col-lg-3">
                        <ul className="list-group">
                            {categories.map(category => (
                                <li
                                    key={category.category_id}
                                    className={`list-group-item ${selectedCategory === category.category_id ? 'active' : ''}`}
                                    onClick={() => handleCategoryClick(category.category_id)}
                                >
                                    {category.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-lg-9">
                        <div className="row">
                            {filteredLearningPages.map(page => (
                                <div key={page.post_id} className="col-md-4">
                                    <div className="card mb-4">
                                        <img src={`${config.backendUrl}/${page.image}`} className="card-img-top" alt={page.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{page.name}</h5>
                                            <p className="card-text">{new Date(page.date_created).toLocaleDateString()}</p>
                                            <Link to={`/learning/${page.post_id}`} className="btn btn-primary">查看更多</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LearningPage;
