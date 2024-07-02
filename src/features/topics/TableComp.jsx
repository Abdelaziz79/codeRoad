import React from "react";
import { Spinner, Table } from "react-bootstrap";
import {
  HiOutlineArrowUpOnSquare,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";
import { useUser } from "../../features/authentication/useUser";
import { useDeleteExplanation } from "./useDeleteExplanation";

export default function TableComp({ explanations }) {
  const { deleteExplanation, isLoading } = useDeleteExplanation();
  const { darkMode } = useDarkMode();
  const { user, isLoading: isUserLoading } = useUser();

  if (isUserLoading) return <Spinner />;
  const isAdmin = user?.isAdmin;
  if (
    explanations?.length === 0 ||
    explanations === "there is no Lessons to represint"
  )
    return <h1>no explanations</h1>;
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
          <th>Topics</th>
          <th>Level</th>
          <th></th>
        </tr>
      </thead>
      <tbody className="">
        {explanations?.map((explanation, index) => (
          <tr key={explanation.id}>
            <td className="t-td">
              <Link
                to={`/topics/${explanation.id}`}
                className={`text-decoration-none ${
                  darkMode ? "text-light" : "text-dark"
                }`}
              >
                {index + 1}
              </Link>
            </td>
            <td className="t-td">
              <Link
                to={`/topics/${explanation.id}`}
                className={`text-decoration-none t-title ${
                  darkMode ? "text-light" : "text-dark"
                }`}
              >
                {explanation.name}
              </Link>
            </td>
            <td className="t-td">
              <Link
                to={`/topics/${explanation.id}`}
                className={`text-decoration-none t-topics ${
                  darkMode ? "text-light" : "text-dark"
                }`}
              >
                {explanation.topic?.split("-").join(", ")}
              </Link>
            </td>
            <td className="t-td">
              <Link
                to={`/topics/${explanation.id}`}
                className={`text-decoration-none ${
                  darkMode ? "text-light" : "text-dark"
                }`}
              >
                <span
                  className={`p-1 rounded-3 text-center text-white fs-6 ${explanation.level}`}
                >
                  {explanation.level}
                </span>
              </Link>
            </td>
            <td className="t-td">
              {isAdmin && (
                <div>
                  <button
                    className={`btn ${darkMode ? "text-light" : "text-dark"}`}
                    disabled={isLoading}
                    onClick={() => deleteExplanation(explanation.id)}
                  >
                    <HiOutlineTrash size={20} />
                  </button>
                  <Link to={`/topics/edit/${explanation.id}`}>
                    <button
                      className={`btn  ${
                        darkMode ? "text-light" : "text-dark"
                      }`}
                      disabled={isLoading}
                    >
                      <HiOutlinePencilSquare size={20} />
                    </button>
                  </Link>
                  <Link to={`/topics/${explanation.id}`}>
                    <button
                      className={`btn ${darkMode ? "text-light" : "text-dark"}`}
                      disabled={isLoading}
                    >
                      <HiOutlineArrowUpOnSquare size={20} />
                    </button>
                  </Link>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
