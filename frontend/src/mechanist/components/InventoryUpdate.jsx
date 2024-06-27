import { Avatar, Box, Button, Card, Flex, Grid, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import inventoryData from "../data/inventory";
import toast, { Toaster } from "react-hot-toast";
import BackButton from "../../admin/components/BackButton";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { FaScrewdriverWrench } from "react-icons/fa6";

const InventoryUpdate = () => {
  const { id } = useParams();
  const [inventory, setInventory] = useState(inventoryData);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5500/appointmentService/${id}`)
      .then((res) => {
        const existInventory = res.data.appService.inventory.inventory;
        const updatedInventory = inventory.map((item) => {
          const foundItem = existInventory.find(
            (i) => i.carPart === item.carPart
          );
          if (foundItem) {
            return {
              ...item,
              quantity: foundItem.quantity,
              price: `RM${foundItem.quantity * item.basePrice}`,
            };
          }
          return item;
        });
        setInventory(updatedInventory);
      })
      .catch((error) => {
        console.error("Error fetching appointment service:", error);
        setError(error.message);
      });
  }, [id]);

  const handleIncrease = (index) => {
    const newInventory = [...inventory];
    newInventory[index].quantity += 1;
    newInventory[index].price = `RM${
      newInventory[index].quantity * newInventory[index].basePrice
    }`;
    setInventory(newInventory);
  };

  const handleDecrease = (index) => {
    const newInventory = [...inventory];
    if (newInventory[index].quantity > 0) {
      newInventory[index].quantity -= 1;
      newInventory[index].price = `RM${
        newInventory[index].quantity * newInventory[index].basePrice
      }`;
    }
    setInventory(newInventory);
  };

  const handleSubmit = async () => {
    try {
      const filteredInventory = inventory.filter((item) => item.quantity > 0);
      const data = filteredInventory.map(({ carPart, quantity, price }) => ({
        carPart,
        quantity,
        price,
      }));

      const response = await axios.get(
        `http://localhost:5500/appointmentService/${id}`
      );
      const appService = response.data.appService;
      const inventoryId = response.data.appService?.inventory?._id;

      if (appService && inventoryId) {
        await axios.put(`http://localhost:5500/inventory/${inventoryId}`, {
          inventory: data,
        });
        toast.success("Inventory updated successfully");
      } else {
        await axios.post(`http://localhost:5500/inventory/appService/${id}`, {
          inventory: data,
        });
        toast.success("Inventory added successfully");
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <>
      <Toaster />
      <Grid columns={{ initial: "1", md: "3" }} gap="3">
        {inventory.map((item, index) => (
          <Card key={index} variant="classic" size="3">
            <Flex gap="3" align="center">
              <Avatar src={item.img} radius="full" fallback="A" size="5" />
              <Box>
                <Flex gapX="5">
                  <Text size="3" color="gray" weight="medium">
                    {item.carPart} :
                  </Text>
                  <Text size="3" weight="bold">
                    {item.price}
                  </Text>
                </Flex>
                <Flex ml="2" align="center" gapX="3">
                  <Button
                    size="1"
                    radius="full"
                    variant="surface"
                    color="red"
                    onClick={() => handleDecrease(index)}
                  >
                    <AiOutlineMinus />
                  </Button>
                  <Text as="span" size="7">
                    {item.quantity}
                  </Text>
                  <Button
                    size="1"
                    radius="full"
                    variant="surface"
                    color="blue"
                    onClick={() => handleIncrease(index)}
                  >
                    <AiOutlinePlus />
                  </Button>
                </Flex>
              </Box>
            </Flex>
          </Card>
        ))}
      </Grid>
      <Flex gapX="3" mt="3">
        <Button onClick={handleSubmit}>
          <FaScrewdriverWrench />
          Submit
        </Button>
        <BackButton href={`/mechanist/userAppointment/${id}`} />
      </Flex>
    </>
  );
};

export default InventoryUpdate;
