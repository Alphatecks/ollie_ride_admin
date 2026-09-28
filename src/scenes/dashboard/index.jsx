// Dashboard.js
import React from "react";
import RealTimeMap from "./RealTimeMap";
import RideSummary from "./RideSummary";
import RideSummaryCard from "./RideSummaryCard";
import TotalIncomeCard from "./TotalIncomeCard";
import PaymentModeCard from "./PaymentModeCard";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { CalendarForm } from "./Calendar";

function Dashboard() {
  return (
    <div className="w-full bg-[#F9F9F9] pt-8 px-8 pb-8">
      <div className="flex justify-end gap-8 mb-8">
        <span className="bg-white py-2 px-2">
          <FileDownloadOutlinedIcon className="text-[40px] text-[#8095B2]" />
        </span>
        <CalendarForm />
      </div>
      <RideSummary />
      <RealTimeMap />
      
      {/* Additional Dashboard Cards */}
      <div className="flex gap-4 mt-8 mb-4">
        <RideSummaryCard />
        <TotalIncomeCard />
      </div>
      
      <div className="flex gap-4">
        <PaymentModeCard />
      </div>
    </div>
  );
}

export default Dashboard;
