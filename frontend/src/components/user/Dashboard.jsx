import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/clerk-react"; // Import useUser
import {
  FiSearch,
  FiFilter,
  FiArrowRight,
  FiUsers,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../api/axiosConfig";
import axios from "axios";


 

// UserCard Component
const UserCard = ({ user, onViewProfile }) => {
  const navigate = useNavigate();
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const roleColors = {
    Mentor: "bg-indigo-100 text-indigo-800",
    Learner: "bg-green-100 text-green-800",
    Admin: "bg-red-100 text-red-800",
  };

  return (
    <motion.div
      variants={cardVariants}
      layout
      className="bg-white rounded-xl shadow-md p-6 flex flex-col text-center items-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      <img
        className="w-24 h-24 rounded-full mb-4 border-4 border-gray-100"
        src={user.profileImgLink || user.avatar} // Use profileImgLink from API, fallback to mock avatar
        alt={`${user.name} avatar`}
      />
      <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
      <span
        className={`px-3 py-1 text-xs font-semibold rounded-full mt-2 ${
          roleColors[user.role]
        }`}
      >
        {user.role}
      </span>
      <div className="mt-4 border-t border-gray-200 w-full pt-4">
        <h4 className="font-semibold text-sm text-gray-600 mb-2">Skills</h4>
        <div className="flex flex-wrap justify-center gap-2">
          {user.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
          {user.skills.length > 3 && (
            <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
              +{user.skills.length - 3} more
            </span>
          )}
        </div>
      </div>
      <button
        onClick={() => navigate(`/view-profile/${user.clerkId}`)} // Pass the user object to onViewProfile
        className="mt-6 w-full bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 flex items-center justify-center gap-2 transition-colors"
      >
        View Profile <FiArrowRight />
      </button>
    </motion.div>
  );
};

// UserCardSkeleton Component (no changes needed)
const UserCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col text-center items-center">
    <div className="w-24 h-24 rounded-full mb-4 bg-gray-200 animate-pulse" />
    <div className="h-6 w-3/4 mb-2 bg-gray-200 rounded animate-pulse" />
    <div className="h-5 w-1/3 mb-4 bg-gray-200 rounded animate-pulse" />
    <div className="mt-4 border-t border-gray-200 w-full pt-4 space-y-2">
      <div className="h-4 w-1/4 mx-auto bg-gray-200 rounded animate-pulse mb-3" />
      <div className="flex flex-wrap justify-center gap-2">
        <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
        <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
        <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
      </div>
    </div>
    <div className="mt-6 w-full h-10 bg-gray-200 rounded-lg animate-pulse" />
  </div>
);

// Main Dashboard Component
const Dashboard = () => {
  const { user, isSignedIn } = useUser(); // Get logged-in user from Clerk
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [allUsers, setAllUsers] = useState([]); // State to store fetched users
  const [isLoading, setIsLoading] = useState(true);

 
  useEffect(() => {
    const fetchAllUsers = async () => {
      setIsLoading(true);
      try {
        let url = `${API_BASE_URL}/users`;
        if (isSignedIn && user?.id) {
          url += `?excludeClerkId=${user.id}`;
        }

        // Correct Axios usage!
        const response = await axios.get(url);
        setAllUsers(response.data); // Axios puts parsed data in .data
      } catch (error) {
        console.error("Error fetching users:", error);
        // Handle error state appropriately in UI
      } finally {
        setIsLoading(false);
      }
    };
      fetchAllUsers();
    
  }, [isSignedIn, user?.id]);
 // Re-fetch when Clerk status or user ID changes

  const filteredUsers = useMemo(() => {
    if (isLoading) return []; // Still loading, return empty for memoized array
    return allUsers
      .filter((u) => filterRole === "All" || u.role === filterRole)
      .filter((u) => {
        const term = searchTerm.toLowerCase();
        return (
          u.name.toLowerCase().includes(term) ||
          u.email.toLowerCase().includes(term) ||
          u.description.toLowerCase().includes(term) ||
          u.skills.some((skill) => skill.toLowerCase().includes(term))
        );
      });
  }, [searchTerm, filterRole, allUsers, isLoading]); // Depend on allUsers, not mockUsers

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8 mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-800 mt-6">
            Welcome back, {user.firstName}!
          </h1>
          <p className="text-gray-500 mt-1">
            Browse and find members of the SkillSwap AI community.
          </p>
        </motion.div>

        {/* Filters and Search Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 my-8 p-4 bg-white rounded-xl shadow-sm"
        >
          <div className="relative w-full md:w-1/3">
            <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, description or skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="relative w-full md:w-auto">
            <FiFilter className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Roles</option>
              <option value="Mentor">Mentors</option>
              <option value="Learner">Learners</option>
              <option value="Admin">Admins</option>
            </select>
          </div>
        </motion.div>

        {/* User Card Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Show 8 skeleton cards while loading */}
            {Array.from({ length: 8 }).map((_, index) => (
              <UserCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {filteredUsers.length > 0 ? (
              <motion.div
                key="user-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredUsers.map((u) => (
                  <UserCard
                    key={u.clerkId || u.id} // Use clerkId as key, fallback to id
                    user={u}
                    onViewProfile={() => setSelectedUser(u)}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="no-users"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-16"
              >
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <FiUsers size={48} className="mb-4" />
                  <h3 className="text-xl font-semibold">No users found</h3>
                  <p>Try adjusting your search or filter criteria.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
