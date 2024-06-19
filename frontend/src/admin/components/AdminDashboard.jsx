import { Box, Callout, Flex, Grid } from "@radix-ui/themes";
import axios, { CanceledError } from "axios";
import React, { useEffect, useState } from "react";
import CarModelChart from "./CarModelChart";
import StatusChart from "./StatusChart";
import LatestBooking from "./LatestBooking";

const Dashboard = () => {
  const [pendingCount, setPendingCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [rangeRoverCount, setRangeRoverCount] = useState(0);
  const [mustangCount, setMustangCount] = useState(0);
  const [mustangECount, setMustangECount] = useState(0);
  const [explorerCount, setExplorerCount] = useState(0);
  const [territoryCount, setTerritoryCount] = useState(0);
  const [error, setError] = useState();

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(`http://localhost:5500/booking`, {
        signal: controller.signal,
      })
      .then((response) => {
        setPendingCount(response.data.statusCounts.pending);
        setInProgressCount(response.data.statusCounts.inProgress);
        setApprovedCount(response.data.statusCounts.approved);
        setRejectedCount(response.data.statusCounts.rejected);
        setCompletedCount(response.data.statusCounts.completed);
        setRangeRoverCount(response.data.carModelCounts.Range_Rover);
        setMustangCount(response.data.carModelCounts.Mustang);
        setMustangECount(response.data.carModelCounts.Mustang_Mach_E);
        setExplorerCount(response.data.carModelCounts.Explorer);
        setTerritoryCount(response.data.carModelCounts.Territory);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => controller.abort();
  }, []);
  return (
    <>
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <Grid columns={{ initial: "1", md: "2" }} gap="5" height="100vh">
        <Flex direction="column" gap="5">
          <CarModelChart
            rangeRover={rangeRoverCount}
            mustang={mustangCount}
            mustangE={mustangECount}
            explorer={explorerCount}
            territory={territoryCount}
          />

          <StatusChart
            penidng={pendingCount}
            inProgress={inProgressCount}
            approved={approvedCount}
            rejected={rejectedCount}
            completed={completedCount}
          />
        </Flex>
        <LatestBooking />
      </Grid>
    </>
  );
};

export default Dashboard;
