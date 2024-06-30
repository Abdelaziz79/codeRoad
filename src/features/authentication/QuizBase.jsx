import { Table } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { HiMiniArrowRightCircle } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";

export default function QuizBase({ quizs }) {
  const { darkMode } = useDarkMode();
  console.log(quizs);
  let i = 0;
  return (
    <Table
      striped
      bordered
      hover
      responsive
      className={` ${darkMode ? "table-dark" : ""} `}
    >
      <thead>
        <tr>
          <th></th>
          <th>Title</th>
          <th>score</th>
          <th>view</th>
        </tr>
      </thead>
      <tbody>
        {quizs.map((item) => (
          <tr key={item.id}>
            <td className="t-td">{++i}</td>
            <td className="t-td">{item.name}</td>
            <td className="t-td ">
              <div className="d-flex align-items-center gap-2">
                <div style={{ width: "60px" }}>
                  <CircularProgressbar
                    strokeWidth={15}
                    value={item.score}
                    styles={{
                      path: {
                        stroke: "#20c997",
                      },
                    }}
                  />
                </div>
                <span>{item.score}%</span>
              </div>
            </td>
            <td className="t-td">
              <Link
                to={`/quiz/${item.id}`}
                className={`text-decoration-none t-topics`}
              >
                <HiMiniArrowRightCircle size={30} />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
