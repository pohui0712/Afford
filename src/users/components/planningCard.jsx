import React from "react";
import { TiTick } from "react-icons/ti";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const PlanningCard = ({
  title,
  description,
  price,
  priceDescription,
  items,
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["18.5deg", "-18.5deg"]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-18.5deg", "18.5deg"]
  );

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="rounded shadow-lg bg-indigo-200 p-5 h-full"
      style={{ rotateX, rotateY, transform: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="rounded-lg bg-white flex flex-col items-center text-center h-full">
        <h2 className="text-2xl font-bold mb-2 mt-4">{title}</h2>
        <p className="font-light text-sm max-w-sm">{description}</p>
        <p className="text-4xl text-blue-700 font-bold m-6">{price}</p>
        <p className="m-3">{priceDescription}</p>
        {items.map((item, index) => (
          <p key={index} className="flex items-center m-1 font-pt-sans italic">
            <TiTick className="text-green-400 m-2" />
            {item}
          </p>
        ))}
      </div>
    </motion.div>
  );
};

export default PlanningCard;
