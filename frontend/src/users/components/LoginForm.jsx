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

const LoginForm = () => {
  return (
    <>
      <Flex
        direction="column"
        align="center"
        className="mx-auto my-auto w-[28rem] "
      >
        <Text size="8" weight="bold" mb="2">
          Welcome to Afford
        </Text>
        <Text color="gray" size="3">
          Please sign in below.
        </Text>
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

        <Button color="gray" variant="soft" size="3">
          Sign In
        </Button>

        <Separator orientation="borizontal" size="4" my="3" />
        <Text color="gray" size="3">
          Don't have an account?{" "}
          <Link href="#" color="gray" underline="always">
            Sign in here.
          </Link>
        </Text>
      </Flex>
    </>
  );
};

export default LoginForm;
