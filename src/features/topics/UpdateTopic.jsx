import ExplanationForm from "../explanation/ExplanationForm";

import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";
import { useGetExplanationById } from "./useGetExplanationById";
import { useUpdateExplanation } from "./useUpdateExplanation";

export default function UpdateTopic() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { isLoading: isLoading1, updateExplanation } = useUpdateExplanation();

  const { explanation, isLoading: isLoading2 } = useGetExplanationById();
  console.log(explanation);
  const [exp, setExp] = useState();
  const [title, setTitle] = useState();
  const [level, setLevel] = useState();
  const [topics, setTopics] = useState();

  useEffect(() => {
    if (!explanation) return;
    setExp(explanation.explanation);
    setTitle(explanation.name);
    setLevel(explanation.level);
    setTopics(explanation.topic);
  }, [explanation]);

  function handleUpdate(e) {
    e.preventDefault();
    if (!topics || !level || !title || !explanation) return;

    const newExplanation = {
      id: id,
      TopicName: topics,
      Name: title,
      Level: level,
      Explanation: exp,
    };

    updateExplanation(newExplanation, {
      onSuccess: () => {
        navigate("/topics");
      },
    });
  }
  const { darkMode } = useDarkMode();
  return (
    <>
      <div
        className={`${
          darkMode ? "form-style-dark" : "form-style"
        } p-3 rounded my-3`}
      >
        <ExplanationForm
          explanation={exp}
          isLoading={isLoading1 || isLoading2}
          title={title}
          level={level}
          topicName={topics}
          setExplanation={setExp}
          setTitle={setTitle}
          setLevel={setLevel}
          setTopicName={setTopics}
        />
        <Button className="mt-3" variant="success" onClick={handleUpdate}>
          Update
        </Button>
      </div>
    </>
  );
}
