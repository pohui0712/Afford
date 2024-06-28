import React, { useEffect } from "react";
import GridLayout from "../components/GridLayout";
import LoginForm from "../components/LoginForm";
import CardGrid from "../components/CardGrid";
import WebgiViewer from "../components/webgi";
import { motion } from "framer-motion";
import { AuroraBackground } from "../components/ui/aurora-background";
import { Grid } from "@radix-ui/themes";
import { IoHomeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const Login = () => {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  return (
    // <GridLayout>
    //   <p></p>
    //   <WebgiViewer />
    //   <LoginForm />
    // </GridLayout>
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center h-full"
      >
        <Link to="/" className="absolute top-0 left-0">
          <IoHomeSharp className="text-xl m-2 dark:text-white" />
        </Link>
        <div className=" h-full w-full flex items-center justify-center">
          <LoginForm />
        </div>
      </motion.div>
    </AuroraBackground>
  );
};

export default Login;
