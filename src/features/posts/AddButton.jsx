import React from "react";
import { useDarkMode } from "../../context/DarkModeContext";
import { Link } from "react-router-dom";

export default function AddtButton({ name, to }) {
  const { darkMode } = useDarkMode();
  return (
    <Link to={to}>
      <button
        className={`btn add-post-btn fw-bold ${
          darkMode ? "add-post-btn-dark" : "add-post-btn-light"
        } `}
      >
        Add {name}
      </button>
    </Link>
  );
}
