import React from "react";
import { Spinner } from "react-bootstrap";
import AddButton from "../features/posts/AddButton";
import Post from "../features/posts/Post";
import { usePosts } from "../features/posts/usePosts";

export default function Posts() {
  const { posts, isLoading } = usePosts();
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <div className="d-flex flex-column gap-3">
        {posts.map((post) => (
          <Post key={post.post.id} post={post} />
        ))}

        <AddButton name="Post" to="/user/addpost" />
      </div>
    </div>
  );
}
