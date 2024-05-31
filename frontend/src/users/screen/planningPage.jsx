import React from "react";
import PlanningCard from "../components/planningCard";

const infoCard = [
  {
    title: "Essential",
    description:
      "All the essentials your car needs to keep it running in good condition.",
    price: "RM99",
    priceDescription: "Recommended for every 5,000km or 10,000km",
    items: [
      "Semi-synthetic engine oil",
      "Windshield washer replacement",
      "Oil filter replacement",
      "Oil pan washer replacement",
    ],
  },
  {
    title: "Standard",
    description:
      "Recommended for peace of mind. Includes all essential services plus air filter and brake fluid replacements.",
    price: "RM129",
    priceDescription: "Recommended for every 20,000km",
    items: [
      "Semi-synthetic engine oil",
      "Windshield washer replacement",
      "Oil filter replacement",
      "Oil pan washer replacement",
      "Air filter replacement",
      "Brake fluid replacement",
    ],
  },
  {
    title: "Comprehensive",
    description:
      "Our most comprehensive service that takes care of it all to maintain peak performance.",
    price: "RM199",
    priceDescription: "Recommended for every 40,000km",
    items: [
      "Semi-synthetic engine oil",
      "Windshield washer replacement",
      "Oil filter replacement",
      "Oil pan washer replacement",
      "Coolant replacement",
      "Auto/manual transmission oil replacement",
    ],
  },
];

const Planning = () => {
  return (
    <section id="planning" className="bg-gradient-to-b from-blue-400 to-white">
      <div
        id="planningContent"
        className="flex justify-center flex-col items-center opacity-0"
      >
        <div className="font-bold text-4xl mb-4">
          <div className="mt-12">Get car protection from time to time</div>
        </div>
        <div className="text-xl mb-12">Book the service packages now</div>
        <div className="grid grid-cols-3 gap-4 grid-rows-auto m-10">
          {infoCard.map((card, index) => (
            <PlanningCard
              key={index}
              title={card.title}
              description={card.description}
              price={card.price}
              priceDescription={card.priceDescription}
              items={card.items}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Planning;
