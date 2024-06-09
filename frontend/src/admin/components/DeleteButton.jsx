import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes";
import axios from "axios";
import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

const DeleteButton = ({ route }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [isDeleteing, setDeleting] = useState(false);
  const onDelete = async () => {
    try {
      setDeleting(true);
      await axios.delete(`http://localhost:5500/${route}/${id}`);
      navigate("/admin/userManagement");
    } catch (error) {
      setDeleting(false);
      setError(true);
    }
    setDeleting(false);
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red">
            <AiFillDelete />
            Delete
            {isDeleteing && <Spinner />}
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
              <Button color="red" onClick={onDelete}>
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      {/* Error hanlding*/}
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            Deleteion unsuccessfull. Something went wrong
          </AlertDialog.Description>
          <Button
            color="gray"
            variant="soft"
            mt="2"
            onClick={() => setError(false)}
          >
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteButton;
