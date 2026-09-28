import { SearchOutlined, Notifications, Delete as DeleteIcon, Edit as EditIcon, Close as CloseIcon } from "@mui/icons-material";
import { IconButton, InputBase, Avatar } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function TopBar() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = useParams();

  // Check if we're on user detail page
  const isUserDetailPage = location.pathname.includes('/user-database/') && userId;

  // Get user display name or email, and default role
  const userName = user?.displayName || user?.email?.split("@")[0] || "User";
  const userEmail = user?.email || "";
  const userRole = "Manager"; // You can fetch this from Firestore if stored

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete this user?`)) {
      console.log('Delete user:', userId);
      // TODO: Implement delete functionality
    }
  };

  const handleEdit = () => {
    console.log('Edit user:', userId);
    // TODO: Implement edit functionality
  };

  const handleClose = () => {
    navigate('/dashboard/user-database');
  };

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
      <div className="flex items-center justify-between gap-4">
        {isUserDetailPage && (
          <>
            <IconButton
              onClick={handleDelete}
              sx={{ p: 1 }}
              title="Delete"
            >
              <DeleteIcon sx={{ color: '#DD1D1D', fontSize: 20 }} />
            </IconButton>
            <IconButton
              onClick={handleEdit}
              sx={{ p: 1 }}
              title="Edit"
            >
              <EditIcon sx={{ color: '#0C3569', fontSize: 20 }} />
            </IconButton>
            <IconButton
              onClick={handleClose}
              sx={{ p: 1 }}
              title="Close"
            >
              <CloseIcon sx={{ color: '#808080', fontSize: 20 }} />
            </IconButton>
          </>
        )}
        
        <div className="bg-[#b2caec] rounded-full p-1">
          <Notifications className="text-[#8095B2] text-[12px]" />
        </div>
        
        <div className="flex gap-2 items-center">
          <Avatar />
          <div className="">
            <p className="text-[12px]">{userName}</p>
            <p className="text-[12px]">{userRole}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
