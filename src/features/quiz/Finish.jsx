import { Button, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../authentication/useUser";
import { useFinishedQuiz } from "./useFinishedQuiz";

export default function Finish({ numCorrect, quizLength, quiz_id, quiz_name }) {
  const percentage = Math.round((numCorrect / quizLength) * 100);
  const { user, isLoading } = useUser();
  const { isLoading: isLoading2, updateUserQuizs } = useFinishedQuiz();
  const navigate = useNavigate();
  function handleSaveQuiz() {
    const quizs = user?.user_metadata?.quizs?.quizs || [];
    const newQ = quizs.filter((quiz) => quiz.id !== quiz_id);

    const newQuizs = [
      ...newQ,
      { score: percentage, date: Date.now(), id: quiz_id, name: quiz_name },
    ];

    updateUserQuizs({ quizs: newQuizs });
    navigate("/");
  }

  if (isLoading || isLoading2) {
    return <Spinner />;
  }
  let emoji = "😎";
  if (percentage < 50) {
    emoji = "😒";
  } else if (percentage < 80) {
    emoji = "🥰";
  }
  return (
    <div className="mt-5  d-flex flex-column justify-content-between quiz-page ">
      <div className="text-center">
        <h2>Good job! You have completed the quiz👌</h2>
        <h3>
          You got <strong>{percentage}%</strong> {emoji}
        </h3>
      </div>
      <div className="mt-5 d-flex justify-content-between">
        <Button onClick={handleSaveQuiz}>Save</Button>
        <Link to="/">
          <button className="btn btn-primary">Back to Home</button>
        </Link>
      </div>
    </div>
  );
}
