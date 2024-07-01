import React from "react";
import PlanningCard from "../components/planningCard";
import infoCard from "../data/planCard";

const Planning = () => {
  return (
    <section id="planning">
      <div
        id="planningContent"
        className="flex justify-center flex-col items-center px-4"
      >
        <div className="font-bold text-4xl mb-4 mt-2 text-center max-sm:text-2xl">
          <div className="mt-12">Get car protection from time to time</div>
        </div>
        <div className="text-xl mb-10 text-center">
          Book the service packages now
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 m-4">
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
