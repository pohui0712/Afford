import { Box, Progress, Text, Flex } from "@radix-ui/themes";

const ProgressState = ({ progress }) => {
  let color;

  if (progress >= 0 && progress <= 20) {
    color = "red";
  } else if (progress >= 21 && progress <= 49) {
    color = "yellow";
  } else if (progress >= 50 && progress <= 70) {
    color = "sky";
  } else if (progress >= 71 && progress <= 90) {
    color = "lime";
  } else if (progress >= 91 && progress <= 99) {
    color = "green";
  }

  return (
    <Box maxWidth="200px">
      <Flex direction="row" align="center" gapX="2">
        <Progress value={progress} color={color} />
        <Text weight="medium" color={color}>
          {progress}%
        </Text>
      </Flex>
    </Box>
  );
};

export default ProgressState;
