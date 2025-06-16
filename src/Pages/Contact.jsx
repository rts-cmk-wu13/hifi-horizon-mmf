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
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
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
    padding: "8px",
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

export default function Contact() {
  return (
    <div style={{ padding: "2rem", backgroundColor: "#D5D5D5" }}>
      <h2 style={style.h2}>Get in touch with us</h2>

      <form style={style.form}>
        <label style={{ marginBottom: 5 }}>
          Full name
          <input type="text" style={style.input} />
        </label>
        <label style={{ marginBottom: 5 }}>
          Email
          <input type="email" style={style.input} />
        </label>
        <label style={{ marginBottom: 5 }}>
          Subject
          <input type="email" style={style.input} />
        </label>
        <label style={{ marginBottom: 5 }}>
          Message
          <textarea rows={4} style={style.input} />
        </label>
        <button type="submit" style={style.button}>
          Submit
        </button>
      </form>
      <p style={style.p}>
        Visit our sister companies
        <span style={{ color: "rgba(255, 105, 0, 1)" }}>
          {" "}
          Home Sound{" "}
        </span>and{" "}
        <span style={{ color: "rgba(255, 105, 0, 1)" }}>
          The Movie Rooms
        </span>{" "}
        part of the HiFi Horizon Group.{" "}
      </p>
    </div>
  );
}
