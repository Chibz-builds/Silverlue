import React, { useState, useContext } from 'react'
import './Contact.css'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from 'react-toastify'; 
import axios from 'axios';
import { StoreContext } from '../../context/storecontext'; // Import Context

const Contact = () => {

  const { url } = useContext(StoreContext); // Get backend URL

  const [data, setData] = useState({
      name: "",
      email: "",
      subject: "",
      message: ""
  });

  const onChangeHandler = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setData(data => ({ ...data, [name]: value }));
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    // Call the Backend API
    try {
        const response = await axios.post(`${url}/api/contact/send`, data);
        if (response.data.success) {
            toast.success(response.data.message);
            // Clear form after success
            setData({ name: "", email: "", subject: "", message: "" });
        } else {
            toast.error("Something went wrong");
        }
    } catch (error) {
        toast.error("Error connecting to server");
    }
  }

  return (
    <div className='contact-page'>
      
      <div className="contact-header">
        <h1 className="contact-title">Get in Touch</h1>
        <p style={{color:'#ccc'}}>Have a question or want to book a table? We'd love to hear from you.</p>
      </div>

      <div className="contact-content">
        
        {/* LEFT SIDE: Contact Info */}
        <div className="contact-info">
            <div className="info-item">
                <div className="info-icon"><FaPhoneAlt /></div>
                <div className="info-text">
                    <h3>Phone</h3>
                    <p>+234 807 651 6478</p>
                </div>
            </div>
            <div className="info-item">
                <div className="info-icon"><FaEnvelope /></div>
                <div className="info-text">
                    <h3>Email</h3>
                    <p>Silverlue24@gmail.com</p>
                </div>
            </div>
            <div className="info-item">
                <div className="info-icon"><FaMapMarkerAlt /></div>
                <div className="info-text">
                    <h3>Address</h3>
                    <p>10, OYEDELE CLOSE, LAGOS, LAGOS STATE,
                    NIGERIA</p>
                </div>
            </div>
        </div>

        {/* RIGHT SIDE: Contact Form */}
        <div className="contact-form-section">
            <form onSubmit={onSubmitHandler} className="contact-form">
                <div className="form-group">
                    <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="Your Email" required />
                </div>
                <div className="form-group">
                    <input name='subject' onChange={onChangeHandler} value={data.subject} type="text" placeholder="Subject" required />
                </div>
                <div className="form-group">
                    <textarea name='message' onChange={onChangeHandler} value={data.message} rows="5" placeholder="Write your message here..." required></textarea>
                </div>
                <button type="submit" className="submit-btn">Send Message</button>
            </form>
        </div>

      </div>
    </div>
  )
}

export default Contact