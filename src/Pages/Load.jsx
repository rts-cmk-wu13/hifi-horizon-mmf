import "../app.css";

export default function Spinner() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        background: "rgba(255,255,255,0.7)",
        zIndex: 10,
      }}
    >
      <div
        style={{
          border: "6px solid #eee",
          borderTop: "6px solid #FF6900",
          borderRadius: "50%",
          width: 48,
          height: 48,
          animation: "spin 1s linear infinite",
        }}
      >
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg) scale(1); box-shadow: 0 0 0 #FF6900;}
              50% { transform: rotate(180deg) scale(1.1); box-shadow: 0 0 10px #FF6900;}
              100% { transform: rotate(360deg) scale(1); box-shadow: 0 0 0 #FF6900;}
            }
            div[style*="animation: spin"] {
              animation: spin 1s linear infinite;
            }
          `}
        </style>
      </div>
    </div>
  );
}
