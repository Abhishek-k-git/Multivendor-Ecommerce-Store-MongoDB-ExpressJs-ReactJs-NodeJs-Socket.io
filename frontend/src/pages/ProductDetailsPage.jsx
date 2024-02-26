import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import ProductDetails from "../components/Products/ProductDetails";
import { useSelector } from "react-redux";
import SuggestedProduct from "../components/Products/SuggestedProduct";

const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const { allEvents } = useSelector((state) => state.events);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");

  useEffect(() => {
    if (eventData !== null) {
      const data = allEvents && allEvents.find((i) => i._id === id);
      setData(data);
    } else {
      const data = allProducts && allProducts.find((i) => i._id === id);
      setData(data);
    }
  }, [allProducts, allEvents]);

  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {!eventData && <>{data && <SuggestedProduct data={data} />}</>}
      {!data && (
        <>
          <div className="w-full p-4 min-h-[70vh]">
            <h1 className="text-3xl text-black text-opacity-70 font-black flex items-center justify-center">
              OOPS! Product Doesn't Exists
            </h1>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
