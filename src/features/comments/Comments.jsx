import lightLogo from "../../../public/1.png";
import darkLogo from "../../../public/2.png";
import Avatar from "../../ui/Avatar";

import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { HiOutlineHandThumbDown, HiOutlineHandThumbUp } from "react-icons/hi2";
import { useDarkMode } from "../../context/DarkModeContext";
import { formatedDate } from "../../helper/helper";
import { voteComment } from "../../services/apiCommnets";
import CreateComment from "./CreateComment";
import { useCommentsOnPost } from "./useCommentsOnPost";

export default function Comments({ post_id }) {
  const { comments, isLoading } = useCommentsOnPost(post_id);

  if (isLoading) {
    return <Spinner />;
  }
  if (comments === "there is no comments")
    return <CreateComment post_id={post_id} />;
  return (
    <div>
      <hr />
      <CreateComment post_id={post_id} />
      {comments?.map((comment) => (
        <CommentComp key={comment?.id} comment={comment} postId={post_id} />
      ))}
    </div>
  );
}

function CommentComp({ comment, postId }) {
  const [isLoading, setIsLoading] = useState(false);

  const { darkMode } = useDarkMode();
  const logo = darkMode ? darkLogo : lightLogo;
  const queryClient = useQueryClient();
  async function handleUpVote(e) {
    setIsLoading(true);

    e.preventDefault();
    await voteComment(Number(comment?.id), 1);
    queryClient.invalidateQueries({ queryKey: ["comments", postId] });

    setIsLoading(false);
  }

  async function handleDownVote(e) {
    setIsLoading(true);
    e.preventDefault();
    await voteComment(Number(comment?.id), 0);
    queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    setIsLoading(false);
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="d-flex align-items-center gap-3 mt-3 comment">
      <Avatar
        src={comment?.userImage || logo}
        alt="avatar"
        width={50}
        height={50}
      />
      <div className="d-flex flex-column justify-content-center align-items-start w-100  ">
        <h6 className={`${darkMode ? "text-white" : "text-dark"}`}>
          {comment?.userName}
        </h6>
        <span className={`date `}>{formatedDate(comment?.date)}</span>

        <div className="d-flex justify-content-between w-100 align-items-center">
          <p className={`${darkMode ? "text-white" : "text-dark"}`}>
            {comment?.content}
          </p>
          <div className="d-flex gap-2">
            <span className="d-flex gap-1 align-items-center">
              <HiOutlineHandThumbUp
                size={20}
                className="pointer"
                onClick={handleUpVote}
              />
              {comment?.up}
            </span>
            <span className="d-flex gap-1 align-items-center">
              <HiOutlineHandThumbDown
                size={20}
                className="pointer"
                onClick={handleDownVote}
              />
              {comment?.down}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
