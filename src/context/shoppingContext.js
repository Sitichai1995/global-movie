import React, { createContext, useContext, useState } from 'react'

export const ShoppingContext = createContext();

export const ShoppingContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]);
    };
    const removeAllCart = () => {
        setCartItems([])
    }
  
    return (
      <ShoppingContext.Provider value={{ cartItems, addToCart, removeAllCart }}>
        {children}
      </ShoppingContext.Provider>
    );
  };

export const useShoppingCart = () =>{
    return useContext(ShoppingContext);
  }