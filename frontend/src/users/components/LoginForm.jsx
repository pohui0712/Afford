import {
  Button,
  Flex,
  Link,
  Separator,
  Text,
  TextField,
} from "@radix-ui/themes";
import React from "react";
import { IoKeyOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { Link as RouterLink } from "react-router-dom";

const LoginForm = () => {
  return (
    <>
      <Flex direction="column" className="mx-auto my-auto w-[28rem] ">
        <Flex direction="column" align="center">
          <Text size="8" weight="bold" mb="2">
            Welcome to Afford
          </Text>
          <Text color="gray" size="3">
            Please sign in below.
          </Text>
        </Flex>

        <TextField.Root
          radius="full"
          size="3"
          placeholder="Email"
          my="3"
          className="w-full"
        >
          <TextField.Slot>
            <MdOutlineEmail color="black" height="16" width="auto" />
          </TextField.Slot>
        </TextField.Root>
        <TextField.Root
          radius="full"
          size="3"
          placeholder="Password"
          mb="3"
          className="w-full"
        >
          <TextField.Slot>
            <IoKeyOutline color="black" height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>

        <Button color="gray" variant="soft" size="3" radius="large">
          Sign In
        </Button>

        <Separator orientation="borizontal" size="4" my="3" />

        <Flex direction="column" align="center">
          <Text color="gray" size="3">
            Don't have an account?{" "}
            <Link href="#" color="gray" underline="always">
              <RouterLink to="/register">Sign Up here.</RouterLink>
            </Link>
          </Text>
        </Flex>
      </Flex>
    </>
  );
};

export default LoginForm;
