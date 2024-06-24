import React from "react";

import { useSliderToggle } from "../context/SliderToggleContext";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
} from "react-icons/hi2";
import { useDarkMode } from "../context/DarkModeContext";

export default function SliderToggleButton() {
  const { show, setShow } = useSliderToggle();
  const { darkMode } = useDarkMode();
  return (
    <span
      className={` ${
        darkMode ? "sidebar-toggle-button-dark" : " sidebar-toggle-button-light"
      } p-2 rounded-circle trans sidebar-toggle-button `}
      onClick={() => setShow(!show)}
    >
      {show ? (
        <HiOutlineChevronDoubleLeft size={30} />
      ) : (
        <HiOutlineChevronDoubleRight size={30} />
      )}
    </span>
  );
}
