import React, { useState, useEffect } from 'react'; // 1. Import hooks
import Sidebar from './components/sidebar/sidebar';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/add/add';
import List from './pages/list/list';
import Edit from './pages/edit/edit';
import AddBlog from './pages/AddBlog/AddBlog';
import ListBlog from './pages/ListBlog/ListBlog';
import Messages from './pages/Messages/Messages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login/Login'; // 2. Import the Login page

const App = () => {

  const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  const [authenticated, setAuthenticated] = useState(false);

  // 3. Check for existing login session on load
  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin === 'true') {
      setAuthenticated(true);
    }
  }, []);

  // 4. If NOT authenticated, show only Login Page
  if (!authenticated) {
    return (
      <>
        <ToastContainer/>
        <Login setAuthenticated={setAuthenticated}/>
      </>
    )
  }

  // 5. If Authenticated, show the Admin Dashboard
  return (
    <div>
      <ToastContainer />
      {/* If you have a Navbar component, put it here: <Navbar/> */}
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url={url}/>}/>
          <Route path="/list" element={<List url={url}/>}/>
          <Route path="/edit/:id" element={<Edit url={url}/>}/>
          <Route path="/addblog" element={<AddBlog url={url}/>}/>
          <Route path="/add-blog" element={<AddBlog url={url}/>}/>
          <Route path="/list-blog" element={<ListBlog url={url}/>}/>
          <Route path="/messages" element={<Messages url={url}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
