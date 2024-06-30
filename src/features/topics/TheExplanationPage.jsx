import React from "react";
import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Background from "../../ui/Background";
import MarkDown from "../../ui/MarkDown";
import { useGetExplanationById } from "./useGetExplanationById";

export default function TheExplanationPage() {
  const { explanation, isLoading } = useGetExplanationById();
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <Background>
        <MarkDown markdown={explanation.explanation} />
        {explanation.quiz_id && (
          <div className="mt-3">
            <Link
              to={`/quiz/${explanation.quiz_id}`}
              className=" text-decoration-none "
            >
              <Button className="btn btn-primary">take the quiz</Button>
            </Link>
          </div>
        )}
      </Background>
    </>
  );
}
