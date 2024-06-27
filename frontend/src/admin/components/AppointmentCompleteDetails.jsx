import {
  Box,
  Callout,
  Card,
  Code,
  DataList,
  Flex,
  Heading,
  HoverCard,
  Link,
  Strong,
  Text,
} from "@radix-ui/themes";
import axios, { CanceledError } from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import AppointmentStatusBadge from "./AppointmentStatusBadge";
import BackButton from "./BackButton";

const AppointmentCompleteDetails = () => {
  const { id } = useParams();
  const [appointment, setUser] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(`http://localhost:5500/appointmentService/${id}`, {
        signal: controller.signal,
      })
      .then((response) => {
        setUser(response.data.appService);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => controller.abort();
  }, [id]);

  if (!appointment) {
    return (
      <Callout.Root color="red" className="mb-5">
        <Callout.Text>Appointment not found</Callout.Text>
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
      <Box>
        <Flex direction="column" gapY="3">
          <Card>
            <Heading size="3" mb="3">
              Client & Vehical Info
            </Heading>
            <DataList.Root>
              <DataList.Item>
                <DataList.Label>Client Name</DataList.Label>
                <DataList.Value>
                  <HoverCard.Root>
                    <HoverCard.Trigger>
                      <Link
                        href={`/admin/userManagement/${appointment.booking.user._id}`}
                        underline="always"
                      >
                        {appointment.booking.user.name}
                      </Link>
                    </HoverCard.Trigger>
                    <HoverCard.Content>
                      <Box>
                        <Heading size="3" as="h3">
                          {appointment.booking.user.name}
                        </Heading>
                        <Text as="div" size="2" color="gray" mb="2">
                          {appointment.booking.user._id}
                        </Text>
                        <Text as="div" size="2">
                          <Strong>Email:</Strong>
                          {appointment.booking.user.email}
                        </Text>
                        <Text as="div" size="2">
                          <Strong>Contact:</Strong>
                          {appointment.booking.user.contact}
                        </Text>
                      </Box>
                    </HoverCard.Content>
                  </HoverCard.Root>
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label>Appointment Status</DataList.Label>
                <DataList.Value>
                  <AppointmentStatusBadge status={appointment.booking.status} />
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label>Date</DataList.Label>
                <DataList.Value>{appointment.booking.date}</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label>Car Model</DataList.Label>
                <DataList.Value>{appointment.booking.carModel}</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label>Car Plate</DataList.Label>
                <DataList.Value>{appointment.booking.carPlate}</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label>Car Mileage</DataList.Label>
                <DataList.Value>{appointment.booking.mileage}km</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label>Client's Remark</DataList.Label>
                <DataList.Value>{appointment.booking.remark}</DataList.Value>
              </DataList.Item>
            </DataList.Root>
          </Card>
          <Card>
            <Heading size="3" mb="3">
              Services & Maintenance Info
            </Heading>
            <DataList.Root>
              <DataList.Item>
                <DataList.Label>Services Type</DataList.Label>
                <DataList.Value>
                  {appointment.service.serviceName.map((service, index) => (
                    <span key={index}>
                      <Code color="sky">{service}</Code>
                      {index < appointment.service.serviceName.length - 1 &&
                        ",\u00A0"}
                    </span>
                  ))}
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label>Car Parts used</DataList.Label>
                <DataList.Value>
                  {appointment.inventory?.inventory?.map((item, index) => (
                    <span key={index}>
                      <Code color="brown">
                        {item.quantity} x {item.carPart}
                      </Code>
                      {index < appointment.inventory.inventory.length - 1 &&
                        ",\u00A0"}
                    </span>
                  )) ?? <span>No inventory available</span>}
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label>Price</DataList.Label>
                <DataList.Value>
                  {appointment.inventory?.inventory?.map((item, index) => (
                    <span key={index}>
                      <Code color="amber">{item.price}</Code>
                      {index < appointment.inventory.inventory.length - 1 &&
                        ",\u00A0"}
                    </span>
                  )) ?? <span>No inventory available</span>}
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label>Remarks by Mechanist</DataList.Label>
                <DataList.Value>{appointment.service.remark}</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label>Mechanist In Charge</DataList.Label>
                <DataList.Value>{appointment.mechanic.email}</DataList.Value>
              </DataList.Item>
            </DataList.Root>
          </Card>
        </Flex>
      </Box>
      <Box mt="3">
        <BackButton href={`/admin/completedMaintenance`} />
      </Box>
    </>
  );
};

export default AppointmentCompleteDetails;
