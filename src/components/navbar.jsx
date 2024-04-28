import React from "react";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  return (
    <nav className="nav-wrapper">
      <div className="nav-content">
        <ul className="list-styled">
          <li className="link-styled">AFFORD</li>
          <li className="link-styled">Services</li>
          <li className="link-styled">Plan</li>
          <li className="link-styled">Contact</li>
          <button className="bg-blue-400 hover:bg-fuchsia-400 rounded-lg px-6 justify-center mt-2">
            Booking
          </button>
          <li className="link-styled">
            <CgProfile className="w-full h-3/4" />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
