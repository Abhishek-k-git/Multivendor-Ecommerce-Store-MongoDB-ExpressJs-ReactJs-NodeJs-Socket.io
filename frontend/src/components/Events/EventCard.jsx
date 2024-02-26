import React from "react";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };
  return (
    <div className="max-w-3xl flex flex-col md:flex-row bg-white bg-opacity-5 rounded-xl p-2">
      <div className="w-full md:w-2/5 flex items-center justify-center rounded-xl">
        <img
          className="w-full h-full object-contain"
          src={`${data.images[0]?.url}`}
          alt=""
        />
      </div>
      <div className="w-full md:w-3/5 flex flex-col items-start justify-between p-4">
        <h1 className="text-lg md:text-xl mb-4 font-bold text-white text-opacity-90">
          {data.name}
        </h1>
        <p className="text-sm text-white text-opacity-60">{data.description}</p>
        <div className="flex w-full py-2 justify-between">
          <div className="flex flex-row gap-2 items-center">
            <p className="text-xl text-white font-base">
              ₹
              {data.originalPrice === 0
                ? data.originalPrice
                : data.discountPrice}
            </p>
            <small className="font-xs text-failure line-through">
              {data.originalPrice ? "₹" + data.originalPrice : null}
            </small>
          </div>
          <span className="text-sm text-success">{data.sold_out} sold</span>
        </div>
        <CountDown data={data} />
        <div className="flex items-center gap-4 mt-6">
          <Link to={`/product/${data._id}?isEvent=true`}>
            <div className="bg-black bg-opacity-90 hover:bg-opacity-50 px-6 py-2 rounded-md text-sm font-base">
              See Details
            </div>
          </Link>
          <div
            className="bg-black bg-opacity-90 hover:bg-opacity-50 px-6 py-2 rounded-md text-sm font-base cursor-pointer"
            onClick={() => addToCartHandler(data)}
          >
            Add to Cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
