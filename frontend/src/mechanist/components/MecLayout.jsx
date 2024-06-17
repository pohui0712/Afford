import React from "react";
import { Container } from "@radix-ui/themes";
import MecNavBar from "./MecNavBar";

const MecLayout = ({ children }) => {
  return (
    <div>
      <MecNavBar />
      <div>
        <Container>{children}</Container>
      </div>
    </div>
  );
};

export default MecLayout;
