import React from "react";
import star from "../assests/star.png";

const ReviewCard = ({ comments, name, image }) => {
  return (
    <div className="bg-gray-100 p-6 shadow-lg max-w-md mx-auto overflow-hidden flex-nowrap min-w-[450px]">
      <div className="flex items-center mb-4">
        <img src={star} className="text-yellow-500 w-1/2 h-full" />
        <div className="ml-5 font-bold">5 of 5</div>
      </div>
      <div className="mb-6 text-black">{comments}</div>
      <div className="flex items-center space-x-4">
        <img
          src={image}
          alt="User avatar"
          className="w-[65px] h-[50px] rounded-xl"
        />
        <div className="text-gray-900 font-semibold">{name}</div>
      </div>
    </div>
  );
};

export default ReviewCard;
