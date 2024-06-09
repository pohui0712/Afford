import { Button } from "@radix-ui/themes";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const EditButton = ({ href, target }) => {
  return (
    <Button color="violet">
      <FaEdit />
      <Link to={href}>Edit {target}</Link>
    </Button>
  );
};

export default EditButton;
