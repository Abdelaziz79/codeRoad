import EmptyText from "./EmptyText";
import QuizBase from "./QuizBase";
import { useUserQuizs } from "./useUserQuizs";

export default function FinishedQuizs() {
  const { quizs } = useUserQuizs();
  if (!quizs || quizs.length === 0) return <EmptyText />;
  else return <QuizBase quizs={quizs.quizs} />;
}
