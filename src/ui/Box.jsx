import React from "react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";

export default function Box({ item }) {
  console.log(item);
  const { darkMode } = useDarkMode();
  return (
    <Link to={`/topics/${item.id}`} className="text-decoration-none ">
      <div className={`box ${darkMode ? "box-dark" : ""}  p-3 `}>
        <p className="fw-bold mb-2 ">{item.name}</p>
        <span
          className={`p-1 rounded-3 text-center text-white fs-6 ${item.level}`}
        >
          {item.level}
        </span>
        <div className="tag">
          <Tag name={item.topic} kay={item.id} />
        </div>
      </div>
    </Link>
  );
}

function Tag({ name }) {
  return <span className="p-1 rounded-3 text-center  fs-6">{name}</span>;
}
