import { useQueryClient } from "@tanstack/react-query";
import { Table } from "react-bootstrap";
import {
  HiMiniArrowRightCircle,
  HiOutlinePencilSquare,
  HiTrash,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";
import { useDeletePost } from "../posts/useDeletePost";

export default function Base({ items, link, buttons }) {
  const { darkMode } = useDarkMode();
  const { deletePost, isLoading: isDeleting } = useDeletePost();
  const { deletePost: isDeletePost, editPost } = buttons;

  const queryClient = useQueryClient();

  async function handleDeletePost(id) {
    deletePost(id);
    queryClient.invalidateQueries({ queryKey: ["user"] });
  }
  let i = 0;
  if (items.length === 0) return <h1>No posts</h1>;
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
          <th>Content</th>
          <th>view</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) =>
          item.is_deleted ? null : (
            <tr key={item.id} className="w-20">
              <td className="t-td ">{++i}</td>
              <td className="t-td  ">{item.content}</td>
              <td className="t-td ">
                <div className="d-flex align-items-center">
                  <Link
                    to={`/${link}/${item.postId}`}
                    className={`text-decoration-none t-topics`}
                  >
                    <button className={`btn ${darkMode ? "text-light" : ""}`}>
                      <HiMiniArrowRightCircle size={20} />
                    </button>
                  </Link>
                  {isDeletePost && (
                    <button
                      className={`btn ${darkMode ? "text-light" : "text-dark"}`}
                      onClick={() => handleDeletePost(item.postId)}
                      disabled={isDeleting}
                    >
                      <HiTrash size={20} />
                    </button>
                  )}
                  {editPost && (
                    <Link to={`/posts/edit/${item.postId}`}>
                      <button
                        className={`btn ${
                          darkMode ? "text-light" : "text-dark"
                        }`}
                      >
                        <HiOutlinePencilSquare size={20} />
                      </button>
                    </Link>
                  )}
                </div>
              </td>
            </tr>
          )
        )}
      </tbody>
    </Table>
  );
}
