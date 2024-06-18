import { Badge } from "@radix-ui/themes";
import React from "react";

// Define the status map with updated labels and colors
const statusMap = {
  pending: { label: "Pending", color: "indigo" },
  in_progress: { label: "In Progress", color: "violet" },
  rejected: { label: "Rejected", color: "red" },
  approved: { label: "Approved", color: "green" },
  completed: { label: "completed", color: "pink" },
};

const AppointmentStatusBadge = ({ status }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default AppointmentStatusBadge;
