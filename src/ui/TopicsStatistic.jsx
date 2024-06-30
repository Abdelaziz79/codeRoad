import { Spinner } from "react-bootstrap";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { useTopicsNames } from "../features/explanation/useTopicsNames";
import { getTopicsName } from "../helper/getTopicsName";
export default function TopicsStatistic() {
  const { isLoading, topicsNames } = useTopicsNames();
  if (isLoading) return <Spinner />;
  const data = getTopicsName(topicsNames);
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
