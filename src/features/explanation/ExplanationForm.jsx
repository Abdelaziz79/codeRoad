import Explanation from "./Explanation";
import { memo } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useDarkMode } from "../../context/DarkModeContext";

import MarkdownEditor from "./MarkdownEditor";
import { useTopicsNames } from "./useTopicsNames";

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
  const { isLoading: l2, topicsNames } = useTopicsNames();

  if (l2) return <Spinner />;
  if (topicsNames === "There is no topics to Represent") return null;
  return (
    <Row>
      <Col sm={12} md={12} lg={6}>
        <form>
          <Row className="h-25">
            <Col>
              <label htmlFor="topic" className="form-label fs-4">
                Topic Name
              </label>
              <select
                disabled={l2 && isLoading}
                id="topic"
                className="form-select "
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
              >
                <option value="" disabled>
                  ---
                </option>
                {topicsNames.map((e) => (
                  <option key={e.name} value={e.name}>
                    {e.name}
                  </option>
                ))}
              </select>
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
