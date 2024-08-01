"use client";
import { useAuth } from "@/utils/AuthProvider";
import { useEffect, useState } from "react";
import rankSvg from "../../assets/rank1.png";

function getRank(level) {
  const ranks = [
    { minLevel: 0, maxLevel: 9, rank: "Aspiring developer" },
    { minLevel: 10, maxLevel: 19, rank: "Beginner developer" },
    { minLevel: 20, maxLevel: 29, rank: "Apprentice developer" },
    { minLevel: 30, maxLevel: 39, rank: "Assistant developer" },
    { minLevel: 40, maxLevel: 49, rank: "Basic developer" },
    { minLevel: 50, maxLevel: 54, rank: "Junior developer" },
    { minLevel: 55, maxLevel: 59, rank: "Confirmed developer" },
    { minLevel: 60, maxLevel: Infinity, rank: "Full-Stack developer" },
  ];

  for (const rank of ranks) {
    if (level >= rank.minLevel && level <= rank.maxLevel) {
      return rank.rank;
    }
  }
  return "Invalid rank";
}
function RankBoardInfo() {
  const { datas, errorFetchData } = useAuth();
  const [rank, setRank] = useState("");
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
      setRank(getRank(datas.user[0].events[0].level));
    } else {
      return;
    }
  }, [datas]);

  return (
    <div className="bg-[#020817] text-white p-6 rounded w-96">
      <p className="text-4xl font-normal">Rank</p>
      <div className="flex items-center justify-between w-full">
        <p className="text-2xl font-medium">{rank}</p>
        <img src={rankSvg} alt="" />
      </div>
      <p className="text-gray-500">Rank board</p>
    </div>
  );
}

export default RankBoardInfo;
