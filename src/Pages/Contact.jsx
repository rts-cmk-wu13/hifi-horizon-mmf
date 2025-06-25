import { useState } from "react";

const style = {
  h2: {
    fontSize: "2rem",
    color: "#495464",
    marginBottom: "3rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",

    margin: "0 auto",
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",

    paddung: "2rem",
  },
  button: {
    padding: "10px",
    background: "#FF6900",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    witdh: "fit-content",
    marginLeft: "auto",
    boxShadow: "0 0 10px rgba(0,0,0,53%)",
    width: "100px",
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
};

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email.includes("@")) {
      setStatus("Invalid email format.");
      return;
    }
    if (form.message.length < 10) {
      setStatus("Message must be at least 10 characters.");
      return;
    }
    setStatus("Sending...");
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("Message sent!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send. Try again.");
      }
    } catch (error) {
      setStatus("An error occurred. Please try again.");
    }
  };

  return (
    <div
      style={{
        maxWidth: 1000,
        margin: "2rem auto",
        background: "#fff",
        padding: 24,
        borderRadius: 8,
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h1>Get in touch with us</h1>
      <form onSubmit={handleSubmit} style={style.form}>
        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          style={style.input}
        />
        <input
          name="email"
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          style={style.input}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
          style={{ ...style.input, minHeight: 100 }}
        />
        <button type="submit" style={style.button}>
          Send
        </button>
      </form>
      {status && <p style={style.p}>{status}</p>}
    </div>
  );
}
