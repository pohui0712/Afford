import { Box, Flex, Heading } from "@radix-ui/themes";
import React from "react";
import { LuBarChartBig } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import { Link, useLocation } from "react-router-dom";
import { IoPeopleSharp } from "react-icons/io5";
import { IoMdExit } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const AdminNavBar = () => {
  return (
    <Flex direction="column" gapY="4" align="center" height="100%">
      <Flex align="center" justify="center" gap="3" mt="4">
        <Link to="/mechanist">
          <MdOutlineAdminPanelSettings size="30px" />
        </Link>
        <Link to="/mechanist">
          <Heading size="7">Afford - Admin</Heading>
        </Link>
      </Flex>
      <Box width="250px" height="100%">
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
      label: "Completed Maintenance",
      href: "/admin/completedMaintenance",
      icon: <TiTick />,
    },
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
