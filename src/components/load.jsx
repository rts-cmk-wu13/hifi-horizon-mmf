import React from "react";

export default function Spinner() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "150px",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          border: "6px solid #eee",
          borderTop: "6px solid #FF6900",
          borderRight: "6px solid #FF6900",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}
      </style>
    </div>
  );
}