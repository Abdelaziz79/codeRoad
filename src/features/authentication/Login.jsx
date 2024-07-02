import lightImage from "../../../public/1.png";
import darkImage from "../../../public/2.png";
import Avatar from "../../ui/Avatar";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";
import { useLogin } from "./useLogin";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useLogin();

  const { darkMode } = useDarkMode();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <div className={`${darkMode ? "bg-card-dark" : ""} min-vh-100 `}>
      <div className=" container d-flex justify-content-center align-items-center">
        <div
          className={`card shadow-sm p-5 ${darkMode ? "card-dark" : ""} mt-5 `}
          style={{ width: "400px", height: "700px" }}
        >
          <div className="text-center">
            <Avatar
              src={darkMode ? darkImage : lightImage}
              alt="avatar"
              width={150}
              height={150}
            />
          </div>
          <h3 className="card-title text-center mb-4">Login</h3>
          <form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                className="form-control"
                id="username"
                aria-describedby="usernameHelp"
                required
                disabled={isLoading}
                placeholder="Email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                className="form-control"
                id="password"
                required
                disabled={isLoading}
                placeholder="Password"
              />
            </div>
            <div className="d-flex flex-column gap-2 ">
              <button
                type="submit"
                className="btn btn-success mt-3"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                Login
              </button>

              <Link
                className="btn btn-primary mt-3 "
                to={"/register"}
                disabled={isLoading}
              >
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
