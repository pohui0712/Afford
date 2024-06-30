import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useAuth } from "./authProvider";

const Navbar = ({ isTopOfPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { href: "#", label: "Home" },
    { href: "#service", label: "Service" },
    { href: "#planningContent", label: "Plan" },
    { href: "#contact", label: "Contact" },
  ];

  const navBarBackground = isTopOfPage
    ? "bg-transparent"
    : "bg-blue-600 drop-shadow";

  const { isAuthenticated, user } = useAuth();

  return (
    <nav className="w-full fixed top-0 right-0 left-0 z-20 transition-colors duration-300">
      {/* Desktop Menu */}
      <div
        className={`hidden md:flex mx-auto items-center justify-between py-3 text-xl font-pt-sans text-white ${navBarBackground}`}
      >
        <a href="#" className="font-bold italic ml-4">
          AFFORD
        </a>
        <div className="flex space-x-20">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-green-400"
            >
              {link.label}
            </a>
          ))}
        </div>
        {isAuthenticated ? (
          <>
            <Link to={`/user/dashboard/${user.id}`}>
              <CgProfile className="w-8 h-8 mr-4 hover:text-green-400" />
            </Link>
          </>
        ) : (
          <Link to="/login">
            <CgProfile className="w-8 h-8 mr-4 hover:text-red-500" />
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center justify-between py-3 text-xl font-pt-sans text-white">
        <a href="#" className="font-bold italic ml-3">
          AFFORD
        </a>
        <button
          className="text-white focus:outline-none mr-3"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full bg-blue-600 h-full text-white transition-transform transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4">
          <a href="#" className="font-bold italic text-xl">
            AFFORD
          </a>
          <button className="text-white" onClick={() => setIsMenuOpen(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-center justify-center h-full py-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="py-2 text-lg hover:text-green-400"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          {isAuthenticated ? (
            <Link
              to={`/user/dashboard/${user.id}`}
              className="py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <CgProfile className="w-8 h-8 hover:text-green-400" />
            </Link>
          ) : (
            <Link
              to="/login"
              className="py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <CgProfile className="w-8 h-8 hover:text-red-500" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
