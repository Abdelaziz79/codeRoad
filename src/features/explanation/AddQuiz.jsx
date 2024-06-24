import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";

export default function AddQuiz({ questions, setQuestions, handleAddQuiz }) {
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");

  const [correctOption, setCorrectOption] = useState("option1");

  function handleSubmit(e) {
    e.preventDefault();
    if (!question || !option1 || !option2 || !option3 || !option4) return;
    if (question.length > 150) {
      toast.error("Question must be less than 150 characters");
      return;
    }
    if (option1.length > 50) {
      toast.error("Option 1 must be less than 50 characters");
      return;
    }
    if (option2.length > 50) {
      toast.error("Option 2 must be less than 50 characters");
      return;
    }
    if (option3.length > 50) {
      toast.error("Option 3 must be less than 50 characters");
      return;
    }
    if (option4.length > 50) {
      toast.error("Option 4 must be less than 50 characters");
      return;
    }
    const newQuestion = {
      question,
      option1,
      option2,
      option3,
      option4,
      correctOption,
    };
    setQuestions([...questions, newQuestion]);
    setQuestion("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setCorrectOption("");
  }
  return (
    <Row>
      <form>
        <label className="form-label fs-4" htmlFor="question">
          Question {questions.length + 1}
        </label>
        <input
          maxLength={150}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          type="text"
          className="form-control"
          id="question"
          name="question"
          placeholder="Enter question"
        />
        <Row>
          <Col>
            <label className="form-label fs-4" htmlFor="option-1">
              Option 1
            </label>
            <input
              maxLength={50}
              value={option1}
              onChange={(e) => setOption1(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter option 1"
              id="option-1"
            />

            <label className="form-label fs-4" htmlFor="option-3">
              Option 3
            </label>
            <input
              maxLength={50}
              value={option3}
              onChange={(e) => setOption3(e.target.value)}
              type="text"
              placeholder="Enter option 3"
              className="form-control"
              id="option-3"
            />
            <label className="form-label fs-4" htmlFor="correct">
              Correct Answer
            </label>
            <select
              value={correctOption}
              onChange={(e) => setCorrectOption(e.target.value)}
              className="form-select"
              aria-label="Default select example"
              id="correct"
            >
              <option value="" hidden>
                ---
              </option>
              <option value={option1}>1</option>
              <option value={option2}>2</option>
              <option value={option3}>3</option>
              <option value={option4}>4</option>
            </select>
          </Col>
          <Col>
            <label className="form-label fs-4" htmlFor="option-2">
              Option 2
            </label>
            <input
              maxLength={50}
              value={option2}
              placeholder="Enter option 2"
              onChange={(e) => setOption2(e.target.value)}
              type="text"
              className="form-control"
              id="option-2"
            />
            <label className="form-label fs-4" htmlFor="option-4">
              Option 4
            </label>
            <input
              maxLength={50}
              placeholder="Enter option 4"
              value={option4}
              onChange={(e) => setOption4(e.target.value)}
              type="text"
              className="form-control"
              id="option-4"
            />
          </Col>
        </Row>
        <Button className="btn-success mt-3" onClick={handleSubmit}>
          Add Question {questions.length + 1}
        </Button>
        <Button className="btn-success mt-3 ms-3" onClick={handleAddQuiz}>
          Create Quiz
        </Button>
      </form>
    </Row>
  );
}
