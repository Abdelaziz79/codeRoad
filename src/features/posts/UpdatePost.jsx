import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUpdatePost } from "./useUpdatePost";
import { usePost } from "./usePost";
import { useDarkMode } from "../../context/DarkModeContext";
import PostForm from "./PostForm";
export default function UpdatePost() {
  const navigate = useNavigate();

  const { isLoading: isLoading1, updatePost } = useUpdatePost();

  const { post, isLoading: isLoading2 } = usePost();

  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  useEffect(() => {
    if (!post) return;
    setTitle(post.title);
    setContent(post.content);
  }, [post]);

  function handleUpdate(e) {
    e.preventDefault();
    if (!title || !content) return;

    const newPost = {
      id: post.id,
      title,
      content,
    };

    updatePost(newPost, {
      onSuccess: () => {
        navigate("/user/account");
      },
    });
  }
  const { darkMode } = useDarkMode();

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
        isLoading={isLoading1 || isLoading2}
      />
      <button className="btn btn-primary mt-3" onClick={handleUpdate}>
        Update
      </button>
    </div>
  );
}
