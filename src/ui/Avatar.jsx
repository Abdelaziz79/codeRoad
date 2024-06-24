import React from "react";

export default function Avatar({ src, alt = "", width = 40, height = 40 }) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className="rounded-circle"
    />
  );
}
