import React from "react";
import { Spinner } from "react-bootstrap";
import AddButton from "../features/posts/AddButton";
import Post from "../features/posts/Post";
import { usePosts } from "../features/posts/usePosts";

export default function Posts() {
  const { posts, isLoading } = usePosts();
  console.log(posts, isLoading);
  console.log(posts, isLoading);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <div className="d-flex flex-column gap-3">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}

        <AddButton name="Post" to="/user/addpost" />
      </div>
    </div>
  );
}
