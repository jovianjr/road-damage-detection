"use client";

import {
  ChevronFirst,
  ChevronLast,
  Video,
  Map,
  FolderClosed,
} from "lucide-react";
import Link from "next/link";
import { useContext, useState } from "react";
import React from "react";
import clsx from "clsx";

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <nav
      className={clsx(
        "h-screen flex flex-col bg-c-blue border-r shadow-sm transition-all",
        expanded ? "w-[18vw]" : "w-[5vw]"
      )}
    >
      <div className="p-4 pb-2 flex justify-end items-center">
        <button
          onClick={() => setExpanded((curr) => !curr)}
          className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
        >
          {expanded ? <ChevronFirst /> : <ChevronLast />}
        </button>
      </div>
      <ul>
        <Menu icon={<Video size={25} />} text="Video" show={expanded} href="" />

        <Menu
          icon={<FolderClosed size={25} />}
          text="Daftar Rekaman"
          show={expanded}
          href=""
        />

        <Menu icon={<Map size={25} />} text="Peta" show={expanded} href="" />
      </ul>
    </nav>
  );
}

export function Menu({ icon, text, show, href }) {
  return (
    <Link
      as="li"
      href={href}
      className={clsx(
        "h-full w-full flex items-center  font-medium rounded-md cursor-pointer transition-colors group text-c-yellow gap-2",
        show ? "justify-start px-7" : "justify-center"
      )}
    >
      {icon}
      {show ? <span className="">{text}</span> : null}
    </Link>
  );
}
