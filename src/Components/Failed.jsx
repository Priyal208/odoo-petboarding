import React from "react";
import { Link } from "react-router-dom";

const Failure = () => {
  return (
    <div className="z-[-2] h-screen bg-custom-gradient w-full flex flex-col items-center font-VarelaRound justify-center">
      <div className="bg-[#b8ddfa] rounded-lg p-8 shadow-lg text-center">
        <div className="flex justify-center mb-4">
          <svg
            className="w-16 h-16 text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark-circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark-check"
              fill="none"
              stroke="#FF5252"
              strokeWidth="5"
              d="M16 16 36 36 M36 16 16 36"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-red-600 mb-2">Payment Failed</h1>
        <p className="text-gray-700 mb-4">
          We're sorry, but there was an issue processing your payment.
        </p>
        <p className="text-gray-700">
          Please check your payment details and try again.
        </p>
        <Link
          to="/"
          className="text-gray-800 underline hover:text-gray-600 mt-4"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default Failure;
