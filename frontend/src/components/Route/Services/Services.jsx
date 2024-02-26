import React from "react";
import { servicesData } from "../../../static/data.jsx";

const Services = () => {
  return (
    <div className="w-full bg-theme bg-opacity-5 p-4 py-8 flex flex-wrap items-stretch justify-around gap-4">
      {servicesData &&
        servicesData.map((data) => (
          <div
            key={data.id}
            className="flex md:flex-row flex-col justify-center w-[150px] h-[95px] lg:w-[200px] lg:h-[60px] bg-white gap-4 p-4 rounded-xl select-none"
          >
            <div className="w-[6] h-[6] flex items-center justify-start md:justify-center">
              {data.icon}
            </div>
            <div className="flex flex-col justify-center items-start">
              <p className="text-xs font-semibold text-black text-opacity-80">
                {data.title}
              </p>
              <small className="text-xs font-semibold text-black text-opacity-50">
                {data.Description}
              </small>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Services;
