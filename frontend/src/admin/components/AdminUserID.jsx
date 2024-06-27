import {
  Blockquote,
  Box,
  Callout,
  Card,
  DataList,
  Em,
  Flex,
  Heading,
} from "@radix-ui/themes";
import axios, { CanceledError } from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import BackButton from "./BackButton";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import UserAppointment from "./UserAppointment";

const AdminUserID = () => {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(`http://localhost:5500/users/${id}`, { signal: controller.signal })
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => controller.abort();
  }, [id]);

  if (!user) {
    return (
      <Callout.Root color="red" className="mb-5">
        <Callout.Text>User not found</Callout.Text>
      </Callout.Root>
    );
  }

  return (
    <>
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <div className="md:grid grid-cols-4 gap-3">
        <Box className="col-span-3">
          <Card>
            <DataList.Root>
              <DataList.Item>
                <DataList.Label>ID</DataList.Label>
                <DataList.Value>{user._id}</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label>Name</DataList.Label>
                <DataList.Value>{user.name}</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label>Email</DataList.Label>
                <DataList.Value>{user.email}</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label>Password</DataList.Label>
                <DataList.Value>{user.password}</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label>Contact</DataList.Label>
                <DataList.Value>{user.contact}</DataList.Value>
              </DataList.Item>
            </DataList.Root>
          </Card>
        </Box>
        <Box className="w-[10rem]">
          <Flex direction="column" gapY="3">
            <EditButton
              href={`/admin/userManagement/edit/${user._id}`}
              target="User"
            />
            <DeleteButton route="users" />
            <BackButton href={`/admin/userManagement`} />
          </Flex>
        </Box>
      </div>
      {/* </Flex> */}
      <Blockquote my="4" size="4" weight="light">
        Appointment History
      </Blockquote>
      <UserAppointment userId={user._id} />
    </>
  );
};

export default AdminUserID;
