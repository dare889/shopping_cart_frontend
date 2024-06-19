import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', image: '', type: '', subType: '' });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${config.apiBaseUrl}api/admin/products`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${config.apiBaseUrl}api/admin/products`, newProduct, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setProducts([...products, response.data]);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div>
            <h3>Manage Products</h3>
            <form onSubmit={handleAddProduct}>
                <input type="text" placeholder="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
                <input type="text" placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
                <input type="number" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
                <input type="text" placeholder="Image URL" value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} />
                <input type="text" placeholder="Type" value={newProduct.type} onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })} />
                <input type="text" placeholder="Sub-Type" value={newProduct.subType} onChange={(e) => setNewProduct({ ...newProduct, subType: e.target.value })} />
                <button type="submit">Add Product</button>
            </form>
            <ul>
                {products.map(product => (
                    <li key={product.id}>{product.name} - ${product.price}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProductManagement;
