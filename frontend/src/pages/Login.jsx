import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';  // 👈 eye icons (lucide-react install hona chahiye)

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { navigate, token, setToken, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);  // 👈 new state

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", { name, email, password });
        if (data.success) {
          setToken(data.token);
          localStorage.setItem("token", data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", { email, password });
        if (data.success) {
          setToken(data.token);
          localStorage.setItem("token", data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 bg-white p-6 rounded-2xl shadow-lg"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-4">
        <p className="prata-regular text-3xl font-semibold">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState !== "Login" && (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none"
          placeholder="Name"
          required
        />
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none"
        placeholder="Email"
        required
      />

      {/* 👇 Password with eye icon */}
      <div className="w-full relative">
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type={showPassword ? "text" : "password"}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none"
          placeholder="Password"
          required
        />
        <div
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-black transition"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </div>
      </div>

      <div className="w-full flex justify-between text-sm mt-[-5px]">
        <p className="cursor-pointer hover:underline">Forgot your password?</p>
        {currentState === "Login" ? (
          <p onClick={() => setCurrentState("Sign up")} className="cursor-pointer hover:underline">
            Create account
          </p>
        ) : (
          <p onClick={() => setCurrentState("Login")} className="cursor-pointer hover:underline">
            Login Here
          </p>
        )}
      </div>

      <button
        type="submit"
        className="bg-black text-white font-light px-8 py-2 mt-4 rounded-md w-full hover:bg-gray-800 transition"
      >
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
