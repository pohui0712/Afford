import React from "react";
import car from "../assests/ford4.webp";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../components/authProvider";

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const destination = isAuthenticated ? "/booking" : "/login";

  return (
    <section className="flex items-center h-screen relative bg-black">
      <img
        src={car}
        alt=""
        className="w-full h-full absolute object-cover z-0 opacity-[.35]"
      />
      <div className="flex flex-col justify-center items-end relative z-10 w-full pr-20 text-right">
        <div className="mb-12 text-6xl font-pt-sans-bold italic text-red-600 max-w-3xl max-sm:text-2xl">
          AUTO MAINTENANCE, SERVICE & REPAIR
        </div>
        <p className="text-white font-pt-sans max-w-sm max-sm:m-5, ml-5">
          Welcome to Afford, where we offer a comprehensive range of auto
          maintenance, service, and repair solutions tailored to meet all your
          vehicle's needs. With years of expertise and a commitment to
          excellence, we take pride in keeping your car running smoothly and
          reliably on the road.
        </p>
        <Link to={destination}>
          <motion.div
            className="bg-blue-400 hover:bg-blue-600 px-4 py-2 text-white font-pt-sans-bold italic text-md mt-10 shadow-lg"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            Schedule An Appointment
          </motion.div>
        </Link>
      </div>
    </section>
  );
};

export default HomePage;
