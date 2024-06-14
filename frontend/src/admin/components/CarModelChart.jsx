import { Card } from "@radix-ui/themes";
import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Line,
} from "recharts";

const CarModelChart = ({
  rangeRover,
  mustang,
  mustangE,
  explorer,
  territory,
}) => {
  const data = [
    { label: "Range Rover", quantity: rangeRover },
    { label: "Mustang", quantity: mustang },
    { label: "Mustang Mach-E", quantity: mustangE },
    { label: "Explorer", quantity: explorer },
    { label: "Territory", quantity: territory },
  ];
  return (
    <Card>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="quantity" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default CarModelChart;
