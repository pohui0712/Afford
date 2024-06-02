import React, { useEffect } from "react";
import { Grid } from "@radix-ui/themes";
import { GitGlobe } from "../components/GitGlobe";
import RegisterForm from "../components/RegisterForm";
import { motion } from "framer-motion";
import { AuroraBackground } from "../components/ui/aurora-background";

const Register = () => {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        // className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        {/* <div className="absolute"> */}
        <Grid columns="2" minHeight="100vh" className="relative">
          <RegisterForm />
          <GitGlobe />
        </Grid>
        {/* </div> */}
      </motion.div>
    </AuroraBackground>
  );
};

export default Register;
