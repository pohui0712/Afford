import { Avatar, Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import inventoryData from "../data/inventory";

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
              price: foundItem.price,
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
  }, []);
  const handleIncrease = (index) => {
    const newInventory = [...inventory];
    const basePrice = parseInt(inventoryData[index].price.replace("RM", "")); // Extract base price
    newInventory[index].quantity += 1;
    newInventory[index].price = `RM${basePrice * newInventory[index].quantity}`;
    setInventory(newInventory);
  };

  const handleDecrease = (index) => {
    const newInventory = [...inventory];
    const basePrice = parseInt(inventoryData[index].price.replace("RM", "")); // Extract base price
    if (newInventory[index].quantity > 0) {
      newInventory[index].quantity -= 1;
      newInventory[index].price = `RM${
        basePrice * newInventory[index].quantity
      }`;
    }
    setInventory(newInventory);
  };

  const handleSubmit = async () => {
    try {
      // Filter out items with quantity 0
      const filteredInventory = inventory.filter((item) => item.quantity > 0);

      // Prepare the data for submission
      const data = filteredInventory.map(({ carPart, quantity, price }) => ({
        carPart,
        quantity,
        price,
      }));
      console.log(data);

      // Fetch the current state of the appointment service
      const response = await axios.get(
        `http://localhost:5500/appointmentService/${id}`
      );
      const appService = response.data.appService;
      const inventoryId = response.data.appService.inventory._id;

      if (appService && appService.inventory && appService.inventory._id) {
        // If inventory exists, PATCH method
        await axios.put(`http://localhost:5500/inventory/${inventoryId}`, {
          inventory: data,
        });
        alert("Inventory updated successfully!");
        console.log(`Update successfully`);
      } else {
        // If no inventory exists, POST method
        await axios.post(`http://localhost:5500/inventory/appService/${id}`, {
          inventory: data,
        });
        //    alert('Inventory created successfully!');
        console.log("Didnt exist");
        console.log("Add new inventory successfully");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Box>
        {inventory.map((item, index) => (
          <Card key={index} variant="classic" size="3">
            <Flex gap="3" align="center">
              <Avatar src={item.img} radius="full" fallback="A" size="5" />
              <Box>
                <Text as="div" size="3" weight="bold">
                  {item.carPart} - {item.price}
                </Text>
                <Flex align="center" gapX="3">
                  <Button
                    size="1"
                    radius="full"
                    onClick={() => handleDecrease(index)}
                  >
                    -
                  </Button>
                  <Text as="span" size="5" color="gray">
                    {item.quantity}
                  </Text>
                  <Button
                    size="1"
                    radius="full"
                    onClick={() => handleIncrease(index)}
                  >
                    +
                  </Button>
                </Flex>
              </Box>
            </Flex>
          </Card>
        ))}
        <Button onClick={handleSubmit}>Submit</Button>
      </Box>
    </>
  );
};

export default InventoryUpdate;
