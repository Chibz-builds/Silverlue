import React, { useContext } from 'react';
import './CartModal.css';
import { StoreContext } from './context/StoreContext';
import { toast } from 'react-toastify'; 

const CartModal = ({ isOpen, onClose }) => {
    
    const { cartItems, food_list, url, removeFromCart, getTotalCartAmount, clearCart } = useContext(StoreContext);

    if (!isOpen) return null;

    // --- WHATSAPP CHECKOUT LOGIC ---
    const checkoutToWhatsapp = () => {
        if (getTotalCartAmount() === 0) {
            toast.error("Your cart is empty!");
            return;
        }

        // 1. Build the "Order Details" text
        let orderText = "";
        let itemCounter = 1;

        Object.keys(cartItems).map((key) => {
            const [itemId, itemSize] = key.split('_');
            const food = food_list.find((item) => item._id === itemId);
            const quantity = cartItems[key];

            if (food && quantity > 0) {
                // Calculate correct price per item
                let price = Number(food.price);
                if (itemSize && food.sizes && food.sizes[itemSize]) {
                    price = Number(food.sizes[itemSize]);
                }

                // Add to list: "1. Meat Pie (Regular) x 2 - N1,000"
                orderText += `${itemCounter}. ${food.name} (${itemSize ? itemSize : "Regular"}) x ${quantity} - ₦${(price * quantity).toLocaleString()}\n`;
                itemCounter++;
            }
            return null;
        });

        // 2. Define the Message Format
        // We leave Name/Location blank for them to type
        let message = `*SILVERLUE ORDER RECEIPT* \n\n`;
        message += `Customer Name: \n`;
        message += `Delivery Location: \n`;
        message += `Order Details:\n${orderText}\n`;
        message += `Total Amount: ₦${getTotalCartAmount().toLocaleString()}\n`;
        message += `Payment Method: `;

        // 3. Create the WhatsApp Link
        const phoneNumber = "+2348076516478"; 
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        // 4. Open WhatsApp
        window.open(whatsappUrl, '_blank');
        clearCart(); 
        onClose();
    }

    return (
        <div className="cart-modal-overlay" onClick={onClose}>
            <div className="cart-modal-content" onClick={(e) => e.stopPropagation()}>
                
                {/* HEADER */}
                <div className="cart-modal-header">
                    <h2>Your Cart</h2>
                    <button onClick={onClose} className="close-btn">X</button>
                </div>

                {/* ITEMS LIST */}
                <div className="cart-modal-items">
                    {Object.keys(cartItems).length === 0 ? (
                        <p style={{textAlign:'center', marginTop:'20px'}}>Your cart is empty.</p>
                    ) : (
                        Object.keys(cartItems).map((key) => {
                            const [itemId, itemSize] = key.split('_'); 
                            const food = food_list.find((item) => item._id === itemId);
                            const quantity = cartItems[key];

                            if (!food) return null;

                            let price = Number(food.price);
                            if (itemSize && food.sizes && food.sizes[itemSize]) {
                                price = Number(food.sizes[itemSize]);
                            }

                            return (
                                <div key={key} className="cart-modal-item">
                                    <img 
                                        src={food.image.startsWith('http') ? food.image : `${url}/images/${food.image}`} 
                                        alt={food.name} 
                                    />

                                    <div className="cart-item-details">
                                        <p className="cart-item-name">{food.name}</p>
                                        <p className="cart-item-size">Size: {itemSize ? itemSize : "Regular"}</p>
                                        <p className="cart-item-price">₦{price.toLocaleString()} x {quantity}</p>
                                    </div>

                                    <button 
                                        onClick={() => removeFromCart(itemId, itemSize)} 
                                        className="remove-btn"
                                    >
                                        X
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* FOOTER */}
                <div className="cart-modal-footer">
                    <div className="cart-total">
                        <span>Total:</span>
                        <span>₦{getTotalCartAmount().toLocaleString()}</span>
                    </div>
                    
                    <button onClick={checkoutToWhatsapp} className="checkout-btn">
                        PROCEED TO CHECKOUT
                    </button>
                </div>

            </div>
        </div>
    );
};

export default CartModal;