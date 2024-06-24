import { useDarkMode } from "../../context/DarkModeContext";

export default function Option({ option, onClick, disabled }) {
  const { darkMode } = useDarkMode();

  return (
    <li>
      <button
        disabled={disabled}
        onClick={onClick}
        className={`btn btn-lg w-50 my-2 fw-bold quiz-answer-button ${
          darkMode ? "" : "quiz-answer-button-light "
        } rounded-5 `}
        value={option}
      >
        {option}
      </button>
    </li>
  );
}
