import ExplanationForm from "../explanation/ExplanationForm";

import { useEffect, useState } from "react";
import { useGetExplanationById } from "./useGetExplanationById";
import { Button } from "react-bootstrap";
import { useUpdateExplanation } from "./useUpdateExplanation";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";

export default function UpdateTopic() {
  const navigate = useNavigate();

  const { isLoading: isLoading1, updateExplanation } = useUpdateExplanation();

  const { explanation, isLoading: isLoading2 } = useGetExplanationById();

  const [exp, setExp] = useState();
  const [title, setTitle] = useState();
  const [level, setLevel] = useState();
  const [topics, setTopics] = useState();

  useEffect(() => {
    if (!explanation) return;
    setExp(explanation.explanation);
    setTitle(explanation.title);
    setLevel(explanation.level);
    setTopics(explanation.topics);
  }, [explanation]);

  function handleUpdate(e) {
    e.preventDefault();
    if (!topics || !level || !title || !explanation) return;

    const newExplanation = {
      id: explanation.id,
      topics,
      title,
      level,
      explanation: exp,
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
