import React from "react";
import Lottie from "react-lottie";
import animationData from "../../assets/animations/animation.json";

const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Lottie options={defaultOptions} width={60} height={60} />
    </div>
  );
};

export default Loader;
