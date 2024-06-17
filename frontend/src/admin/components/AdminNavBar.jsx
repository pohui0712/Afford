import { Box, Flex } from "@radix-ui/themes";
import React from "react";
import { LuBarChartBig } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import { Link, useLocation } from "react-router-dom";
import { IoPeopleSharp } from "react-icons/io5";
import { IoMdExit } from "react-icons/io";

const AdminNavBar = () => {
  return (
    <Flex direction="column" gapY="4" align="center" height="100%">
      <a href="#" className="font-pt-sans-bold italic text-3xl mt-5">
        AFFORD
      </a>
      <Box width="250px" height="80%">
        <Flex direction="column" justify="between" height="100%">
          <NavLinks />
          <div className="p-2 rounded-md mb-2 transition-colors duration-200 hover:bg-red-600 hover:font-bold hover:text-white">
            <Link to={"/"}>
              <Flex align="center" gap="4">
                <IoMdExit />
                Log Out
              </Flex>
            </Link>
          </div>
        </Flex>
      </Box>
    </Flex>
  );
};

const NavLinks = () => {
  // To get the current route
  const { pathname } = useLocation();

  // Define the navigation in an array and map it to a brunch of list items
  const links = [
    { label: "Dashboard", href: "/admin/dashboard", icon: <LuBarChartBig /> },
    { label: "Appointment", href: "/admin/booking", icon: <SlCalender /> },
    {
      label: "User",
      href: "/admin/userManagement",
      icon: <IoPeopleSharp />,
    },
  ];

  return (
    <ul>
      <Flex direction="column" gapY="3">
        {links.map((link) => (
          <li
            key={link.href}
            className={`p-2 rounded-md mb-2 transition-colors duration-200 ${
              pathname.startsWith(link.href)
                ? "bg-neutral-800 font-bold text-white"
                : "hover:bg-gray-200"
            }`}
          >
            <Link to={link.href}>
              <Flex align="center" gap="4">
                {link.icon}
                {link.label}
              </Flex>
            </Link>
          </li>
        ))}
      </Flex>
    </ul>
  );
};
export default AdminNavBar;