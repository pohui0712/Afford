import { Badge } from "@radix-ui/themes";
import React from "react";

// Define the status map with updated labels and colors
const statusMap = {
  pending: { label: "Pending", color: "indigo" },
  in_progess: { label: "In Progress", color: "violet" },
  rejected: { label: "Rejected", color: "red" },
  approved: { label: "Approved", color: "green" },
};

const AppointmentStatusBadge = ({ status }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default AppointmentStatusBadge;
