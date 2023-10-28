import React from "react";
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

export default function DaftarRekaman() {
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

  const icons = [
    { icon: <TableProperties />, name: "Lihat Tabel" },
    { icon: <Map />, name: "Lihat Peta" },
    { icon: <Pencil />, name: "Edit" },
    { icon: <Trash />, name: "Hapus" },
  ];

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#fff] text-black">
      <table className="w-3/4 text-lg md:text-2xl bg-white font-medium">
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
                <p>Judul</p>
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
  );
}
