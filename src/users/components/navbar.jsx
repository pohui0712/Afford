import React from "react";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  return (
    <nav className="w-full sticky top-0 px-6 bg-orange-50 shadow-lg">
      <ul className="flex items-center justify-between py-2 text-lg">
        <li>AFFORD</li>
        <li>Services</li>
        <li>Plan</li>
        <li>Contact</li>
        <button className="bg-blue-400 hover:bg-fuchsia-400 px-4 py-2 text-white rounded-md">
          Booking
        </button>
        <li>
          <CgProfile className="w-8 h-8" />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
