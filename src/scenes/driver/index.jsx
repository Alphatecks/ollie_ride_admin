import React from "react";
import DriverTable from "./DriverTable";
import AddIcon from "@mui/icons-material/Add";

function index() {
  return (
    <div className="px-10 bg-[#F9F9F9]">
      <div className="flex justify-between items-center py-10">
        <h1 className="font-medium text-2xl">Driver Registration</h1>
        <button className="py-[10px] px-[36px] bg-[#0C3569] rounded-[10px] text-white flex gap-4 items-center">
          <AddIcon />
          Add Driver
        </button>
      </div>
      <div className="pb-[100px]">
      <DriverTable />
      </div>
    </div>
  );
}

export default index;

