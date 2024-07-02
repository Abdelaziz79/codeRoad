import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUpdatePost } from "./useUpdatePost";
import { usePost } from "./usePost";
import { useDarkMode } from "../../context/DarkModeContext";
import PostForm from "./PostForm";
import { useUser } from "../authentication/useUser";

export default function UpdatePost() {
  const navigate = useNavigate();

  const { isLoading: isLoading1, updatePost } = useUpdatePost();

  const { post, isLoading: isLoading2 } = usePost();
  const { user } = useUser();
  const [content, setContent] = useState();

  useEffect(() => {
    if (!post) return;
    setContent(post.post.content);
  }, [post]);

  function handleUpdate(e) {
    e.preventDefault();
    if (!content) return;

    const newPost = {
      id: post.post.postId,
      UserId: user.userInfo.id,
      Content: content,
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
