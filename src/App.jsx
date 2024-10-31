import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import TopBar from "./global/TopBar";
import AdminSidebar from "./global/Sidebar";
import Dashboard from "./scenes/dashboard";
import RideHistory from "./scenes/ridehistory";
import AdminTicketTable from "./scenes/help";
import FAQTable from "./scenes/faq";
import GeneralM from "./scenes/message";
import DriverTable from "./scenes/driver";
import Register from "./routes/Register";
import Login from "./routes/Login";
import { setUser } from "./store/authSlice"; 

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(true);

  // Initialize user state based on Firebase authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(setUser({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          photoURL: userAuth.photoURL
        }));
      } else {
        dispatch(setUser(null));
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [dispatch]);

  // Display a loading spinner while user authentication is checked
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="loader w-16 h-16 border-8 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex h-screen">
        {user && <AdminSidebar />}
        <main className="flex-1">
          {user && <TopBar />}
          <div className="bg-[#F9F9F9] w-full lg:h-full md:h-auto h-full">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
              <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />

              {/* Main Content */}
              {user ? (
                <>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/history" element={<RideHistory />} />
                  <Route path="/help" element={<AdminTicketTable />} />
                  <Route path="/faq" element={<FAQTable />} />
                  <Route path="/messages" element={<GeneralM />} />
                  <Route path="/createPost" element={<DriverTable />} />
                </>
              ) : (
                <Route path="*" element={<Navigate to="/login" />} />
              )}
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
