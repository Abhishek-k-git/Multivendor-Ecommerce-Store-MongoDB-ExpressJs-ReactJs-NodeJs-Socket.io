import React from "react";
import Header from "../components/Layout/Header";
import CheckoutSteps from "../components/Checkout/CheckoutSteps";
import Checkout from "../components/Checkout/Checkout";
import Footer from "../components/Layout/Footer";

const CheckoutPage = () => {
  return (
    <>
      <Header />
      <CheckoutSteps active={1} />
      <Checkout />
      <Footer />
    </>
  );
};

export default CheckoutPage;
