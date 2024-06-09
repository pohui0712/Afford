import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";

const DeleteButton = () => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">
          <AiFillDelete />
          Delete
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Content>
        <AlertDialog.Title>Comfirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this information from databse? This
          action cannot be undone.
        </AlertDialog.Description>

        <Flex mt="4" gap="3">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color="red">Delete</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteButton;
