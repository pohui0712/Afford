import React from "react";
import ServiceCard from "../components/serviceCard";
import aircond from "../assests/aircond.png";
import battery from "../assests/battery.jpg";
import brake from "../assests/brake.jpg";
import diagnosis from "../assests/diagnosis.png";
import engine from "../assests/engine.jpg";
import suspension from "../assests/suspension.jpg";

const serviceInfo = [
  {
    image: battery,
    description: "Battery Replacement",
  },
  {
    image: aircond,
    description: "Aircond Services",
  },
  {
    image: brake,
    description: "Brake Replacement",
  },
  {
    image: suspension,
    description: "Suspension Repair",
  },
  {
    image: diagnosis,
    description: "Diagnosis",
  },
  {
    image: engine,
    description: "Engine Oil Change",
  },
];

const Service = () => {
  return (
    <div
      id="service"
      className="flex flex-row bg-gradient-to-b from-white to-blue-400"
    >
      <div className="p-14">
        <div className="text-3xl">Various Services, Easy Solutions</div>
        <div className="grid grid-cols-2 gap-10 ">
          {serviceInfo.map((card, index) => (
            <ServiceCard
              key={index}
              image={card.image}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
