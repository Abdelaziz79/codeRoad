import React from "react";
import Avatar from "../../ui/Avatar";
import StatisticBox from "../../ui/StatisticBox";

import lightLogo from "../../../public/1.png";
import darkLogo from "../../../public/2.png";

import { Col, Row, Spinner } from "react-bootstrap";
import { useUser } from "./useUser";
import { useDarkMode } from "../../context/DarkModeContext";
import CreatedTopics from "./CreatedTopics";
import SavedPosts from "./SavedPosts";
import CreatedPosts from "./CreatedPosts";
import FinishedQuizs from "./FinishedQuizs";

export default function UserInfo() {
  const { user, isLoading: isUserLoading } = useUser();
  const { darkMode } = useDarkMode();
  const logedInUser = user;
  const logo = darkMode ? darkLogo : lightLogo;
  const avatar = logedInUser?.avatar_url ?? logo;
  if (isUserLoading) return <Spinner animation="grow" />;
  return (
    <>
      <Row className="">
        <Col md={4} lg={2} sm={12}>
          <Avatar src={avatar} alt="avatar" width={200} height={200} />
        </Col>
        <Col md={8} lg={10} sm={12}>
          <div className="mt-3">
            <h3>{logedInUser?.userName}</h3>
            <h5>{logedInUser?.email}</h5>
          </div>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={12} lg={12} sm={12} className="">
          <StatisticBox title={"created topics"}>
            <CreatedTopics />
          </StatisticBox>
        </Col>
        <Col md={6} lg={6} sm={12}>
          <StatisticBox title={"finished quizs"}>
            <FinishedQuizs />
          </StatisticBox>
        </Col>
        <Col md={6} lg={6} sm={12}>
          <StatisticBox title={"created posts"}>
            <CreatedPosts />
          </StatisticBox>
        </Col>
        <Col md={6} lg={6} sm={12}>
          <StatisticBox title={"saved posts"}>
            <SavedPosts />
          </StatisticBox>
        </Col>
      </Row>
    </>
  );
}
