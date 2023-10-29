"use client";

import React, { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export default function IconComponent({ icon, name }) {
  const [isMounted, setIsMounted] = useState(false); // Need this for the react-tooltip

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    isMounted && (
      <>
        <div className="flex items-center justify-center cursor-pointer">
          <div data-tooltip-content={name} data-tooltip-id="icon-tooltip">
            {icon}
          </div>
        </div>

        <Tooltip
          id="icon-tooltip"
          place="bottom"
          style={{
            backgroundColor: "#E0E0E0",
            color: "#222222",
            borderRadius: "8px",
            fontSize: "16px",
            padding: "4px 12px",
          }}
          noArrow
        />
      </>
    )
  );
}
