import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";

const BestDeals = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);
  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
    const firstFive = sortedData && sortedData.slice(0, 5);
    setData(firstFive);
  }, [allProducts]);

  return (
    <div className="w-full p-4 flex flex-col gap-4">
      <h1 className="text-base font-extrabold text-black text-opacity-70 uppercase">
        Best Deals
      </h1>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-4 md:gap-2 xl:gap-4">
        {data && data.length !== 0 && (
          <>
            {data &&
              data.map((i, index) => <ProductCard data={i} key={index} />)}
          </>
        )}
      </div>
    </div>
  );
};

export default BestDeals;
