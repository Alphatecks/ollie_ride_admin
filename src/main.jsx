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



const router = createBrowserRouter([
  {
    path: "Login",
    element: <Login/>,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "/",
    element: <App />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     
     <RouterProvider router={router} />
     
  </StrictMode>,
)
