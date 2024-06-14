import { Card } from "@radix-ui/themes";
import React from "react";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";

const StatusChart = ({ penidng, inProgress, approved, rejected }) => {
  const data = [
    { label: "Pending", value: penidng },
    { label: "In Progress", value: inProgress },
    { label: "Approved", value: approved },
    { label: "Rejected", value: rejected },
  ];

  return (
    <Card>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={60}
            style={{ fill: "var(--accent-9)" }}
          ></Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default StatusChart;
