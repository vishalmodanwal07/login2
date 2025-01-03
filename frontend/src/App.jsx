// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route , Link} from "react-router-dom";
import Login from "./components/Login"
import Signup from "./components/Signup";

const App = () =>{
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <nav className="mb-8">
          <Link
            to="/signup"
            className="mr-4 text-blue-500 hover:underline"
          >
            Signup
          </Link>
          <Link
            to="/login"
            className="text-blue-500 hover:underline"
          >
            Login
          </Link>
        </nav>

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
