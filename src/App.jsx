import "./App.css";
import TopBar from "./global/TopBar";
import AdminSidebar from "./global/Sidebar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="flex">
      <AdminSidebar/>
      <main className="w-full h-screen">
        <TopBar />
        <div className="bg-[#F9F9F9]">
          <Outlet />
        </div>
      </main >
    </div>
  );
}

export default App;
