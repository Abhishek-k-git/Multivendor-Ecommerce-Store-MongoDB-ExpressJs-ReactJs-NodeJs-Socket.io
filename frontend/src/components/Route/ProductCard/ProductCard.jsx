import React, { useState } from "react";
import { AiFillHeart, AiOutlineEye, AiOutlineHeart } from "react-icons/ai";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { useEffect } from "react";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  return (
    <div className="w-full h-[320px] bg-theme hover:bg-opacity-10 hover:shadow-sm bg-opacity-5 rounded-lg shadow-sm p-3 relative cursor-pointer">
      <Link
        to={`${
          isEvent === true
            ? `/product/${data._id}?isEvent=true`
            : `/product/${data._id}`
        }`}
      >
        <img
          src={`${data.images && data.images[0]?.url}`}
          alt=""
          className="w-full h-[170px] object-contain bg-white rounded-xl"
        />
      </Link>
      <div className="flex flex-col">
        <Link to={`/shop/preview/${data?.shop._id}`}>
          <h2 className="text-xs font-semibold text-theme text-opacity-80 my-2">
            {data.shop.name}
          </h2>
        </Link>
        <Link
          to={`${
            isEvent === true
              ? `/product/${data._id}?isEvent=true`
              : `/product/${data._id}`
          }`}
        >
          <h1 className="text-sm font-semibold my-2">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h1>
          <div className="flex flex-row gap-2 items-center">
            <p className="text-xl text-black font-base">
              ₹
              {data.originalPrice === 0
                ? data.originalPrice
                : data.discountPrice}
            </p>
            <small className="font-xs text-failure line-through">
              {data.originalPrice ? "₹" + data.originalPrice : null}
            </small>
          </div>
        </Link>
      </div>

      {/* side options */}
      <div>
        {click ? (
          <div
            className="cursor-pointer absolute top-2 right-2 rounded-full bg-black bg-opacity-90"
            onClick={() => removeFromWishlistHandler(data)}
          >
            <IconButton>
              <AiFillHeart
                size={22}
                color={click ? "red" : "#fff"}
                title="Remove from wishlist"
              />
            </IconButton>
          </div>
        ) : (
          <div
            className="cursor-pointer absolute top-2 right-2 rounded-full bg-black bg-opacity-90"
            onClick={() => addToWishlistHandler(data)}
          >
            <IconButton>
              <AiOutlineHeart
                size={22}
                color={click ? "red" : "#fff"}
                title="Add to wishlist"
              />
            </IconButton>
          </div>
        )}
        <div
          className="cursor-pointer absolute top-14 right-2 rounded-full bg-black bg-opacity-90"
          onClick={() => setOpen(!open)}
        >
          <IconButton>
            <AiOutlineEye size={22} color="#fff" title="Quick view" />
          </IconButton>
        </div>
        {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
      </div>
    </div>
  );
};

export default ProductCard;
