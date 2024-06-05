import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const links = [
    { href: "#", label: "Home" },
    { href: "#service", label: "Service" },
    { href: "#planningContent", label: "Plan" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav
      className={`w-full fixed top-0 px-6 z-20 transition-colors duration-300 ${
        scrollY > 750 ? "bg-blue-600" : "bg-transparent"
      }`}
    >
      <ul className="flex justify-between items-center py-3 text-xl font-pt-sans text-white">
        <a href="#" className="font-pt-sans-bold italic">
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
        <a href="#">
          <CgProfile className="w-8 h-8 hover:text-green-400" />
        </a>
      </ul>
    </nav>
  );
};

export default Navbar;
