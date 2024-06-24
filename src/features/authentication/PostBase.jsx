import Base from "./Base";

export default function PostBase({ posts, buttons }) {
  if (!buttons) return <Base items={posts} link={"post"} />;
  else return <Base items={posts} link={"post"} buttons={buttons} />;
}
