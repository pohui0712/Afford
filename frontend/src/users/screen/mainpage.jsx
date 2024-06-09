import React from "react";
import car from "../assests/ford4.webp";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <section className="flex items-center h-screen relative bg-black">
      <img
        src={car}
        alt=""
        className="w-full h-full absolute object-cover z-0 opacity-[.35]"
      />
      <div className="flex flex-col justify-center items-end relative z-10 w-full pr-20 text-right">
        <div className="mb-12 text-6xl font-pt-sans-bold italic text-red-600 max-w-3xl">
          AUTO MAINTENANCE, SERVICE & REPAIR
        </div>
        <p className="text-white font-pt-sans max-w-sm">
          Welcome to Afford, where we offer a comprehensive range of auto
          maintenance, service, and repair solutions tailored to meet all your
          vehicle's needs. With years of expertise and a commitment to
          excellence, we take pride in keeping your car running smoothly and
          reliably on the road.
        </p>
        <Link
          className="bg-blue-400 hover:bg-red-300 px-4 py-2 text-white font-pt-sans-bold italic text-md mt-10 shadow-lg"
          to="/booking"
        >
          Schedule An Appointment
        </Link>
      </div>
    </section>
  );
};

export default HomePage;
