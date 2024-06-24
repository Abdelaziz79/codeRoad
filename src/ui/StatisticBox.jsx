import React from "react";
import { useDarkMode } from "../context/DarkModeContext";

export default function StatisticBox({ title, children }) {
  const { darkMode } = useDarkMode();
  return (
    <div
      className={`${darkMode ? "statistic-box-dark" : "statistic-box"} s-b `}
    >
      <h3
        className={`${darkMode ? "statistic-title-dark" : "statistic-title"}`}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}
