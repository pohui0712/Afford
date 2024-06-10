import React, { useEffect } from "react";
import BookingForm from "../components/BookingForm";
import { IoHomeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const Booking = () => {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[140vh]">
      {/* blury dots: pink  */}
      <div className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[8rem] h-[40rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263]"></div>
      {/* blury dots: blue  */}
      <div className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[40rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]"></div>
      <Link to="/" className="absolute top-0 left-0 z-10 m-2">
        <IoHomeSharp className="text-xl dark:text-white" />
      </Link>

      <BookingForm />
    </div>
  );
};

export default Booking;
