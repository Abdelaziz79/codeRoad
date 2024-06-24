import React from "react";
import { Button } from "react-bootstrap";
import Background from "./Background";
import { useDarkMode } from "../context/DarkModeContext";
export default function FallBackComp({ error, resetErrorBoundary }) {
  const { darkMode } = useDarkMode();
  return (
    <div
      className={` d-flex justify-content-center align-items-center min-vh-100 ${
        darkMode ? "bg-card-dark" : ""
      } `}
    >
      <Background>
        <h1 as={"h1"} className={`${darkMode ? "text-white" : ""}`}>
          Something went wrong 🧐
        </h1>
        <p className={`${darkMode ? "text-white" : ""}`}>{error.message}</p>
        <Button size="large" onClick={resetErrorBoundary}>
          Try again
        </Button>
      </Background>
    </div>
  );
}
