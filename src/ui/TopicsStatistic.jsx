import { Spinner } from "react-bootstrap";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { getTopicsName } from "../helper/getTopicsName";
import { useVerifiedTopics } from "../features/topics/useVerifiedTopics";

export default function TopicsStatistic() {
  const { isLoading, verifiedTopics } = useVerifiedTopics();
  if (isLoading) return <Spinner />;
  const data = getTopicsName(verifiedTopics);
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} width={150} height={40}>
        <Tooltip labelClassName="text-dark" />
        <XAxis dataKey={"name"} />

        <Bar dataKey={"value"} name={"count"} fill={"#00C49F"} />
      </BarChart>
    </ResponsiveContainer>
  );
}
