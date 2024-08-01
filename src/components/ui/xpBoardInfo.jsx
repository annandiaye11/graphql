"use client";
import { useAuth } from "@/utils/AuthProvider";
import { useEffect, useState } from "react";
import xpSvg from "../../assets/xp.png";

function formatSize(sizeInBytes) {
  if (sizeInBytes < 0) {
    throw new Error("Size must be a non-negative integer.");
  }
  if (sizeInBytes < 1000) {
    return `${sizeInBytes.toFixed(0)} B`;
  } else if (sizeInBytes < 1000000) {
    let sizeInKb = sizeInBytes / 1000;
    return `${sizeInKb.toFixed(0)} KB`;
  } else {
    let sizeInMb = sizeInBytes / 1000000;
    return `${sizeInMb.toFixed(0)} MB`;
  }
}
export default function XpBoardInfo() {
  const { datas, errorFetchData } = useAuth();
  const [xpAmount, setXpAmount] = useState("");
  useEffect(() => {
    if (errorFetchData) {
      return;
    }

    if (
      datas &&
      datas.transaction_aggregate &&
      datas.transaction_aggregate.aggregate &&
      datas.transaction_aggregate.aggregate.sum &&
      datas.transaction_aggregate.aggregate.sum.amount !== undefined
    ) {
      if (!errorFetchData) {
        setXpAmount(
          formatSize(datas.transaction_aggregate.aggregate.sum.amount)
        );
      }
    } else {
      return;
    }
  }, [datas]);

  return (
    <div className="bg-[#020817] text-white p-6 rounded w-96">
      <p className="text-4xl font-normal">Total XP</p>
      <div className="flex items-center justify-between w-full">
        <p className="text-4xl font-medium">{xpAmount}</p>
        <img src={xpSvg} alt="" />
      </div>
      <p className="text-gray-500">Total xp board</p>
    </div>
  );
}
