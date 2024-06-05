import { React, useRef } from "react";
import ReviewCard from "../components/reviewCard";
import { motion, useScroll, useTransform } from "framer-motion";

const Review = () => {
  const reviews = [
    {
      comments:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo perferendis ratione voluptatum officia? Ipsam accusantium alias aspernatur provident hic iusto possimus est nulla veniam non enim repellat obcaecati quis ipsa eveniet quasi, magni dolorum. Culpa vel deserunt vitae sunt, quos totam accusantium in ipsa cum sit officiis perspiciatis adipisci reprehenderit!",
      name: "ali abu",
    },
    {
      comments:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo perferendis ratione voluptatum officia? Ipsam accusantium alias aspernatur provident hic iusto possimus est nulla veniam non enim repellat obcaecati quis ipsa eveniet quasi, magni dolorum. Culpa vel deserunt vitae sunt, quos totam accusantium in ipsa cum sit officiis perspiciatis adipisci reprehenderit!",
      name: "ali abu",
    },
    {
      comments:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo perferendis ratione voluptatum officia? Ipsam accusantium alias aspernatur provident hic iusto possimus est nulla veniam non enim repellat obcaecati quis ipsa eveniet quasi, magni dolorum. Culpa vel deserunt vitae sunt, quos totam accusantium in ipsa cum sit officiis perspiciatis adipisci reprehenderit!",
      name: "ali abu",
    },
    {
      comments:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo perferendis ratione voluptatum officia? Ipsam accusantium alias aspernatur provident hic iusto possimus est nulla veniam non enim repellat obcaecati quis ipsa eveniet quasi, magni dolorum. Culpa vel deserunt vitae sunt, quos totam accusantium in ipsa cum sit officiis perspiciatis adipisci reprehenderit!",
      name: "ali abu",
    },
    {
      comments:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo perferendis ratione voluptatum officia? Ipsam accusantium alias aspernatur provident hic iusto possimus est nulla veniam non enim repellat obcaecati quis ipsa eveniet quasi, magni dolorum. Culpa vel deserunt vitae sunt, quos totam accusantium in ipsa cum sit officiis perspiciatis adipisci reprehenderit!",
      name: "ali abu",
    },
    {
      comments:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo perferendis ratione voluptatum officia? Ipsam accusantium alias aspernatur provident hic iusto possimus est nulla veniam non enim repellat obcaecati quis ipsa eveniet quasi, magni dolorum. Culpa vel deserunt vitae sunt, quos totam accusantium in ipsa cum sit officiis perspiciatis adipisci reprehenderit!",
      name: "ali abu",
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
