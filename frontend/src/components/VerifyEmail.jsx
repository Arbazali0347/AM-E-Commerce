import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CheckCircle, XCircle } from "lucide-react";

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading"); // 'loading' | 'success' | 'error'

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      verifyToken(token);
    } else {
      setStatus("error");
    }
  }, [location]);

  const verifyToken = async (token) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"}/api/user/verify-email/${token}`);
      if (data.success) {
        setStatus("success");
        toast.success("Email verified successfully! 🎉");
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setStatus("error");
        toast.error(data.message || "Verification failed");
      }
    } catch (error) {
      setStatus("error");
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 px-4">
      {status === "loading" && (
        <div className="text-gray-600 text-lg animate-pulse">Verifying your email, please wait...</div>
      )}

      {status === "success" && (
        <div className="text-center">
          <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-green-600 mb-2">Email Verified!</h2>
          <p className="text-gray-600">Redirecting you to login page...</p>
        </div>
      )}

      {status === "error" && (
        <div className="text-center">
          <XCircle size={64} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-red-600 mb-2">Verification Failed</h2>
          <p className="text-gray-600 mb-4">Invalid or expired token</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
          >
            Go to Login
          </button>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
