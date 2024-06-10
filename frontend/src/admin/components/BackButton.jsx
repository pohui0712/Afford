import React from "react";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { Button } from "@radix-ui/themes";
import { Link } from "react-router-dom";

const BackButton = ({ href }) => {
  return (
    <Button color="blue">
      <FaArrowRotateLeft />
      <Link to={href}>Back to Previous</Link>
    </Button>
  );
};

export default BackButton;
