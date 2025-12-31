import React, { useContext, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { StoreContext } from './context/storecontext.jsx'; // Ensure path is correct
import CartModal from './CartModal.jsx';
import logo from './assets/logo.png'; // Keep logo if you have it, or remove
import cart from './assets/cart.png'; // Keep cart if you have it, or remove

const Navbar = ({ setShowLogin }) => {

  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getCartCount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
           {/* If you don't have a logo image, just use text <h2>MyFood</h2> */}
           <Link to='/'><img src={logo} alt="Logo" className="logo" /></Link>
        </div>

        <ul className="nav-links">
            <Link to='/' className={path === '/' ? "link active" : "link"}>Home</Link>
            <Link to='/blog' className={path === '/blog' ? "link active" : "link"}>Blog</Link>
            <Link to='/services' className={path === '/services' ? "link active" : "link"}>Services</Link>
            <Link to='/contact' className={path === '/contact' ? "link active" : "link"}>Contact</Link>


            <a className="cart-icon" onClick={() => setIsCartOpen(true)} style={{cursor: 'pointer'}}>
                <img src={cart} alt="cart" className='cart-img'/>
                <span className='cartCount'>{getCartCount()}</span>
            </a>

          
        </ul>
      </nav>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}

export default Navbar