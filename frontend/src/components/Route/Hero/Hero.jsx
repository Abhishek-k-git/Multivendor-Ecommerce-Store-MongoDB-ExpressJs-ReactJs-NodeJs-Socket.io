import React, { useState, useEffect, useRef } from "react";
import { categoriesData } from "../../../static/data.jsx";
import { useNavigate } from "react-router-dom/dist";
import IconButton from "@mui/material/IconButton";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Hero = () => {
  const navigate = useNavigate();

  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      console.log(
        carousel.current.offsetWidth * currentIndex,
        maxScrollWidth.current
      );
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction) => {
    if (direction === "prev") {
      return currentIndex <= 0;
    }
    if (direction === "next" && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      );
    }
    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  return (
    <div className="w-full p-2 flex flex-col lg:flex-row rounded-lg overflow-hidden">
      {/* left */}
      <div className="flex md:h-[80vh] h-[60vh] lg:w-1/2 w-full items-center justify-center bg-theme bg-opacity-10 hero-image rounded-lg p-4">
        <h1 className="text-center md:text-4xl text-xl font-black text-white">
          Shop for Wide Range of Products
        </h1>
      </div>
      {/* right */}
      <div className="flex flex-col md:h-[80vh] h-[50vh] lg:w-1/2 w-full bg-theme bg-opacity-5 rounded-lg justify-between items-center p-4 py-8 bg-texture">
        <div className="w-full flex flex-col gap-y-2">
          <h1 className="md:text-4xl text-xl max-w-[500px] font-black text-black text-opacity-50 uppercase leading-7 md:leading-[3.3rem]">
            Access to high quality, eco-friendly products and services
          </h1>
        </div>
        <div className="w-full flex flex-col">
          <h2 className="text-sm font-bold text-black text-opacity-70 uppercase">
            Shop By Category
          </h2>
          <div className="relative w-full h-[150px] overflow-hidden pt-2">
            {/* arrow-left */}
            <div
              className="absolute left-0 bottom-1/2 translate-y-1/2 text-black bg-white shadow-xl rounded-full z-10 cursor-default disabled:cursor-not-allowed transition-all ease-in-out duration-300"
              onClick={movePrev}
              disabled={isDisabled("prev")}
            >
              <IconButton>
                <MdKeyboardArrowLeft size={22} />
              </IconButton>
            </div>
            {/* shop by category */}
            <div
              className="overflow-x-auto flex flex-row h-[180px]"
              ref={carousel}
            >
              {categoriesData &&
                categoriesData.map((i) => {
                  const handleSubmit = (i) => {
                    navigate(`/products?category=${i.title}`);
                  };
                  return (
                    <div
                      className="min-w-[140px] w-[140px] h-[140px] rounded-md flex flex-col items-center justify-center bg-white p-2 cursor-pointer"
                      key={i.id}
                      onClick={() => handleSubmit(i)}
                    >
                      <div className="w-[80px] h-[60px]">
                        <img
                          className="w-full h-full object-contain"
                          src={i.image_Url}
                          alt=""
                        />
                      </div>
                      <h5 className="text-xs font-semibold text-center my-2 text-black text-opacity-80">
                        {i.title}
                      </h5>
                    </div>
                  );
                })}
            </div>
            {/* arrow-right */}
            <div
              className="absolute right-0 bottom-1/2 translate-y-1/2 text-black bg-white shadow-xl rounded-full z-10 cursor-default disabled:cursor-not-allowed transition-all ease-in-out duration-300"
              onClick={moveNext}
              disabled={isDisabled("next")}
            >
              <IconButton>
                <MdKeyboardArrowRight size={22} />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
