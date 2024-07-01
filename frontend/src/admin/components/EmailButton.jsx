import { AlertDialog, Box, Button, DataList, Flex } from "@radix-ui/themes";
import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoPaperPlaneOutline } from "react-icons/io5";

const EmailButton = ({ status, data }) => {
  const [error, setError] = useState(false);
  const onSend = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URI}/api/sendEmail`,
        data
      );
      toast.success("Email sent successfully");
    } catch (error) {
      toast.error("Update unsuccessfully!");
    }
  };
  return (
    <>
      <Toaster />
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color={status === "approved" ? "green" : "red"} size="1">
            <IoPaperPlaneOutline />{" "}
            {status === "approved" ? "Approved" : "Rejected"}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>
            Appointment *{status === "approved" ? "Approved" : "Rejected"}*{" "}
            Notification
          </AlertDialog.Title>
          <AlertDialog.Description>
            You are sending a email with information below...
            <Flex gapX="6" my="3">
              <Box>
                <DataList.Root>
                  <DataList.Item>
                    <DataList.Label>Name:</DataList.Label>
                    <DataList.Value>{data.user.name}</DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label>Car Model: </DataList.Label>
                    <DataList.Value>{data.carModel}</DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label>Car Plate: </DataList.Label>
                    <DataList.Value>{data.carPlate}</DataList.Value>
                  </DataList.Item>
                </DataList.Root>
              </Box>
              <Box>
                <DataList.Root>
                  <DataList.Item>
                    <DataList.Label>Appointment Date: </DataList.Label>
                    <DataList.Value>{data.date}</DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label>Appointment Time: </DataList.Label>
                    <DataList.Value>{data.time}</DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label>People in charge: </DataList.Label>
                    <DataList.Value>{data.admin.email}</DataList.Value>
                  </DataList.Item>
                </DataList.Root>
              </Box>
            </Flex>
          </AlertDialog.Description>
          <Flex mt="4" gap="3">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                color={status === "approved" ? "green" : "red"}
                onClick={onSend}
              >
                Send {status === "approved" ? "Approved" : "Rejected"} email
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
            Email sending unsuccessfull. Something went wrong
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

export default EmailButton;
