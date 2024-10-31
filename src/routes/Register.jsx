import React, { useState, useEffect } from "react";
import logo from "../assets/Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../store/authThunks";
import { Link, useNavigate } from "react-router-dom";
import { clearError } from "../store/authSlice";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(signupUser({ name, email, number, password })).then(() => {
      navigate("/"); // Navigate to the main page on successful registration
    });
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearError()); // Display error message in alert
    }
  }, [error]);

  return (
    <div className="flex items-center justify-between pr-[100px]">
      {/* Left Section: Logo taking up half the screen */}
      <div className="pr-[25px] bg-[#0C3569] flex h-screen items-center justify-center">
        <img
          src={logo}
          alt="logo"
          className="max-w-[551px] max-h-[551px] object-contain"
        />
      </div>

      {/* Right Section: Registration Form */}
      <form
        onSubmit={handleRegister}
        className="w-[483px] h-[614px] flex flex-col items-center justify-between shadow-2xl px-8 pt-[44px] pb-[41px]"
      >
        <div className="flex flex-col items-center justify-center mb-6">
          <h1 className="text-xl font-medium">Register</h1>
          <p className="text-[#8095B2] text-[14px] font-medium text-center xl:w-[305px]">
            Please enter necessary information to create an account
          </p>
        </div>

        <div className="flex flex-col w-full">
          <div className="flex flex-col gap-4 w-full">
            <input
              className="w-full pl-[31px] py-[18px] mb-4 border border-[#8095B254] rounded-[15px] placeholder:text-[#8095B299] placeholder:text-[20px] placeholder:font-medium focus:outline-none transition-all placeholder-gray-500 text-sm"
              placeholder="Name"
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className="w-full pl-[31px] py-[18px] mb-4 border border-[#8095B254] rounded-[15px] placeholder:text-[#8095B299] placeholder:text-[20px] placeholder:font-medium focus:outline-none transition-all placeholder-gray-500 text-sm"
              placeholder="Email"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="w-full pl-[31px] py-[18px] mb-4 border border-[#8095B254] rounded-[15px] placeholder:text-[#8095B299] placeholder:text-[20px] placeholder:font-medium focus:outline-none transition-all placeholder-gray-500 text-sm"
              placeholder="Mobile number"
              type="text"
              id="number"
              name="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
            <input
              className="w-full pl-[31px] py-[18px] mb-4 border border-[#8095B254] rounded-[15px] placeholder:text-[#8095B299] placeholder:text-[20px] placeholder:font-medium focus:outline-none transition-all placeholder-gray-500 text-sm"
              placeholder="Password"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className={`w-full p-[18px] bg-[#0C3569] text-white text-2xl rounded-lg transition-all ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Continue"}
        </button>
        <p className="mt-4">
          Have An Account?{" "}
          <Link
            to="/login"
            className="text-primary cursor-pointer hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
