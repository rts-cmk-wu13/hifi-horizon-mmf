import { useState } from "react";

export default function ModifyButton({ onClick, label }) {
  const [hover, setHover] = useState(false);

  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 20px",
        fontSize: "0.9em",
        borderRadius: "4px",
        border: "none",
        background: hover ? "#ff6a08" : "#f5f5f5",
        cursor: "pointer",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        color: hover ? "#fff" : "#ff6a08",
        transition: "background 0.2s, color 0.2s",
        marginRight: "1em",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={label || "Modify"}
      title={label || "Modify"}
    >
      <i className="fa-solid fa-pen"></i>
    </button>
  );
}