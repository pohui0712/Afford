import React, { useEffect } from "react";
import GridLayout from "../components/GridLayout";
import LoginForm from "../components/LoginForm";
import CardGrid from "../components/CardGrid";

const Login = () => {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  return (
    <GridLayout>
      <CardGrid />
      <LoginForm />
    </GridLayout>
  );
};

export default Login;
