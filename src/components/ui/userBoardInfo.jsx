"use client";
import { useAuth } from "@/utils/AuthProvider";
import { useEffect, useState } from "react";
import levelSvg from "../../assets/level.png";
export default function UserBoardInfo() {
  const { datas, errorFetchData } = useAuth();
  const [level, setLevel] = useState(0);
  useEffect(() => {
    if (errorFetchData) {
      return;
    }
    // Check if there are any events before accessing them
    if (
      datas &&
      datas.user &&
      datas.user[0]?.events &&
      datas.user[0].events.length > 0
    ) {
      setLevel(datas.user[0].events[0].level);
    } else {
      return;
    }
  }, [datas]);
  return (
    <div className="bg-[#020817] text-white p-6 rounded w-96">
      <p className="text-4xl font-normal">Level</p>
      <div className="flex items-center justify-between w-full">
        <p className="text-4xl font-medium">{level}</p>
        <img src={levelSvg} alt="" />
      </div>
      <p className="text-gray-500">current level board</p>
    </div>
  );
}
