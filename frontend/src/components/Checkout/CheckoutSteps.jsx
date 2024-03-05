import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const CheckoutSteps = ({ active }) => {
  return (
    <div className="w-full flex items-center justify-center p-4 mb-0 md:mb-4">
      <div className="w-full gap-2 flex items-center justify-start flex-row">
        <div className="text-center text-sm select-none text-failure">
          Shipping
          <MdKeyboardArrowRight className="text-center inline-block ml-2" />
        </div>

        <div
          className={`text-center text-sm select-none ${
            active > 1 ? "text-failure" : "text-black text-opacity-70"
          }`}
        >
          Payment
          <MdKeyboardArrowRight className="text-center inline-block ml-2" />
        </div>

        <div
          className={`text-center text-sm select-none ${
            active > 2 ? "text-failure" : "text-black text-opacity-70"
          }`}
        >
          Success
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
