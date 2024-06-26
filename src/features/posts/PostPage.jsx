import React from "react";
import Post from "./Post";
import { usePost } from "./usePost";
import { Spinner } from "react-bootstrap";

export default function PostPage() {
  const { post, isLoading } = usePost();
  if (isLoading) return <Spinner />;
  return <Post post={post} />;
}
