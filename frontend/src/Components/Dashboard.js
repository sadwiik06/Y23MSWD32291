import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <div className="card text-center shadow p-4">
        <h1 className="text-primary mb-4">Welcome to Your Dashboard</h1>
        <p className="lead">You're now logged in. Explore the features or log out below.</p>
        <button className="btn btn-outline-danger mt-3" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right me-2"></i> Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
