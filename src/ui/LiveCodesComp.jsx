import LiveCodes from "livecodes/react";
import React from "react";
import { Button } from "react-bootstrap";

export default function LiveCodesComp() {
  const [tamplate, setTemplate] = React.useState("javascript");
  return (
    <div>
      <h1>Languages </h1>
      <div className="d-flex gap-2">
        <Button size="sm" variant="success" onClick={() => setTemplate("cpp")}>
          C++
        </Button>

        <Button
          size="sm"
          variant="success"
          onClick={() => setTemplate("python")}
        >
          Python
        </Button>

        <Button
          size="sm"
          variant="success"
          onClick={() => setTemplate("javascript")}
        >
          Javascript
        </Button>

        <Button
          size="sm"
          variant="success"
          onClick={() => setTemplate("typescript")}
        >
          TypeScript
        </Button>

        <Button
          size="sm"
          variant="success"
          onClick={() => setTemplate("react")}
        >
          React
        </Button>
      </div>
      <hr />
      <LiveCodes template={tamplate} height="700px" />
    </div>
  );
}
