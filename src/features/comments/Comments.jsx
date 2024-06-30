import Avatar from "../../ui/Avatar";
import lightLogo from "../../../public/1.png";
import darkLogo from "../../../public/2.png";

import { useDarkMode } from "../../context/DarkModeContext";
import { formatedDate } from "../../helper/helper";
import CreateComment from "./CreateComment";
import { HiOutlineHandThumbDown, HiOutlineHandThumbUp } from "react-icons/hi2";
import { voteComment } from "../../services/apiCommnets";

export default function Comments({ comments, post_id }) {
  console.log(comments);
  return (
    <div>
      <hr />
      <CreateComment post_id={post_id} />
      {comments?.map((comment) => (
        <CommentComp key={comment?.id} comment={comment} />
      ))}
    </div>
  );
}

function CommentComp({ comment }) {
  const { darkMode } = useDarkMode();
  const logo = darkMode ? darkLogo : lightLogo;
  async function handleUpVote(e) {
    e.preventDefault();
    const data = await voteComment(Number(comment?.id), 1);
    console.log(data);
  }
  return (
    <div className="d-flex align-items-center gap-3 mt-3 comment">
      <Avatar
        src={comment?.author_image || logo}
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
              <HiOutlineHandThumbDown size={20} className="pointer" />
              {comment?.down}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
