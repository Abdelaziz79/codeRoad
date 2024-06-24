import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import DarkModeProvider from "./context/DarkModeContext.jsx";
import { ErrorBoundary } from "react-error-boundary";
import FallBackComp from "./ui/FallBackComp.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DarkModeProvider>
      <ErrorBoundary
        FallbackComponent={FallBackComp}
        onReset={() => window.location.replace("/")}
      >
        <App />
      </ErrorBoundary>
    </DarkModeProvider>
  </React.StrictMode>
);
