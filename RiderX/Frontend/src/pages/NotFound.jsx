// src/pages/NotFound.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-6">
      <h1 className="text-6xl font-bold mb-2">404</h1>
      <p className="text-2xl mb-4">Oops! This page doesn't exist 🚧</p>
      <p className="mb-6 text-center max-w-md">
        Looks like you took a wrong turn. But hey, no worries — we’ll get you back on track!
      </p>
      
      <button
        onClick={handleGoHome}
        className="px-5 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        🏠 Take Me Home
      </button>
      
      <div className="mt-10 text-3xl animate-bounce">🚀</div>
    </div>
  );
};

export default NotFound;
