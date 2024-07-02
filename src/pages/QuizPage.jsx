import Background from "../ui/Background";
import Finish from "../features/quiz/Finish";
import Quiz from "../features/quiz/Quiz";

import { useState } from "react";
import { useQuiz } from "../features/quiz/useQuiz";
import { Spinner } from "react-bootstrap";

export default function QuizPage() {
  const { quiz, isLoading } = useQuiz();
  const [index, setIndex] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [numCorrect, setNumCorrect] = useState(0);
  if (isLoading) {
    return <Spinner />;
  }
  const quizLength = quiz[0].questions.length;

  function handleClick(e) {
    e.preventDefault();
    const value = e.target.value;
    const correctAnswer = quiz[0].questions[index].correctAnswer;

    if (value === correctAnswer) {
      setNumCorrect((c) => c + 1);
      e.target.classList.add("btn-success");
    } else {
      e.target.classList.add("btn-danger");
    }
    setClicked(true);
  }

  function handleNext() {
    setIndex((i) => i + 1);
    setClicked(false);
  }

  return (
    <Background>
      {index === quizLength ? (
        <Finish
          numCorrect={numCorrect}
          quizLength={quizLength}
          quiz_id={quiz.lessonId}
          quiz_name={quiz.name}
        />
      ) : (
        <>
          <Quiz
            quiz={quiz[0].questions[index]}
            handleClick={handleClick}
            index={index}
            quizLength={quizLength}
            clicked={clicked}
          />
          <div className="quiz-footer d-flex justify-content-between align-items-center mt-5">
            <div className="quiz-next">
              {clicked && (
                <button
                  className="btn btn-success btn-lg rounded-5 "
                  onClick={handleNext}
                >
                  {index === quizLength - 1 ? "Finish" : "Next"}
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </Background>
  );
}
