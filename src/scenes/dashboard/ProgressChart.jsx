import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select } from "@/components/ui/select";
import React, { useState } from "react";

const RideSummary = () => {
  // Array of ride stats
  const rideStats = [
    { label: "Total active rides", value: 60, color: "bg-yellow-400" },
    { label: "Total completed rides", value: 30, color: "bg-blue-500" },
    { label: "Total cancelled rides", value: 40, color: "bg-red-500" },
  ];

  return (
    <div className="w-full p-6 bg-white shadow-md lg:w-[28rem] rounded-[8px] 2xl:w-full 2xl:p-10">
      {/* Title Section */}
      <div className="mb-6">
        <h2 className="text-lg font-medium 2xl:text-xl">Ride summary</h2>
        <p className="text-sm text-gray-500 2xl:text-base">
          Sorem ipsum dolor sit amet consectetur
        </p>
      </div>

      {/* Total Rides Card */}
      <Card className="flex justify-between items-center p-4 bg-blue-50 rounded-lg mb-6 2xl:p-6">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-700 text-white font-medium px-3 py-1 rounded 2xl:px-4 2xl:py-2">
            130
          </div>
          <span className="text-sm font-medium 2xl:text-base">Total rides</span>
        </div>
        <button className="text-blue-700 font-medium text-sm 2xl:text-base">
          Manage ride ➔
        </button>
      </Card>

      {/* Ride Stats with Progress Bars */}
      <div className="space-y-4">
        {rideStats.map((stat, index) => (
          <div key={index}>
            <div className="flex justify-between mb-2">
              <span className="font-medium 2xl:text-base">{stat.label}</span>
              <span className="font-medium 2xl:text-base">{stat.value}</span>
            </div>
            <Progress
              value={stat.value}
              className={`w-full `}
              style={{ height: "8px" }}
              indicatorColor={stat.color}
            />
          </div>
        ))}
      </div>

     
      <div className="mt-6 flex justify-end">
        <Select placeholder="Today" className="2xl:text-base" />
      </div>
    </div>
  );
};

export default RideSummary;
