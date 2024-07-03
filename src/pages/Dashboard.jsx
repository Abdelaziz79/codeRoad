import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import About from "../ui/About";
import DashboardPage from "../ui/DashboardPage";

import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
export default function Dashboard() {
  const { user, isLoading: isUserLoading } = useUser();
  const isAdmin = user?.isAdmin;
  useEffect(() => {
    toast.success("Welcome " + user?.userInfo?.userName);
  }, [user?.userInfo?.userName]);

  if (isUserLoading) return <Spinner />;
  return (
    <div>
      <h1>{isAdmin ? "Dashboard" : "About"}</h1>
      <hr />
      {isAdmin ? <DashboardPage /> : <About />}
    </div>
  );
}
