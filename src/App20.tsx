import React from "react";

type Props = {};

export default function App({}: Props) {
  const handleClick = (e) => {
    // console.log(e);
    const svg = e.target;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    console.log(`X: ${x}, Y: ${y}`);
  };

  return (
    <div>
      <svg
        className="bg-green-200 px-3 py-6 mx-auto my-16 w-[950px] h-[500px]"
        onClick={(e) => {
          handleClick(e);
        }}
      >
        <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
        <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
        <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
        <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
        <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
        <circle cx="20" cy="20" r="20" />
      </svg>
    </div>
  );
}
