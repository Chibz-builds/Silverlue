import React, { useEffect, useState } from 'react'
import './ListBlog.css' // create this or copy list.css
import axios from "axios"
import { toast } from 'react-toastify'

const ListBlog = ({url}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/blog/list`);
    if(response.data.success){
      setList(response.data.data)
    } else {
      toast.error("Error")
    }
  }

  const removeBlog = async (blogId) => {
    const response = await axios.post(`${url}/api/blog/remove`, {id: blogId});
    await fetchList();
    if (response.data.success) {
        toast.success(response.data.message)
    } else {
        toast.error("Error")
    }
  }

  useEffect(()=>{
    fetchList();
  },[])

  return (
    <div className='list add flex-col'>
      <p>All Blogs List</p>
      <div className="list-table">
        <div className="list-table-format title">
            <b>Image</b>
            <b>Title</b>
            <b>Content Preview</b>
            <b>Action</b>
        </div>
        {list.map((item, index)=>{
            return(
                <div key={index} className='list-table-format'>
                    <img 
                        src={item.image.startsWith('http') ? item.image : `${url}/images/${item.image}`} 
                        alt="" 
                        style={{height:'50px'}} 
                    />
                    <p>{item.title}</p>
                    <p>{item.content.substring(0, 30)}...</p>
                    <p onClick={()=>removeBlog(item._id)} className='cursor'>X</p>
                </div>
            )
        })}
      </div>
    </div>
  )
}

export default ListBlog