import React, { useContext } from 'react'
import './App.css'
import { StoreContext } from './context/storecontext'
import { Link } from 'react-router-dom' 

const FoodItem = ({ id, name, price, description, image }) => {

  const { url } = useContext(StoreContext);

  // Helper to optimize Cloudinary images
  const optimizeUrl = (imageUrl) => {
    if (!imageUrl) return "";
    
    // Only optimize if it is a Cloudinary URL
    if (imageUrl.includes("cloudinary")) {
      // Inject settings: Width 500px, Auto Quality, Auto Format
      return imageUrl.replace("/upload/", "/upload/w_500,q_auto,f_auto/");
    }
    
    // If it's a local image (old uploads), return as is
    return imageUrl;
  };

  return (
    <Link to={`/product/${id}`} className='food-item-link'>
      <div className='food-item'>
          <div className="food-item-img-container">
            <img 
    className='food-item-image' 
    // WRAP THE LOGIC BELOW WITH optimizeUrl(...)
    src={ optimizeUrl(image.startsWith('http') ? image : `${url}/images/${image}`) } 
    alt="" 
    loading="lazy" // Optional: Add this for extra speed
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



