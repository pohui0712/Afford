import React from "react";
import { Link } from "react-router-dom";
import { RiDonutChartFill } from "react-icons/ri";
import { Button } from "@radix-ui/themes";

const ProgressButton = () => {
  return (
    <Button color="violet">
      <RiDonutChartFill />
      <Link>Update progress</Link>
    </Button>
  );
};

export default ProgressButton;
