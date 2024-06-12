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
} from "@radix-ui/themes";
import React from "react";
import { IoCarSharp } from "react-icons/io5";
import carModels from "../data/carModels";
import dealers from "../data/dealers";
import slots from "../data/slots";
import services from "../data/services";

const BookingForm = () => {
  return (
    <Box width="800px">
      <Card size="3">
        <div className="grid grid-cols-2 gap-4">
          {/* Grid Left */}
          <div className="col-span-1">
            <Flex direction="column" gap="1">
              <Text weight="medium">Car Plate: </Text>
              <TextField.Root placeholder="Car Plate No.">
                <TextField.Slot>
                  <IoCarSharp />
                </TextField.Slot>
              </TextField.Root>
              <Text weight="medium">Date: </Text>

              <input
                type="date"
                className="border border-solid border-slate-300 rounded-sm py-1 px-2 text-sm"
              />
            </Flex>
          </div>
          {/* Grid Right */}
          <div className="col-span-1">
            <Flex direction="column" gap="1">
              <Text weight="medium">Car Model: </Text>
              <Select.Root defaultValue="Range Rover">
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

              <Text weight="medium">Dealer: </Text>
              <Select.Root defaultValue="Ford Kuantan, Millennium Autosmart Sdn Bhd">
                <Select.Trigger />
                <Select.Content>
                  {dealers.map((dealer, index) => (
                    <Select.Group key={index}>
                      <Select.Label>{dealer.state}</Select.Label>
                      {dealer.location.map((location, index) => (
                        <Select.Item key={index} value={location}>
                          {location}
                        </Select.Item>
                      ))}
                    </Select.Group>
                  ))}
                </Select.Content>
              </Select.Root>
            </Flex>
          </div>

          {/* Grid Bottom */}
          <div className="col-span-2">
            <Text weight="medium">Service Type: </Text>
            <Flex direction="column" gap="1">
              <CheckboxCards.Root
                defaultValue={["Periodic Maintenance"]}
                columns={{ initial: "2", sm: "3" }}
                size="1"
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

              <Text weight="medium">Slot: </Text>
              <RadioCards.Root
                defaultValue="9 a.m."
                columns={{ initial: "2", sm: "3" }}
                size="1"
              >
                {slots.map((s) => (
                  <RadioCards.Item key={s.value} value={s.value}>
                    {s.icon}
                    {s.label}
                  </RadioCards.Item>
                ))}
              </RadioCards.Root>

              <Text weight="medium">Remarks: </Text>
              <TextArea
                size="3"
                placeholder="Any additional comments...(optional)"
              />

              <Button radius="large" variant="soft" mt="3" size="3">
                Book now
              </Button>
            </Flex>
          </div>
        </div>
      </Card>
    </Box>
  );
};

export default BookingForm;
