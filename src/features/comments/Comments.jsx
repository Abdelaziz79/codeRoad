import lightLogo from "../../../public/1.png";
import darkLogo from "../../../public/2.png";
import Avatar from "../../ui/Avatar";

import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import {
  HiHandThumbDown,
  HiHandThumbUp,
  HiOutlineHandThumbDown,
  HiOutlineHandThumbUp,
} from "react-icons/hi2";
import { useDarkMode } from "../../context/DarkModeContext";
import { formatedDate } from "../../helper/helper";
import { voteComment } from "../../services/apiCommnets";
import CreateComment from "./CreateComment";
import { useCommentsOnPost } from "./useCommentsOnPost";
import { Link } from "react-router-dom";
import { useUser } from "../authentication/useUser";

export default function Comments({ post_id }) {
  const { comments, isLoading } = useCommentsOnPost(post_id);
  if (isLoading) {
    return <Spinner />;
  }

  if (comments === "there is no comments")
    return (
      <div className="mt-3">
        <CreateComment post_id={post_id} />
      </div>
    );
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
  const { user, isLoading: isUserLoading } = useUser();
  if (isUserLoading) return <Spinner />;
  const upVotesComments = user.userVotes.commentVotesId.upComments;
  const downVotesComments = user.userVotes.commentVotesId.downComments;
  const isCommentVoteUp = upVotesComments.indexOf(comment.id) !== -1;
  const isCommentVoteDown = downVotesComments.indexOf(comment.id) !== -1;

  async function handleUpVote(e) {
    setIsLoading(true);

    e.preventDefault();
    await voteComment(Number(comment?.id), 1);
    queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    queryClient.invalidateQueries({ queryKey: ["user"] });
    setIsLoading(false);
  }

  async function handleDownVote(e) {
    setIsLoading(true);
    e.preventDefault();
    await voteComment(Number(comment?.id), 0);
    queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    queryClient.invalidateQueries({ queryKey: ["user"] });

    setIsLoading(false);
  }
  return isLoading ? (
    <Spinner />
  ) : (
    <div className="d-flex align-items-center gap-3 mt-3 comment">
      <Link to={`/profile/${comment?.userId}`}>
        <Avatar
          src={comment?.userImage || logo}
          alt="avatar"
          width={50}
          height={50}
        />
      </Link>
      <div className="d-flex flex-column justify-content-center align-items-start w-100  ">
        <Link
          className={`fw-bold text-decoration-none ${
            darkMode ? "text-light" : "text-dark"
          }`}
          to={`/profile/${comment?.userId}`}
        >
          <h6 className={`${darkMode ? "text-white" : "text-dark"}`}>
            {comment?.userName}
          </h6>
        </Link>
        <span className={`date `}>{formatedDate(comment?.date)}</span>

        <div className="d-flex justify-content-between w-100 align-items-center">
          <p className={`${darkMode ? "text-white" : "text-dark"}`}>
            {comment?.content}
          </p>
          <div className="d-flex gap-2">
            <span className="d-flex gap-1 align-items-center">
              {isCommentVoteUp ? (
                <HiHandThumbUp
                  size={20}
                  className="pointer"
                  onClick={handleUpVote}
                />
              ) : (
                <HiOutlineHandThumbUp
                  size={20}
                  className="pointer"
                  onClick={handleUpVote}
                />
              )}
              {comment?.up}
            </span>
            <span className="d-flex gap-1 align-items-center">
              {isCommentVoteDown ? (
                <HiHandThumbDown
                  size={20}
                  className="pointer"
                  onClick={handleDownVote}
                />
              ) : (
                <HiOutlineHandThumbDown
                  size={20}
                  className="pointer"
                  onClick={handleDownVote}
                />
              )}
              {comment?.down}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
