import { createContext, useContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkMode = createContext();

export default function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
    "darkMode"
  );
  return (
    <DarkMode.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkMode.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkMode);
  if (context === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
}

export { useDarkMode };
