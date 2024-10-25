import "./App.css";
import TopBar from "./global/TopBar";
import AdminSidebar from "./global/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./scenes/dashboard";




function App() {
  return (
 
    <div className="flex">
      <AdminSidebar/>
      <main className="w-full h-screen">
        <TopBar />
        <div className="bg-[#F9F9F9]">
        <Routes >
          <Route path="/" element={<Dashboard/>} />
        </Routes>
        </div>
       
      </main >
    </div>

  );
}

export default App;
