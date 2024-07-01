import { Card, Heading, Link, Table } from "@radix-ui/themes";
import axios, { CanceledError } from "axios";
import React, { useEffect, useState } from "react";
import AppointmentStatusBadge from "./AppointmentStatusBadge";
import SkeletonTable from "./SkeletonTable";

const LatestBooking = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URI}/appointmentService/exCompleted`,
        {
          signal: controller.signal,
        }
      )
      .then((response) => {
        setData(response.data.appService);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
    return () => controller.abort();
  }, []);

  if (isLoading)
    return (
      <Card>
        <Heading size="4" mb="3">
          Latest Appointments
        </Heading>
        <SkeletonTable />
      </Card>
    );

  return (
    <Card>
      <Heading size="4" mb="3">
        Latest Appointments
      </Heading>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Client Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Car Model</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((d) => (
            <Table.Row key={d.booking._id}>
              <Table.Cell>
                {/* <Flex direction="row" align="start" gap="2">
                  <Link href={`/admin/booking/${d.booking._id}`}>
                    {d.booking.user.name}
                  </Link>
                  <AppointmentStatusBadge status={d.booking.status} />
                  <Text>{d.booking.carModel}</Text>
                </Flex> */}
                <Link href={`/admin/booking/${d._id}`} underline="always">
                  {d.booking.user.name}
                </Link>
              </Table.Cell>
              <Table.Cell>
                <AppointmentStatusBadge status={d.booking.status} />
              </Table.Cell>
              <Table.Cell>{d.booking.carModel}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestBooking;
