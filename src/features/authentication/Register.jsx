import lightImage from "../../../public/1.png";
import darkImage from "../../../public/2.png";
import Avatar from "../../ui/Avatar";

import { useState } from "react";
import { useDarkMode } from "../../context/DarkModeContext";
import { useSignup } from "./useSignup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  const { isLoading, signup } = useSignup();

  function handleSubmit(e) {
    e.preventDefault();
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasNumber = /[0-9]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}| <>]/;
    if (!email || !firstName || !lastName || !username || !password) return;
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    if (!hasUpperCase.test(password) || !hasLowerCase.test(password)) {
      toast.error(
        "Password must contain at least one uppercase letter and one lowercase letter"
      );
      return;
    }
    if (!hasNumber.test(password) || !hasSpecialChar.test(password)) {
      toast.error(
        "Password must contain at least one number and one special character"
      );
      return;
    }
    try {
      signup({ email, firstName, lastName, username, password });
    } catch (error) {
      console.error(error);
    }
    navigate("/login");
  }

  return (
    <div className={`${darkMode ? "bg-card-dark" : ""} min-vh-100`}>
      <div
        className={`container d-flex justify-content-center align-items-center   `}
      >
        <div
          className={`card shadow-sm p-4 ${darkMode ? "card-dark" : ""} mt-5 `}
          style={{ width: "400px", height: "800px" }}
        >
          <div className="text-center mt-4">
            <Avatar
              src={darkMode ? darkImage : lightImage}
              alt="avatar"
              width={150}
              height={150}
            />
          </div>
          <h3 className="card-title text-center mb-4">Register</h3>
          <form>
            <div className="mb-3">
              <div className="d-flex gap-2 ">
                <div>
                  <label htmlFor="firstName" className="form-label">
                    first Name
                  </label>
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="first Name"
                    id="firstName"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="form-label">
                    last Name
                  </label>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="last Name"
                  />
                </div>
              </div>
              <label htmlFor="userName" className="form-label">
                user Name
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                className="form-control"
                id="userName"
                placeholder="user Name"
              />
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm your password"
              />
            </div>
            <button
              className="btn btn-success mt-3 w-100"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              <span className="d-flex align-items-center justify-content-center gap-2">
                Register
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
