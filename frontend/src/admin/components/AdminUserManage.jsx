import { Callout, Link, Table } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import SkeletonTable from "./SkeletonTable";

const AdminUserManage = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [currentPage]); // Fetch data whenever currentPage changes

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URI}/users`,
        {
          params: { page: currentPage, pageSize: 10 }, // Adjust pageSize as needed
        }
      );
      setUsers(response.data.users);
      setTotalUsers(response.data.count);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <SkeletonTable />;
  }

  if (users.length === 0) {
    return (
      <Callout.Root color="red" className="mb-5">
        <Callout.Text>There are no users registered.</Callout.Text>
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
