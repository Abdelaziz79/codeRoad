import lightLogo from "../../../public/1.png";
import darkLogo from "../../../public/2.png";
import Avatar from "../../ui/Avatar";
import MarkDown from "../../ui/MarkDown";

import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import {
  HiMiniGlobeEuropeAfrica,
  HiOutlineHandThumbDown,
  HiOutlineHandThumbUp,
} from "react-icons/hi2";
import { useDarkMode } from "../../context/DarkModeContext";
import { formatedDate } from "../../helper/helper";
import { votePost } from "../../services/apiPosts";
import Comments from "../comments/Comments";

export default function Post({ post }) {
  const { darkMode } = useDarkMode();
  const [showComments, setShowComments] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const logo = darkMode ? darkLogo : lightLogo;
  const queryClient = useQueryClient();

  async function handleVoteUp() {
    setIsLoading(true);
    await votePost(post.post.postId, 1);

    queryClient.invalidateQueries({ queryKey: ["posts"] });
    setIsLoading(false);
  }

  async function handleVoteDown() {
    setIsLoading(true);
    await votePost(post.post.postId, 0);

    queryClient.invalidateQueries({ queryKey: ["posts"] });
    setIsLoading(false);
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
                src={post.post?.userImage ?? logo}
                alt="avatar"
                width={70}
                height={70}
              />
              <div>
                <h6>{post.post?.userName}</h6>
                <span className="date d-flex gap-1">
                  <HiMiniGlobeEuropeAfrica size={20} />
                  {formatedDate(post.post?.date)}
                </span>
              </div>
            </div>
          </Card.Header>
          <Card.Body>
            <div
              className="no-scroll-width  "
              style={{ maxHeight: "500px", overflowY: "auto" }}
            >
              <MarkDown markdown={post.post?.content} />
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
                {post.post?.up}
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
                {post.post?.down}
              </span>
              <div className="flex-grow-1">
                <span
                  className=" float-end pointer"
                  onClick={handleShowComments}
                >
                  {post.comments.length ?? 0} comments
                </span>
              </div>
            </div>

            {showComments && <Comments post_id={post.post?.postId} />}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
