import React, { useState } from "react";
import { Menu, MenuItem, SubMenu, Sidebar } from "react-pro-sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/authThunks";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import HistoryIcon from "@mui/icons-material/History";
import MessageIcon from "@mui/icons-material/Message";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import AssignmentIcon from "@mui/icons-material/Assignment";
import StorageIcon from "@mui/icons-material/Storage";

function AdminSidebar() {
  const [isCollapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Get current route to highlight active menu item
  const currentPath = location.pathname.replace("/dashboard", "") || "/";

  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { key: "history", label: "Ride history", icon: <HistoryIcon />, path: "/dashboard/ride-history" },
    { key: "messages", label: "General message", icon: <MessageIcon />, path: "/dashboard/messages" },
    { key: "faq", label: "FAQs", icon: <HelpOutlineIcon />, path: "/dashboard/faq" },
    { key: "help", label: "Help", icon: <ManageAccountsIcon />, path: "/dashboard/help" },
    { key: "logout", label: "Logout", icon: <LogoutIcon />, path: null, isLogout: true },
  ];

  // User Database submenu items
  const userDatabaseSubmenus = [
    { key: "user-database", label: "User Database", path: "/dashboard/user-database" },
    { key: "password-reset", label: "Password Reset", path: "/dashboard/user-database/password-reset" },
    { key: "registration-request", label: "Drivers Registration Request", path: "/dashboard/user-database/registration-request" },
  ];

  // Rental Desk submenu items
  const rentalDeskSubmenus = [
    { key: "rental-desk", label: "Rental Desk", path: "/dashboard/rental-desk" },
    { key: "pricing-management", label: "Pricing Management", path: "/dashboard/rental-desk/pricing-management" },
    { key: "rental-management", label: "Rental Management", path: "/dashboard/rental-desk/rental-management" },
    { key: "report", label: "Report", path: "/dashboard/rental-desk/report" },
  ];

  // Vehicle Database submenu items
  const vehicleDatabaseSubmenus = [
    { key: "vehicle-database", label: "Vehicle Database", path: "/dashboard/vehicle-database" },
    { key: "maintenance", label: "Maintenance", path: "/dashboard/vehicle-database/maintenance" },
  ];

  const handleMenuClick = (item) => {
    if (item.isLogout) {
      dispatch(logoutUser()).then(() => {
        navigate("/login");
      });
    } else {
      navigate(item.path);
    }
  };

  const toggleCollapse = () => {
    setCollapsed(!isCollapsed);
  };

  // Check if any submenu item is active
  const isUserDatabaseActive = userDatabaseSubmenus.some(submenu => location.pathname === submenu.path);
  const activeUserDatabaseSubmenuKey = userDatabaseSubmenus.find(submenu => location.pathname === submenu.path)?.key;
  
  const isRentalDeskActive = rentalDeskSubmenus.some(submenu => location.pathname === submenu.path);
  const activeRentalDeskSubmenuKey = rentalDeskSubmenus.find(submenu => location.pathname === submenu.path)?.key;
  
  const isVehicleDatabaseActive = vehicleDatabaseSubmenus.some(submenu => location.pathname === submenu.path);
  const activeVehicleDatabaseSubmenuKey = vehicleDatabaseSubmenus.find(submenu => location.pathname === submenu.path)?.key;
  
  // Get selected key based on current path
  const selectedKey = menuItems.find(item => item.path === location.pathname)?.key || 
                      (isUserDatabaseActive ? activeUserDatabaseSubmenuKey : null) ||
                      (isRentalDeskActive ? activeRentalDeskSubmenuKey : null) ||
                      (isVehicleDatabaseActive ? activeVehicleDatabaseSubmenuKey : null) ||
                      "dashboard";

  return (
    <Sidebar
      collapsed={isCollapsed}
      className="h-screen custom-sidebar"
      style={{
        width: isCollapsed ? "80px" : "267px",
        backgroundColor: "white",
        border: "none",
      }} // Adjust the width here
    >
      <div className="px-[58px] py-[38px]">
        <h1 className="text-2xl text-primary">Ollie Ride</h1>
      </div>

      <Menu iconShape="circle" className=" ">
        {/* Dashboard */}
        {menuItems.slice(0, 1).map((item) => (
          <MenuItem
            key={item.key}
            icon={
              <div
                className={` rounded-full ${
                  selectedKey === item.key ? "" : "bg-transparent"
                }`}
              >
                {item.icon}
              </div>
            }
            active={selectedKey === item.key}
            onClick={() => handleMenuClick(item)}
            className={`py-2 text-[#0C3569] flex w-full ${
              selectedKey === item.key ? "bg-[#8ED7FF4D] text-[#0C3569] " : "text-[#8095B2]"
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

        {/* User Database SubMenu */}
        <SubMenu
          label={!isCollapsed ? "User Database" : ""}
          icon={
            <div
              className={` rounded-full ${
                isUserDatabaseActive ? "" : "bg-transparent"
              }`}
            >
              <PersonIcon />
            </div>
          }
          defaultOpen={isUserDatabaseActive}
          className={`py-2 text-[#0C3569] ${
            isUserDatabaseActive ? "bg-[#8ED7FF4D] text-[#0C3569] " : "text-[#8095B2]"
          }`}
        >
          {userDatabaseSubmenus.map((submenu) => (
            <MenuItem
              key={submenu.key}
              active={selectedKey === submenu.key}
              onClick={() => handleMenuClick(submenu)}
              className={`py-2 text-[#0C3569] flex w-full pl-8 ${
                selectedKey === submenu.key ? "bg-[#8ED7FF4D] text-[#0C3569] " : "text-[#8095B2]"
              }`}
              style={{
                backgroundColor:
                  selectedKey === submenu.key ? "transparent" : "transparent",
                color: selectedKey === submenu.key ? "" : "#8095B2",
                border: "none",
                width: "100%",
              }}
            >
              {selectedKey === submenu.key && (
                <span className="absolute left-0 top-0 h-full w-[4px] bg-[#0C3569]"></span>
              )}
              {submenu.label}
            </MenuItem>
          ))}
        </SubMenu>

        {/* Rental Desk SubMenu */}
        <SubMenu
          label={!isCollapsed ? "Rental Desk" : ""}
          icon={
            <div
              className={` rounded-full ${
                isRentalDeskActive ? "" : "bg-transparent"
              }`}
            >
              <AssignmentIcon />
            </div>
          }
          defaultOpen={isRentalDeskActive}
          className={`py-2 text-[#0C3569] ${
            isRentalDeskActive ? "bg-[#8ED7FF4D] text-[#0C3569] " : "text-[#8095B2]"
          }`}
        >
          {rentalDeskSubmenus.map((submenu) => (
            <MenuItem
              key={submenu.key}
              active={selectedKey === submenu.key}
              onClick={() => handleMenuClick(submenu)}
              className={`py-2 text-[#0C3569] flex w-full pl-8 ${
                selectedKey === submenu.key ? "bg-[#8ED7FF4D] text-[#0C3569] " : "text-[#8095B2]"
              }`}
              style={{
                backgroundColor:
                  selectedKey === submenu.key ? "transparent" : "transparent",
                color: selectedKey === submenu.key ? "" : "#8095B2",
                border: "none",
                width: "100%",
              }}
            >
              {selectedKey === submenu.key && (
                <span className="absolute left-0 top-0 h-full w-[4px] bg-[#0C3569]"></span>
              )}
              {submenu.label}
            </MenuItem>
          ))}
        </SubMenu>

        {/* Vehicle Database SubMenu */}
        <SubMenu
          label={!isCollapsed ? "Vehicle Database" : ""}
          icon={
            <div
              className={` rounded-full ${
                isVehicleDatabaseActive ? "" : "bg-transparent"
              }`}
            >
              <StorageIcon />
            </div>
          }
          defaultOpen={isVehicleDatabaseActive}
          className={`py-2 text-[#0C3569] ${
            isVehicleDatabaseActive ? "bg-[#8ED7FF4D] text-[#0C3569] " : "text-[#8095B2]"
          }`}
        >
          {vehicleDatabaseSubmenus.map((submenu) => (
            <MenuItem
              key={submenu.key}
              active={selectedKey === submenu.key}
              onClick={() => handleMenuClick(submenu)}
              className={`py-2 text-[#0C3569] flex w-full pl-8 ${
                selectedKey === submenu.key ? "bg-[#8ED7FF4D] text-[#0C3569] " : "text-[#8095B2]"
              }`}
              style={{
                backgroundColor:
                  selectedKey === submenu.key ? "transparent" : "transparent",
                color: selectedKey === submenu.key ? "" : "#8095B2",
                border: "none",
                width: "100%",
              }}
            >
              {selectedKey === submenu.key && (
                <span className="absolute left-0 top-0 h-full w-[4px] bg-[#0C3569]"></span>
              )}
              {submenu.label}
            </MenuItem>
          ))}
        </SubMenu>

        {/* Other menu items */}
        {menuItems.slice(1).map((item) => (
          <MenuItem
            key={item.key}
            icon={
              <div
                className={` rounded-full ${
                  selectedKey === item.key ? "" : "bg-transparent"
                }`}
              >
                {item.icon}
              </div>
            }
            active={selectedKey === item.key}
            onClick={() => handleMenuClick(item)}
            className={`py-2 text-[#0C3569] flex w-full ${
              selectedKey === item.key ? "bg-[#8ED7FF4D] text-[#0C3569] " : "text-[#8095B2]"
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
