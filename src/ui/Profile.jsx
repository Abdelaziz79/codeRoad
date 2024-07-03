import React from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useUserById } from "../features/authentication/useUserById";
import Post from "../features/posts/Post";
import Avatar from "./Avatar";

export default function Profile() {
  const { user, isLoading } = useUserById();
  if (isLoading) return <Spinner animation="grow" />;
  const posts = user?.posts;
  return (
    <div>
      <>
        <div className="my-5">
          <Row className="mx-auto ">
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
        </div>
        {posts.map((post, i) => (
          <div className="mt-3">
            <Post key={i} post={post} />
          </div>
        ))}
      </>
    </div>
  );
}
