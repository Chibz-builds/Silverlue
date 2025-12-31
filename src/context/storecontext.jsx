import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
   const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
    const [food_list, setFoodList] = useState([]);

    // ... (Keep addToCart, removeFromCart, getTotalCartAmount as they are) ...

    const addToCart = (itemId, size, quantity = 1) => {
        let itemKey = itemId;
        if (size && size !== "null" && size !== "undefined") {
            itemKey = `${itemId}_${size}`;
        }
        if (!cartItems[itemKey]) {
            setCartItems((prev) => ({ ...prev, [itemKey]: quantity }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemKey]: prev[itemKey] + quantity }));
        }
    };

    const removeFromCart = (itemId, size) => {
        let itemKey = itemId;
        if (size && size !== "null" && size !== "undefined") {
            itemKey = `${itemId}_${size}`;
        }
        setCartItems((prev) => {
            const newCart = { ...prev };
            if (newCart[itemKey] > 1) {
                newCart[itemKey] -= 1;
            } else {
                delete newCart[itemKey];
            }
            return newCart;
        });
    };

    // --- NEW FUNCTION: CLEAR CART ---
    const clearCart = () => {
        setCartItems({});
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemKey in cartItems) {
            if (cartItems[itemKey] > 0) {
                const [itemId, itemSize] = itemKey.split('_'); 
                const itemInfo = food_list.find((product) => product._id === itemId);
                if (itemInfo) {
                    let price = Number(itemInfo.price);
                    if (itemSize && itemInfo.sizes && itemInfo.sizes[itemSize]) {
                        price = Number(itemInfo.sizes[itemSize]);
                    }
                    if (!isNaN(price)) {
                        totalAmount += price * cartItems[itemKey];
                    }
                }
            }
        }
        return totalAmount;
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const item in cartItems) {
            try {
                if (cartItems[item] > 0) {
                    totalCount += cartItems[item];
                }
            } catch (error) {
                console.error(error);
            }
        }
        return totalCount;
    }

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            if (response.data.success) {
                setFoodList(response.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch food list:", error);
        }
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
        }
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        clearCart, // <--- EXPORT THE NEW FUNCTION HERE
        getTotalCartAmount,
        getCartCount, 
        url
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;