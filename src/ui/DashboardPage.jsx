import LevelStatistic from "./LevelStatistic";
import StatisticBox from "./StatisticBox";
import TopicsStatistic from "./TopicsStatistic";

import { Col, Row, Spinner } from "react-bootstrap";
import PostBase from "../features/authentication/PostBase";
import { useReportedPosts } from "../features/explanation/useReportedPosts";

export default function DashboardPage() {
  const { isLoading: isLoadingReported, reportedPosts } = useReportedPosts();
  const buttons = {
    deletePost: true,
  };
  return (
    <>
      <Row>
        <Col md={12} lg={8} sm={12}>
          <StatisticBox title={"Topics"}>
            <TopicsStatistic />
          </StatisticBox>
        </Col>
        <Col md={12} lg={4} sm={12}>
          <StatisticBox title={"Average level"}>
            <LevelStatistic />
          </StatisticBox>
        </Col>
        <Col>
          <StatisticBox title={"reported posts"}>
            {isLoadingReported ? (
              <Spinner />
            ) : (
              <PostBase posts={reportedPosts} buttons={buttons} />
            )}
          </StatisticBox>
        </Col>
      </Row>
    </>
  );
}
