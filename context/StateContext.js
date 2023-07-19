import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();



export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setcartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setqty] = useState(1);
    
    let foundProduct;
    let index;


    const onAdd = (product, quantity) => {

        // if item already existed in the cart
        const checkProductInCart = cartItems.find((item) => item._id === product._id);
        
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);


        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct.id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })
        
            setcartItems(updatedCartItems);
        } else {
            // if adding a new item into cart
            product.quantity = quantity;
            setcartItems([...cartItems, { ...product }]);
        }

        toast.success(`${qty} ${product.name} added the cart.`)
    }

    const onRemove = (id) => {
        foundProduct = cartItems.find((item) => item._id === id);
        const newCartItems = cartItems.filter((item) => item._id !== id);

        setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        setcartItems(newCartItems)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity)
    }


    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id);
        index = cartItems.findIndex((product) => product._id === id);
        const newCartItems = cartItems.filter((item) => item._id !== id);

        if (value === 'inc') {
            setcartItems([...newCartItems, { ... foundProduct, quantity: foundProduct.quantity + 1}]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)

        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                setcartItems([...newCartItems, { ... foundProduct, quantity: foundProduct.quantity - 1}]);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1)
            }
            
        }
    }

    const incQty = () => {
        setqty( (prevQty)=> prevQty + 1);

    }

    const decQty = () => {
        setqty((prevQty)=> {
            if (prevQty - 1 < 1) return 1;
            return prevQty - 1;
        });

    }

    return(
        <Context.Provider
            value={{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                setShowCart,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuantity,
                onRemove,
                setcartItems,
                setTotalPrice,
                setTotalQuantities
            }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);