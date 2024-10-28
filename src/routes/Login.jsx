import React from "react";
import logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="flex items-center  justify-between pr-[100px]">
      {/* Left Section: Logo taking up half the screen */}
      <div className="pr-[25px] bg-[#0C3569] flex h-screen items-center justify-center">
        <img
          src={logo}
          alt="logo"
          className="max-w-[551px] max-h-[551px] object-contain"
        />
      </div>

      {/* Right Section: Login Form taking up the other half */}

      <form className="w-[483px] h-[614px] flex flex-col items-center justify-between shadow-2xl px-8 pt-[44px] pb-[84px]">
        <h1 className="text-xl font-medium mb-6">Login</h1>

        <div className="flex flex-col w-full">
          <div className="flex flex-col gap-4 w-full">
            <input
              className="w-full pl-[31px] py-[18px] mb-4 border border-[#8095B254] rounded-[15px] placeholder:text-[#8095B299] placeholder:text-[20px] placeholder:font-medium focus:outline-none transition-all placeholder-gray-500 text-sm"
              placeholder="Email"
              type="email"
              id="email"
              name="email"
              required
            />
            <input
              className="w-full pl-[31px] py-[18px] mb-4 border border-[#8095B254] rounded-[15px] placeholder:text-[#8095B299] placeholder:text-[20px] placeholder:font-medium focus:outline-none transition-all placeholder-gray-500 text-sm"
              placeholder="Password"
              type="password"
              id="password"
              name="password"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-medium flex items-center gap-2">
              <input type="checkbox" /> Remember me
            </span>
            <span className="text-[14px] font-medium">Forgot Password</span>
          </div>
        </div>

        <div className="w-full flex flex-col gap-4 text-center">
          <button className="w-full p-[18px] bg-primary text-white text-2xl rounded-lg transition-all hover:bg-blue-700">
            Login
          </button>
         <p>Don't Have An Account? <Link to='/register' className="text-primary cursor-pointer hover:underline">Register Now </Link> </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
