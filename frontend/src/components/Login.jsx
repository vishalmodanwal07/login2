// src/Login.js
import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/user/login", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full p-2 mb-3 border rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
