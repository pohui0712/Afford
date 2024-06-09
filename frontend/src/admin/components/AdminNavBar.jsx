import { Box, Flex } from "@radix-ui/themes";
import React from "react";
import { LuBarChartBig } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import { Link, useLocation } from "react-router-dom";
import { IoPeopleSharp } from "react-icons/io5";

const AdminNavBar = () => {
  return (
    <Box className=" h-screen">
      <Flex direction="column" gapY="2" align="center">
        <a href="#" className="font-pt-sans-bold italic text-3xl mt-2">
          AFFORD
        </a>
        <Box width="250px">
          <NavLinks />
        </Box>
      </Flex>
    </Box>
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
    </ul>
  );
};
export default AdminNavBar;
