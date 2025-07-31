import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useClerk, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user } = useUser();
  const { signOut } = useClerk();

  const profileRef = useRef();

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        {!user ? (
          <>
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
          </>
        ) : (
          ""
        )}

        {/* Desktop Auth Buttons or Profile */}
        <div className="hidden md:flex items-center space-x-4 relative">
          {!user ? (
            <>
              <Link
                to="/login"
                className="bg-white text-indigo-600 px-5 py-2 rounded-full hover:bg-gray-100 border-indigo-600 border text-sm transition"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 text-sm transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="relative" ref={profileRef}>
              <img
                src={user.imageUrl}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-indigo-500"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              />
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-50">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    Discover
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    Profile
                  </Link>

                  <button
                    onClick={() => {
                      signOut();
                      setProfileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
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
        <nav className="flex flex-col px-6 py-8 space-y-4 bg-white">
          {!user ? (
            <>
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
            </>
          ) : (
            ""
          )}

          {/* Auth buttons for mobile */}
          {!user ? (
            <div className="flex flex-col items-start gap-4 mt-12">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="bg-white text-indigo-600 px-5 py-2 rounded-full hover:bg-gray-100 border border-indigo-600 text-sm transition"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 text-sm transition"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-start gap-4 mt-12">
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="text-indigo-600 hover:text-indigo-800 text-sm"
              >
                Profile
              </Link>

              <button
                onClick={() => {
                  signOut();
                  setMenuOpen(false);
                }}
                className="text-indigo-600 hover:text-indigo-800 text-sm"
              >
                Sign Out
              </button>
            </div>
          )}
        </nav>
      </div>

      {/* Backdrop for overlay (click to close menu) */}
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
