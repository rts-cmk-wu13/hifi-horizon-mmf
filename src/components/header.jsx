import { Link, NavLink } from "react-router-dom";
import React from "react";

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

const user = null; 

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

        <NavLink
          to={"/shop"}
          style={({ isActive }) =>
            isActive
              ? { ...style.li, borderBottom: "2px solid white" }
              : style.li
          }
        >
          SHOP
        </NavLink>
        <NavLink
          to={"/About"}
          style={({ isActive }) =>
            isActive
              ? { ...style.li, borderBottom: "2px solid white" }
              : style.li
          }
        >
          ABOUT US
        </NavLink>
        <NavLink
          to={"/Contact"}
          style={({ isActive }) =>
            isActive
              ? { ...style.li, borderBottom: "2px solid white" }
              : style.li
          }
        >
          CONTACT US
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
            id="search"
            style={{
              padding: "10px",
              width: "200px",
              borderRadius: "5px",
              border: "none",
              color: "black",
            }}
          />
          <i
            className="fa-solid fa-magnifying-glass"
            style={{ color: "black", fontSize: "x-large" }}
          ></i>
        </div>
        {user ? (
          // Display username when logged in
          <div
            style={{
              padding: "10px",
              color: "white",
              backgroundColor: "transparent",
              fontFamily: "sans-serif",
              fontSize: "14px",
            }}
          >
            {user.name}
          </div>
        ) : (
          // Display login icon when not logged in
          <Link
            to="/login"
            style={{
              textDecorationLine: "underline",
              textDecorationColor: "rgb(252, 80, 0)",
              textDecorationThickness: "1px",
            }}
          >
            <i className="fa-solid fa-user"></i>
          </Link>
        )}
        <i className="fa-solid fa-cart-shopping"></i>
      </div>
    </header>
  );
}
