import React from "react";
import { Container, Heading, Flex } from "@radix-ui/themes";
import { GrUserWorker } from "react-icons/gr";
import { IoMdExit } from "react-icons/io";
import { Link } from "react-router-dom";

const MecNavBar = () => {
  return (
    <nav className="border-b-2 mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" justify="center" gap="3">
            <Link to="/mechanist">
              <GrUserWorker />
            </Link>
            <Link to="/mechanist">
              <Heading size="4">Afford - Mechanist</Heading>
            </Link>
          </Flex>
          <div className="p-2 rounded-md transition-colors duration-200 hover:bg-red-600 hover:font-bold hover:text-white">
            <Link to={"/"}>
              <Flex align="center" gap="4">
                <IoMdExit />
                Log Out
              </Flex>
            </Link>
          </div>
        </Flex>
      </Container>
    </nav>
  );
};

export default MecNavBar;
