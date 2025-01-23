import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import '../assets/css/LearningDescriptionPage.css';

const LearningDescriptionPage = () => {
    const { post_id } = useParams();
    const [article, setArticle] = useState(null);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${config.backendUrl}/api/learning/categories`);
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchArticle = async () => {
            try {
                const response = await axios.get(`${config.backendUrl}/api/learning/${post_id}`);
                setArticle(response.data);
            } catch (error) {
                console.error('Error fetching article:', error);
            }
        };

        fetchCategories();
        fetchArticle();
    }, [post_id]);

    const handleCategoryClick = (categoryId) => {
        navigate(`/learning?category=${categoryId}`);
    };

    if (!article) {
        return <div>Loading...</div>;
    }

    return (
        <section className="py-5">
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row">
                    <div className="col-lg-3">
                        <ul className="list-group">
                            {categories.map(category => (
                                <li
                                    key={category.category_id}
                                    className={`list-group-item ${article.category_id === category.category_id ? 'active' : ''}`}
                                    onClick={() => handleCategoryClick(category.category_id)}
                                >
                                    {category.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-lg-9">
                        <div className="card mb-4">
                            <img src={`${config.backendUrl}/${article.image}`} className="card-img-top" alt={article.name} />
                            <div className="card-body">
                                <h1 className="card-title post-title">{article.name}</h1>
                                <div className="card-text" dangerouslySetInnerHTML={{ __html: article.description }}></div>
                            </div>
                            <div className="card-footer text-muted">
                                <p>Views: {article.views}</p>
                                <p>Date Created: {new Date(article.date_created).toLocaleDateString()}</p>
                                <p>Last Updated: {new Date(article.date_updated).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LearningDescriptionPage;
