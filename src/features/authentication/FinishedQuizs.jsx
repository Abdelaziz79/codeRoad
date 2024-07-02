import EmptyText from "./EmptyText";
import QuizBase from "./QuizBase";

export default function FinishedQuizs({ quizs }) {
  if (!quizs || quizs.length === 0) return <EmptyText />;
  else return <QuizBase quizs={quizs.finishedLessons} />;
}
