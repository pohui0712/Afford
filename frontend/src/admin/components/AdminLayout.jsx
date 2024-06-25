import { Container } from "@radix-ui/themes";
import React from "react";
import AdminNavBar from "./AdminNavBar";

const AdminLayout = ({ children }) => {
  return (
    <div className="grid grid-cols-5 min-h-screen w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative">
      <div className="col-span-1 backdrop-blur-xl">
        <AdminNavBar />
      </div>
      <div className="col-span-4 p-5">
        <Container>{children}</Container>
      </div>
    </div>
  );
};

export default AdminLayout;
