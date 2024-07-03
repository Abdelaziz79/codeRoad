import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import {
  HiMiniGlobeEuropeAfrica,
  HiOutlineHandThumbDown,
  HiOutlineHandThumbUp,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import lightLogo from "../../public/1.png";
import darkLogo from "../../public/2.png";
import { useDarkMode } from "../context/DarkModeContext";
import Comments from "../features/comments/Comments";
import { formatedDate } from "../helper/helper";
import { votePost } from "../services/apiPosts";
import Avatar from "./Avatar";
import MarkDown from "./MarkDown";

export default function ProfilePost({ post }) {
  const { darkMode } = useDarkMode();
  const [showComments, setShowComments] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const logo = darkMode ? darkLogo : lightLogo;
  const queryClient = useQueryClient();
  async function handleVoteUp() {
    setIsLoading(true);
    await votePost(post.postId, 1);

    queryClient.invalidateQueries({ queryKey: ["posts"] });
    setIsLoading(false);
  }

  async function handleVoteDown() {
    setIsLoading(true);
    await votePost(post.postId, 0);

    queryClient.invalidateQueries({ queryKey: ["posts"] });
    setIsLoading(false);
  }

  function handleShowComments() {
    setShowComments(!showComments);
  }
  return (
    <Row className="mt-3">
      <Col sm={12} md={12} lg={8} className="mx-auto">
        <Card className={`w-100 ${darkMode ? "post-dark" : ""}`}>
          <Card.Header className={`${darkMode ? "post-header-border" : ""}`}>
            <div className="d-flex align-items-center gap-3">
              <Link to={`/profile/${post?.userId}`}>
                <Avatar
                  src={post?.userImage ?? logo}
                  alt="avatar"
                  width={70}
                  height={70}
                />
              </Link>
              <div>
                <Link
                  className={`fw-bold text-decoration-none ${
                    darkMode ? "text-light" : "text-dark"
                  }`}
                  to={`/profile/${post?.userId}`}
                >
                  <h6>{post.post?.userName}</h6>
                </Link>
                <span className="date d-flex gap-1">
                  <HiMiniGlobeEuropeAfrica size={20} />
                  {formatedDate(post?.date)}
                </span>
              </div>
            </div>
          </Card.Header>
          <Card.Body>
            <div
              className="no-scroll-width  "
              style={{ maxHeight: "500px", overflowY: "auto" }}
            >
              <MarkDown markdown={post?.content} />
            </div>
            <hr />
            <div className="d-flex align-items-center gap-3">
              <span className="d-flex align-items-center gap-2">
                {isLoading ? (
                  <Spinner />
                ) : (
                  <HiOutlineHandThumbUp
                    size={20}
                    className="pointer"
                    onClick={() => handleVoteUp(post.postId, 1)}
                  />
                )}
                {post?.up}
              </span>
              <span className="d-flex align-items-center gap-2">
                {isLoading ? (
                  <Spinner />
                ) : (
                  <HiOutlineHandThumbDown
                    size={20}
                    className="pointer"
                    onClick={() => handleVoteDown(post.postId, 0)}
                  />
                )}
                {post?.down}
              </span>
              <div className="flex-grow-1">
                <span
                  className=" float-end pointer"
                  onClick={handleShowComments}
                >
                  {post?.comments?.length ?? 0} comments
                </span>
              </div>
            </div>

            {showComments && <Comments post_id={post?.postId} />}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
