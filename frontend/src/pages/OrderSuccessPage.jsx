import React from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Lottie from "react-lottie";
import success from "../assets/animations/success.json";
import hero from "../assets/animations/hero.json";

const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
      <Success />
      <Footer />
    </div>
  );
};

const Success = () => {
  const successOpt = {
    loop: false,
    autoplay: true,
    animationData: success,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const heroOpt = {
    loop: true,
    autoplay: true,
    animationData: hero,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center">
      <div className="w-full h-[300px]">
        <Lottie
          className="z-0"
          options={heroOpt}
          width={"100%"}
          height={"100%"}
        />
      </div>
      <div className="relative bg-white p-4 w-[240px] -translate-y-[150px] flex flex-col items-center justify-center">
        <h1 className="text-3xl text-success">Thankyou for shopping</h1>
        <Lottie options={successOpt} width={180} height={180} />
        <span className="w-full text-base text-black text-center text-opacity-90">
          Your order is successful
        </span>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
