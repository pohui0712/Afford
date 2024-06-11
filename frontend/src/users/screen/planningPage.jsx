import React from "react";
import PlanningCard from "../components/planningCard";
import infoCard from "../data/planCard";

const Planning = () => {
  return (
    <section id="planning" className="bg-gray-100">
      <div
        id="planningContent"
        className="flex justify-center flex-col items-center"
      >
        <div className="font-bold text-4xl mb-4 mt-2">
          <div className="mt-12">Get car protection from time to time</div>
        </div>
        <div className="text-xl mb-10">Book the service packages now</div>
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
