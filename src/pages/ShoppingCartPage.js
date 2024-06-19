import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { CartContext } from '../components/ShoppingCart/CartContext';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const ShoppingCartPage = () => {
    const { cart, removeFromCart } = useContext(CartContext); // Use cart and removeFromCart from CartContext
    const { user } = useContext(AuthContext); // Use AuthContext to get user info
    const navigate = useNavigate(); // Use useNavigate to navigate programmatically

    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const handleCheckout = () => {
        // Redirect to checkout page or handle checkout process
        navigate('/checkout');
    };

    const handleLogin = () => {
        // Redirect to login page and then back to cart after login
        navigate('/login', { state: { from: '/cart' } });
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
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map(item => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>${item.price.toFixed(2)}</td>
                                <td>{item.quantity}</td>
                                <td>${(item.price * item.quantity).toFixed(2)}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <h3>Total Price: ${calculateTotalPrice()}</h3>
                    {/* Show login button if not logged in, else show checkout button */}
                    {user ? (
                        <button className="btn btn-primary" onClick={handleCheckout}>Proceed to Checkout</button>
                    ) : (
                        <button className="btn btn-primary" onClick={handleLogin}>Login to Checkout</button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ShoppingCartPage;
