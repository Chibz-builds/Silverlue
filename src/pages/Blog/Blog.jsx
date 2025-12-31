import React, { useEffect, useState, useContext } from 'react'
import './Blog.css'
import axios from 'axios'
import { StoreContext } from '../../context/storecontext' 
import { useNavigate } from 'react-router-dom' // 1. Must import this

const Blog = () => {
    
    const { url } = useContext(StoreContext); 
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate(); // 2. Must initialize this

    const fetchBlogs = async () => {
        try {
            const response = await axios.get(`${url}/api/blog/list`);
            if (response.data.success) {
                setBlogs(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    }

    useEffect(() => {
        fetchBlogs();
    }, [])

    return (
        <div className='blog-page'>
            <h1 className='blog-title'>Our Latest Stories</h1>
            
            <div className="blog-list">
                {blogs.map((item, index) => {
                    return (
                        <div key={index} className="blog-card">
                            <img 
                                src={item.image.startsWith('http') ? item.image : `${url}/images/${item.image}`} 
                                alt="" 
                                className="blog-img" 
                            />
                            <div className="blog-content">
                                <p className="blog-date">{new Date(item.date).toDateString()}</p>
                                <h2 className="blog-card-title">{item.title}</h2>
                                <p className="blog-text">{item.content.substring(0, 120)}...</p>
                                
                                {/* Read More Button */}
                                <button 
                                    className="blog-read-btn"
                                    onClick={() => navigate(`/blog/${item._id}`, { state: { blog: item } })}
                                >
                                    Read More
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Blog