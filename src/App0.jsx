import React from "react";
import { useSvgDrawing } from "react-hooks-svgdrawing";

const Drawing = () => {
  const [renderRef, draw] = useSvgDrawing({
    penWidth: 10, // pen width
    background: "#f44",
    penColor: "#e0e", // pen color
    close: false, // Use close command for path. Default is false.
    curve: true, // Use curve command for path. Default is true.
    delay: 60, // Set how many ms to draw points every.
    fill: "fill", // Set fill attribute for path. default is `none`
  });
  // Drawing area will be resized to fit the rendering area
  return (
    <div
      style={{ width: 500, height: 500 }}
      className="border-2"
      ref={renderRef}
    />
  );
};

export default Drawing;
