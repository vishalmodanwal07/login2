
import axios from "axios";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      // Send POST request to logout endpoint
      const response = await axios.post("/api/user/logout", {}, { withCredentials: true });

      if (response.data.success) {
        // On successful logout, alert and refresh the page to update UI
        alert("You have been logged out.");
        window.location.reload(); // Reload the page to reflect the changes
      } else {
        alert("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white py-2 px-4 rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
