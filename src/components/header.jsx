import { Link, NavLink } from "react-router";

const style = {
  header: {
    backgroundColor: "#000000",
    padding: "20px",
    color: "white",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  li: {
    margin: 0,
    listStyle: "none",
    display: "inline",
    padding: "0 15px",
    fontFamily: "sans-serif",
    fontSize: "14px",
  },
  nav: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default function Header() {
  return (
    <header style={style.header}>
      <nav style={style.nav}>
        <Link to={"/"}>
          <img
            src="./logo_sml 1.png"
            alt="Logo"
            style={{ width: "50px", height: "50px" }}
          />
        </Link>

        <NavLink to={"/shop"}>
          {" "}
          <li style={style.li}>SHOP </li>
        </NavLink>
        <NavLink to={"/About"}>
          <li style={style.li}>ABOUT US</li>
        </NavLink>
        <NavLink to={"/Contact"}>
          {" "}
          <li style={style.li}>CONTACT US</li>{" "}
        </NavLink>
      </nav>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            width: "252px",
            backgroundColor: "#fff",
            borderRadius: "5px",
            padding: "5px",
          }}
        >
          <input
            type="text"
            placeholder="Search Products"
            style={{
              padding: "10px",
              width: "200px",
              borderRadius: "5px",
              border: "none",
            }}
          />
          <i
            className="fa-solid fa-magnifying-glass"
            style={{ color: "black", fontSize: "x-large" }}
          ></i>
        </div>
        <i className="fa-solid fa-user"></i>
        <i className="fa-solid fa-cart-shopping"></i>
      </div>
    </header>
  );
}
