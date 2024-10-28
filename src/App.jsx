import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import TopBar from "./global/TopBar";
import AdminSidebar from "./global/Sidebar";
import Dashboard from "./scenes/dashboard";
import RideHistory from "./scenes/ridehistory";
import AdminTicketTable from "./scenes/help";
import FAQTable from "./scenes/faq";
import GeneralM from "./scenes/message";
import DriverTable from "./scenes/driver";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <div style={{ display: "flex", height: "100vh", width: "100%" }}>
          <AdminSidebar />
          <main className="flex-1">
            <TopBar />
            <div className="bg-[#F9F9F9] w-full lg:h-full md:h-auto h-full   ">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/history" element={<RideHistory />} />
                <Route path="/help" element={<AdminTicketTable />} />
                <Route path="/faq" element={<FAQTable />} />
                <Route path="/messages" element={<GeneralM />} />
                <Route path="/createPost" element={<DriverTable/>} />
                {/* Add other routes here */}
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
