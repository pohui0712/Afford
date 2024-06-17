import React from "react";
import { FaScrewdriverWrench } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Button } from "@radix-ui/themes";

const InventoryButton = ({ route }) => {
  return (
    <Button color="indigo">
      <FaScrewdriverWrench />
      <Link to={route}>Update inventory</Link>
    </Button>
  );
};

export default InventoryButton;
