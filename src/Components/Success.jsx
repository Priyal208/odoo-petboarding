import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="z-[-2] h-screen bg-custom-gradient w-full flex flex-col items-center font-VarelaRound justify-center">
      <div className="bg-[#b8ddfa] rounded-lg p-8 shadow-lg text-center">
        <div className="flex justify-center mb-4">
          <svg
            className="w-16 h-16 text-green-500"
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
              stroke="#4CAF50"
              strokeWidth="5"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-green-600 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-700 mb-4">
          Thank you for your purchase. Your payment has been processed
          successfully.
        </p>
        <p className="text-gray-700">
          You will receive a confirmation email shortly with the details of your
          order.
        </p>
        <Link to="/" className="text-gray-800 underline hover:text-gray-600">
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default Success;
