import {
  Button,
  Flex,
  Link,
  Separator,
  Text,
  TextField,
} from "@radix-ui/themes";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoKeyOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "./authProvider";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5500/auth", {
        email,
        password,
      });
      login(response.data);
      console.log("Succesffuly login");
      navigate("/");
    } catch (error) {
      setError(error.response.data);
      toast.error("Invalid Email or Password!");
    }
  };

  return (
    <form className="mx-auto my-auto w-[28rem]" onSubmit={handleSubmit}>
      <Toaster />;
      <Flex direction="column">
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
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
    </form>
  );
};

export default LoginForm;
