"use client";

import React, { useState } from "react";
import {
  Calendar,
  AlignLeft,
  AlertOctagon,
  PlaySquare,
  List,
  TableProperties,
  Map,
  Pencil,
  Trash,
} from "lucide-react";

import IconComponent from "../components/IconComponents";

export default function Replay() {
  const dummyData = [
    {
      id: 1,
      date: "08/10/2023",
      title: "Jl Gamping",
      totalKerusakan: 13,
      videoData: [
        {
          id: 1,
          text: "Video",
        },
        {
          id: 2,
          text: "Lokasi",
        },
      ],
    },
    {
      id: 2,
      date: "02/10/2023",
      title: "Maguwoharjo",
      totalKerusakan: 7,
      videoData: [
        {
          id: 1,
          text: "Video",
        },
      ],
    },
    {
      id: 3,
      date: "12/09/2023",
      title: "Parangkritis",
      totalKerusakan: 32,
      videoData: [
        {
          id: 1,
          text: "Video",
        },
        {
          id: 2,
          text: "Lokasi",
        },
      ],
    },
    {
      id: 4,
      date: "23/07/2023",
      title: "Jl Pramuka",
      totalKerusakan: 6,
      videoData: [
        {
          id: 1,
          text: "Video",
        },
      ],
    },
    {
      id: 5,
      date: "31/02/2022",
      title: "Jl Monjali",
      totalKerusakan: 2,
      videoData: [
        {
          id: 1,
          text: "Video",
        },
      ],
    },
    {
      id: 6,
      date: "17/02/2022",
      title: "Kauman",
      totalKerusakan: 19,
      videoData: [
        {
          id: 1,
          text: "Video",
        },
        { id: 2, text: "Lokasi" },
      ],
    },
    {
      id: 7,
      date: "05/01/2022",
      title: "Babarsari",
      totalKerusakan: 5,
      videoData: [
        {
          id: 1,
          text: "Video",
        },
        { id: 2, text: "Lokasi" },
      ],
    },
  ];

  const [isSaved, setIsSaved] = useState(false);

  const saveVideo = () => {
    setIsSaved(true);
  };

  const icons = [
    { icon: <TableProperties />, name: "Lihat Tabel" },
    { icon: <Map />, name: "Lihat Peta" },
    { icon: <Pencil />, name: "Edit" },
    { icon: <Trash />, name: "Hapus" },
  ];

  return (
    <div className="w-full min-h-screen bg-[#fff] text-black text-2xl pt-24">
      <div className="w-[831px] container mx-auto">
        <div className="rounded-2xl bg-[#FDC403] w-full h-[519px]"></div>
        <div className="flex items-center w-full mt-12 gap-5">
          {isSaved ? (
            <>
              <div className="w-full px-6 py-3">video1.mp4</div>
              <div className="w-1/2 grid grid-cols-4">
                <div className="flex items-center justify-center">
                  <TableProperties />
                </div>
                <div className="flex items-center justify-center">
                  <Map />
                </div>
                <div className="flex items-center justify-center">
                  <Pencil />
                </div>
                <div className="flex items-center justify-center">
                  <Trash />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-full border border-slate-300 rounded-full px-6 py-3">
                video1
              </div>
              <div
                className="w-1/8 py-1 px-4 border border-[#FDC403] text-[#292E66] rounded-full cursor-pointer"
                onClick={saveVideo}
              >
                Simpan
              </div>
            </>
          )}
        </div>
      </div>

      {isSaved ? (
        <>
          <div className="container mx-auto py-16">
            <table className="w-full text-lg md:text-2xl bg-white font-medium">
              <thead className="">
                <tr>
                  <td className="border-b border-r py-2 md:py-4 text-center">
                    <div className="flex items-center justify-center gap-4">
                      <Calendar />
                      <p>Tanggal</p>
                    </div>
                  </td>
                  <td className="border-b border-r px-3 py-2 md:py-4 text-center">
                    <div className="flex items-center justify-center gap-4">
                      <AlignLeft />
                      <p>Longitude</p>
                    </div>
                  </td>
                  <td className="border-b border-r px-3 py-2 md:py-4 text-center">
                    <div className="flex items-center justify-center gap-4">
                      <AlignLeft />
                      <p>Latitude</p>
                    </div>
                  </td>
                  <td className="border-b border-r px-3 py-2 md:py-4 text-center">
                    <div className="flex items-center justify-center gap-4">
                      <AlertOctagon />
                      <p>Total Kerusakan</p>
                    </div>
                  </td>
                  <td className="border-b border-r px-3 py-2 md:py-4 text-center">
                    <div className="flex items-center justify-center gap-4">
                      <PlaySquare />
                      <p>Data Video</p>
                    </div>
                  </td>
                  <td className="border-b px-3 py-2 md:py-4 text-center">
                    <div className="flex items-center justify-center gap-4">
                      <List />
                      <p>Detail</p>
                    </div>
                  </td>
                </tr>
              </thead>

              <tbody>
                {dummyData?.length !== 0 ? (
                  dummyData.map((item, index) => (
                    <tr key={index}>
                      <td className="text-center py-2 md:py-4 border-r">
                        {item.date}
                      </td>
                      <td className="text-center py-2 md:py-4">{item.title}</td>
                      <td className="text-center py-2 md:py-4 border-r">
                        {item.title}
                      </td>
                      <td className="text-center py-2 md:py-4 border-r">
                        {item.totalKerusakan}
                      </td>
                      <td className="text-center py-2 md:py-4 px-4 border-r flex gap-2">
                        {item.videoData.map((data, index) => {
                          return (
                            <div
                              className="py-1 px-2.5 rounded-lg bg-pink-300 text-xl"
                              key={index}
                            >
                              {data.text}
                            </div>
                          );
                        })}
                      </td>
                      <td className="text-center py-2 md:py-4 px-3">
                        <div className="grid grid-cols-4 w-full">
                          {icons.map((item, index) => {
                            return (
                              <IconComponent
                                icon={item.icon}
                                name={item.name}
                                key={index}
                              />
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="text-center text-2xl py-2 md:py-4 italic">
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : null}
    </div>
  );
}
