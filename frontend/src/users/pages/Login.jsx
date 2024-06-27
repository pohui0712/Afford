import React, { useEffect } from "react";
import GridLayout from "../components/GridLayout";
import LoginForm from "../components/LoginForm";
import CardGrid from "../components/CardGrid";
import WebgiViewer from "../components/webgi";

const Login = () => {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  return (
    <GridLayout>
      <p></p>
      <WebgiViewer />
      <LoginForm />
    </GridLayout>
  );
};

export default Login;
