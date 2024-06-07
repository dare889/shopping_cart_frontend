import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductManagementPage = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', image: '' });

    // Define fetchProducts function outside of useEffect
    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts(); // Call fetchProducts when the component mounts
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/products', newProduct);
            setNewProduct({ name: '', description: '', price: '', image: '' });
            fetchProducts(); // Call fetchProducts after adding a new product
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div>
            <h2>Product Management</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={newProduct.name} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input type="text" id="description" name="description" value={newProduct.description} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input type="number" id="price" name="price" value={newProduct.price} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="image">Image URL:</label>
                    <input type="text" id="image" name="image" value={newProduct.image} onChange={handleChange} required />
                </div>
                <button type="submit">Add Product</button>
            </form>
            <h3>Products</h3>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <p>Name: {product.name}</p>
                        <p>Description: {product.description}</p>
                        <p>Price: ${product.price}</p>
                        <p>Image: <img src={product.image} alt={product.name} /></p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductManagementPage;
