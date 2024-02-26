import React from "react";
import CheckoutSteps from "../components/Checkout/CheckoutSteps";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Payment from "../components/Payment/Payment";

const PaymentPage = () => {
  return (
    <>
      <Header />
      <CheckoutSteps active={2} />
      <Payment />
      <Footer />
    </>
  );
};

export default PaymentPage;
