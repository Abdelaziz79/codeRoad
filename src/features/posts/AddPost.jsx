import PostForm from "./PostForm";

import { useState } from "react";
import { useCreatePost } from "./useCreatePost";
import { useDarkMode } from "../../context/DarkModeContext";
import { useUser } from "../authentication/useUser";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

export default function AddPost() {
  const [content, setContent] = useState("");
  const { createPost, isLoading } = useCreatePost();
  const { user, isLoading: isUserLoading } = useUser();
  const { darkMode } = useDarkMode();
  if (isUserLoading) return <Spinner />;

  function handleSubmit(e) {
    e.preventDefault();
    if (!content) return;

    if (content.length > 1000) {
      toast.error("Content must be less than 1000 characters");
      return;
    }
    const newPost = {
      Content: content,
      UserId: user?.userInfo?.id,
      Images: [],
    };

    createPost(newPost);
    setContent("");
  }
  return (
    <div
      className={` ${darkMode ? "form-style-dark" : "form-style"} p-3 rounded `}
    >
      <h1 className="mb-4 ">Add new post</h1>
      <form onSubmit={handleSubmit}>
        <PostForm
          content={content}
          setContent={setContent}
          isLoading={isLoading}
        />
        <button
          type="submit"
          className="btn btn-primary mt-3"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          Add new post
        </button>
      </form>
    </div>
  );
}
