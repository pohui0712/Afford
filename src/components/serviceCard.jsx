import React from "react";

const ServiceCard = ({ image, description }) => {
  return (
    <div className="rounded-lg shadow-lg bg-white flex flex-col text-center items-center h-36 mt-10">
      <img className="w-30 h-20 mt-3" src={image} alt="image" />
      <div className="mt-2 font-bold">{description}</div>
    </div>
  );
};

export default ServiceCard;
