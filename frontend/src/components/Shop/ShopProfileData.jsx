import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import ProductCard from "../Route/ProductCard/ProductCard";
import Ratings from "../Products/Ratings";
import { getAllEventsShop } from "../../redux/actions/event";
import { format } from "timeago.js";

const ShopProfileData = ({ isOwner }) => {
  const { products } = useSelector((state) => state.products);
  const { events } = useSelector((state) => state.events);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    dispatch(getAllEventsShop(id));
  }, [dispatch]);

  const [active, setActive] = useState(1);

  const allReviews =
    products && products.map((product) => product.reviews).flat();

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between border-b border-black border-opacity-15 pb-4">
        <div
          className={`text-sm text-opacity-60 font-semibold cursor-pointer ${
            active === 1 ? "text-failure underline" : "text-black"
          }`}
          onClick={() => setActive(1)}
        >
          Products
        </div>
        <div
          className={`text-sm text-opacity-60 font-semibold cursor-pointer ${
            active === 2 ? "text-failure underline" : "text-black"
          }`}
          onClick={() => setActive(2)}
        >
          Events
        </div>
        <div
          className={`text-sm text-opacity-60 font-semibold cursor-pointer ${
            active === 3 ? "text-failure underline" : "text-black"
          }`}
          onClick={() => setActive(3)}
        >
          Reviews
        </div>
      </div>

      {active === 1 && (
        <div className="w-full py-2 mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {products &&
            products.map((i, index) => (
              <ProductCard data={i} key={index} isShop={true} />
            ))}
          {products && products.length === 0 && (
            <p className="text-sm text-black text-opacity-70 text-center">
              No product found
            </p>
          )}
        </div>
      )}

      {active === 2 && (
        <div className="w-full py-2 mt-4 grid gap-4">
          {events &&
            events.map((i, index) => (
              <ProductCard data={i} key={index} isShop={true} isEvent={true} />
            ))}
          {events && events.length === 0 && (
            <p className="text-sm text-black text-opacity-70 text-center">
              No event found
            </p>
          )}
        </div>
      )}

      {active === 3 && (
        <div className="w-full py-2 mt-4 grid gap-4">
          {allReviews &&
            allReviews.map((item, index) => (
              <div
                key={index}
                className="w-full flex border border-black border-opacity-10 shadow-sm rounded-xl p-2"
              >
                <img
                  src={`${item.user.avatar?.url}`}
                  className="w-[40px] h-[40px] rounded-full"
                  alt=""
                />
                <div className="pl-2 grow">
                  <div className="flex w-full items-center gap-2">
                    <h1 className="text-sm text-black text-opacity-90 font-semibold">
                      {item.user.name}
                    </h1>
                    <Ratings rating={item.rating} />
                  </div>
                  <p className="text-sm text-black text-opacity-70 w-full">
                    {item?.comment}
                  </p>
                  <p className="text-xs w-full text-right text-black text-opacity-50">
                    {format(item?.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          {allReviews && allReviews.length === 0 && (
            <p className="text-sm text-black text-opacity-70 text-center">
              No review
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ShopProfileData;
