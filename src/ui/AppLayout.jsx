import NavBar from "./NavBar";
import SideBar from "./SideBar";
import SliderToggleButton from "./SliderToggleButton";

import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { useSliderToggle } from "../context/SliderToggleContext";
import { useDarkMode } from "../context/DarkModeContext";
import SmallSideBar from "./SmallSideBar";

export default function AppLayout() {
  const { darkMode } = useDarkMode();
  const { show, setShow } = useSliderToggle();
  const [pageWidth, setPageWidth] = useState(window.innerWidth);
  // let smallScreen = pageWidth < 768;

  useEffect(() => {
    const handleResize = () => {
      setPageWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    if (pageWidth < 768) {
      setShow(false);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pageWidth, setShow]);
  return (
    <Row className={`m-0 p-0 main  ${darkMode ? "dark" : "light"} `}>
      <Col className={` p-0 m-0 col-2 trans ${show ? "" : "hide"} `}>
        {pageWidth < 768 ? <SmallSideBar /> : <SideBar />}
      </Col>
      <Col className={` p-0 m-0 trans   ${show ? "col-10" : "col-12"} `}>
        {pageWidth < 768 ? null : <SliderToggleButton />}
        <main
          className={` overflow-auto main-window  ${
            darkMode ? "" : " bg-body-tertiary"
          }  `}
        >
          <NavBar />
          <Container className="">
            <Outlet />
          </Container>
        </main>
      </Col>
    </Row>
  );
}
