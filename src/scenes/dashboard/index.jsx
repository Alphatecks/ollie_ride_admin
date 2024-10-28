// Dashboard.js
import React from "react";
import RealTimeMap from "./RealTimeMap";
import RideSummary from "./RideSummary";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { CalendarForm } from "./Calendar";
import LineChart from "./LineChart";
import ProgressChart from "./ProgressChart";
import PaymentModesChart from "./PaymentChart";

function Dashboard() {
  return (
    <div className="w-full h-screen bg-[#F9F9F9] pt-6 ">
      <div className="flex justify-end gap-8 px-8">
        <span className="bg-white py-2 px-2">
          <FileDownloadOutlinedIcon className="text-[40px] text-[#8095B2]" />
        </span>
        <CalendarForm />
      </div>
      <div className="px-10">
        <RideSummary />
        <RealTimeMap />
      </div>

      <div className="flex justify-between items-center mt-8 flex-wrap gap-10  bg-[#F9F9F9] px-10 pb-[100px] ">
        <ProgressChart />
        <LineChart />
        <PaymentModesChart />
      </div>
    </div>
  );
}

export default Dashboard;
