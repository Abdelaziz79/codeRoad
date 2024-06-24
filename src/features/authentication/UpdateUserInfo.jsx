import React, { useState } from "react";
import Background from "../../ui/Background";
import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";
import { Spinner } from "react-bootstrap";

export default function UpdateUserInfo() {
  const { user, isLoading: isUserLoading } = useUser();

  const logedInUser = isUserLoading ? null : user.user_metadata;
  const currenteEmail = logedInUser?.email;
  const name = logedInUser?.full_name ?? logedInUser?.user_name;

  const [fullName, setFullName] = useState(name);
  const [avatar, setAvatar] = useState(logedInUser?.avatar);
  const { isLoading, updateUser } = useUpdateUser();

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;
    console.log(avatar, fullName);

    updateUser({ fullName });
  }

  function handleCancel() {
    setFullName(name);
    setAvatar(logedInUser?.avatar);
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
              value={currenteEmail}
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
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
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
