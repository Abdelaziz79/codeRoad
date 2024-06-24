import Footer from "./Footer";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import {
  HiHome,
  HiMiniBookOpen,
  HiMiniGlobeAsiaAustralia,
  HiUser,
  HiBars3,
} from "react-icons/hi2";
import { NavLink } from "react-router-dom";

export default function SmallSideBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { darkMode } = useDarkMode();
  return (
    <>
      <HiBars3
        size={40}
        onClick={handleShow}
        className={`small-sidebar-button ${
          darkMode ? "small-sidebar-button-dark" : "small-sidebar-button-light"
        }`}
      />

      <Offcanvas
        show={show}
        onHide={handleClose}
        className={`${darkMode ? "small-sidebar-dark" : ""}`}
      >
        <Offcanvas.Header
          closeButton
          closeVariant={`${darkMode ? "white" : ""}`}
        >
          <Offcanvas.Title>CodeRoad</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div
            className={` trans h-100 d-flex flex-column align-items-center  overflow-x-hidden overflow-y-auto ${
              show ? "p-3" : "p-0"
            }`}
          >
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
                  darkMode
                    ? ({ isActive }) => (isActive ? "active-dark" : "")
                    : ""
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
                  darkMode
                    ? ({ isActive }) => (isActive ? "active-dark" : "")
                    : ""
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
                  darkMode
                    ? ({ isActive }) => (isActive ? "active-dark" : "")
                    : ""
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
                  darkMode
                    ? ({ isActive }) => (isActive ? "active-dark" : "")
                    : ""
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
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
