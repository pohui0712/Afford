import {
  Button,
  Callout,
  CheckboxCards,
  Em,
  Heading,
  RadioCards,
  SegmentedControl,
  Select,
  Spinner,
  Text,
  TextArea,
  TextField,
  Flex,
  Box,
} from "@radix-ui/themes";
import axios, { CanceledError } from "axios";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { IoCarSharp, IoSpeedometerOutline } from "react-icons/io5";
import { useParams } from "react-router";
import carModels from "../../users/data/carModels";
import services from "../../users/data/services";
import slots from "../../users/data/slots";
import BackButton from "./BackButton";

const AppointmentEdit = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState();
  const [error, setError] = useState();
  const [isSubmitting, setSubmitting] = useState(false);
  const {
    register: register_booking,
    handleSubmit: handleSubmit_booking,
    control: control_booking,
  } = useForm();
  const { handleSubmit: handleSubmit_service, control: control_service } =
    useForm();

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(`http://localhost:5500/appointmentService/${id}`, {
        signal: controller.signal,
      })
      .then((response) => {
        setAppointment(response.data.appService);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => controller.abort();
  }, [id]);

  const onSubmit_booking = handleSubmit_booking(async (data) => {
    try {
      setSubmitting(true);
      //   update;
      await axios.patch(
        `http://localhost:5500/booking/${appointment.booking._id}`,
        data
      );
      onSubmit_service();
    } catch (error) {
      setSubmitting(false);
      toast.error("Update unsuccessfully!");
      setError("An unexpected error occured.");
    }
    setSubmitting(false);
  });

  const onSubmit_service = handleSubmit_service(async (data) => {
    try {
      // update;
      await axios.patch(
        `http://localhost:5500/service/${appointment.service._id}`,
        data
      );
      toast.success("Update successfully");
      setError("");
    } catch (error) {
      setSubmitting(false);
      toast.error("Update unsuccessfully!");
      setError("An unexpected error occured.");
    }
    setSubmitting(false);
  });

  if (!appointment) {
    return (
      <Callout.Root color="red" className="mb-5">
        <Callout.Text>Appointment not found</Callout.Text>
      </Callout.Root>
    );
  }

  return (
    <>
      <Toaster />

      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <Heading mb="3">
        Edit <Em>{appointment.booking.user.name}</Em> Appointment
      </Heading>

      <form onSubmit={onSubmit_booking}>
        <Flex gap="4" mb="2">
          <Heading size="5">Status: </Heading>
          {/* Status */}
          <Controller
            name="status"
            control={control_booking}
            defaultValue={appointment.booking.status}
            render={({ field }) => (
              <SegmentedControl.Root
                defaultValue={appointment.booking.status}
                size="2"
                variant="classic"
                radius="large"
                onValueChange={field.onChange}
                {...field}
              >
                <SegmentedControl.Item value="pending">
                  Pending
                </SegmentedControl.Item>
                <SegmentedControl.Item value="in_progress">
                  In Progress
                </SegmentedControl.Item>
                <SegmentedControl.Item value="approved">
                  Approved
                </SegmentedControl.Item>
                <SegmentedControl.Item value="rejected">
                  Rejected
                </SegmentedControl.Item>
              </SegmentedControl.Root>
            )}
          />
        </Flex>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <Flex direction="column" gap="1">
              <Heading size="3">Car Plate: </Heading>
              {/* Car Plate */}
              <TextField.Root
                placeholder="Car Plate No."
                defaultValue={appointment.booking.carPlate}
                {...register_booking("carPlate")}
              >
                <TextField.Slot>
                  <IoCarSharp />
                </TextField.Slot>
              </TextField.Root>

              <Heading size="3">Car Mileage: </Heading>
              {/*Mileage  */}
              <TextField.Root
                placeholder="Mileage (km)"
                defaultValue={appointment.booking.mileage}
                {...register_booking("mileage")}
              >
                <TextField.Slot>
                  <IoSpeedometerOutline />
                </TextField.Slot>
              </TextField.Root>
            </Flex>
          </div>
          <div className="col-span-1">
            {/* Car Model */}
            <Flex direction="column" gap="1">
              <Heading size="3">Car Model: </Heading>
              <Controller
                name="carModel"
                control={control_booking}
                defaultValue={appointment.booking.carModel}
                render={({ field }) => (
                  <Select.Root
                    defaultValue={appointment.booking.carModel}
                    onValueChange={field.onChange}
                    {...field}
                  >
                    <Select.Trigger />
                    <Select.Content>
                      <Select.Group>
                        {carModels.map((model) => (
                          <Select.Item key={model.value} value={model.value}>
                            {model.label}
                          </Select.Item>
                        ))}
                      </Select.Group>
                    </Select.Content>
                  </Select.Root>
                )}
              />
              {/* Date */}
              <Heading size="3">Date: </Heading>
              <input
                type="date"
                className="border border-solid border-slate-300 rounded-sm py-1 px-2 text-sm"
                defaultValue={appointment.booking.date}
                {...register_booking("date")}
              />
            </Flex>
          </div>
          <div className="col-span-2">
            <Flex direction="column" gap="1">
              <Heading size="3">Time Slot: </Heading>
              {/* Slot */}
              <Controller
                name="time"
                control={control_booking}
                defaultValue={appointment.booking.time}
                render={({ field }) => (
                  <RadioCards.Root
                    defaultValue={appointment.booking.time}
                    columns={{ initial: "2", sm: "3" }}
                    size="1"
                    gap="2"
                    onValueChange={field.onChange}
                    {...field}
                  >
                    {slots.map((s) => (
                      <RadioCards.Item key={s.value} value={s.value}>
                        {s.icon}
                        {s.label}
                      </RadioCards.Item>
                    ))}
                  </RadioCards.Root>
                )}
              />
              <Heading size="3">Service Type: </Heading>
              {/* Services */}
              <Controller
                name="serviceName"
                defaultValue={appointment.service.serviceName}
                control={control_service}
                render={({ field }) => (
                  <CheckboxCards.Root
                    defaultValue={appointment.service.serviceName}
                    columns={{ initial: "1", sm: "3" }}
                    onValueChange={field.onChange}
                  >
                    {services.map((service) => (
                      <CheckboxCards.Item
                        key={service.value}
                        value={service.value}
                      >
                        <Text weight="bold">{service.title}</Text>
                      </CheckboxCards.Item>
                    ))}
                  </CheckboxCards.Root>
                )}
              />

              <Heading size="3">Remark: </Heading>
              {/* Remark */}
              <TextArea
                size="3"
                placeholder="Any additional comments...(optional)"
                defaultValue={appointment.booking.remark}
                {...register_booking("remark")}
              />
            </Flex>
          </div>
        </div>
        <Flex mt="2" gap="2">
          <Button color="violet" disabled={isSubmitting}>
            <FaEdit />
            Update
            {isSubmitting && <Spinner />}
          </Button>
          <BackButton href={`/admin/booking/${appointment._id}`} />
        </Flex>
      </form>
    </>
  );
};

export default AppointmentEdit;
