import React, { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="scroll-to-top"
          aria-label="Scroll to top"
          style={{
            position: "fixed",
            right: "24px",
            bottom: "90px",
            width: "50px",
            height: "50px",
            borderRadius: "var(--r-full)",
            background: "var(--gradient-primary)",
            backgroundSize: "200% auto",
            color: "white",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "var(--shadow-lg)",
            transition: "all var(--trans)",
            zIndex: "var(--z-fab)",
            animation: "fadeInUp 0.3s ease-out",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-6px) scale(1.05)";
            e.target.style.backgroundPosition = "right center";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0) scale(1)";
            e.target.style.backgroundPosition = "left center";
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
