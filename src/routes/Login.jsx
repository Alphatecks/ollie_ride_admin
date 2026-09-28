import React, { useState, useEffect } from "react";
import logo from "../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authThunks";
import { clearError } from "../store/authSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Select loading and error state from Redux store
  const { loading: isLoading, error } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password))
      .then(() => {
        // Navigate to the dashboard on successful login
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

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

      {/* Right Section: Login Form */}
      <form
        onSubmit={handleLogin}
        className="w-[483px] h-[614px] flex flex-col items-center justify-between shadow-2xl px-8 pt-[44px] pb-[84px]"
      >
        <h1 className="text-xl font-medium mb-6">Login</h1>

        <div className="flex flex-col w-full">
          <div className="flex flex-col gap-4 w-full">
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
              placeholder="Password"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <button
            type="submit"
            className={`w-full p-[18px] bg-[#0C3569] text-white text-2xl rounded-lg transition-all ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          <p>
            Don't Have An Account?{" "}
            <Link
              to="/register"
              className="text-primary cursor-pointer hover:underline"
            >
              Register Now
            </Link>
          </p>
          <Link
            to="/privacy"
            className="text-[13px] text-[#8095B2] hover:underline"
          >
            Privacy policy
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
