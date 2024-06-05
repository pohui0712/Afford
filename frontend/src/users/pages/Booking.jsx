import React from "react";
import BookingForm from "../components/BookingForm";

const Booking = () => {
  return (
    <div className="flex items-center justify-center min-h-[140vh]">
      {/* blury dots: pink  */}
      <div className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[8rem] h-[40rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263]"></div>
      {/* blury dots: blue  */}
      <div className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[40rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]"></div>

      <BookingForm />
    </div>
  );
};

export default Booking;
