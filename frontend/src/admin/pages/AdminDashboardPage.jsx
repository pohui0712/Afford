import React from "react";
import AdminLayout from "../components/AdminLayout";
import Dashboard from "../components/AdminDashboard";
import Email from "../components/Email";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      {/* <Dashboard /> */}
      <Email />
    </AdminLayout>
  );
};

export default AdminDashboard;
