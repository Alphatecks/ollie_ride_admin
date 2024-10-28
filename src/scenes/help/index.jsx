import React from "react";
import AdminTicketTable from "./Help";
import AddIcon from "@mui/icons-material/Add";

function index() {
  return (
    <div className="px-8">
      <div className="flex justify-between items-center py-10">
        <h1 className="font-medium text-2xl">Help</h1>
        <button className="py-[10px] px-[36px] bg-[#0C3569] rounded-[10px] text-white flex gap-4 items-center">
          <AddIcon />
          Add new ticket
        </button>
      </div>
      <AdminTicketTable />
    </div>
  );
}

export default index;
