// Dashboard.js
import React from "react";
import RealTimeMap from "./RealTimeMap";
import RideSummary from "./RideSummary";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { CalendarForm } from "./Calendar";

function Dashboard() {
  return (
    <div className="w-full h-screen bg-[#F9F9F9] pt-8 px-8">
      <div className="flex justify-end gap-8">
        <span className="bg-white py-2 px-2">
          <FileDownloadOutlinedIcon className="text-[40px] text-[#8095B2]" />
        </span>
        <CalendarForm />
      </div>
      <RideSummary />
      <RealTimeMap />
    </div>
  );
}

export default Dashboard;
