import React, { useEffect } from "react";

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  HiDocumentPlus,
  HiIdentification,
  HiMiniBeaker,
  HiMiniClipboardDocumentList,
} from "react-icons/hi2";
import { useDarkMode } from "../context/DarkModeContext";
import { useUser } from "../features/authentication/useUser";

export default function UserPage() {
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  const url = window.location.pathname;
  const { user } = useUser();
  console.log(user);
  useEffect(() => {
    if (url === "/user") {
      navigate("/user/account");
    }
  }, [url, navigate]);
  return (
    <>
      <h1>UserPage</h1>
      <hr />
      <div
        className={` ${
          darkMode ? " sidebar-div-dark-hover" : "user-button-light"
        } user-button`}
      >
        <NavLink
          to="account"
          className={
            darkMode ? ({ isActive }) => (isActive ? "active-dark" : "") : ""
          }
        >
          <span className="">
            <HiIdentification size={20} />
            User Info
          </span>
        </NavLink>
        <NavLink
          to="addpost"
          className={
            darkMode ? ({ isActive }) => (isActive ? "active-dark" : "") : ""
          }
        >
          <span className="">
            <HiDocumentPlus size={20} />
            Add Post
          </span>
        </NavLink>

        {user?.userInfo?.role === "admin" && (
          <NavLink
            to="addtopic"
            className={
              darkMode ? ({ isActive }) => (isActive ? "active-dark" : "") : ""
            }
          >
            <span className="">
              <HiMiniBeaker />
              Add Topic
            </span>
          </NavLink>
        )}
        <NavLink
          to="update"
          className={
            darkMode ? ({ isActive }) => (isActive ? "active-dark" : "") : ""
          }
        >
          <span className="">
            <HiMiniClipboardDocumentList size={20} />
            Settings
          </span>
        </NavLink>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}
