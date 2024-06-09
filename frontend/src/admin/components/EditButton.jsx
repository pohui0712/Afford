import React from "react";
import { FaEdit } from "react-icons/fa";
import { Button } from "@radix-ui/themes";

const EditButton = () => {
  return (
    <Button color="violet">
      <FaEdit />
      Update
    </Button>
  );
};

export default EditButton;
