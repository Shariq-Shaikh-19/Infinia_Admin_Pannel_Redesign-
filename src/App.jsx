import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

// Icons from react-icons
import { AiOutlineMail } from "react-icons/ai";
import { TbLock } from "react-icons/tb";
import { IoLogInOutline } from "react-icons/io5";
import { MdVerifiedUser } from "react-icons/md";
import { FiSun, FiMoon } from "react-icons/fi";

import Body from "./components/Body";
import InfiniaLogo from "./assets/InfiniaLogo.png";

export default function App() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Dark mode state initialized from localStorage
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Toggle dark mode class on root element
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Use useRef to keep the token across renders
  const tokenRef = useRef(sessionStorage.getItem("token"));
  const navigate = useNavigate();
  // const baseUrl = "http://localhost:8080";
  const baseUrl = "https://infiniaback.onrender.com";

  useEffect(() => {
    // Check if the session has an existing token
    const token = tokenRef.current;
    const isUserAuthenticated = localStorage.getItem("isAuthenticated");
    console.log("Token on page load:", token);

    if (token && isUserAuthenticated) {
      setIsAuthenticated(true);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      console.log("Verifying token...");
      const response = await axios.post(`${baseUrl}/login/verifyToken`, {
        token,
      });

      if (response.data.valid) {
        setIsAuthenticated(true);
        navigate(localStorage.getItem("url") || "/dashboard");
      } else {
        console.log("Token invalid");
        sessionStorage.removeItem("token");
        tokenRef.current = null;
        setIsAuthenticated(false);
        navigate("/login");
      }
    } catch (error) {
      console.error("Token verification failed", error);
      sessionStorage.removeItem("token");
      tokenRef.current = null;
      setIsAuthenticated(false);
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleVerify = async (event) => {
    event.preventDefault();
    try {
      console.log("login function call", `${baseUrl}/login/verify`);
      const response = await axios.post(`${baseUrl}/login/verify`, credentials);
      const { token } = response.data;
      console.log("Token received:", token);
      sessionStorage.setItem("token", token);
      tokenRef.current = token;
      localStorage.setItem("isAuthenticated", true);
      toast.success("Logged in Successfully");
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error) {
      toast.error("Invalid Credentials");
      console.log("Error ", error);
      console.error("Login failed", error);
    }
  };

  const handleLogout = (e) => {
    console.log("Logout function called");
    sessionStorage.removeItem("token");
    tokenRef.current = null;
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated"); // Remove the flag on logout
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fffdfb] dark:bg-[#080f20]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="w-12 h-12 animate-spin text-indigo-600 dark:text-blue-400"
          viewBox="0 0 16 16"
        >
          <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
          <path
            fillRule="evenodd"
            d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
          />
        </svg>
      </div>
    );
  }

  return (
    <>
      {isAuthenticated ? (
        <Body onLogout={handleLogout} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen items-center px-6 py-12 lg:px-16 bg-[#fffdfb] dark:bg-[#080f20] transition-colors duration-300 relative">
          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="absolute top-6 right-6 rounded-full p-3 bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-slate-800 dark:text-yellow-400 dark:hover:bg-slate-700 transition z-50 cursor-pointer"
            aria-label="Toggle theme"
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          {/* GRID LEFT SIDE - Exact matching alignment */}
          <div className="flex flex-col justify-center items-start lg:pl-24">
            <div className="w-full max-w-xl">
              <img
                src={InfiniaLogo}
                alt="INFINIA Logo"
                className="w-72 h-auto mb-3"
              />
              <div className="flex w-72 h-1 mb-6">
                <div className="w-1/4 bg-orange-500"></div>
                <div className="flex-1 bg-[#263967]"></div>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold dark:text-white text-gray-900 tracking-tight">
                Welcome <span className="text-orange-500">back</span>
              </h1>

              <p className="text-lg lg:text-xl leading-snug mt-5 font-semibold dark:text-slate-300 text-gray-600">
                Access your admin portal to manage
                <br />
                and monitor your platform.
              </p>
            </div>
          </div>

          {/* GRID RIGHT SIDE (Login Card) */}
          <div className="flex justify-center lg:justify-start mt-10 lg:mt-0 lg:pl-12">
            <div className="relative w-full max-w-md bg-white rounded-[22px] border border-slate-100 shadow-[0_12px_35px_rgba(15,35,85,0.13)] px-6 sm:px-8 py-8 dark:bg-gray-900 dark:border-slate-700 dark:shadow-[0_15px_45px_rgba(0,0,0,0.4)] transition-colors duration-300">
              {/* Logo */}
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                  src={InfiniaLogo}
                  alt="Infinia Logo"
                  className="mx-auto h-16 w-auto"
                />

                <h2 className="mt-5 text-center text-2xl font-bold text-gray-900 dark:text-white">
                  Sign in to your account
                </h2>
              </div>

              {/* Form */}
              <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleVerify} className="space-y-5">
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-900 dark:text-slate-200"
                    >
                      Email Address
                    </label>

                    <div className="relative mt-2">
                      <AiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-slate-400 text-lg" />

                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                        className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-gray-900 placeholder:text-gray-400 outline-none focus:border-indigo-600 dark:border-slate-600 dark:bg-[#0b1428] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-500 transition text-sm"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-900 dark:text-slate-200"
                      >
                        Password
                      </label>

                      <a
                        href="#"
                        className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-orange-400 dark:hover:text-orange-300"
                      >
                        Forgot password?
                      </a>
                    </div>

                    <div className="relative mt-2">
                      <TbLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-slate-400 text-lg" />

                      <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                        autoComplete="current-password"
                        className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-gray-900 placeholder:text-gray-400 outline-none focus:border-indigo-600 dark:border-slate-600 dark:bg-[#0b1428] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-500 transition text-sm"
                      />
                    </div>
                  </div>

                  {/* Sign In Button */}
                  <button
                    type="submit"
                    className="relative overflow-hidden w-full h-11 rounded-xl bg-gradient-to-r from-[#071943] via-[#102c70] to-[#071943] text-white font-semibold text-sm shadow-lg hover:shadow-xl hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer mt-2"
                  >
                    <span className="flex items-center justify-center gap-2 relative z-10">
                      <IoLogInOutline className="text-lg" />
                      Sign in
                    </span>

                    <span className="absolute -right-3 -top-5 w-12 h-20 rotate-45 bg-orange-400/90"></span>
                    <span className="absolute -right-1 -top-5 w-5 h-20 rotate-45 bg-blue-500/70"></span>
                  </button>
                </form>

                {/* Secure Access */}
                <div className="mt-5 flex flex-col items-center">
                  <div className="flex items-center gap-2 w-full">
                    <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
                    <MdVerifiedUser className="text-[#10275e] dark:text-blue-400 text-sm" />
                    <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-medium">
                    Secure access
                  </p>
                </div>

                {/* Free Trial */}
                <p className="mt-8 text-center text-sm text-gray-500 dark:text-slate-400">
                  Not a member?{" "}
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-orange-400 dark:hover:text-orange-300"
                  >
                    Start a 14 day free trial
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}