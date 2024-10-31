import React from "react";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import PersonIcon from "@mui/icons-material/Person";
import DatabaseIcon from "../../assets/icons/database";

function RideSummary() {
  return (
    <div className="flex justify-between mt-6 pr-8 ">
      <div className="flex gap-4 bg-white pt-[13px] pb-[20px] pl-4 rounded-[12px] 2xl:pt-[30px] 2xl:pb-[40px] 2xl:pl-6">
        <div className="bg-secondary rounded-full flex items-center w-12 h-12 justify-center 2xl:w-16 2xl:h-16">
          <DirectionsCarFilledIcon
            style={{ fontSize: 30, color: "#0C3569" }}
            className="text-primary"
          />
        </div>
        <div className="pr-[113px] 2xl:pr-[150px]">
          <p className="text-2xl font-medium 2xl:text-4xl">332</p>
          <p className="text-[12px] 2xl:text-[16px]">Total rides</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 bg-white pt-[13px] pb-[10px] pl-4 rounded-[12px] 2xl:pt-[30px] 2xl:pb-[40px] 2xl:pl-6">
        <div className="flex gap-4">
          <div className="bg-secondary rounded-full flex items-center w-12 h-12 justify-center 2xl:w-16 2xl:h-16">
            <PersonIcon
              style={{ fontSize: 30, color: "#0C3569" }}
              className="text-primary"
            />
          </div>
          <div className="pr-[113px] 2xl:pr-[150px]">
            <p className="text-2xl font-medium 2xl:text-4xl">3,132</p>
            <p className="text-[12px] 2xl:text-[16px]">Total users</p>
          </div>
        </div>
        <div className="flex gap-4">
          <p className="text-[9px] flex items-center gap-2 2xl:text-[12px]">
            <span className="w-2 h-2 rounded-full bg-[#0C3569]"></span>Active
            2,100
          </p>
          <p className="text-[9px] flex items-center gap-2 2xl:text-[12px]">
            <span className="w-2 h-2 rounded-full bg-[#DD1D1D]"></span>Inactive
            2,100
          </p>
        </div>
      </div>

      <div className="flex gap-4 bg-white pt-[13px] pb-[40px] pl-4 rounded-[12px] 2xl:pt-[30px] 2xl:pb-[40px] 2xl:pl-6">
        <div className="bg-secondary rounded-full flex items-center w-12 h-12 justify-center 2xl:w-16 2xl:h-16">
          <DatabaseIcon
            style={{ fontSize: 30, color: "#0C3569" }}
            className="text-primary"
          />
        </div>
        <div className="pr-[113px] 2xl:pr-[150px]">
          <p className="text-2xl font-medium 2xl:text-4xl">$332</p>
          <p className="text-[12px] 2xl:text-[16px]">Total income</p>
        </div>
      </div>
    </div>
  );
}

export default RideSummary;
