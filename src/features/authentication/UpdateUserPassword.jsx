import React, { useState } from "react";
import Background from "../../ui/Background";
import { useUpdateUser } from "./useUpdateUser";
import { Spinner } from "react-bootstrap";

export default function UpdateUserPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { updateUser, isLoading } = useUpdateUser();
  function handleSubmit(e) {
    e.preventDefault();
    if (!password || !confirmPassword) return;
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }
    updateUser({ password });
  }

  function handleCancel() {
    setPassword("");
    setConfirmPassword("");
  }
  return (
    <div className="mt-3">
      <Background>
        <h3>Update user password</h3>
        <form>
          <div className="d-flex flex-column gap-3 w-75">
            <div className="d-flex flex-column gap-3 ">
              <div className="d-flex  gap-3 ">
                <label className=" form-label w-25" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  disabled={isLoading}
                  type="password"
                  name="password"
                  id="password"
                  className="form-control w-75"
                  required
                  placeholder="password"
                />
              </div>
              <div className="d-flex  gap-3  ">
                <label className=" form-label w-25" htmlFor="confirm-password">
                  Confirm Password
                </label>
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  disabled={isLoading}
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  className="form-control w-75"
                  required
                  placeholder="confirm password"
                />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end gap-3">
            <button className="btn btn-primary mt-3" onClick={handleSubmit}>
              {isLoading ? <Spinner /> : "Update password"}
            </button>
            <button
              className="btn border mt-3"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </form>
      </Background>
    </div>
  );
}
