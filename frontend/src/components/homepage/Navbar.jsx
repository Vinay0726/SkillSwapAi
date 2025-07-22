import { motion } from "framer-motion";
import { useState } from "react";
import AuthModel from "./AuthModel";
const Navbar = () => {

 
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
      const openAuthModal = () => setIsAuthModalOpen(true);
      const closeAuthModal = () => setIsAuthModalOpen(false);
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed w-full z-50 bg-white/70 shadow-md backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">
          SkillSwap<span className="text-gray-800">AI</span>
        </h1>
        <nav className="space-x-6 text-sm hidden md:flex">
          <a href="#features" className="hover:text-indigo-600 transition">
            Features
          </a>
          <a href="#how" className="hover:text-indigo-600 transition">
            How it Works
          </a>
          <a href="#testimonials" className="hover:text-indigo-600 transition">
            Testimonials
          </a>
          <a href="#contact" className="hover:text-indigo-600 transition">
            Contact
          </a>
        </nav>
        <button
          onClick={openAuthModal}
          className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 text-sm transition"
        >
          Get Started
        </button>
      </div>

      <AuthModel open={isAuthModalOpen} handleClose={closeAuthModal} />
    </motion.header>
  );
};

export default Navbar;
