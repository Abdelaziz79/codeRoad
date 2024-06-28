import { Link } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";
import {
  HiBookmarkSlash,
  HiMiniArrowRightCircle,
  HiOutlinePencilSquare,
  HiTrash,
} from "react-icons/hi2";
import { Table } from "react-bootstrap";
import { useUser } from "./useUser";
import { Spinner } from "react-bootstrap";
import { useDeletePost } from "../posts/useDeletePost";
import { updateSavedPosts } from "../../services/apiAuth";
import { useQueryClient } from "@tanstack/react-query";
import { useUnReportPost } from "../posts/useUnReportPost";
import { LuMegaphoneOff } from "react-icons/lu";

export default function Base({ items, link, buttons }) {
  const { user, isLoading } = useUser();
  const { darkMode } = useDarkMode();
  const { deletePost, isLoading: isDeleting } = useDeletePost();
  const { isLoading: isUnreporting, unreportPost } = useUnReportPost();
  const { deletePost: isDeletePost, editPost, removePost } = buttons;

  function handleUnSavePost(id) {
    let savedPosts = user?.user_metadata?.saved_posts || [];
    savedPosts = savedPosts.filter((p) => p.id !== id);
    updateSavedPosts(savedPosts);
    queryClient.invalidateQueries({ queryKey: ["user"] });
  }

  const queryClient = useQueryClient();
  if (isLoading) return <Spinner />;
  const isAdmin = user?.user_metadata?.is_admin;

  async function handleDeletePost(id) {
    deletePost(id);
    let savedPosts = user?.user_metadata?.saved_posts || [];
    savedPosts = savedPosts.filter((p) => p.id !== id);
    await updateSavedPosts(savedPosts);
    queryClient.invalidateQueries({ queryKey: ["user"] });
  }

  function handleUnReportPost(id) {
    unreportPost(id);
    let savedPosts = user?.user_metadata?.saved_posts || [];
    savedPosts = savedPosts.map((p) => {
      if (p.id === id) {
        return { ...p, is_reported: false };
      }
      return p;
    });
    updateSavedPosts(savedPosts);
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
                    to={`/${link}/${item.id}`}
                    className={`text-decoration-none t-topics`}
                  >
                    <button className={`btn ${darkMode ? "text-light" : ""}`}>
                      <HiMiniArrowRightCircle size={20} />
                    </button>
                  </Link>
                  {isDeletePost && (
                    <button
                      className={`btn ${darkMode ? "text-light" : "text-dark"}`}
                      onClick={() => handleDeletePost(item.id)}
                      disabled={isDeleting}
                    >
                      <HiTrash size={20} />
                    </button>
                  )}
                  {editPost && (
                    <Link to={`/posts/edit/${item.id}`}>
                      <button
                        className={`btn ${
                          darkMode ? "text-light" : "text-dark"
                        }`}
                      >
                        <HiOutlinePencilSquare size={20} />
                      </button>
                    </Link>
                  )}
                  {removePost && (
                    <button
                      className={`btn ${darkMode ? "text-light" : "text-dark"}`}
                      onClick={() => handleUnSavePost(item.id)}
                    >
                      <HiBookmarkSlash size={20} />
                    </button>
                  )}
                  {isAdmin && (
                    <>
                      {item.is_reported && (
                        <button
                          className={`btn ${
                            darkMode ? "text-light" : "text-dark"
                          }`}
                          onClick={() => handleUnReportPost(item.id)}
                          disabled={isUnreporting}
                        >
                          <LuMegaphoneOff size={20} />
                        </button>
                      )}
                    </>
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
