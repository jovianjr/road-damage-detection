import React from "react";

export default function IconComponent({ icon, name }) {
  return (
    <div className="flex items-center justify-center cursor-pointer">
      {icon}
    </div>
  );
}
