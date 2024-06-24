import { Spinner } from "react-bootstrap";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated, isLoading]);

  if (isLoading)
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <Spinner />
      </div>
    );

  if (isAuthenticated) return children;
}
