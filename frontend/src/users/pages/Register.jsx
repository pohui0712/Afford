import React, { useEffect } from "react";
import { Grid } from "@radix-ui/themes";
import { GitGlobe } from "../components/GitGlobe";

const Register = () => {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="min-h-screen dark:bg-black dark:text-white">
      <Grid columns="2" minHeight="100vh">
        <GitGlobe />
      </Grid>
    </div>
  );
};

export default Register;
