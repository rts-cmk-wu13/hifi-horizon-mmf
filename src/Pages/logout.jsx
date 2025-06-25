import { useNavigate } from "react-router-dom"; // fix import

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // remove the correct key
    navigate("/login");
    // Optionally, you can also reload or update state if needed
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "10px",
        borderRadius: "4px",
        
        color: "#fff",
        border: "none",
      }}
    >
      Logout
    </button>
  );
}