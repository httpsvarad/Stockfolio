import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, Route, Routes } from 'react-router-dom'
import MyPortfolio from './pages/MyPortfolio'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import useStore from './store/useStore'
import UserPortfolio from './pages/UserPortfolio'



const App = () => {

  const { user } = useStore();

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/portfolio"
          element={user ? <UserPortfolio /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={user ? <MyPortfolio /> : <Navigate to="/login" />} />
      </Routes>

      <ToastContainer />

    </div>
  );
};

export default App;
