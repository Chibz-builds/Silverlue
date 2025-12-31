import React from 'react'
import './app.css' // We can reuse the button styles
import FoodDisplay from './foodDisplay' // Import the grid here

const Body = ({ category, setCategory }) => {

  const menu_list = [
    "All",
    "Banana-Bread", 
    "Cakes", 
    "Meals", 
    "Pastries", 
  ]

  return (
    <section className="menu-section" id="menu">
        <div className="container">
            <h2 className="section-title">Our Menu</h2>
         

            {/* --- FILTER BUTTONS --- */}
            <div className="menu-btns">
                {menu_list.map((item, index) => {
                    return (
                        <button 
                            key={index} 
                            className={category === item ? "menu-btn active-btn" : "menu-btn"}
                            onClick={() => setCategory(item)}
                        >
                            {item}
                        </button>
                    )
                })}
            </div>

            {/* --- FOOD GRID --- */}
            {/* We pass the category down to the grid so it knows what to show */}
            <FoodDisplay category={category} />
            
        </div>
    </section>
  )
}

export default Body