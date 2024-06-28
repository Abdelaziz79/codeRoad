import React, { useState } from "react";
import Background from "../../ui/Background";
import { useUpdateUser } from "./useUpdateUser";
import { Spinner } from "react-bootstrap";
import { updatePassword } from "../../services/apiAuth";
import { toast } from "react-toastify";
import { useUser } from "./useUser";

export default function UpdateUserPassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState();
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    if (!password || !confirmPassword) return;
    const hasCapital = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}| <>]/.test(password);
    if (!hasCapital || !hasNumber || !hasSpecial) {
      toast.error(
        "Password must contain at least one uppercase letter, one number, and one special character"
      );
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    await updatePassword({
      oldPassword: oldPassword,
      newPassword: password,
      email: user.userInfo.email,
    });
    toast.success("Password updated successfully");
    setOldPassword("");
    setPassword("");
    setConfirmPassword("");
    setIsLoading(false);
  }

  function handleCancel() {
    setOldPassword("");
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
                <label className=" form-label w-25" htmlFor="old-password">
                  Old password
                </label>
                <input
                  onChange={(e) => setOldPassword(e.target.value)}
                  value={oldPassword}
                  disabled={isLoading}
                  type="password"
                  name="password"
                  id="old-password"
                  className="form-control w-75"
                  required
                  placeholder="old password"
                />
              </div>
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
