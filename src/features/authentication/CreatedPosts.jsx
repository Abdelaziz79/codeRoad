import EmptyText from "./EmptyText";
import PostBase from "./PostBase";
export default function CreatedPosts({ posts }) {
  const buttons = {
    deletePost: true,
    reportPost: false,
    unreportPost: false,
    editPost: true,
    removePost: false,
  };

  if (!posts || posts.length === 0) return <EmptyText />;
  else return <PostBase posts={posts} buttons={buttons} />;
}
