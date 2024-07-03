import React from "react";
import { useUserById } from "../features/authentication/useUserById";
import { Col, Row, Spinner } from "react-bootstrap";
import Avatar from "./Avatar";
import StatisticBox from "./StatisticBox";
import CreatedPosts from "../features/authentication/CreatedPosts";

export default function Profile() {
  const { user, isLoading } = useUserById();
  if (isLoading) return <Spinner animation="grow" />;
  return (
    <div>
      {" "}
      <>
        <Row className="">
          <Col md={4} lg={2} sm={12}>
            <Avatar
              src={user?.userInfo?.imageUrl}
              alt="avatar"
              width={200}
              height={200}
            />
          </Col>
          <Col md={8} lg={10} sm={12}>
            <div className="mt-5">
              <h3>{user?.userInfo?.userName}</h3>
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={12} lg={12} sm={12}>
            <StatisticBox title={"created posts"}>
              <CreatedPosts posts={user?.posts} buttons={{ view: true }} />
            </StatisticBox>
          </Col>
        </Row>
      </>
    </div>
  );
}
