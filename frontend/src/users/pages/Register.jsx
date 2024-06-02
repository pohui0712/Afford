import React, { useEffect } from "react";
import { Grid } from "@radix-ui/themes";
import { GitGlobe } from "../components/GitGlobe";
import RegisterForm from "../components/RegisterForm";
import { motion } from "framer-motion";
import { AuroraBackground } from "../components/ui/aurora-background";
import GridLayout from "../components/GridLayout";

const Register = () => {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <GridLayout>
      <RegisterForm />
      <GitGlobe />
    </GridLayout>
  );
};

export default Register;
