import React, { useEffect, useState } from "react";
import axios from "axios";
import { Heading, Table, Link, Callout } from "@radix-ui/themes";
import Pagination from "./Pagination";

const AdminUserManage = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [currentPage]); // Fetch data whenever currentPage changes

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5500/users`, {
        params: { page: currentPage, pageSize: 10 }, // Adjust pageSize as needed
      });
      setUsers(response.data.users);
      setTotalUsers(response.data.count);
    } catch (error) {
      setError(error.message);
    }
  };

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
      <Pagination
        itemCount={totalUsers}
        pageSize={10}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default AdminUserManage;
