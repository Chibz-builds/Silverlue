import React, { useEffect, useState } from 'react'
import './list.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const List = ({url}) => { 

  const [list, setList] = useState([]);
  const navigate = useNavigate();

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data)
    } else {
      toast.error("Error fetching list")
    }
  }

  const removeFood = async(foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, {id:foodId});
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message)
    } else {
      toast.error("Error removing item")
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
             <img 
                src={item.image.startsWith('http') ? item.image : `${url}/images/${item.image}`} 
                alt="" 
            />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₦{item.price}</p> 
              
              <div className='action-btn-container' style={{display:'flex', gap:'15px', alignItems:'center'}}>
                  {/* PROFESSIONAL EDIT ICON (SVG) */}
                  <div onClick={()=>navigate(`/edit/${item._id}`)} style={{cursor:'pointer', color:'#666'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </div>
                  
                  {/* DELETE ICON (X) */}
                  <p onClick={()=>removeFood(item._id)} style={{cursor:'pointer', color:'tomato', fontWeight:'bold', fontSize:'18px', margin:0}}>X</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List