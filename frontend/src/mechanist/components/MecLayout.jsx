import React from "react";
import { Container } from "@radix-ui/themes";
import MecNavBar from "./MecNavBar";

const MecLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative">
      <div className="backdrop-blur-xl">
        <MecNavBar />
      </div>
      <div>
        <Container>{children}</Container>
      </div>
    </div>
  );
};

export default MecLayout;
