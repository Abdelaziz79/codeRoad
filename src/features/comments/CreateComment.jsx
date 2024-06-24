import { useState } from "react";
import { useDarkMode } from "../../context/DarkModeContext";
import { useCreateComment } from "./useCreateComment";
import { Spinner } from "react-bootstrap";
import { useQueryClient } from "@tanstack/react-query";

export default function CreateComment({
  post_id,
  user_id,
  author_name,
  author_image,
}) {
  const { darkMode } = useDarkMode();
  const [comment, setComment] = useState("");
  const { createComment: create, isLoading } = useCreateComment();
  const queryClient = useQueryClient();

  function handleClick(e) {
    e.preventDefault();
    if (!comment || !user_id || !post_id || !author_name) return;
    const newComment = {
      content: comment,
      post_id,
      user_id,
      author_name,
      author_image,
    };

    create(newComment);
    setComment("");
    queryClient.invalidateQueries({ queryKey: ["comments", post_id] });
    queryClient.invalidateQueries({ queryKey: ["comments", post_id] });
  }

  return (
    <div>
      <form className={` ${darkMode ? "form-style-dark" : "form-style"}`}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className={`w-100 form-control mb-3 `}
          placeholder="Write a comment..."
        ></textarea>
        <button className="btn btn-primary" type="submit" onClick={handleClick}>
          {isLoading ? <Spinner /> : "Comment"}
        </button>
      </form>
    </div>
  );
}
