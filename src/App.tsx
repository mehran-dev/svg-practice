import React, { useEffect, useState } from "react";
import xy from "./assets/bunny.mp4";
type Props = {};

export default function App({}: Props) {
  const [shapes, setShapes] = useState<any>([{ circles: [], lines: [] }]);

  const [selectedShapeType, setSelectedShapeType] = useState<
    "custom-shape" | "line"
  >("custom-shape");

  const [lineStart, setLineStart] = useState<{ x: number; y: number } | null>(
    null
  );

  const handleShapeTypeSwitch = (type: "custom-shape" | "line") => {
    setSelectedShapeType(type);
    setShapes((prevShapes) => [...prevShapes, { circles: [], lines: [] }]);
    setLineStart(null);
  };

  const drawLineHandler = (e) => {
    e.stopPropagation();

    const svg = e.target.closest("svg");
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const currentShape = shapes[shapes.length - 1];

    if (!lineStart) {
      // Set the starting point and add a circle
      setLineStart({ x, y });
      const newCircle = { cx: x, cy: y, r: 5 };
      const newCircles = [...currentShape.circles, newCircle];
      setShapes([
        ...shapes.slice(0, -1),
        { circles: newCircles, lines: currentShape.lines },
      ]);
    } else {
      // Draw the line from start to current point and add a circle at the end point
      const newLine = { x1: lineStart.x, y1: lineStart.y, x2: x, y2: y };
      const newCircle = { cx: x, cy: y, r: 5 };
      const newCircles = [...currentShape.circles, newCircle];
      const updatedLines = [...currentShape.lines, newLine];
      setShapes([
        ...shapes.slice(0, -1),
        { circles: newCircles, lines: updatedLines },
      ]);

      // Reset lineStart for next line
      setLineStart(null);
    }
  };

  const drawShapeHandler = (e) => {
    e.stopPropagation();
    console.log(e.target);

    const svg = e.target.closest("svg");
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    console.log(`X: ${x}, Y: ${y}`);

    const currentShape = shapes[shapes.length - 1];
    const newCircle = { cx: x, cy: y, r: 5 };

    const newCircles = [...currentShape.circles, newCircle];
    let newLines = [...currentShape.lines];

    if (currentShape.circles.length > 0) {
      const prevCircle = currentShape.circles[currentShape.circles.length - 1];
      const newLine = {
        x1: prevCircle.cx,
        y1: prevCircle.cy,
        x2: x,
        y2: y,
      };
      newLines = [...newLines, newLine];
    }

    const updatedShapes = shapes.slice(0, -1).concat({
      circles: newCircles,
      lines: newLines,
    });

    setShapes(updatedShapes);
  };

  const closeShape = () => {
    const currentShape = shapes[shapes.length - 1];
    if (currentShape.circles.length > 1) {
      const firstCircle = currentShape.circles[0];
      const lastCircle = currentShape.circles[currentShape.circles.length - 1];
      const newLine = {
        x1: lastCircle.cx,
        y1: lastCircle.cy,
        x2: firstCircle.cx,
        y2: firstCircle.cy,
      };
      console.log("new Line ", newLine);

      const newLines = [...currentShape.lines, newLine];
      console.log("new Lines ", newLines);

      setShapes([
        ...shapes.slice(0, -1),
        { circles: currentShape.circles, lines: newLines },
      ]);

      // return setTimeout(() => {
      setShapes((prevShapes) => [...prevShapes, { circles: [], lines: [] }]);
      // }, 200);
    }
  };
  console.log("shapes", shapes);

  return (
    <>
      <div className="my-2 border-dotted border-2 p-4">
        <button
          className={`mx-3 rounded-lg border-2 px-3 py-1 ${
            selectedShapeType === "line"
              ? "border-red-500 text-red-500 bg-red-300"
              : ""
          } `}
          onClick={() => {
            handleShapeTypeSwitch("line");
          }}
        >
          line
        </button>
        <button
          className={`mx-3 rounded-lg border-2 px-3 py-1 ${
            selectedShapeType === "custom-shape"
              ? "border-red-500 text-red-500 bg-red-300"
              : ""
          } `}
          onClick={() => {
            handleShapeTypeSwitch("custom-shape");
          }}
        >
          custom shape
        </button>
      </div>
      <div className="border-solid border-red-500 border-4 relative w-[750px] h-[450px]">
        <video
          src={xy}
          controls
          autoPlay={true}
          loop={true}
          width={250}
          height={250}
          className="w-full h-full absolute left-0 right-0 top-0 bottom-0 z-[-10]"
        ></video>
        <svg
          className="bg-transparent w-full h-full absolute left-0 right-0 top-0 bottom-0 z-60"
          onClick={(e) => {
            if (selectedShapeType === "line") {
              drawLineHandler(e);
            } else {
              drawShapeHandler(e);
            }
          }}
        >
          {shapes.map((shape, shapeIndex) => (
            <g key={shapeIndex}>
              {shape.lines.map((line, lineIndex) => (
                <line
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("line is clicked ... ", e.target);
                  }}
                  key={lineIndex}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke="black"
                  strokeWidth={3}
                />
              ))}
              {shape.circles.map((circle, circleIndex) => (
                <circle
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("clicked on circle ", e.target, circleIndex);
                    if (circleIndex === 0) {
                      closeShape();
                    }
                  }}
                  key={circleIndex}
                  cx={circle.cx}
                  cy={circle.cy}
                  r={circle.r}
                  fill={`${circleIndex === 0 ? "yellow" : "red"}`}
                />
              ))}
            </g>
          ))}
        </svg>
      </div>
    </>
  );
}
