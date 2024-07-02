import LevelStatistic from "./LevelStatistic";
import StatisticBox from "./StatisticBox";
import TopicsStatistic from "./TopicsStatistic";

import { Button, Col, Row, Spinner, Table } from "react-bootstrap";
import { useDarkMode } from "../context/DarkModeContext";
import { useUsers } from "../features/authentication/useUsers";
import { HiUserMinus, HiUserPlus } from "react-icons/hi2";
import { addAdmin, deleteUserByAdmin } from "../services/apiAuth";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function DashboardPage() {
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
        <Col md={12} lg={12} sm={12}>
          <StatisticBox title={"Users"}>
            <UsersTable />
          </StatisticBox>
        </Col>
      </Row>
    </>
  );
}
function UsersTable() {
  const { users, isLoading } = useUsers();
  const { darkMode } = useDarkMode();
  const [isLoading1, setIsLoading1] = useState(false);
  const queryClient = useQueryClient();

  async function makeAdmin(email) {
    setIsLoading1(true);
    await addAdmin(email);
    setIsLoading1(false);
  }

  async function deleteUser(email) {
    setIsLoading1(true);
    await deleteUserByAdmin(email);
    queryClient.invalidateQueries(["users"]);
    setIsLoading1(false);
  }

  return isLoading || isLoading1 ? (
    <Spinner />
  ) : (
    <Table
      striped
      bordered
      hover
      responsive
      className={darkMode ? "table-dark" : ""}
    >
      <thead>
        <tr>
          <th></th>
          <th>user name</th>
          <th>email</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users?.map((item, i) => (
          <tr key={item.id}>
            <td className="t-td">{++i}</td>
            <td className="t-td">{item.userName}</td>
            <td className="t-td ">{item.email}</td>
            <td className="t-td">
              <Button>
                <div
                  className="d-flex align-items-center gap-2"
                  onClick={() => makeAdmin(item.email)}
                >
                  <HiUserPlus size={20} />
                  add admin
                </div>
              </Button>
            </td>
            <td className="t-td">
              <Button variant="danger" onClick={() => deleteUser(item.email)}>
                <div className="d-flex align-items-center gap-2">
                  <HiUserMinus size={20} />
                  delete
                </div>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
