import { useEffect, useState } from "react";

export default function Spinner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 2000); // Show spinner after 2 seconds
    return () => clearTimeout(timer);
  }, []);
// test
  if (!show) return null;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        background: "rgba(255,255,255,0.85)",
        zIndex: 9999,
        transition: "background 0.3s",
      }}
    >
      <div
        style={{
          border: "6px solid #eee",
          borderTop: "6px solid #FF6900",
          borderRight: "6px solid #FF6900",
          borderRadius: "50%",
          width: 56,
          height: 56,
          animation: "spin 0.8s cubic-bezier(0.4,0,0.2,1) infinite",
          boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
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