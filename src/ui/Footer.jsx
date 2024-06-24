import React, { useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";

export default function Footer() {
  const { darkMode } = useDarkMode();
  const [count, setCount] = useState(0);
  return (
    <div
      className={`footer d-flex mt-auto flex-column justify-content-center align-items-center ${
        darkMode ? "text-light" : ""
      } `}
    >
      <p>CodeRoad © 2024</p>
      <p onClick={() => setCount((count) => count + 1)}>
        {count >= 7 ? (
          <a
            href="https://github.com/Abdelaziz79/Graduation-Project"
            target="_blank"
            style={{
              textDecoration: "none",
              color: darkMode ? "#fff" : "#6c757d",
            }}
          >
            Version 1.0.0
          </a>
        ) : (
          `Version 1.0.0`
        )}
      </p>
    </div>
  );
}
