import { useNavigate, useLocation } from "react-router-dom";
import React, { Suspense } from "react";
import Spinner from "../components/load"; // Ensure Spinner is correctly imported


export default function ProfileTabs({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: "2em 1em -2em",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#dedede",
          borderRadius: "8px",
          gap: "2em",
          maxWidth: 600,
          width: "100%",
        }}
      >
        <li
          style={{
            fontSize: "26px",
            color: "#fff",
            padding: "0.5em 3em",
            cursor: "pointer",
            background: location.pathname === "/myprofile" ? "#ff6a08" : "transparent",
            borderRadius: "8px",
            transition: "background 0.2s",
          }}
          onClick={() => navigate("/myprofile")}
        >
          Profile
        </li>
        <li
          style={{
            fontSize: "26px",
            color: "#fff",
            padding: "0.5em 3em",
            cursor: "pointer",
            background: location.pathname === "/orders" ? "#ff6a08" : "transparent",
            borderRadius: "8px",
            transition: "background 0.2s",
          }}
          onClick={() => navigate("/orders")}
        >
          Orders
        </li>
      </ul>
      {/* Spinner will only show if children are lazy loaded */}
      <Suspense fallback={<Spinner />}>
        {children}
      </Suspense>
    </div>
  );
}