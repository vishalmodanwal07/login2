import axios from "axios";

const LogoutButton = ({ setIsAuthenticated, setUser }) => {
  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/user/logout", {}, { withCredentials: true });

      if (response.data.success) {
        setIsAuthenticated(false);
        setUser(null);
        alert("You have been logged out.");
      } else {
        alert("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
