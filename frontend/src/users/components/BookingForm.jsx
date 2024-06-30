import {
  Box,
  Card,
  Flex,
  RadioCards,
  Select,
  Text,
  TextArea,
  TextField,
  Button,
  CheckboxCards,
  Spinner,
  Callout,
} from "@radix-ui/themes";
import React, { useState } from "react";
import { IoCarSharp, IoSpeedometerOutline } from "react-icons/io5";
import carModels from "../data/carModels";
import slots from "../data/slots";
import services from "../data/services";
import axios, { CanceledError } from "axios";
import { Controller, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../components/authProvider";
import { useNavigate } from "react-router";

const BookingForm = () => {
  const { user } = useAuth();
  const [error, setError] = useState();
  const [isSubmitting, setSubmitting] = useState(false);
  const { register, control, handleSubmit } = useForm({
    defaultValues: { user: user.id },
  });
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const carPlateRegex = /^[a-zA-Z0-9]*$/;

    if (!carPlateRegex.test(data.carPlate)) {
      toast.error("Please type the valid car plate format! Exp: SYP123");
      return;
    }
    try {
      setSubmitting(true);
      // console.log(data);
      await axios.post("http://localhost:5500/booking", data);
      toast.success("Your appointment is successful!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setSubmitting(false);
      // console.log(error);
      toast.error("Your appointment is unsuccessful! Someting went wrong");
      setError("An unecpected error occured.");
    }
    setSubmitting(false);
  });
  return (
    <form onSubmit={onSubmit}>
      <Toaster />
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <Box className="w-[400px] md:w-[800px]">
        <Card size={{ initial: "1", md: "3" }}>
          <div className="grid grid-cols-2 gap-4">
            {/* Grid Left */}
            <div className="col-span-1">
              <Flex direction="column" gap="1">
                <Text weight="medium">Car Plate: </Text>
                <TextField.Root
                  placeholder="Car Plate No."
                  {...register("carPlate")}
                  required
                >
                  <TextField.Slot>
                    <IoCarSharp />
                  </TextField.Slot>
                </TextField.Root>

                <Text weight="medium">Date: </Text>
                <input
                  type="date"
                  className="border border-solid border-slate-300 rounded-sm py-1 px-2 text-sm"
                  {...register("date")}
                  required
                />
              </Flex>
            </div>
            {/* Grid Right */}
            <div className="col-span-1">
              <Flex direction="column" gap="1">
                <Text weight="medium">Car Model: </Text>
                <Controller
                  name="carModel"
                  control={control}
                  defaultValue="Range_Rover"
                  render={({ field }) => (
                    <Select.Root
                      defaultValue="Range_Rover"
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

                <Text weight="medium">Mileage: </Text>
                <TextField.Root
                  placeholder="Mileage (km)"
                  {...register("mileage")}
                  required
                >
                  <TextField.Slot>
                    <IoSpeedometerOutline />
                  </TextField.Slot>
                </TextField.Root>
              </Flex>
            </div>

            {/* Grid Bottom */}
            <div className="col-span-2">
              <Text weight="medium">Service Type: </Text>
              <Flex direction="column" gap="1">
                <Controller
                  name="serviceName"
                  control={control}
                  defaultValue={["Periodic Maintenance"]}
                  render={({ field }) => (
                    <CheckboxCards.Root
                      defaultValue={["Periodic Maintenance"]}
                      columns={{ initial: "2", sm: "3" }}
                      size="1"
                      onValueChange={field.onChange}
                    >
                      {services.map((item) => (
                        <CheckboxCards.Item key={item.value} value={item.value}>
                          <Flex direction="column">
                            <Text weight="bold">{item.title}</Text>
                            <Text>{item.description}</Text>
                          </Flex>
                        </CheckboxCards.Item>
                      ))}
                    </CheckboxCards.Root>
                  )}
                />

                <Text weight="medium">Time Slot: </Text>
                <Controller
                  name="time"
                  control={control}
                  defaultValue="9 a.m."
                  render={({ field }) => (
                    <RadioCards.Root
                      defaultValue="9 a.m."
                      columns={{ initial: "2", sm: "3" }}
                      size="1"
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

                <Text weight="medium">Remarks: </Text>
                <TextArea
                  size="3"
                  placeholder="Any additional comments...(optional)"
                  {...register("remark")}
                />

                <Button
                  radius="large"
                  variant="soft"
                  mt="3"
                  size="3"
                  disabled={isSubmitting}
                >
                  Book now
                  {isSubmitting && <Spinner />}
                </Button>
              </Flex>
            </div>
          </div>
        </Card>
      </Box>
    </form>
  );
};

export default BookingForm;
