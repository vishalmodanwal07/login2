// src/Signup.js
import React, { useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // Simulate a signup API call (replace this with your actual API)
      if (!email || !password || !name) {
        throw new Error("All fields are required");
      }

      // For demonstration purposes
      alert("Signup Successful");
      setSuccess("Account created successfully! Please log in.");
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800">Signup</h1>
        {error && (
          <p className="mt-4 text-center text-red-500">
            {error}
          </p>
        )}
        {success && (
          <p className="mt-4 text-center text-green-500">
            {success}
          </p>
        )}
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-300 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-300 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-300 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Signup
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <a href="/" className="text-green-500 font-medium hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
