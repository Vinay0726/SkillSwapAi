import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiAward,
  FiTag,
  FiPlus,
  FiX,
  FiSave,
  FiCheckCircle,
  FiAlertCircle,
  FiUser,
  FiCode,
} from "react-icons/fi";
import axios from "axios"; // <-- ADD THIS LINE
import { API_BASE_URL } from "../../api/axiosConfig";

const Profile = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [status, setStatus] = useState("idle");

  // --- MODIFIED: Fetch profile from your backend when component loads ---
  useEffect(() => {
    if (isSignedIn) {
      const fetchProfileData = async () => {
        try {
          // Build params for GET
          const params = {
            name: user.fullName,
            email: user.primaryEmailAddress.emailAddress,
            profileImgLink: user.imageUrl,
          };

          // Axios GET
          const response = await axios.get(`${API_BASE_URL}/users/${user.id}`, {
            params,
          });
          const data = response.data;

          setRole(data.role || "Learner"); // Default to Learner if null
          setDescription(data.description || "");
          setSkills(data.skills || []);
        } catch (error) {
          console.error("Error fetching profile:", error);
          setStatus("error");
        }
      };

      fetchProfileData();
    }
  }, [isSignedIn, user]);

  const handleAddSkill = () => {
    if (currentSkill && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  // --- MODIFIED: Update profile by calling your backend API ---
  const handleProfileUpdate = async () => {
    if (!isSignedIn) return;
    setStatus("loading");

    // Construct the full payload with data from Clerk and the form
    const payload = {
      name: user.fullName,
      email: user.primaryEmailAddress.emailAddress,
      profileImgLink: user.imageUrl,
      role,
      description,
      skills,
    };

    try {
      await axios.put(`${API_BASE_URL}/users/${user.id}`, payload, {
        headers: { "Content-Type": "application/json" },
      });
      setStatus("success");
    } catch (error) {
      console.error("Error updating profile:", error);
      setStatus("error");
    }

    setTimeout(() => setStatus("idle"), 2500);
  };

  // --- RENDER LOGIC ---

  if (!isLoaded) {
    // ... Skeleton loader remains the same ...
    return (
      <div className="min-h-screen w-full bg-gray-50 p-4 md:p-8 flex items-center justify-center">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center space-y-4 animate-pulse">
            <div className="w-28 h-28 rounded-full bg-gray-200" />
            <div className="h-7 w-3/4 rounded bg-gray-200" />
            <div className="h-5 w-full rounded bg-gray-200" />
          </div>
          <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-8 space-y-8 animate-pulse">
            <div className="space-y-3">
              <div className="h-5 w-1/4 rounded bg-gray-200" />
              <div className="h-24 w-full rounded-lg bg-gray-200" />
            </div>
            <div className="space-y-3">
              <div className="h-5 w-1/4 rounded bg-gray-200" />
              <div className="h-12 w-full rounded-lg bg-gray-200" />
            </div>
            <div className="h-12 w-full rounded-lg bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-700">
        Please sign in to edit your profile.
      </div>
    );
  }

  // MAIN COMPONENT (Light Theme)
  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-800 p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 md:mt-16">
        {/* Left Panel: Profile Card */}
        <motion.div
          /* ... animation props ... */ className="md:col-span-1 bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center "
        >
          <img
            className="w-28 h-28 rounded-full ring-4 ring-indigo-200"
            src={user.imageUrl}
            alt={user.fullName || "User"}
          />
          <h1 className="text-2xl font-bold mt-4 text-gray-900">
            {user.fullName}
          </h1>
          <p className="text-sm text-gray-500">
            {user.primaryEmailAddress.emailAddress}
          </p>
          <div className="w-full border-t border-gray-200 mt-6 pt-6 flex flex-col items-center">
            <h3 className="font-semibold text-gray-600">Current Role</h3>
            <p className="text-lg font-bold text-indigo-600">{role}</p>
          </div>
        </motion.div>

        {/* Right Panel: Edit Form */}
        <motion.div
          /* ... animation props ... */ className="md:col-span-2 bg-white rounded-2xl shadow-lg p-8 space-y-8"
        >
          {/* ... The rest of the form JSX remains the same ... */}
          {/* Role Selection */}
          <div>
            <label className="font-bold text-gray-700 flex items-center gap-2 mb-3">
              <FiAward className="text-indigo-500" /> Your Role
            </label>

            <textarea
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Frontend Developer"
              className="w-full h-24 p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>
          {/* Description Section */}
          <div>
            <label className="font-bold text-gray-700 flex items-center gap-2 mb-3">
              <FiUser className="text-indigo-500" /> About Me
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us about yourself..."
              className="w-full h-24 p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>
          {/* Skills Management */}
          <div>
            <label className="font-bold text-gray-700 flex items-center gap-2 mb-3">
              <FiCode className="text-indigo-500" /> Manage Your Skills
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                placeholder="Add a new skill and press Enter"
                className="flex-grow p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex flex-wrap gap-2 mt-4 min-h-[36px]">
              <AnimatePresence>
                {skills.map((skill) => (
                  <motion.div
                    key={skill}
                    layout
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1.5 rounded-full flex items-center gap-2"
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-indigo-600 hover:text-red-500"
                    >
                      <FiX size={14} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          {/* Update Button */}
          <div>
            <motion.button
              onClick={handleProfileUpdate}
              disabled={status === "loading"}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full p-3 rounded-lg font-bold text-white flex items-center justify-center gap-2 transition-all duration-300 ${
                status === "idle" && "bg-indigo-600 hover:bg-indigo-700"
              } ${status === "loading" && "bg-indigo-400 cursor-not-allowed"} ${
                status === "success" && "bg-green-500"
              } ${status === "error" && "bg-red-500"}`}
            >
              {status === "idle" && (
                <>
                  <FiSave /> Save Changes
                </>
              )}
              {status === "loading" && (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {status === "success" && (
                <>
                  <FiCheckCircle /> Changes Saved!
                </>
              )}
              {status === "error" && (
                <>
                  <FiAlertCircle /> Something went wrong
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
