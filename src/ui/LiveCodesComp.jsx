import LiveCodes from "livecodes/react";
import React from "react";

export default function LiveCodesComp() {
  const options = {
    params: {
      py: "",
      mode: "full",
      tools: "console|full",
    },
    config: {
      imports: {
        moment: "https://cdn.skypack.dev/moment",
      },
      //   mode: "full",
      activeEditor: "script",
    },
  };
  return <LiveCodes {...options} height="500px" />;
}
