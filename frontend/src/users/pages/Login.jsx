import React, { useEffect } from "react";
import GridLayout from "../components/GridLayout";
import LoginForm from "../components/LoginForm";

const Login = () => {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  return (
    <GridLayout>
      <p>Design??</p>
      <LoginForm />
    </GridLayout>
  );
};

export default Login;
