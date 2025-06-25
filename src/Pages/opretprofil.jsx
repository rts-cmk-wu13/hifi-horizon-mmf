import "./logind.jsx";
import { useState } from "react";
import { useNavigate } from "react-router";
import { z } from "zod";

const schema = z.object({
  fullname: z.string().min(2, "Full name is required"),
  address1: z.string().min(2, "Address is required"),
  address2: z.string().optional(),
  zipcode: z.string().min(2, "Zip-code is required"),
  city: z.string().min(2, "City is required"),
  country: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  repeatPassword: z.string(),
  agree: z.literal(true, { errorMap: () => ({ message: "You must agree to the terms." }) }),
  marketing: z.boolean(),
}).refine((data) => data.password === data.repeatPassword, {
  message: "Passwords do not match.",
  path: ["repeatPassword"],
});

const style = {
  h1: {
    fontWeight: "bold",
    color: "#495464",
    marginBottom: "2rem",
    fontSize: "2rem",
    textAlign: "flex-start",
  },
  h2: {
    fontSize: "x-large",
    marginBottom: "1rem",
    
    },
  General: {
    display: "flex",
  

    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    width: "78%",
 
    marginBottom: "2rem",
  },
  
  Form: {
    display: "flex",
    flexDirection: "column",
 
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
  

  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#495464",
  },
  input: {
    marginBottom: "10px",
    padding: "9px",
    width: "100%",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#E8E8E8",
    boxSizing: "border-box",
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
  
    marginTop: "10px",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    gap: "1em",
    flexWrap: "wrap",
  },
  col: {
    flex: "1 1 150px",
    minWidth: "0",
    display: "flex",
    flexDirection: "column",
  },
 
};

const API_URL = import.meta.env.VITE_API_URL;

export default function OpretProfil() {
  const [form, setForm] = useState({
    fullname: "",
    address1: "",
    address2: "",
    zipcode: "",
    city: "",
    country: "",
    phone: "",
    email: "",
    password: "",
    repeatPassword: "",
    agree: false,
    marketing: false,
  });
  const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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
    setErrors({});
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    try {
      const res = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: form.fullname,
          email: form.email,
          password: form.password,
          phone: form.phone,
          address1: form.address1,
          address2: form.address2,
          city: form.city,
          zipcode: form.zipcode,
          country: form.country,
        }),
      });
      if (res.ok) {
        setMsg("Registration successful!");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        const data = await res.json();
        setMsg(data.message || "Registration failed.");
      }
    } catch {
      setMsg("An error occurred. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#D5D5D5",
        padding: "1em",
      }}
    >
      <h1 style={style.h1}>Opret Profil</h1>
      <div style={style.General}>
        <form style={style.Form} onSubmit={handleSubmit}>
          <h2 style={style.h2}>Create New Customer Account</h2>
          <label style={style.label} htmlFor="fullname">
            Full name *
          </label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            style={style.input}
            required
            value={form.fullname}
            onChange={handleChange}
          />
          {errors.fullname && <span style={{ color: "red" }}>{errors.fullname}</span>}

          <label style={style.label} htmlFor="address1">
            Address *
          </label>
          <input type="text" id="address1" style={style.input} required value={form.address1} onChange={handleChange} />
          {errors.address1 && <span style={{ color: "red" }}>{errors.address1}</span>}

          <label style={style.label} htmlFor="address2">
            Address - line 2
          </label>
          <input type="text" id="address2" style={style.input} value={form.address2} onChange={handleChange} />

          <div style={style.row}>
            <div style={style.col}>
              <label style={style.label} htmlFor="zipcode">
                Zip-code *
              </label>
              <input type="text" id="zipcode" style={style.input} required value={form.zipcode} onChange={handleChange} />
              {errors.zipcode && <span style={{ color: "red" }}>{errors.zipcode}</span>}
            </div>
            <div style={style.col}>
              <label style={style.label} htmlFor="city">
                City *
              </label>
              <input type="text" id="city" style={style.input} required value={form.city} onChange={handleChange} />
              {errors.city && <span style={{ color: "red" }}>{errors.city}</span>}
            </div>
          </div>

          <div style={style.row}>
            <div style={style.col}>
              <label style={style.label} htmlFor="country">
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                style={style.input}
                value={form.country}
                onChange={handleChange}
                autoComplete="country"
              />
            </div>
            <div style={style.col}>
              <label style={style.label} htmlFor="phone">
                Phone no.
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                style={style.input}
                value={form.phone}
                onChange={handleChange}
                autoComplete="tel"
              />
            </div>
          </div>

          <label style={style.label} htmlFor="email">
            Email *
          </label>
          <input
            type="email"
            id="email"
            style={style.input}
            required
            value={form.email}
            onChange={handleChange}
            autoComplete="username"
          />
          {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}

          <label style={style.label} htmlFor="password">
            Password *
          </label>
          <input
            type="password"
            id="password"
            style={style.input}
            required
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
          {errors.password && <span style={{ color: "red" }}>{errors.password}</span>}

          <label style={style.label} htmlFor="repeatPassword">
            Repeat password *
          </label>
          <input
            type="password"
            id="repeatPassword"
            style={style.input}
            required
            value={form.repeatPassword}
            onChange={handleChange}
            autoComplete="new-password"
          />
          {errors.repeatPassword && <span style={{ color: "red" }}>{errors.repeatPassword}</span>}

          <label style={{ ...style.label, display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <input type="checkbox" id="agree" required checked={form.agree} onChange={handleChange} style={{ marginRight: "10px" }} />
            By using this form you agree with the storage and handling of your data by this website. *
          </label>
          {errors.agree && <span style={{ color: "red" }}>{errors.agree}</span>}

          <label style={{ ...style.label, display: "flex", alignItems: "center", marginBottom: "20px" }}>
            <input type="checkbox" id="marketing" checked={form.marketing} onChange={handleChange} style={{ marginRight: "10px" }} />
            Accept marketing from HiFi Horizon (newsletter and discount offers by email). *
          </label>

          <button type="submit" style={style.button}>
            Create an Account
          </button>
          {msg && <p style={{ color: msg.includes("success") ? "green" : "red", marginTop: "1em" }}>{msg}</p>}
        </form>
      </div>
    </div>
  );
}


