import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes";
import axios from "axios";
import React, { useState } from "react";

const CompleteButton = ({ id }) => {
  const [error, setError] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const onComplete = async () => {
    try {
      setSubmitting(true);
      await axios.patch(`http://localhost:5500/booking/${id}`, {
        status: "completed",
      });
    } catch (error) {
      setSubmitting(false);
      setError(true);
    }
    setSubmitting(false);
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" size="1">
            Complete
            {isSubmitting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>

        <AlertDialog.Content>
          <AlertDialog.Title>Complete Maintenance</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure all the services and maintenance by client is done?
            This action will remove this list from the table.
          </AlertDialog.Description>

          <Flex mt="4" gap="3">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" onClick={onComplete}>
                Complete
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
            Unexpected error occur. Something went wrong.
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

export default CompleteButton;
