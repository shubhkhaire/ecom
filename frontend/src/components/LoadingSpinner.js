import React from "react";

const LoadingSpinner = ({ size = "md", text = "" }) => {
  const sizeMap = {
    sm: "30px",
    md: "50px",
    lg: "70px",
  };

  const spinnerSize = sizeMap[size] || sizeMap.md;

  return (
    <div
      className="loading-spinner-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        gap: "1rem",
      }}
    >
      <div
        className="spinner"
        style={{
          width: spinnerSize,
          height: spinnerSize,
          border: "4px solid var(--gradient-subtle)",
          borderTop: "4px solid var(--indigo-500)",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      {text && (
        <p className="text-muted" style={{ margin: 0 }}>
          {text}
        </p>
      )}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
