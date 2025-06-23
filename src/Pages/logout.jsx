import { useNavigate } from "react-router";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} style={{ padding: "10px", borderRadius: "4px", background: "#FF6900", color: "#fff", border: "none" }}>
      Logout
    </button>
  );
}