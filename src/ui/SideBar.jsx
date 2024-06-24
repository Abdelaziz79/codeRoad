import lightImage from "../../public/1.png";
import darkImage from "../../public/2.png";

import { NavLink } from "react-router-dom";
import { useSliderToggle } from "../context/SliderToggleContext";
import {
  HiHome,
  HiUser,
  HiMiniBookOpen,
  HiMiniGlobeAsiaAustralia,
} from "react-icons/hi2";
import Footer from "./Footer";
import { useDarkMode } from "../context/DarkModeContext";

export default function SideBar() {
  const { show } = useSliderToggle();
  const { darkMode } = useDarkMode();
  return (
    <div
      className={`${
        darkMode ? "sidebar-dark" : "border-end"
      } trans h-100 d-flex flex-column align-items-center  overflow-x-hidden overflow-y-auto ${
        show ? "p-3" : "p-0"
      }`}
    >
      <img
        src={darkMode ? darkImage : lightImage}
        alt="logo"
        width="100px"
        height="100px"
        className="rounded-circle"
        style={{ objectFit: "cover" }}
      />
      <p className="lead fw-bold ">CodeRoad</p>
      <div
        className={`${
          darkMode
            ? "sidebar-div-dark sidebar-div-dark-hover"
            : "sidebar-div-light-hover"
        } sidebar-div `}
      >
        <NavLink
          to="/"
          className={
            darkMode ? ({ isActive }) => (isActive ? "active-dark" : "") : ""
          }
        >
          <span
            className={`${
              darkMode ? "sidebar-button-dark " : ""
            } sidebar-button`}
          >
            <HiHome size={20} /> Home
          </span>
        </NavLink>
        <NavLink
          to="/user"
          className={
            darkMode ? ({ isActive }) => (isActive ? "active-dark" : "") : ""
          }
        >
          <span
            className={`${
              darkMode ? "sidebar-button-dark " : ""
            } sidebar-button`}
          >
            <HiUser size={20} /> User
          </span>
        </NavLink>
        <NavLink
          to="/topics"
          className={
            darkMode ? ({ isActive }) => (isActive ? "active-dark" : "") : ""
          }
        >
          <span
            className={`${
              darkMode ? "sidebar-button-dark " : ""
            } sidebar-button`}
          >
            <HiMiniBookOpen size={20} /> Topics
          </span>
        </NavLink>
        <NavLink
          to="/posts"
          className={
            darkMode ? ({ isActive }) => (isActive ? "active-dark" : "") : ""
          }
        >
          <span
            className={`${
              darkMode ? "sidebar-button-dark " : ""
            } sidebar-button`}
          >
            <HiMiniGlobeAsiaAustralia size={20} /> Posts
          </span>
        </NavLink>
      </div>
      <Footer />
    </div>
  );
}
