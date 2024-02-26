import React from "react";

const CheckoutSteps = ({ active }) => {
  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="w-full gap-2 flex items-center justify-center flex-row">
        <div className="w-[100px] text-center rounded-full p-2 text-sm bg-failure bg-opacity-90 text-white">
          Shipping
        </div>

        <div
          className={`w-[100px] text-center rounded-full p-2 text-sm bg-failure ${
            active > 1
              ? "bg-opacity-90 text-white"
              : "bg-opacity-10 text-failure"
          }`}
        >
          Payment
        </div>

        <div
          className={`w-[100px] text-center rounded-full p-2 text-sm bg-failure ${
            active > 2
              ? "bg-opacity-90 text-white"
              : "bg-opacity-10 text-failure"
          }`}
        >
          Success
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
