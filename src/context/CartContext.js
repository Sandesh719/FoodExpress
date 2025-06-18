// src/context/CartContext.js
import { createContext, useState, useContext,useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // useEffect(()=>{
    //     sessionStorage.setItem('cart',JSON.stringify(cart));
    // },[cart]);

    // console.log(sessionStorage.getItem('cart'));

    const addToCart = (item) => {
        // console.log(item);
        setCart(prev => {
            const existingItem = prev.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return prev.map(cartItem =>
                    cartItem.id === item.id 
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
                );
            }
            // console.log(cart);
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const updateQuantity = (id, newQuantity) => {
        setCart(prev => 
            prev.map(item =>
                item.id === id 
                ? { ...item, quantity: Math.max(1, newQuantity) }
                : item
            )
        );
};

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity,removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);