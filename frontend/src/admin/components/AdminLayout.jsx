import { Container } from "@radix-ui/themes";
import React from "react";
import AdminNavBar from "./AdminNavBar";

const AdminLayout = ({ children }) => {
  return (
    <div className="grid grid-cols-5 min-h-screen">
      <div className="col-span-1">
        <AdminNavBar />
      </div>
      <div className="col-span-4 p-5 bg-gray-100">
        <Container>{children}</Container>
      </div>
    </div>
  );
};

export default AdminLayout;
