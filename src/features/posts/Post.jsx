import Avatar from "../../ui/Avatar";
import MarkDown from "../../ui/MarkDown";
import lightLogo from "../../../public/1.png";
import darkLogo from "../../../public/2.png";

import { useRef, useState } from "react";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import { useDarkMode } from "../../context/DarkModeContext";
import {
  HiHandThumbUp,
  HiHandThumbDown,
  HiMegaphone,
  HiBookmark,
  HiMiniGlobeEuropeAfrica,
  HiOutlineHandThumbUp,
  HiOutlineHandThumbDown,
} from "react-icons/hi2";
import { useSavedPost } from "./useSavedPost";
import { useUser } from "../authentication/useUser";
import { useReportPost } from "./useReportPost";
import { useCommentsOnPost } from "../comments/useCommentsOnPost";
import { useQueryClient } from "@tanstack/react-query";
import { useIncreasePostDown, useIncreasePostUp } from "./usePostUpDown";
import { toast } from "react-toastify";
import { updateUserDislikes, updateUserLikes } from "../../services/apiAuth";
import { formatedDate } from "../../helper/helper";
import Comments from "../comments/Comments";

export default function Post({ post }) {
  const { darkMode } = useDarkMode();
  const { savePost, isLoading } = useSavedPost();
  const { user } = useUser();
  const { isLoading: isLoading2, comments } = useCommentsOnPost(post.id);
  const { isLoading: isLoading3, reportPost } = useReportPost();
  const [showComments, setShowComments] = useState(false);
  const { increasePostUp, isLoading: isLoading4 } = useIncreasePostUp();
  const { increasePostDown, isLoading: isLoading5 } = useIncreasePostDown();
  const logo = darkMode ? darkLogo : lightLogo;
  const authorImage = post?.author_image || logo;
  const queryClient = useQueryClient();
  const likes = user.user_metadata.likes || [];
  const dislikes = user.user_metadata.dislikes || [];

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

  async function handleUpvote(e) {
    e.preventDefault();

    let foundInLikes = false;
    let foundInDislikes = false;
    if (likes.length > 0) {
      foundInLikes = likes.find((like) => like.post_id * 1 === post.id * 1);
    }
    if (dislikes.length > 0) {
      foundInDislikes = dislikes.find(
        (dislike) => dislike.post_id * 1 === post.id * 1
      );
    }
    if (foundInLikes || foundInDislikes) {
      toast.error(
        `You have already ${foundInLikes ? "upvoted" : "downvoted"} this post`
      );
      return;
    }
    const newUserLikes = [
      ...(user.user_metadata.likes || []),
      { post_id: post.id },
    ];
    await updateUserLikes(newUserLikes);
    increasePostUp(post.id);
    queryClient.invalidateQueries({ queryKey: ["user"] });
    addUp.current = 1;
  }

  async function handleDownvote(e) {
    e.preventDefault();

    let foundInLikes = false;
    let foundInDislikes = false;
    if (likes.length > 0) {
      foundInLikes = likes.find((like) => like.post_id * 1 === post.id * 1);
    }
    if (dislikes.length > 0) {
      foundInDislikes = dislikes.find(
        (dislike) => dislike.post_id * 1 === post.id * 1
      );
    }

    if (foundInLikes || foundInDislikes) {
      toast.error(
        `You have already ${foundInLikes ? "upvoted" : "downvoted"} this post`
      );
      return;
    }
    const newUserDislikes = [
      ...(user.user_metadata.dislikes || []),
      { post_id: post.id },
    ];
    await updateUserDislikes(newUserDislikes);
    increasePostDown(post.id);
    queryClient.invalidateQueries({ queryKey: ["user"] });
    addDown.current = 1;
  }

  return (
    <Row className="">
      <Col sm={12} md={12} lg={8} className="mx-auto">
        <Card className={`w-100 ${darkMode ? "post-dark" : ""}`}>
          <Card.Header className={`${darkMode ? "post-header-border" : ""}`}>
            <div className="d-flex align-items-center gap-3">
              <Avatar src={authorImage} alt="avatar" width={70} height={70} />
              <div>
                <h6>{post?.author_name}</h6>
                <span className="date d-flex gap-1">
                  <HiMiniGlobeEuropeAfrica size={20} />
                  {formatedDate(post?.created_at)}
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
            <Card.Title>{post.title}</Card.Title>
            <div
              className="no-scroll-width  "
              style={{ maxHeight: "500px", overflowY: "auto" }}
            >
              <MarkDown markdown={post.content} />
            </div>
            <hr />
            <div className="d-flex align-items-center gap-3">
              <span className="d-flex align-items-center gap-2">
                {isLoading4 ? (
                  <Spinner />
                ) : (
                  <HiOutlineHandThumbUp
                    size={20}
                    onClick={handleUpvote}
                    className="pointer"
                  />
                )}
                {post?.up + addUp.current}
              </span>
              <span className="d-flex align-items-center gap-2">
                {isLoading5 ? (
                  <Spinner />
                ) : (
                  <HiOutlineHandThumbDown
                    size={20}
                    onClick={handleDownvote}
                    className="pointer"
                  />
                )}
                {post?.down + addDown.current}
              </span>
              <div className="flex-grow-1">
                <span
                  className=" float-end pointer"
                  onClick={handleShowComments}
                >
                  {isLoading2 ? <Spinner /> : comments.length} comments
                </span>
              </div>
            </div>

            {showComments && (
              <Comments
                comments={comments}
                user_id={user.id}
                post_id={post.id}
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
