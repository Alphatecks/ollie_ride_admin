// // src/routes/PrivateRoute.js
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const PrivateRoute = ({ children }) => {
//   const user = useSelector((state) => state.auth.user); // Check if the user exists

//   if (!user) {
//     // If the user is not authenticated, redirect to login
//     return <Navigate to="/login" />;
//   }

//   // If the user is authenticated, render the children (protected components)
//   return children;
// };

// export default PrivateRoute;


import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
