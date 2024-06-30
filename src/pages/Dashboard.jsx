import { useUser } from "../features/authentication/useUser";
import About from "../ui/About";
import DashboardPage from "../ui/DashboardPage";

import { Spinner } from "react-bootstrap";
export default function Dashboard() {
  const { user, isLoading: isUserLoading } = useUser();
  const isAdmin = user?.isAdmin;
  if (isUserLoading) return <Spinner />;

  return (
    <div>
      <h1>{isAdmin ? "Dashboard" : "About"}</h1>
      <hr />
      {isAdmin ? <DashboardPage /> : <About />}
    </div>
  );
}
