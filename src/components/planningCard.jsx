import React from "react";
import { TiTick } from "react-icons/ti";

const PlanningCard = ({
  title,
  description,
  price,
  priceDescription,
  items,
}) => {
  return (
    <div className="rounded shadow-lg bg-white p-4 flex flex-col items-center text-center h-full">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="font-light text-sm">{description}</p>
      <p className="text-4xl text-blue-700 font-bold m-10">{price}</p>
      <p className="m-4">{priceDescription}</p>
      {items.map((item, index) => (
        <p key={index} className="flex items-center m-1">
          <TiTick className="text-green-400 m-2" />
          {item}
        </p>
      ))}
    </div>
  );
};

export default PlanningCard;
