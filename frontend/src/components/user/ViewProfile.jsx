// src/components/ViewProfile.js

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiZap, FiUser, FiCode, FiCheckCircle } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"; // <-- Add this import
import { API_BASE_URL } from "../../api/axiosConfig";
import { useUser } from "@clerk/clerk-react";

// --- Data and Configuration (normally from an API or data file) ---
const roleColors = {
  Mentor: "bg-indigo-100 text-indigo-800",
  Learner: "bg-green-100 text-green-800",
  Admin: "bg-red-100 text-red-800",
};

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// --- The All-in-One Component ---
const ViewProfile = () => {
  const { clerkId } = useParams(); // Get clerkId from the URL
  const { user: currentUser } = useUser();
  const [user, setUser] = useState(null);
  const navigate=useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("idle"); // 'idle', 'pending', 'connected'

  // --- Data Fetching ---
  useEffect(() => {
    if (clerkId) {
      const fetchUserProfile = async () => {
        setIsLoading(true);
        setError(null);
        try {
          // Use axios instead of fetch
          const response = await axios.get(
            `${API_BASE_URL}/users/profile/${clerkId}`
          );
          const data = response.data;
          // Add dummy stats for display
          setUser({ ...data, stats: { connections: 128 } });
        } catch (err) {
          console.error("Error fetching user profile:", err);
          // axios error message
          const msg =
            err.response?.status === 404
              ? "User profile not found."
              : err.response?.data?.message ||
                err.message ||
                "Failed to fetch user data.";
          setError(msg);
        } finally {
          setIsLoading(false);
        }
      };

      fetchUserProfile();
    }
  }, [clerkId]);

  // Handle connect: create or get a DM room and route
  const handleConnect = async () => {
    setConnectionStatus("pending");
    try {
      const res = await axios.post(`${API_BASE_URL}/rooms/get-or-create`, {
        userA: currentUser.id,
        userB: clerkId,
      });
      const { roomId } = res.data;
      setConnectionStatus("connected");
      navigate(`/chat?roomId=${roomId}&to=${clerkId}`);
    } catch (e) {
      setConnectionStatus("idle");
    }
  };

  // --- Render Logic ---

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-auto overflow-hidden">
          {/* Skeleton Banner */}
          <div className="relative">
            <div className="bg-gray-200 h-40 w-full animate-pulse" />
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
              <div className="w-32 h-32 rounded-full bg-gray-300 border-4 border-white" />
            </div>
          </div>
          {/* Skeleton User Info */}
          <div className="pt-20 pb-8 px-6 text-center space-y-3">
            <div className="h-8 w-48 mx-auto bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-24 mx-auto bg-gray-200 rounded animate-pulse" />
          </div>
          {/* Skeleton Stats */}
          <div className="flex justify-center gap-8 border-t border-b border-gray-200 py-4">
            <div className="text-center space-y-2">
              <div className="h-7 w-12 mx-auto bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-20 mx-auto bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="text-center space-y-2">
              <div className="h-7 w-12 mx-auto bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-16 mx-auto bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
          {/* Skeleton Details */}
          <div className="p-6 space-y-8">
            <div className="space-y-2">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-3" />
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <h2 className="text-2xl font-semibold">
            Oops! Something went wrong.
          </h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // 3. Success State
  return (
    <div className="bg-gradient-to-br from-gray-50 to-indigo-100 min-h-screen flex items-center justify-center p-4">
      <motion.div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* --- Profile Header & Banner --- */}
        <div className="relative">
          <motion.div
            className="h-40 bg-gradient-to-r from-indigo-300 to-purple-500"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <motion.div
            className="absolute -bottom-16 left-1/2 -translate-x-1/2"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.2,
              type: "spring",
              stiffness: 120,
            }}
          >
            <img
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              src={user.profileImgLink}
              alt={`${user.name} avatar`}
            />
          </motion.div>
        </div>

        {/* --- User Info --- */}
        <div className="pt-20 pb-8 px-6 text-center">
          <motion.h2
            className="text-3xl font-bold text-gray-900"
            variants={itemVariants}
          >
            {user.name}
          </motion.h2>
          <motion.span
            className={`inline-block px-4 py-1 text-sm font-semibold rounded-full mt-2 ${
              roleColors[user.role]
            }`}
            variants={itemVariants}
          >
            {user.role}
          </motion.span>
        </div>

        {/* --- Stats Section --- */}
        <motion.div
          className="flex justify-center gap-8 border-t border-b border-gray-200 py-4"
          variants={itemVariants}
        >
          <div className="text-center">
            <h4 className="text-2xl font-bold text-indigo-600">
              {user.stats.connections}
            </h4>
            <p className="text-sm text-gray-500">Connections</p>
          </div>
        </motion.div>

        {/* --- Details Section --- */}
        <div className="p-6 space-y-8">
          {/* About Section */}
          <motion.div variants={itemVariants}>
            <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
              <FiUser className="text-indigo-500" /> About
            </h3>
            <p className="text-gray-600 leading-relaxed">{user.description}</p>
          </motion.div>

          {/* Skills Section */}
          <motion.div variants={itemVariants}>
            <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
              <FiCode className="text-indigo-500" /> Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill) => (
                <motion.span
                  key={skill}
                  className="bg-gray-200 text-gray-700 text-sm font-medium px-3 py-1.5 rounded-full"
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    transition: { duration: 0.2 },
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* --- Connect Button --- */}
          <motion.div variants={itemVariants}>
            <button
              onClick={handleConnect}
              disabled={connectionStatus !== "idle"}
              className={`w-full px-4 py-3 rounded-lg text-base font-semibold flex items-center justify-center gap-2 transition-all duration-300 ease-in-out
                ${
                  connectionStatus === "idle" &&
                  "bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-102 transform"
                }
                ${
                  connectionStatus === "pending" &&
                  "bg-indigo-400 text-white cursor-not-allowed"
                }
                ${
                  connectionStatus === "connected" &&
                  "bg-green-500 text-white cursor-default"
                }
              `}
            >
              {connectionStatus === "idle" && (
                <>
                  <FiZap /> Connect
                </>
              )}
              {connectionStatus === "pending" && (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {connectionStatus === "connected" && (
                <>
                  <FiCheckCircle /> Connected
                </>
              )}
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ViewProfile;
