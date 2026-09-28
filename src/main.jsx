import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Register from './routes/Register.jsx';
import Login from './routes/Login.jsx';
import PrivacyPolicy from './routes/PrivacyPolicy.jsx';
import Dashboard from './scenes/dashboard';
import DriverRegistration from './scenes/driver';
import UserDatabase from './scenes/userDatabase';
import UserDetail from './scenes/userDatabase/UserDetail';
import PasswordReset from './scenes/userDatabase/PasswordReset';
import RegistrationRequest from './scenes/userDatabase/RegistrationRequest';
import RideHistory from './scenes/rideHistory';
import Messages from './scenes/message';
import FAQ from './scenes/faq';
import Help from './scenes/help';
import RentalDesk from './scenes/rentalDesk';
import PricingManagement from './scenes/rentalDesk/PricingManagement';
import RentalManagement from './scenes/rentalDesk/RentalManagement';
import Report from './scenes/rentalDesk/Report';
import VehicleDatabase from './scenes/vehicleDatabase';
import Maintenance from './scenes/vehicleDatabase/Maintenance';
import VehicleRegistrationRequest from './scenes/vehicleDatabase/VehicleRegistrationRequest';
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { store } from "./store/store.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/privacy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/dashboard",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard/>,
      },
      {
        path: "user-database",
        element: <UserDatabase/>,
      },
      {
        path: "user-database/password-reset",
        element: <PasswordReset/>,
      },
      {
        path: "user-database/registration-request",
        element: <RegistrationRequest/>,
      },
      {
        path: "user-database/:userId",
        element: <UserDetail/>,
      },
      {
        path: "driver-registration",
        element: <DriverRegistration/>,
      },
      {
        path: "ride-history",
        element: <RideHistory/>,
      },
      {
        path: "messages",
        element: <Messages/>,
      },
      {
        path: "faq",
        element: <FAQ/>,
      },
      {
        path: "help",
        element: <Help/>,
      },
      {
        path: "rental-desk",
        element: <RentalDesk/>,
      },
      {
        path: "rental-desk/pricing-management",
        element: <PricingManagement/>,
      },
      {
        path: "rental-desk/rental-management",
        element: <RentalManagement/>,
      },
      {
        path: "rental-desk/report",
        element: <Report/>,
      },
      {
        path: "vehicle-database",
        element: <VehicleDatabase/>,
      },
      {
        path: "vehicle-database/maintenance",
        element: <Maintenance/>,
      },
      {
        path: "vehicle-database/registration-request",
        element: <VehicleRegistrationRequest/>,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
