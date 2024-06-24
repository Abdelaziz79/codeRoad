import React from "react";
import { Spinner } from "react-bootstrap";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { getLevelsCount } from "../helper/getLevelsCount";
import { useVerifiedTopics } from "../features/topics/useVerifiedTopics";

export default function LevelStatistic() {
  const { isLoading, verifiedTopics } = useVerifiedTopics();
  if (isLoading) return <Spinner />;
  const data = getLevelsCount(verifiedTopics);

  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Tooltip />
        <Pie
          data={data}
          innerRadius={85}
          outerRadius={110}
          cx={"40%"}
          cy={"50%"}
          paddingAngle={3}
          nameKey={"name"}
          dataKey={"value"}
        >
          {data.map((entry) => (
            <Cell fill={entry.color} stroke={entry.color} key={entry.name} />
          ))}
        </Pie>
        <Legend
          verticalAlign="middle"
          align="right"
          width={"30%"}
          layout="vertical"
          iconSize={15}
          iconType="circle"
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
