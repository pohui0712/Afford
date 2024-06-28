import React from "react";
import { IoCloseOutline } from "react-icons/io5";

const PopupCard = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-4 rounded shadow-lg relative w-1/2 h-3/4">
        <button
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
          onClick={onClose}
        >
          <IoCloseOutline className="w-[15px]" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default PopupCard;
