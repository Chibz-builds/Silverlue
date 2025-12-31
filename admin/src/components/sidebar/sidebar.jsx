import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        {/* The "NavLink" automatically knows which page is active */}
        <NavLink to='/add' className="sidebar-option">
          <p>Add Items</p>
        </NavLink>

        <NavLink to='/list' className="sidebar-option">
          <p>List Items</p>
        </NavLink>

        <NavLink to='/add-blog' className="sidebar-option">
        <p>Add Blog</p>
    </NavLink>

    <NavLink to='/list-blog' className="sidebar-option">
    <p>List Blogs</p>
    </NavLink>

    <NavLink to='/messages' className="sidebar-option">
    <p>Messages</p>
    </NavLink>
      </div>
    </div>
  )
}

export default Sidebar