import React from "react";
import logo from "../assets/Logo.png";

function Register() {
  return (
    <div className="flex items-center  justify-between pr-[100px]">
      {/* Left Section: Logo taking up half the screen */}
      <div className="pr-[25px] bg-primary flex h-screen items-center justify-center">
        <img src={logo} alt="logo" className="max-w-[551px] max-h-[551px] object-contain" />
      </div>

      {/* Right Section: Login Form taking up the other half */}
      
      <form className="w-[483px] h-[614px] flex flex-col items-center justify-between shadow-2xl px-8 pt-[44px] pb-[41px]">
        <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-xl font-medium ">Register</h1>
        <p className="text-[#8095B2] text-[14px] font-medium text-center xl:w-[305px]">Please enter necessary information to create account</p>
        </div>
       

        <form className="flex flex-col w-full">
        <div className="flex flex-col gap-4 w-full">
        <input
          className="w-full pl-[31px] py-[18px] mb-4 border border-[#8095B254] rounded-[15px] placeholder:text-[#8095B299] placeholder:text-[20px] placeholder:font-medium focus:outline-none transition-all placeholder-gray-500 text-sm"
          placeholder="Name"
          type="text"
          id="name"
          name="name"
          required
        />
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
          placeholder="Mobile number"
          type="number"
          id="number"
          name="number"
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
        </form>
       
        <button className="w-full p-[18px] bg-primary text-white text-2xl rounded-lg transition-all hover:bg-blue-700">
          Continue
        </button>
      </form>
    </div>
  )
}

export default Register
