import React from "react";
import Post from "../features/posts/Post";
import AddButton from "../features/posts/AddButton";
import Pagination from "../ui/Pagination";
import { usePosts } from "../features/posts/usePosts";
import { Spinner } from "react-bootstrap";

export default function Posts() {
  const { posts, isLoading, count } = usePosts();
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <div className="d-flex flex-column gap-3">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
        <div className="my-3">
          <Pagination count={count} page={2} />
        </div>
        <AddButton name="Post" to="/user/addpost" />
      </div>
    </div>
  );
}
