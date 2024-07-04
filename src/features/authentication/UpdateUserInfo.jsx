import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { updateUserImage, updateUserName } from "../../services/apiAuth";
import Background from "../../ui/Background";
import { useUser } from "./useUser";

export default function UpdateUserInfo() {
  const { user } = useUser();
  const currentEmail = user?.userInfo?.email;
  const lastName = user?.userInfo?.lastName;
  const firstName = user?.userInfo?.firstName;

  const [userFirstName, setFirstUserName] = useState(firstName);
  const [userLastName, setUserLastName] = useState(lastName);
  const [avatar, setAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    if (!userFirstName && !userLastName && !avatar) return;
    try {
      await updateUserName(userFirstName, userLastName);
      if (avatar) {
        await updateUserImage({ avatar });
      }
      toast.success("updated successfully");
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  function handleCancel() {
    setFirstUserName(firstName);
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
          <div className="d-flex  gap-3  ">
            <label className=" form-label w-25 " htmlFor="fname">
              First name
            </label>
            <input
              value={userFirstName}
              onChange={(e) => setFirstUserName(e.target.value)}
              type="text"
              name="fname"
              id="fname"
              className="form-control w-75 "
              required
              placeholder="name"
              disabled={isLoading}
            />
          </div>

          <div className="d-flex  gap-3  ">
            <label className=" form-label w-25 " htmlFor="lname">
              Last name
            </label>
            <input
              value={userLastName}
              onChange={(e) => setUserLastName(e.target.value)}
              type="text"
              name="lname"
              id="lname"
              className="form-control w-75 "
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
