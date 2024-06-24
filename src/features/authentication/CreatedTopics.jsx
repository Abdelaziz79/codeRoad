import TableBase from "../topics/TableBase";
import EmptyText from "./EmptyText";
import { useUserTopics } from "./useUserTopics";
import { Spinner } from "react-bootstrap";

export default function CreatedTopics() {
  const { userTopics, isLoading } = useUserTopics();
  if (isLoading) return <Spinner />;
  if (!userTopics || userTopics.length === 0) return <EmptyText />;
  else return <TableBase explanations={userTopics} />;
}
