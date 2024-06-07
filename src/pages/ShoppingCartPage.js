import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShoppingCartPage = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Fetch cart items from the backend when the component mounts
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('/api/cart');
                setCartItems(response.data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };
        fetchCartItems();
    }, []);

    const handleRemoveFromCart = async (itemId) => {
        try {
            // Send a DELETE request to remove the item from the cart
            await axios.delete(`/api/cart/${itemId}`);
            // Update the list of cart items
            const updatedCartItems = cartItems.filter(item => item.id !== itemId);
            setCartItems(updatedCartItems);
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
    };

    return (
        <section className="py-5">
            <div className="container px-4 px-lg-5">
                <h2 className="mb-4">Shopping Cart</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map(item => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>${item.price.toFixed(2)}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <h3>Total Price: ${calculateTotalPrice()}</h3>
                    {/* Add checkout button or additional functionality here */}
                </div>
            </div>
        </section>
    );
};

export default ShoppingCartPage;
