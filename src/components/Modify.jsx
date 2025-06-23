import { useState } from "react";

export default function Modify({ field, value, onClose, email }) {
  const [input, setInput] = useState(value || "");
  const [msg, setMsg] = useState("");

  const fieldMap = {
    name: "fullname",      
    email: "email",
    phone: "phone",
    address: "address1",  
    password: "password"
  };
  const apiField = fieldMap[field] || field;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    if (!input) {
      setMsg("Please fill in the field.");
      return;
    }
    const payload = { email, [apiField]: input };
    console.log("Sending to API:", payload);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("Updated successfully!");
      } else {
        setMsg(data.message || "Failed to update.");
      }
    } catch {
      setMsg("An error occurred. Please try again.");
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "2em auto",
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 2px 8px #0001",
        padding: "2em",
        position: "relative",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          background: "transparent",
          border: "none",
          fontSize: "1.5em",
          cursor: "pointer",
        }}
        aria-label="Close"
      >
        ×
      </button>
      <h2 style={{ textAlign: "center", marginBottom: "1.5em" }}>
        Change {field.charAt(0).toUpperCase() + field.slice(1)}
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type={field === "password" ? "password" : "text"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            display: "block",
            margin: "0 auto 18px",
            width: "100%",
            padding: "12px",
            borderRadius: "6px",
            border: "1.5px solid #ccc",
            background: "#f7fafc",
            fontSize: "1em",
            outline: "none",
            boxShadow: "0 1px 2px #0001",
            transition: "border 0.2s, box-shadow 0.2s, background 0.2s",
          }}
          required
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#FF6900",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontWeight: 600,
            fontSize: "1em",
            cursor: "pointer",
            marginTop: "0.5em",
            transition: "background 0.2s",
          }}
        >
          Update
        </button>
        {msg && (
          <div
            style={{
              marginTop: 16,
              color: msg.includes("success") ? "green" : "red",
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            {msg}
          </div>
        )}
      </form>
    </div>
  );
}