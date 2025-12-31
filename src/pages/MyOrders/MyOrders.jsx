import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/storecontext'
import axios from 'axios'

const MyOrders = () => {

  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
    setData(response.data.data);
  }

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token])

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div key={index} className='my-orders-order'>
              {/* Parcel Icon - Use an SVG if you don't have assets */}
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="tomato" viewBox="0 0 16 16"><path d="M3 2.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-8z"/><path d="M1 4v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4H1z"/></svg>
              
              <p>{order.items.map((item, index) => {
                if (index === order.items.length - 1) {
                  return item.name + " x " + item.quantity
                }
                else {
                  return item.name + " x " + item.quantity + ", "
                }
              })}</p>
              <p>₦{order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p><span>&#x25cf;</span> <b>{order.status}</b></p>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyOrders