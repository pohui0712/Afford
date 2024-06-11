import {
  Button,
  Callout,
  Em,
  Flex,
  Heading,
  RadioCards,
  Select,
  Spinner,
  Text,
  TextArea,
  TextField,
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
  const { register: register_service, handleSubmit: handleSubmit_service } =
    useForm({
      defaultValues: {
        serviceName: [],
      },
    });

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
      //   toast.success("Update successfully");

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
      //   update;
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
        {/* Status */}
        <Controller
          name="status"
          control={control_booking}
          defaultValue={appointment.booking.status}
          render={({ field }) => (
            <Select.Root
              defaultValue={appointment.booking.status}
              onValueChange={field.onChange}
              {...field}
            >
              <Select.Trigger />
              <Select.Content>
                <Select.Group>
                  <Select.Label>Status</Select.Label>
                  <Select.Item value="pending">Pending</Select.Item>
                  <Select.Item value="in_progress">In Progess</Select.Item>
                  <Select.Item value="rejected">Rejected</Select.Item>
                  <Select.Item value="approved">Approved</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
          )}
        />

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
        {/* Car Model */}
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
        {/* Date */}
        <input
          type="date"
          className="border border-solid border-slate-300 rounded-sm py-1 px-2 text-sm"
          //   defaultValue={appointment.booking.date}
          defaultValue="2014-02-09"
          {...register_booking("date")}
        />
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
        {/* Remark */}
        <TextArea
          size="3"
          placeholder="Any additional comments...(optional)"
          defaultValue={appointment.booking.remark}
          {...register_booking("remark")}
        />

        {/* Services */}
        {services.map((item) => (
          <Flex>
            <input
              type="checkbox"
              value={item.value}
              defaultChecked={appointment.service.serviceName.includes(
                item.value
              )}
              {...register_service("serviceName")}
            />
            <Text>{item.value}</Text>
          </Flex>
        ))}

        <Button color="violet" disabled={isSubmitting}>
          <FaEdit />
          Update
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </>
  );
};

export default AppointmentEdit;
