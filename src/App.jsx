import React, { useState } from 'react'
import Navbar from './navbar'
import Hero from './hero'
import Body from './body' 
import ProductDetail from './pages/productDetail/productdetail'
import Blog from './pages/Blog/Blog';
import BlogDetail from './pages/BlogDetail/BlogDetail';
import Services from './pages/Services/Services';
import Contact from './pages/Contact/Contact';

// 1. IMPORT THE NEW PAGES HERE
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import MyOrders from './pages/MyOrders/MyOrders';

import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NewYearPopup from './components/NewYearPopup/NewYearPopup';

const App = () => {
  
  const [category, setCategory] = useState("None");
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
    {showLogin ? <LoginPopup setShowLogin={setShowLogin}/> : <></>}

    <div className='app'>
      
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" 
      />

      <NewYearPopup />

      <Navbar setShowLogin={setShowLogin} />
      
      <Routes>
        <Route path='/' element={
          <>
            <Hero />
            <Body category={category} setCategory={setCategory} />
          </>
        } />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/blog/:id' element={<BlogDetail />} />
        <Route path='/services' element={<Services />} />
        <Route path='/contact' element={<Contact />} />
        
      </Routes>
    </div>
    </>
  )
}

export default App