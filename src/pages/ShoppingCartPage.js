import React, { useContext } from 'react';
import { CartContext } from '../components/ShoppingCart/CartContext';

const ShoppingCartPage = () => {
    
    const { cart, removeFromCart } = useContext(CartContext); // Use cart and removeFromCart from CartContext

    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
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
                        {cart.map(item => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>${item.price.toFixed(2)}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>Remove</button>
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
