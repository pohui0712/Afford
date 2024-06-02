import React from "react";
import {
  Button,
  Flex,
  Link,
  Separator,
  Text,
  TextField,
} from "@radix-ui/themes";
import { MdOutlineEmail } from "react-icons/md";
import { IoPeople } from "react-icons/io5";
import { IoKeyOutline } from "react-icons/io5";
import { MdOutlinePhone } from "react-icons/md";
import { Link as RouterLink } from "react-router-dom";
const RegisterForm = () => {
  return (
    <Flex
      direction="column"
      align="center"
      className="mx-auto my-auto w-[28rem] "
    >
      <Text size="6" weight="bold" mb="2" className="text-white">
        Welcome to Join Ford's Family!
      </Text>
      <Text color="gray" size="3">
        Please sign up below.
      </Text>
      <TextField.Root
        radius="full"
        size="3"
        placeholder="Name(IC)"
        my="3"
        className="w-full"
      >
        <TextField.Slot>
          <IoPeople height="16" width="auto" className="dark:text-white" />
        </TextField.Slot>
      </TextField.Root>
      <TextField.Root
        radius="full"
        size="3"
        placeholder="Email"
        my="2"
        className="w-full"
      >
        <TextField.Slot>
          <MdOutlineEmail
            height="16"
            width="auto"
            className="dark:text-white"
          />
        </TextField.Slot>
      </TextField.Root>
      <TextField.Root
        radius="full"
        size="3"
        placeholder="Password"
        my="2"
        className="w-full"
      >
        <TextField.Slot>
          <IoKeyOutline height="16" width="auto" className="dark:text-white" />
        </TextField.Slot>
      </TextField.Root>
      <TextField.Root
        radius="full"
        size="3"
        placeholder="Contact"
        my="2"
        className="w-full"
      >
        <TextField.Slot>
          <MdOutlinePhone
            height="16"
            width="auto"
            className="dark:text-white"
          />
        </TextField.Slot>
      </TextField.Root>

      <Button color="gray" variant="soft" size="3">
        Sign In
      </Button>

      <Separator orientation="borizontal" size="4" my="2" />
      <Text color="gray" size="3">
        Already have an account?{" "}
        <Link href="#" color="gray" underline="always">
          <RouterLink
            to="/login"
            onClick={() => document.documentElement.classList.remove("dark")}
            className="underline;"
          >
            Sign In here.
          </RouterLink>
        </Link>
      </Text>
    </Flex>
  );
};

export default RegisterForm;
