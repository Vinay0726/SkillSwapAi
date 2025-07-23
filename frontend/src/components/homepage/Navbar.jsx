import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// Import hamburger and close icons
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Navigation links
  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#how", label: "How it Works" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed w-full z-50 bg-white/70 shadow-md backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-indigo-600 cursor-pointer"
        >
          SkillSwap<span className="text-gray-800">AI</span>
        </h1>

        {/* Desktop Navigation */}
        <nav className="space-x-6 text-sm hidden md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-indigo-600 transition"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex">
          <Link
            to="/login"
            className="bg-white text-indigo-600 px-5 py-2 rounded-full hover:bg-gray-100 border-indigo-600 border text-sm transition mr-2"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 text-sm transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Hamburger Toggle */}
        <button
          className="md:hidden flex items-center text-3xl text-indigo-600 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {/* Covers the screen, slides in from the right */}
      <div
        className={`fixed z-40 top-0 right-0 h-[70vh] w-full bg-white shadow-lg transition-transform duration-300 transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b ">
          <h1
            onClick={() => {
              navigate("/");
              setMenuOpen(false);
            }}
            className="text-2xl font-bold text-indigo-600 cursor-pointer"
          >
            SkillSwap<span className="text-gray-800">AI</span>
          </h1>
          <button
            className="text-3xl text-indigo-600"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <FiX />
          </button>
        </div>
        <nav className="flex flex-col  px-6 py-8 space-y-4 bg-white">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-base font-medium text-gray-700 hover:text-indigo-600 transition"
            >
              {link.label}
            </a>
          ))}
          {/* Auth buttons for mobile */}
          <div className="flex items-center justify-center gap-4 mt-24">
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="bg-white text-indigo-600 px-5 py-2 rounded-full hover:bg-gray-100 border border-indigo-600 text-sm transition mt-2"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 text-sm transition mt-2"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </div>

      {/* Backdrop for overlay (optional, closes menu on click) */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </motion.header>
  );
};

export default Navbar;
