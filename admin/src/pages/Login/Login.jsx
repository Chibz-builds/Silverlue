import React, { useState } from 'react';
import './Login.css'; // We will create this CSS next

const Login = ({ setAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // Compare input with the Environment Variable
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setAuthenticated(true);
      localStorage.setItem('isAdmin', 'true'); // Save login state so refresh doesn't kick you out
    } else {
      setError(true);
    }
  };

  return (
    <div className='login-container'>
      <form onSubmit={onSubmitHandler} className='login-form'>
        <h2>Admin Panel</h2>
        <p>Please enter your access key</p>
        
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => {setPassword(e.target.value); setError(false);}}
          required 
        />
        
        {error && <p className="error-msg">Access Denied: Wrong Password</p>}
        
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;