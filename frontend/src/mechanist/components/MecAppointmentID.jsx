import { Callout, Card, Code, DataList, Flex } from "@radix-ui/themes";
import axios, { CanceledError } from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import InventoryButton from "./InventoryButton";
import ProgressButton from "./ProgressButton";

const MecAppointmentID = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(`http://localhost:5500/appointmentService/${id}`, {
        signal: controller.signal,
      })
      .then((response) => {
        setAppointment(response.data.appService);
        console.log(response.data.appService);
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
      <Card>
        <DataList.Root>
          <DataList.Item>
            <DataList.Label>Card Plate</DataList.Label>
            <DataList.Value>{appointment.booking.carPlate}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Card Model</DataList.Label>
            <DataList.Value>{appointment.booking.carModel}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Mileage</DataList.Label>
            <DataList.Value>{appointment.booking.mileage}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Appointment Date</DataList.Label>
            <DataList.Value>{appointment.booking.date}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Remark</DataList.Label>
            <DataList.Value>{appointment.booking.remark}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Services</DataList.Label>
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
            <DataList.Label>Progress</DataList.Label>
            <DataList.Value>{appointment.service.progress}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Car parts used</DataList.Label>
            <DataList.Value>
              {/* {appointment.inventory.progress} */}
              ABC
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
      </Card>
      <Flex gapX="3" mt="3">
        <ProgressButton
          route={`/mechanist/progress/${appointment.service._id}`}
        />
        <InventoryButton />
      </Flex>
    </>
  );
};

export default MecAppointmentID;
