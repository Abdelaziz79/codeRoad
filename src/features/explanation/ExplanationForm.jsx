import Explanation from "./Explanation";
import { memo } from "react";
import { Col, Row } from "react-bootstrap";
import { useDarkMode } from "../../context/DarkModeContext";

import MarkdownEditor from "./MarkdownEditor";

const MemoizedExplanation = memo(Explanation);

export default function ExplanationForm({
  topicName,
  setTopicName,
  level,
  setLevel,
  isLoading,
  explanation,
  setExplanation,
  title,
  setTitle,
}) {
  const { darkMode } = useDarkMode();
  return (
    <Row>
      <Col sm={12} md={12} lg={6}>
        <form>
          <Row className="h-25">
            <Col>
              <label htmlFor="topic" className="form-label fs-4">
                Topic
              </label>
              <input
                maxLength={30}
                type="text"
                name="topic"
                id="topic"
                className=" form-control "
                placeholder="topic name"
                value={topicName}
                disabled={isLoading}
                onChange={(e) => setTopicName(e.target.value)}
              />
            </Col>
            <Col>
              <label htmlFor="level" className="form-label fs-4">
                Level
              </label>
              <select
                disabled={isLoading}
                name="level"
                id="level"
                className="form-select "
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
              </select>
            </Col>
            <Col lg={12}>
              <Col>
                <label htmlFor="title" className="form-label fs-4">
                  Title
                </label>
                <input
                  maxLength={50}
                  disabled={isLoading}
                  type="text"
                  name="title"
                  id="title"
                  className=" form-control  "
                  placeholder="title name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Col>
            </Col>
          </Row>
          <Row className="h-75">
            <Col className="">
              <label htmlFor="explanation" className="form-label fs-4 ">
                Explanation
              </label>
              <MarkdownEditor
                setMarkdown={setExplanation}
                areaId={"explanation"}
              />
              <textarea
                maxLength={20000}
                disabled={isLoading}
                className={`resize-none no-scroll-width form-control ${
                  darkMode ? " " : " bg-body-tertiary border"
                } rounded-3 `}
                placeholder="Add Explanation Here"
                required
                rows={17}
                type="text"
                id="explanation"
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                name="explanation"
              />
            </Col>
          </Row>
        </form>
      </Col>

      <Col className="overflow-auto" sm={12} md={12} lg={6}>
        <label className="form-label fs-4 ">The Result</label>
        <MemoizedExplanation explanation={explanation} />
      </Col>
    </Row>
  );
}
