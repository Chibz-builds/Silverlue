import React, { useState, useEffect } from 'react';
import './NewYearPopup.css';

const NewYearPopup = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // 1. DEFINE THE EXPIRY DATE (Year-Month-Day)
        const expiryDate = new Date('2026-01-11'); // Disappears AFTER Jan 10th
        const today = new Date();

        // 2. CHECK IF USER HAS ALREADY CLOSED IT (Session Storage)
        const hasSeenPopup = sessionStorage.getItem('seenNewYearPopup');

        // 3. SHOW LOGIC
        // If today is BEFORE expiry AND user hasn't closed it yet
        if (today < expiryDate && !hasSeenPopup) {
            // Small delay so it feels like a welcome message
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const closePopup = () => {
        setIsVisible(false);
        // Remember that the user closed it for this session
        sessionStorage.setItem('seenNewYearPopup', 'true');
    };

    if (!isVisible) return null;

    return (
        <div className="new-year-overlay">
            <div className="new-year-content">
                <button className="new-year-close" onClick={closePopup}>×</button>
                
                <div className="new-year-decor">🎉 2026 🎉</div>
                
                <h1>Happy New Year!</h1>
                <p>Welcome to a fresh start! May your year be filled with flavour, joy, and delicious moments.</p>
                <p className="highlight-text">Thank you for choosing Silverlue!</p>
                
                <button className="new-year-btn" onClick={closePopup}>
                    Let's Order! 🍰
                </button>
            </div>
        </div>
    );
};

export default NewYearPopup;