import {
  Button,
  Callout,
  Flex,
  Link,
  Separator,
  Spinner,
  Text,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { IoKeyOutline, IoPeople } from "react-icons/io5";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import { Link as RouterLink } from "react-router-dom";

const RegisterForm = () => {
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      // create
      await axios.post("http://localhost:5000/users", data);

      // navigate(0);
      toast.success("Register successfully");
      setError("");
    } catch (error) {
      setSubmitting(false);
      toast.error("Register unsuccessfully!");
      setError("An unexpected error occured.");
    }
    setSubmitting(false);
  });

  return (
    <form onSubmit={onSubmit} className="mx-auto my-auto w-[28rem] ">
      <Toaster />;
      <Flex direction="column">
        <Flex direction="column" align="center">
          <Text size="6" weight="bold" mb="2" className="text-white">
            Welcome to Join Ford's Family!
          </Text>
          <Text color="gray" size="3">
            Please sign up below.
          </Text>
        </Flex>
        {error && (
          <Callout.Root color="red" className="mb-5">
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
        <TextField.Root
          radius="full"
          size="3"
          placeholder="Name(IC)"
          type="text"
          required
          my="3"
          className="w-full"
          {...register("name")}
        >
          <TextField.Slot>
            <IoPeople height="16" width="auto" className="dark:text-white" />
          </TextField.Slot>
        </TextField.Root>
        <TextField.Root
          radius="full"
          size="3"
          placeholder="Email"
          type="email"
          required
          my="2"
          className="w-full"
          {...register("email")}
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
          type="password"
          required
          my="2"
          className="w-full"
          {...register("password")}
        >
          <TextField.Slot>
            <IoKeyOutline
              height="16"
              width="auto"
              className="dark:text-white"
            />
          </TextField.Slot>
        </TextField.Root>
        <TextField.Root
          radius="full"
          size="3"
          placeholder="Contact"
          type="number"
          required
          my="2"
          className="w-full"
          {...register("contact")}
        >
          <TextField.Slot>
            <MdOutlinePhone
              height="16"
              width="auto"
              className="dark:text-white"
            />
          </TextField.Slot>
        </TextField.Root>

        <Button
          color="gray"
          variant="soft"
          size="3"
          radius="large"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Spinner /> : "Sign Up"}
        </Button>

        <Separator orientation="borizontal" size="4" my="2" />

        <Flex direction="column" align="center">
          <Text color="gray" size="3">
            Already have an account?{" "}
            <Link href="#" color="gray" underline="always">
              <RouterLink to="/login">Sign In here.</RouterLink>
            </Link>
          </Text>
        </Flex>
      </Flex>
    </form>
  );
};

export default RegisterForm;
