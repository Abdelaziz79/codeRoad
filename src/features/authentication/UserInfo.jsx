import React from "react";
import Avatar from "../../ui/Avatar";
import StatisticBox from "../../ui/StatisticBox";

import lightLogo from "../../../public/1.png";
import darkLogo from "../../../public/2.png";

import { Col, Row, Spinner } from "react-bootstrap";
import { useDarkMode } from "../../context/DarkModeContext";
import CreatedPosts from "./CreatedPosts";
import CreatedTopics from "./CreatedTopics";
import FinishedQuizs from "./FinishedQuizs";
import { useUser } from "./useUser";

export default function UserInfo() {
  const { user, isLoading: isUserLoading } = useUser();
  const { darkMode } = useDarkMode();

  const newPosts = user?.posts.map((post) => {
    return {
      ...post,
      id: post.postId,
      userId: user?.userInfo?.id,
      userImage: user.userImage,
      userName: user?.userInfo?.userName,
    };
  });

  console.log(newPosts);

  const logo = darkMode ? darkLogo : lightLogo;
  const avatar = user?.userImage ?? logo;
  if (isUserLoading) return <Spinner animation="grow" />;
  return (
    <>
      <Row className="">
        <Col md={4} lg={2} sm={12}>
          <Avatar src={avatar} alt="avatar" width={200} height={200} />
        </Col>
        <Col md={8} lg={10} sm={12}>
          <div className="mt-3">
            <h3>{user?.userInfo?.userName}</h3>
            <h5>{user?.userInfo?.email}</h5>
          </div>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={6} lg={6} sm={12}>
          <StatisticBox title={"finished quizs"}>
            <FinishedQuizs quizs={user?.finishedLessons} />
          </StatisticBox>
        </Col>
        <Col md={6} lg={6} sm={12}>
          <StatisticBox title={"created posts"}>
            <CreatedPosts posts={newPosts} />
          </StatisticBox>
        </Col>
      </Row>
    </>
  );
}
