import React from 'react';

const AdminLogin = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <img src="src\imgs\fcritlogo.png" alt="Logo" className="h-16 w-16" />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">LOGIN</h2>
        <form>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 border rounded text-gray-700 placeholder-gray-400"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded text-gray-700 placeholder-gray-400"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gray-900 text-white py-2 px-4 rounded w-full hover:bg-gray-700 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;