// src/components/Login.js
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/user/login", formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // Include cookies
      });

      if (response.data.access_token) {
        // Set the access token (and optionally refresh token) in cookies
        document.cookie = `access_token=${response.data.access_token}; path=/; HttpOnly; Secure`;
        if (response.data.refresh_token) {
          document.cookie = `refresh_token=${response.data.refresh_token}; path=/; HttpOnly; Secure`;
        }

        alert("Login successful!");
      } else {
        alert("Login failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again.");
    }
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
