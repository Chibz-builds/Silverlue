import React, { useContext } from 'react'
import './app.css' // Make sure you have this CSS file
import { StoreContext } from './context/storecontext' // Matches your lowercase filename
import FoodItem from './fooditems' // Matches your lowercase filename

const FoodDisplay = ({ category }) => {

  const { food_list } = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
          }
        })}
      </div>
    </div>
  )
}

export default FoodDisplay