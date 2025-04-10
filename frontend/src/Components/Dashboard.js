import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center border border-blue-200">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Welcome to DoorStep</h1>
        <p className="text-gray-600 mb-6">
          You're now logged in. Feel free to explore or log out when you're done.
        </p>
        <button
          onClick={handleLogout}
          className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-5 rounded-lg transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
