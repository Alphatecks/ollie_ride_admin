import { SearchOutlined, Notifications } from "@mui/icons-material";
import { IconButton, InputBase, Avatar } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux"; // Import useSelector to access Redux state

function TopBar() {
  // Access user data from Redux store
  const user = useSelector((state) => state.auth.user);

  console.log("User data from Redux:", user);

  useEffect(() => {
    console.log("User displayName in TopBar:", user?.displayName);
  }, [user]);



  return (
    <div className="flex justify-between items-center px-[53px] py-5 bg-white">
      {/* Search Bar */}
      <div className="flex border rounded-full w-[370px] justify-between">
        <InputBase
          sx={{ ml: 2, flex: 1, "& ::placeholder": { fontSize: "15px" } }}
          placeholder="Search"
        />
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
          {
            <Avatar className="" src={user?.photoUrl}>
              {user?.email[0]}
            </Avatar>
          }
          <div>
            <p className="text-[12px]">{user?.displayName || "User"}</p>
            <p className="text-[12px]">{user?.email || "Role"}</p>{" "}
            {/* Assuming you have a role field */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
