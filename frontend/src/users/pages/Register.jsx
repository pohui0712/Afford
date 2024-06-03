import React, { useEffect } from "react";
import { GitGlobe } from "../components/GitGlobe";
import GridLayout from "../components/GridLayout";
import RegisterForm from "../components/RegisterForm";

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
