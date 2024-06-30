import {
  Box,
  Button,
  Callout,
  Card,
  Code,
  DataList,
  Flex,
  Heading,
} from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import serviceProgress from "../data/serviceProgress";
import { RiDonutChartFill } from "react-icons/ri";

const UpdateProgress = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [error, setError] = useState(null);
  const [progressState, setProgressState] = useState({});
  const [totalProgress, setTotalProgress] = useState(0);

  // Function to get a unique storage key based on user ID
  const getStorageKey = (userId) => `progressState_${userId}`;

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(`${process.env.REACT_APP_BACKEND_URI}/service/${id}`, {
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
      await axios.patch(`${process.env.REACT_APP_BACKEND_URI}/service/${id}`, {
        progress: totalProgress,
      });
      toast.success(`Progress update to ${totalProgress} !`);
    } catch (err) {
      setError(err.message);
      toast.error(`Progress update fail!`);
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
      <Toaster />
      {error && (
        <Callout.Root color="red" className="mt-3">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <Box>
        <Flex gap="3">
          <Card variant="classic" className="w-full">
            <Flex direction="column" gapY="2">
              {service.serviceName.map((s, index) => (
                <Box className="w-auto">
                  <Code key={index} size="3">
                    {s}
                  </Code>
                </Box>
              ))}
            </Flex>
          </Card>
          <Card variant="classic" className="w-full">
            <Flex
              direction="column"
              align="center"
              justify="center"
              height="100%"
            >
              <Heading size="4" mb={3}>
                Total Progress:{" "}
              </Heading>
              <div>
                <Heading size="8">{totalProgress}%</Heading>
              </div>
            </Flex>
          </Card>
        </Flex>

        <form onSubmit={handleSubmit}>
          <Card mt="3" variant="classic">
            <DataList.Root size="3">
              {service.serviceName.map((serviceName, index) => (
                <DataList.Item key={index} align="center">
                  <DataList.Label color="indigo">{serviceName}</DataList.Label>
                  <DataList.Value style={{ gap: "20px" }}>
                    {serviceProgress
                      .find((item) => item.serviceName === serviceName)
                      ?.checkBox.map((checkbox, idx) => (
                        <Flex key={idx} align="center">
                          <input
                            type="checkbox"
                            checked={
                              progressState[serviceName]?.[checkbox] || false
                            }
                            onChange={() =>
                              handleCheckboxChange(serviceName, checkbox)
                            }
                            className="mr-3 w-4 h-4"
                          />
                          {checkbox}
                        </Flex>
                      ))}
                  </DataList.Value>
                </DataList.Item>
              ))}
            </DataList.Root>
          </Card>
          <Flex mt="3" gapX="3">
            <Button type="submit" color="violet">
              <RiDonutChartFill />
              Update
            </Button>
            <Button type="button" onClick={() => navigate(-1)}>
              <FaArrowRotateLeft />
              Back to previous
            </Button>
          </Flex>
        </form>
      </Box>
    </>
  );
};

export default UpdateProgress;
