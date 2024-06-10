import React, { useState } from "react";
import xy from "./assets/bunny.mp4";
type Props = {};

export default function App({}: Props) {
  const [circles, setCircles] = useState<any>([]);
  const [lines, setLines] = useState<any>([]);

  const handleClick = (e) => {
    e.stopPropagation();
    console.log(e.target); // if you click on circle or  line e.target is not <svg/> it is <circle/> or <line/>

    const svg = e.target; // The SVG element that was clicked
    const rect = svg.getBoundingClientRect(); // Get the position and size of the SVG element
    const x = e.clientX - rect.left; // Calculate X coordinate relative to the SVG
    const y = e.clientY - rect.top; // Calculate Y coordinate relative to the SVG
    console.log(`X: ${x}, Y: ${y}`); // Log the coordinates

    // Add new circle
    const newCircle = { cx: x, cy: y, r: 5 };
    setCircles([...circles, newCircle]);

    // Add new line if there's a previous circle
    if (circles.length > 0) {
      const prevCircle = circles[circles.length - 1];
      const newLine = {
        x1: prevCircle.cx,
        y1: prevCircle.cy,
        x2: x,
        y2: y,
      };
      setLines([...lines, newLine]);
    }
  };

  const connectTOFirst = (lastCircle) => {
    // more than 1 circle !!!
    if (circles.length > 1) {
      const firstCircle = circles[0];
      const newLine = {
        x1: lastCircle.cx,
        y1: lastCircle.cy,
        x2: firstCircle.cx,
        y2: firstCircle.cy,
      };
      setLines([...lines, newLine]);
    }
  };
  return (
    <div className="border-solid border-red-500 border-4 relative  w-[750px] h-[450px] ">
      <video
        src={xy}
        controls
        autoPlay={true}
        loop={true}
        width={250}
        height={250}
        className="w-full h-full absolute left-0 right-0 top-0 bottom-0  z-[-10]"
      ></video>
      <svg
        className="bg-transparent w-full h-full absolute left-0 right-0 top-0 bottom-0  z-60"
        onClick={(e) => {
          handleClick(e);
        }}
      >
        {lines.map((line, index) => (
          <line
            onClick={(e) => {
              e.stopPropagation();
              console.log("line is clicked ... ", e.target);
            }}
            key={index}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="black"
            strokeWidth={3}
          />
        ))}
        {circles.map((circle, index) => (
          <circle
            onClick={(e) => {
              e.stopPropagation();
              console.log("clicked on circle ", e.target);
              if (index === 0) {
                connectTOFirst(circles[circles.length - 1]);
              }
            }}
            key={index}
            cx={circle.cx}
            cy={circle.cy}
            r={circle.r}
            fill="red"
          />
        ))}
      </svg>
    </div>
  );
}
