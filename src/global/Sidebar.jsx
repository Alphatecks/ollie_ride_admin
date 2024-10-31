import React, { useState, useEffect } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import HistoryIcon from "@mui/icons-material/History";
import MessageIcon from "@mui/icons-material/Message";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { auth } from "../../firebase";

function AdminSidebar() {
  const [isCollapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("/");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    auth.signOut();
    navigate("/login");
  };

  const menuItems = [
    { key: "/", label: "Dashboard", icon: <DashboardIcon /> },
    { key: "/profile", label: "User Database", icon: <PersonIcon /> },
    { key: "/createPost", label: "Driver Registration", icon: <AddIcon /> },
    { key: "/history", label: "Ride History", icon: <HistoryIcon /> },
    { key: "/messages", label: "General Message", icon: <MessageIcon /> },
    { key: "/faq", label: "FAQs", icon: <HelpOutlineIcon /> },
    { key: "/help", label: "Help", icon: <ManageAccountsIcon /> },
    { key: "/logout", label: "Logout", icon: <LogoutIcon /> },
  ];

  const toggleCollapse = () => {
    setCollapsed(!isCollapsed);
  };

  return (
    <Sidebar
      collapsed={isCollapsed}
      className="custom-sidebar"
      style={{
        width: isCollapsed ? "80px" : "267px",
        backgroundColor: "white",
        border: "none",
      }}
    >
      <div className="px-[58px] py-[38px]">
        <h1 className="text-2xl text-primary">Ollie Ride</h1>
      </div>
      <Menu iconShape="circle" className="mt-[50px]">
        {menuItems.map((item) => (
          <MenuItem
            key={item.key}
            icon={
              <div
                className={`rounded-full ${
                  selectedKey === item.key ? "" : "bg-transparent"
                }`}
              >
                {item.icon}
              </div>
            }
            active={selectedKey === item.key}
            onClick={() => {
              if (item.key === "/logout") {
                handleLogout(); // Handle logout directly here
              } else {
                setSelectedKey(item.key);
                navigate(item.key); // Use navigate to change route
              }
            }}
            className={`py-2 text-[#0C3569] flex w-full ${
              selectedKey === item.key
                ? "bg-[#8ED7FF4D] text-[#0C3569]"
                : "text-[#8095B2]"
            }`}
            style={{
              backgroundColor:
                selectedKey === item.key ? "transparent" : "transparent",
              color: selectedKey === item.key ? "" : "#8095B2",
              border: "none",
              width: "100%",
            }}
          >
            {selectedKey === item.key && (
              <span className="absolute left-0 top-0 h-full w-[4px] bg-[#0C3569]"></span>
            )}
            {!isCollapsed && item.label}
          </MenuItem>
        ))}
      </Menu>
      <div className="flex justify-start p-6">
        <MenuIcon onClick={toggleCollapse} style={{ cursor: "pointer" }} />
      </div>
    </Sidebar>
  );
}

export default AdminSidebar;
