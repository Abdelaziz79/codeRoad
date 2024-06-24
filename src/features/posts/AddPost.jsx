import PostForm from "./PostForm";

import { useState } from "react";
import { useCreatePost } from "./useCreatePost";
import { useDarkMode } from "../../context/DarkModeContext";
import { useUser } from "../authentication/useUser";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { createPost, isLoading } = useCreatePost();
  const { user, isLoading: isUserLoading } = useUser();
  const { darkMode } = useDarkMode();
  if (isUserLoading) return <Spinner />;

  function handleSubmit(e) {
    e.preventDefault();
    if (!title || !content) return;
    if (title.length > 30) {
      toast.error("Title must be less than 30 characters");
      return;
    }
    if (content.length > 1000) {
      toast.error("Content must be less than 1000 characters");
      return;
    }
    const newPost = {
      title,
      content,
      user_id: user?.id,
      author_name:
        user?.user_metadata?.full_name || user?.user_metadata?.user_name,
      author_image:
        user?.user_metadata?.avatar || user?.user_metadata?.avatar_url,
    };

    createPost(newPost);
    setTitle("");
    setContent("");
  }
  return (
    <div
      className={` ${darkMode ? "form-style-dark" : "form-style"} p-3 rounded `}
    >
      <h1 className="mb-4 ">Add new post</h1>
      <PostForm
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        isLoading={isLoading}
      />
      <button
        className="btn btn-primary mt-3"
        disabled={isLoading}
        onClick={handleSubmit}
      >
        Add new post
      </button>
    </div>
  );
}
