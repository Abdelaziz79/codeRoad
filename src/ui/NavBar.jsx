import React from "react";
import Avatar from "./Avatar";

import lightLogo from "../../public/1.png";
import darkLogo from "../../public/2.png";

import { Spinner } from "react-bootstrap";
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineFire,
  HiOutlineMoon,
  HiOutlineSun,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";
import { useActiveDay } from "../features/authentication/useActiveDay";
import { useLogout } from "../features/authentication/useLogout";
import { useUser } from "../features/authentication/useUser";
export default function NavBar() {
  const { darkMode, setDarkMode } = useDarkMode();
  const { logout, isLoading } = useLogout();
  const { user } = useUser();
  const { activeDay, isLoading: isLoadingActive } = useActiveDay();
  const logo = darkMode ? darkLogo : lightLogo;
  const avatar = user?.userImage ?? logo;

  return (
    <div className="mb-5">
      <ul
        className={` ${
          darkMode ? "header-nav-dark" : "header-nav"
        }  d-flex align-items-center nav justify-content-end  p-3 gap-3`}
      >
        <li>
          <Avatar src={avatar} alt="avatar" />
        </li>
        <li>
          <Link
            to="/user/account"
            className={`text-decoration-none ${
              darkMode ? "text-light" : "text-dark"
            }`}
          >
            <span className="fw-bold">{user?.userInfo?.userName}</span>
          </Link>
        </li>
        <li>
          <span>
            <div className="d-flex align-items-center ">
              <HiOutlineFire size={25} />

              {isLoadingActive ? (
                <Spinner size={20} />
              ) : (
                <span className="badge rounded-pill bg-danger">
                  {activeDay}
                </span>
              )}
            </div>
          </span>
        </li>
        <li>
          <span onClick={() => setDarkMode(!darkMode)} className="pointer">
            {darkMode ? (
              <HiOutlineSun size={25} />
            ) : (
              <HiOutlineMoon size={25} />
            )}
          </span>
        </li>
        <li>
          <span className="pointer">
            {isLoading ? (
              <Spinner size={20} />
            ) : (
              <HiOutlineArrowRightOnRectangle size={25} onClick={logout} />
            )}
          </span>
        </li>
      </ul>
    </div>
  );
}
