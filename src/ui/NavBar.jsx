import React from "react";
import Avatar from "./Avatar";

import lightLogo from "../../public/1.png";
import darkLogo from "../../public/2.png";

import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineMoon,
  HiOutlineSun,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";
import { useLogout } from "../features/authentication/useLogout";
import { Spinner } from "react-bootstrap";
import { useUser } from "../features/authentication/useUser";

export default function NavBar() {
  const { darkMode, setDarkMode } = useDarkMode();
  const { logout, isLoading } = useLogout();
  const { user, isLoading: isUserLoading } = useUser();

  const logedInUser = isUserLoading ? null : user.user_metadata;
  const logo = darkMode ? darkLogo : lightLogo;
  const avatar = logedInUser?.avatar_url ?? logo;

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
            <span className="fw-bold">
              {logedInUser?.full_name ?? logedInUser?.user_name}
            </span>
          </Link>
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
