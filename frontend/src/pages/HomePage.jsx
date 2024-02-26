import React from "react";
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero/Hero.jsx";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Events from "../components/Events/Events";
import Footer from "../components/Layout/Footer";
import Services from "../components/Route/Services/Services.jsx";

const HomePage = () => {
  return (
    <>
      <Header activeHeading={1} />
      <Hero />
      <Services />
      <BestDeals />
      <Events />
      <FeaturedProduct />
      <Footer />
    </>
  );
};

export default HomePage;
