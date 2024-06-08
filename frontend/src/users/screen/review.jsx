import React, { useRef } from "react";
import ReviewCard from "../components/reviewCard";
import { motion, useScroll, useTransform } from "framer-motion";

const Review = () => {
  const reviews = [
    {
      comments:
        "Ford Maintenance exceeded my expectations. Their team was quick to diagnose and repair the issue with my car. The staff was friendly and professional, making the entire process seamless. I highly recommend their services!",
      name: "John Smith",
    },
    {
      comments:
        "I had a great experience at Ford Maintenance. The technicians were very knowledgeable and provided a thorough inspection. The service was quick, and my car runs perfectly now. I'll definitely return for future maintenance needs.",
      name: "Emily Johnson",
    },
    {
      comments:
        "The service at Ford Maintenance was outstanding. They fixed my car's problem efficiently and kept me informed throughout the process. The staff was courteous and the pricing was fair. Highly recommend them!",
      name: "Michael Brown",
    },
    {
      comments:
        "Ford Maintenance provided excellent service. They were very professional and handled everything with care. My car is running smoothly now thanks to their expertise. I will definitely be back to repair any in the future.",
      name: "Sarah Davis",
    },
    {
      comments:
        "I couldn't be happier with the service at Ford Maintenance. The staff was friendly and the service was quick and efficient enough. They explained everything clearly and my car runs like new now. Great job!",
      name: "David Wilson",
    },
    {
      comments:
        "The team at Ford Maintenance did a fantastic job. They were very efficient and thorough in their work. My car's performance has improved significantly since the service. I highly recommend them for any car maintenance needs.",
      name: "Jessica Martinez",
    },
  ];

  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-48%"]);

  return (
    <div className="relative h-[300vh]" ref={targetRef}>
      <div className="font-pt-sans-bold italic text-3xl p-10">
        WHAT OUR CLIENTS COMMENTS
      </div>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex space-x-6">
          {reviews.map((review, index) => (
            <ReviewCard
              key={index}
              comments={review.comments}
              name={review.name}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Review;
