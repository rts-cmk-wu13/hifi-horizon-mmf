import { useState } from "react";
import { Link } from "react-router-dom";

const style = {
  h1: {
    fontWeight: "bold",
    color: "#495464",
    marginBottom: "2rem",
    fontSize: "2rem",
  },
  h2: {
    fontSize: "large",
    marginBottom: "1rem",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "0 auto",
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    width: "100%",
  },
  button: {
    padding: "10px",
    background: "#FF6900",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "156px",
    boxShadow: "0 0 10px rgba(0,0,0,0.53)",
  },
  input: {
    marginBottom: "10px",
    padding: "9px",
    width: "100%",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#E8E8E8",
  },
  p: {
    fontSize: "16px",
    textAlign: "center",
    marginTop: "20px",
  },
  newCustomer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "2rem",
    padding: "1rem",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    alignItems: "center",
    rowGap: "1rem",
  },
};

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const { email } = form;
        localStorage.setItem("userEmail", email);
        window.location.href = "/myprofile";
      } else {
        setMsg("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setMsg("An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#D5D5D5", minHeight: "100vh" }}>
      <h1 style={style.h1}>Login</h1>
      <form style={style.form} onSubmit={handleSubmit}>
        <h2 style={style.h2}>Registered Customers</h2>
        <p style={{ marginBottom: "1rem" }}>
          If you have an account, sign in with your email address.
        </p>
        <label style={{ marginBottom: 5 }}>
          Email
          <input
            type="email"
            id="email"
            style={style.input}
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email" // Added autocomplete attribute
          />
        </label>
        <label style={{ marginBottom: 5 }}>
          Password
          <input
            type="password"
            id="password"
            style={style.input}
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="current-password" // Added autocomplete attribute
          />
        </label>
        <label style={{ display: "flex", alignItems: "center", marginBottom: "10px", fontWeight: "normal" }}>
          <input
            type="checkbox"
            id="remember"
            checked={form.remember}
            onChange={handleChange}
            style={{ marginRight: "10px" }}
          />
          Remember me
        </label>
        <button type="submit" style={style.button}>
          Login
        </button>
        {msg && <p style={{ color: msg.includes("success") ? "green" : "red", marginTop: "1em" }}>{msg}</p>}
      </form>

      <div className="new-customer" style={style.newCustomer}>
        <h2>NEW CUSTOMER</h2>
        <p style={style.p}>
          Creating an account has many benefits: check out faster, track orders and more.{" "}
        </p>
        <Link to="/opretprofil">
          <button style={style.button}>
            Create an account
          </button>
        </Link>
      </div>
    </div>
  );
}