
import  { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import LogoutButton from "./components/Logout";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get("/api/user/status", { withCredentials: true });
        if (response.data.loggedIn) {
          setIsAuthenticated(true);
          setUser(response.data.user); // Save user data if logged in
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="bg-blue-500 p-4 flex justify-between items-center">
          <div>
            <h1 className="text-white font-bold text-xl">My App</h1>
          </div>

          <div>
            {isAuthenticated ? (
              <>
                <span className="text-white mr-4">Welcome, {user?.email}</span>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link to="/login" className="text-white mr-4">
                  Login
                </Link>
                <Link to="/signup" className="text-white mr-4">
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
