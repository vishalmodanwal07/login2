// src/Login.js
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate a login API call (replace this with your API call)
      if (email === "user@example.com" && password === "password") {
        alert("Login successful");
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800">Login</h1>
        {error && (
          <p className="mt-4 text-center text-red-500">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-3 px-4 rounded-lg hover:bg-indigo-600 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-indigo-500 font-medium hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
