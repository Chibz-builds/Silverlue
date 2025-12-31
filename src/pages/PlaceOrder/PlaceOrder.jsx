import React, { useContext, useEffect, useState } from 'react'
import './placeorder.css'
import { StoreContext } from '../../context/storecontext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {

  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    
    // Convert cartItems object into an array for the backend
    food_list.map((item) => {
      // We need to check for all sizes of this item in the cart
      // This loop is a simplified version. For strict size support:
      // You would iterate over Object.keys(cartItems) instead.
      // But for now, let's use the robust method:
      
      Object.keys(cartItems).forEach((key) => {
          let [id, size] = key.split('_');
          if (id === item._id && cartItems[key] > 0) {
             let itemInfo = JSON.parse(JSON.stringify(item)); // Clone item
             itemInfo.quantity = cartItems[key];
             itemInfo.selectedSize = size;
             orderItems.push(itemInfo);
          }
      });
    })
    
    // Remove duplicates if the map logic added them (optional safety)
    let uniqueOrderItems = [...new Set(orderItems.map(JSON.stringify))].map(JSON.parse);

    let orderData = {
      address: data,
      items: uniqueOrderItems,
      amount: getTotalCartAmount() + 2000, // +2000 for Delivery Fee
    }

    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
    
    if (response.data.success) {
      const { session_url } = response.data;
      // Since we don't have Stripe setup yet, we just redirect to My Orders
      window.location.replace('/myorders'); 
    }
    else {
      alert("Error placing order");
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/cart')
    }
    else if (getTotalCartAmount() === 0) {
      navigate('/cart')
    }
  }, [token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₦{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₦{getTotalCartAmount() === 0 ? 0 : 2000}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₦{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2000}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}


export default PlaceOrder
