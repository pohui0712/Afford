import React from "react";
import FordWeb from "../assests/FordWeb.png";
import { PinContainer } from "../components/ui/3d-pin";

const CardGrid = () => {
  return (
    <div className="w-full flex items-center justify-center ">
      <PinContainer title="/Ford Twitter" to="https://x.com/Ford">
        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
          <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-black">
            Ford Twitter Offical Webiste
          </h3>
          <div className="text-base !m-0 !p-0 font-normal">
            <span className="text-gray-700 ">
              Visite our website to know more information!
            </span>
          </div>
          <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br" />
          <img src={FordWeb} />
        </div>
      </PinContainer>
    </div>
  );
};

export default CardGrid;

// from-violet-500 via-purple-500 to-blue-500
