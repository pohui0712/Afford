import { Box, Callout, Card, Code, Flex, Heading } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import serviceProgress from "../data/serviceProgress";
import { Header } from "@radix-ui/themes/dist/esm/components/table.js";

const UpdateProgress = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [error, setError] = useState(null);
  const [progressState, setProgressState] = useState({});
  const [totalProgress, setTotalProgress] = useState(0);

  // Function to get a unique storage key based on user ID
  const getStorageKey = (userId) => `progressState_${userId}`;

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(`http://localhost:5500/service/${id}`, {
        signal: controller.signal,
      })
      .then((response) => {
        setService(response.data.service);
        initializeProgress(response.data.service.serviceName, id);
      })
      .catch((err) => {
        if (err instanceof axios.CanceledError) return;
        setError(err.message);
      });

    // Cleanup function for aborting axios request
    return () => controller.abort();
  }, [id]);

  useEffect(() => {
    // Initialize progressState from sessionStorage if available
    const storedProgress = JSON.parse(
      sessionStorage.getItem(getStorageKey(id))
    );
    if (storedProgress) {
      setProgressState(storedProgress);
      updateTotalProgress(storedProgress);
    } else {
      // If no stored progressState, initialize empty state
      initializeProgress(service?.serviceName || [], id);
    }
  }, [service, id]);

  const initializeProgress = (serviceNames, userId) => {
    const initialProgress = {};
    serviceNames.forEach((serviceName) => {
      const service = serviceProgress.find(
        (item) => item.serviceName === serviceName
      );
      if (service) {
        initialProgress[serviceName] = service.checkBox.reduce(
          (acc, checkbox) => {
            // Check if checkbox is true in stored progressState
            acc[checkbox] = progressState[serviceName]?.[checkbox] || false;
            return acc;
          },
          {}
        );
      }
    });
    setProgressState(initialProgress);
  };

  const handleCheckboxChange = (serviceName, checkbox) => {
    setProgressState((prevState) => {
      const updatedState = {
        ...prevState,
        [serviceName]: {
          ...prevState[serviceName],
          [checkbox]: !prevState[serviceName][checkbox],
        },
      };
      updateTotalProgress(updatedState);
      sessionStorage.setItem(getStorageKey(id), JSON.stringify(updatedState)); // Save updated state to sessionStorage
      return updatedState;
    });
  };

  const updateTotalProgress = (updatedState) => {
    const totalCheckboxes = Object.values(updatedState).reduce(
      (acc, service) => acc + Object.keys(service).length,
      0
    );
    const checkedCheckboxes = Object.values(updatedState).reduce(
      (acc, service) =>
        acc + Object.values(service).filter((checked) => checked).length,
      0
    );
    const newTotalProgress = Math.round(
      (checkedCheckboxes / totalCheckboxes) * 100
    );
    setTotalProgress(newTotalProgress);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(`http://localhost:5500/service/${id}`, {
        progress: totalProgress,
      });
      alert("Progress updated successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  if (!service) {
    return (
      <Callout.Root color="red" className="mb-5">
        <Callout.Text>Service not found</Callout.Text>
      </Callout.Root>
    );
  }

  return (
    <>
      {error && (
        <Callout.Root color="red" className="mt-3">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <Box>
        <Flex gap="3">
          <Card variant="classic">
            <Flex direction="column" gapY="2">
              {service.serviceName.map((s, index) => (
                <Code key={index} size="3">
                  {s}
                </Code>
              ))}
            </Flex>
          </Card>

          <Card variant="classic">
            <Flex direction="column" align="center" gapX="3">
              <Heading size="4">Total Progress: </Heading>
              <Heading mt="4" size="8">
                {totalProgress}%
              </Heading>
            </Flex>
          </Card>
        </Flex>
        <form onSubmit={handleSubmit}>
          <Card>
            {service.serviceName.map((serviceName, index) => (
              <div key={index}>
                <h2>{serviceName}</h2>
                {serviceProgress
                  .find((item) => item.serviceName === serviceName)
                  ?.checkBox.map((checkbox, idx) => (
                    <label key={idx}>
                      <input
                        type="checkbox"
                        checked={
                          progressState[serviceName]?.[checkbox] || false
                        }
                        onChange={() =>
                          handleCheckboxChange(serviceName, checkbox)
                        }
                      />
                      {checkbox}
                    </label>
                  ))}
              </div>
            ))}
          </Card>
          <button type="submit">Update Progress</button>
        </form>
      </Box>
    </>
  );
};

export default UpdateProgress;
