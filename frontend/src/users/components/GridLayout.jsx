import React from "react";
import { motion } from "framer-motion";
import { AuroraBackground } from "../components/ui/aurora-background";
import { Grid } from "@radix-ui/themes";
import { IoHomeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const GridLayout = ({ children }) => {
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
        <Grid columns="2" minHeight="100vh" className="relative">
          <Link to="/" className="absolute">
            <IoHomeSharp
              className="text-xl m-2 dark:text-white"
              onClick={() => document.documentElement.classList.remove("dark")}
            />
          </Link>
          {children}
        </Grid>
      </motion.div>
    </AuroraBackground>
  );
};

export default GridLayout;
