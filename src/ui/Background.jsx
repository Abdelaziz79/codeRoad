import React from "react";
import { useDarkMode } from "../context/DarkModeContext";

export default function Background({ children }) {
  const { darkMode } = useDarkMode();
  return (
    <div
      className={` ${darkMode ? "form-style-dark" : "form-style"} p-3 rounded `}
    >
      {children}
    </div>
  );
}
