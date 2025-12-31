import React, { useEffect, useState } from 'react'
import './Messages.css'
import axios from "axios"
import { toast } from 'react-toastify'

const Messages = ({url}) => {
  
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    const response = await axios.get(`${url}/api/contact/list`);
    if (response.data.success) {
      setMessages(response.data.data.reverse());
      
      // NOTIFICATION LOGIC: Check if there are any unread messages
      const unreadCount = response.data.data.filter(msg => !msg.read).length;
      if (unreadCount > 0) {
          // Browser Notification (Works if tab is open)
          if (Notification.permission === "granted") {
            new Notification(`You have ${unreadCount} new messages!`);
          } else if (Notification.permission !== "denied") {
            Notification.requestPermission();
          }
      }
    }
  }

  // UPDATED: Mark as read AND Open Email
  const handleReply = async (id, email, subject, name) => {
      // 1. Mark as Read in Database
      await axios.post(`${url}/api/contact/read`, {id: id});
      
      // 2. Refresh the list to remove the badge
      await fetchMessages();

      // 3. Open Email App
      const replySubject = `Re: ${subject}`;
      const replyBody = `Hi ${name},\n\nThank you for reaching out to us.\n\n`;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(replySubject)}&body=${encodeURIComponent(replyBody)}`;
  }

  useEffect(() => {
    fetchMessages();
    
    // Check for permissions on load
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
  }, [])

  return (
    <div className='list add flex-col'>
      <p>Customer Messages</p>
      <div className="list-table">
        <div className="list-table-format title">
            <b>Status</b> {/* New Column */}
            <b>Date</b>
            <b>Name</b>
            <b>Subject</b>
            <b>Message</b>
            <b>Action</b>
        </div>
        {messages.map((item, index) => {
            return (
                <div key={index} className='list-table-format'>
                    
                    {/* NEW: The Status Badge */}
                    <div className="status-col">
                        {!item.read ? (
                            <span className="new-badge">NEW</span>
                        ) : (
                            <span className="read-badge">Read</span>
                        )}
                    </div>

                    <p>{new Date(item.date).toLocaleDateString()}</p>
                    <p style={{fontWeight:'bold'}}>{item.name}<br/><span style={{fontSize:'12px', fontWeight:'normal', color:'#888'}}>{item.email}</span></p>
                    <p>{item.subject}</p>
                    <p>{item.message}</p>
                    
                    <button 
                        // Pass ID now too
                        onClick={() => handleReply(item._id, item.email, item.subject, item.name)}
                        className='reply-btn'
                    >
                        Reply
                    </button>
                </div>
            )
        })}
      </div>
    </div>
  )
}

export default Messages