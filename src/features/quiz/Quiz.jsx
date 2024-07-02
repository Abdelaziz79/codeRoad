import { useEffect } from "react";
import Option from "./Option";

export default function Quiz({
  quiz,
  handleClick,
  index,
  quizLength,
  clicked,
}) {
  const progress = Math.round(((index + 1) / quizLength) * 100);
  useEffect(() => {
    const buttons = document.querySelectorAll(".quiz-answer-button");
    buttons.forEach((button) => {
      button.classList.remove("btn-success");
      button.classList.remove("btn-danger");
    });
  }, [index]);
  return (
    <div className="quiz-page">
      <div className="quiz-header ">
        <div class="progress ">
          <div
            class="progress-bar"
            role="progressbar"
            style={{ width: progress + "%" }}
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
        <div className="d-flex justify-content-between mt-3">
          <p className="">
            Question <strong>{index + 1}</strong> / {quizLength}
          </p>
        </div>
      </div>
      <div className="quiz-body ">
        <h4 className="text-center">{quiz?.questionContent}</h4>
        <div className="quiz-answers ">
          <ul className="list-unstyled text-center mt-5">
            <Option
              option={quiz?.option1}
              onClick={handleClick}
              disabled={clicked}
            />
            <Option
              option={quiz?.option2}
              onClick={handleClick}
              disabled={clicked}
            />
            <Option
              option={quiz?.option3}
              onClick={handleClick}
              disabled={clicked}
            />
            <Option
              option={quiz?.option4}
              onClick={handleClick}
              disabled={clicked}
            />
          </ul>
        </div>
      </div>
    </div>
  );
}
