import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './BlogDetail.css' // We will create this next
import { useContext } from 'react'
import { StoreContext } from '../../context/storecontext' // Check capitalization

const BlogDetail = () => {
  const { url } = useContext(StoreContext);
  const location = useLocation();
  const navigate = useNavigate();
  
  // We receive the blog data passed from the previous page
  const blog = location.state?.blog;

  // If someone goes to this URL directly without clicking, go back to list
  if (!blog) {
      return <div style={{color:'white', padding:'50px', textAlign:'center'}}>Loading... or No Blog Found</div>
  }

  return (
    <div className='blog-detail-page'>
        {/* Back Button */}
        <div onClick={() => navigate(-1)} className="blog-back-btn">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
             Back to Blogs
        </div>

        {/* Blog Content */}
        <div className="blog-detail-container">
            <img 
                src={blog.image.startsWith('http') ? blog.image : `${url}/images/${blog.image}`} 
                alt="" 
                className="blog-detail-img" 
            />
            
            <h1 className="blog-detail-title">{blog.title}</h1>
            <p className="blog-detail-date">{new Date(blog.date).toDateString()}</p>
            
            <hr style={{border:'1px solid rgba(255,255,255,0.1)', margin:'20px 0'}}/>
            
            {/* Display full text with line breaks */}
            <div className="blog-detail-content">
                {blog.content.split('\n').map((paragraph, index) => (
                    <p key={index} style={{marginBottom:'15px'}}>{paragraph}</p>
                ))}
            </div>
        </div>
    </div>
  )
}

export default BlogDetail