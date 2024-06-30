import AddQuiz from "./AddQuiz";
import useCreateExplanation from "./useCreateExplanation";
import ExplanationForm from "./ExplanationForm";

import { useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { usePreviewTopic } from "../../context/PreviewTopicContext";
import { useDarkMode } from "../../context/DarkModeContext";
import { useCreateQuiz } from "../quiz/useCreateQuiz";
import { useNavigate } from "react-router-dom";
import { useUser } from "../authentication/useUser";
import { toast } from "react-toastify";
import { addTopicName } from "../../services/apiExplanationTopics";

export default function AddExplanation() {
  const { setNewTopic } = usePreviewTopic();

  const [quiz, setQuiz] = useState([]);

  const [explanation, setExplanation] = useState("");
  const [topicName, setTopicName] = useState("");
  const [level, setLevel] = useState("easy");
  const [title, setTitle] = useState("");

  const [showQuiz, setShowQuiz] = useState(false);
  const [topic, setTopic] = useState("");
  const { createExplanation, isLoading } = useCreateExplanation();
  const { createQuiz, isLoading2, quizData } = useCreateQuiz();
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  if (isLoading || isLoading2) return <Spinner />;
  const show = showQuiz && !quizData;

  function handleAddQuiz() {
    if (quiz.length > 0) {
      createQuiz({ quiz, name: title });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!topicName || !level || !title || !explanation) return;
    if (title.length > 50) {
      toast.error("Title must be less than 50 characters");
      return;
    }
    if (topicName.length > 30) {
      toast.error("Topic name must be less than 30 characters");
      return;
    }
    if (explanation.length > 20000) {
      toast.error("Explanation must be less than 15000 characters");
      return;
    }
    console.log(topicName.toLowerCase());
    const newExplanation = {
      TopicName: topicName.toLowerCase(),
      Name: title,
      Level: level,
      Explanation: explanation,
    };
    if (quizData) {
      newExplanation["quiz_id"] = quizData[0]["id"];
    }
    createExplanation(newExplanation, {
      onSuccess: () => {
        setTopicName("");
        setTitle("");
        setExplanation("");
        setLevel("easy");
        setShowQuiz(false);
        setQuiz([]);
      },
    });
  }

  async function addTopic(e) {
    e.preventDefault();
    const data = await addTopicName(topic);
    console.log(data);
  }

  return (
    <>
      <div
        className={`${
          darkMode ? "form-style-dark" : "form-style"
        } p-3 rounded my-3`}
      >
        <Row className="">
          <Col className="col-2">
            <label className="fs-4" htmlFor="topicName">
              Topic
            </label>
          </Col>
          <Col className="col-7">
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              type="text"
              id="topicName"
              width={30}
              className=" form-control "
            />
          </Col>
          <Col>
            <Button onClick={addTopic}>add topic</Button>
          </Col>
        </Row>
      </div>
      <div
        className={`${
          darkMode ? "form-style-dark" : "form-style"
        } p-3 rounded my-3`}
      >
        <Row className="">
          <ExplanationForm
            explanation={explanation}
            setExplanation={setExplanation}
            title={title}
            setTitle={setTitle}
            topicName={topicName}
            setTopicName={setTopicName}
            level={level}
            setLevel={setLevel}
          />
          <Col>
            {title && (
              <div>
                <div className="">
                  {!quizData && (
                    <Button
                      disabled={isLoading || isLoading2}
                      className=" btn-success mt-3"
                      onClick={() => setShowQuiz((show) => !show)}
                    >
                      Add Quize
                    </Button>
                  )}
                </div>
                <div>
                  {show && (
                    <AddQuiz
                      questions={quiz}
                      setQuestions={setQuiz}
                      handleAddQuiz={handleAddQuiz}
                    />
                  )}
                </div>
              </div>
            )}
            <div className="mt-3">
              <Button
                className=" btn-success "
                disabled={isLoading || isLoading2}
                onClick={handleSubmit}
              >
                Add
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
