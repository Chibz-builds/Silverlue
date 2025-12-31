import React from 'react'
import './Services.css'
// Importing professional vector icons
import { FaShippingFast, FaBirthdayCake, FaWineGlassAlt, FaConciergeBell, FaGift, FaBreadSlice } from "react-icons/fa";

const Services = () => {

  const servicesList = [
    {
      icon: <FaShippingFast />,
      title: "Fast Delivery",
      desc: "Get your favorite meals and pastries delivered hot and fresh to your doorstep in record time."
    },
    {
      icon: <FaWineGlassAlt />,
      title: "Event Catering",
      desc: "Hosting a party? Let us handle the food. We provide bulk meal services for corporate and private events."
    },
    {
      icon: <FaGift />,
      title: "Gift Hampers",
      desc: "Surprise your loved ones with our curated boxes of pastries, cakes, and treats for any season."
    },
  ]

  return (
    <div className='services-page'>
      
      <div className="services-header">
        <h1 className="services-title">Our Services</h1>
        <p className="services-subtitle">
          We go beyond just serving food. Explore the variety of premium services we offer to bring joy to your table.
        </p>
      </div>

      <div className="services-grid">
        {servicesList.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h2 className="service-name">{service.title}</h2>
            <p className="service-desc">{service.desc}</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Services