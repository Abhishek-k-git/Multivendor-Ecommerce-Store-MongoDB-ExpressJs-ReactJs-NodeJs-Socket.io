import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";

const FeaturedProduct = () => {
  const { allProducts } = useSelector((state) => state.products);

  return (
    <div className="w-full p-4 flex flex-col gap-4">
      <h1 className="text-base font-extrabold text-black text-opacity-70 uppercase">
        Featured Products
      </h1>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-4 md:gap-2 xl:gap-4">
        {allProducts && allProducts.length !== 0 && (
          <>
            {allProducts &&
              allProducts.map((i, index) => (
                <ProductCard data={i} key={index} />
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default FeaturedProduct;
