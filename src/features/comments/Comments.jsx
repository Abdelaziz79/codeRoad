import Avatar from "../../ui/Avatar";
import lightLogo from "../../../public/1.png";
import darkLogo from "../../../public/2.png";

import { useDarkMode } from "../../context/DarkModeContext";
import { formatedDate } from "../../helper/helper";
import CreateComment from "./CreateComment";

export default function Comments({
  comments,
  post_id,
  user_id,
  author_name,
  author_image,
}) {
  return (
    <div>
      <hr />
      <CreateComment
        post_id={post_id}
        user_id={user_id}
        author_name={author_name}
        author_image={author_image}
      />
      {comments?.map((comment) => (
        <CommentComp key={comment?.id} comment={comment} />
      ))}
    </div>
  );
}

function CommentComp({ comment }) {
  const { darkMode } = useDarkMode();
  const logo = darkMode ? darkLogo : lightLogo;

  return (
    <div className="d-flex align-items-center gap-3 mt-3 comment">
      <Avatar
        src={comment?.author_image || logo}
        alt="avatar"
        width={50}
        height={50}
      />
      <div className="d-flex flex-column justify-content-center align-items-start  ">
        <h6 className={`${darkMode ? "text-white" : "text-dark"}`}>
          {comment?.author_name}
        </h6>
        <span className={`date `}>{formatedDate(comment?.created_at)}</span>
        <p className={`${darkMode ? "text-white" : "text-dark"}`}>
          {comment?.content}
        </p>
      </div>
    </div>
  );
}
