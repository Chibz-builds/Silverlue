import React, { useContext } from 'react'
import './App.css'
import { StoreContext } from './context/StoreContext'
import { Link } from 'react-router-dom' 

const FoodItem = ({ id, name, price, description, image }) => {

  const { url } = useContext(StoreContext);

  return (
    <Link to={`/product/${id}`} className='food-item-link'>
      <div className='food-item'>
          <div className="food-item-img-container">
             <img 
                className='food-item-image' 
                src={image.startsWith('http') ? image : `${url}/images/${image}`} 
                alt="" 
            />
          </div>
          <div className="food-item-info">
              <p className='food-name'>{name}</p>
              <p className="food-desc">{description}</p>
              {/* FIXED: Using Naira Sign */}
              <p className="food-price-btn">₦{price}</p> 
          </div>
      </div>
    </Link>
  )
}


export default FoodItem
