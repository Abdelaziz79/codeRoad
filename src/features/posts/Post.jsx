import lightLogo from "../../../public/1.png";
import darkLogo from "../../../public/2.png";
import Avatar from "../../ui/Avatar";
import MarkDown from "../../ui/MarkDown";

import { useRef, useState } from "react";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import {
  HiBookmark,
  HiMegaphone,
  HiMiniGlobeEuropeAfrica,
  HiOutlineHandThumbDown,
  HiOutlineHandThumbUp,
} from "react-icons/hi2";
import { useDarkMode } from "../../context/DarkModeContext";
import { formatedDate } from "../../helper/helper";
import { useUser } from "../authentication/useUser";
import Comments from "../comments/Comments";
import { useCommentsOnPost } from "../comments/useCommentsOnPost";
import { useIncreasePostDown, useIncreasePostUp } from "./usePostUpDown";
import { useReportPost } from "./useReportPost";
import { useSavedPost } from "./useSavedPost";

export default function Post({ post }) {
  console.log(post);
  const { darkMode } = useDarkMode();
  const { savePost, isLoading } = useSavedPost();
  const { user } = useUser();
  const { isLoading: isLoading2, comments } = useCommentsOnPost(post.id);
  const { isLoading: isLoading3, reportPost } = useReportPost();
  const [showComments, setShowComments] = useState(false);
  const { increasePostUp, isLoading: isLoading4 } = useIncreasePostUp();
  const { increasePostDown, isLoading: isLoading5 } = useIncreasePostDown();
  const logo = darkMode ? darkLogo : lightLogo;

  console.log(user);

  let addUp = useRef(0);
  let addDown = useRef(0);

  function handleSvavePost() {
    const posts = user?.user_metadata?.saved_posts || [];
    const newPost = posts.filter((p) => p.id !== post.id);
    const newPosts = [...newPost, post];
    savePost(newPosts);
  }

  function handleReportPost() {
    reportPost(post.id);
  }

  function handleShowComments() {
    setShowComments(!showComments);
  }
  return (
    <Row className="">
      <Col sm={12} md={12} lg={8} className="mx-auto">
        <Card className={`w-100 ${darkMode ? "post-dark" : ""}`}>
          <Card.Header className={`${darkMode ? "post-header-border" : ""}`}>
            <div className="d-flex align-items-center gap-3">
              <Avatar
                src={post?.userImage ?? logo}
                alt="avatar"
                width={70}
                height={70}
              />
              <div>
                <h6>{post?.userName}</h6>
                <span className="date d-flex gap-1">
                  <HiMiniGlobeEuropeAfrica size={20} />
                  {formatedDate(post?.date)}
                </span>
              </div>
              <div className="flex-grow-1 ">
                <div className="float-end ">
                  <span className="mx-2">
                    {isLoading ? (
                      <Spinner />
                    ) : (
                      <HiBookmark
                        size={20}
                        className="pointer"
                        onClick={handleSvavePost}
                      />
                    )}
                  </span>
                  <span>
                    {isLoading3 ? (
                      <Spinner />
                    ) : (
                      <HiMegaphone
                        size={20}
                        className="pointer"
                        onClick={handleReportPost}
                      />
                    )}
                  </span>
                </div>
              </div>
            </div>
          </Card.Header>
          <Card.Body>
            <Card.Title>{post?.title}</Card.Title>
            <div
              className="no-scroll-width  "
              style={{ maxHeight: "500px", overflowY: "auto" }}
            >
              <MarkDown markdown={post?.content} />
            </div>
            <hr />
            <div className="d-flex align-items-center gap-3">
              <span className="d-flex align-items-center gap-2">
                {isLoading4 ? (
                  <Spinner />
                ) : (
                  <HiOutlineHandThumbUp size={20} className="pointer" />
                )}
                {post?.up + addUp.current}
              </span>
              <span className="d-flex align-items-center gap-2">
                {isLoading5 ? (
                  <Spinner />
                ) : (
                  <HiOutlineHandThumbDown size={20} className="pointer" />
                )}
                {post?.down + addDown.current}
              </span>
              <div className="flex-grow-1">
                <span
                  className=" float-end pointer"
                  onClick={handleShowComments}
                >
                  {isLoading2 ? <Spinner /> : comments?.length ?? 0} comments
                </span>
              </div>
            </div>

            {showComments && (
              <Comments
                comments={comments}
                user_id={user?.id}
                post_id={post?.id}
                author_name={
                  user?.user_metadata?.full_name ||
                  user?.user_metadata?.user_name
                }
                author_image={
                  user?.user_metadata?.avatar || user?.user_metadata?.avatar_url
                }
              />
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
