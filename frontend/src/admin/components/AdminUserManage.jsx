import React, { useEffect, useState } from "react";
import axios, { CanceledError } from "axios";
import { Heading, Table, Link, Callout } from "@radix-ui/themes";

const AdminUserManage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get("http://localhost:5500/users", { signal: controller.signal })
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => controller.abort();
  }, []);

  if (!users) {
    return (
      <Callout.Root color="red" className="mb-5">
        <Callout.Text>There are no users registered.</Callout.Text>
      </Callout.Root>
    );
  }

  return (
    <>
      <Heading mb="3">User Management</Heading>
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Password
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Contact</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((user) => (
            <Table.Row key={user._id}>
              <Table.Cell>
                <Link
                  href={`/admin/userManagement/${user._id}`}
                  underline="always"
                  highContrast
                >
                  {user.name}
                </Link>
              </Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {user.password}
              </Table.Cell>
              <Table.Cell>{user.contact}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default AdminUserManage;
