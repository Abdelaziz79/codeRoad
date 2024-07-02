import React from "react";
import { Button, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Background from "../../ui/Background";
import MarkDown from "../../ui/MarkDown";
import { useGetExplanationById } from "./useGetExplanationById";
import { useQuiz } from "../quiz/useQuiz";

export default function TheExplanationPage() {
  const { explanation, isLoading } = useGetExplanationById();
  const { quiz, isLoading: isLoading2 } = useQuiz();
  const { id } = useParams();

  const qe = quiz !== null && quiz !== undefined && quiz.length !== 0;

  if (isLoading) {
    return <Spinner />;
  }

  return isLoading2 ? (
    <Spinner />
  ) : (
    <>
      <Background>
        <MarkDown markdown={explanation.explanation} />
        {qe && (
          <div className="mt-3">
            <Link to={`/quiz/${id}`} className=" text-decoration-none ">
              <Button className="btn btn-primary">take the quiz</Button>
            </Link>
          </div>
        )}
      </Background>
    </>
  );
}
