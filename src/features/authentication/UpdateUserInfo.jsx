import React, { useState } from "react";
import Background from "../../ui/Background";
import { useUser } from "./useUser";
import { Spinner } from "react-bootstrap";
import { updateUserImage, updateUserName } from "../../services/apiAuth";
import { toast } from "react-toastify";

export default function UpdateUserInfo() {
  const { user } = useUser();
  const currentEmail = user?.userInfo?.email;
  const name = user?.userInfo?.userName;

  const [userName, setUserName] = useState(name);
  const [avatar, setAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    if (!userName && !avatar) return;
    try {
      if (userName !== undefined && userName !== user.userInfo.userName) {
        await updateUserName(userName);
        toast.success("Name updated successfully");
      }
      if (avatar) {
        await updateUserImage({ avatar });
        toast.success("avatar updated successfully");
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  function handleCancel() {
    setUserName(name);
    setAvatar(user?.userImage);
  }

  return (
    <Background>
      <h3 className="mb-4">Update user data</h3>
      <form>
        <div className="d-flex flex-column gap-3 w-75">
          <div className="d-flex  gap-3  ">
            <label className=" form-label w-25" htmlFor="Email">
              Email
            </label>
            <input
              value={currentEmail}
              type="email"
              name="email"
              id="email"
              className="form-control w-75"
              required
              placeholder="email"
              disabled={true}
              style={{ cursor: "not-allowed", color: "black" }}
            />
          </div>
          <div className="d-flex  gap-3 ">
            <label className=" form-label w-25" htmlFor="name">
              Name
            </label>
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              name="name"
              id="name"
              className="form-control w-75"
              required
              placeholder="name"
              disabled={isLoading}
            />
          </div>
          <div className="d-flex  gap-3 ">
            <label className=" form-label w-25" htmlFor="avatar">
              Avatar
            </label>
            <input
              onChange={(e) => setAvatar(e.target.files[0])}
              type="file"
              name="avatar"
              id="avatar"
              className="form-control w-75"
              required
              placeholder="avatar"
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="d-flex gap-3 mt-3 justify-content-end">
          <button className="btn btn-primary " onClick={handleSubmit}>
            {isLoading ? <Spinner /> : "Update"}
          </button>
          <button
            className="btn border "
            disabled={isLoading}
            onClick={handleCancel}
          >
            cancel
          </button>
        </div>
      </form>
    </Background>
  );
}
