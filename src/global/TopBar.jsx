import { SearchOutlined, Notifications  } from "@mui/icons-material";
import { IconButton, InputBase, Avatar } from "@mui/material";
import React from "react";




function TopBar() {
  return (
    <div className="flex justify-between items-center  px-[53px] py-5 bg-white">
      {/* Search Bar */}
      <div className="flex border rounded-full w-[370px] justify-between">
        <InputBase sx={{ ml: 2, flex: 1, '& ::placeholder':{fontSize:'15px'} }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchOutlined />
        </IconButton>
      </div>

      {/* Icon Buttons */}
      <div className="flex items-center justify-between gap-16">
        <div className="bg-[#b2caec] rounded-full p-1">
        <Notifications className="text-[#8095B2] text-[12px]" />
        </div>
        
        <div className="flex gap-2 items-center">
              <Avatar />
              <div className="">
                <p className="text-[12px]">Blake Carrington</p>
                <p className="text-[12px]">Manager</p>
              </div>
            </div>
      </div>
    </div>
  );
}

export default TopBar;
