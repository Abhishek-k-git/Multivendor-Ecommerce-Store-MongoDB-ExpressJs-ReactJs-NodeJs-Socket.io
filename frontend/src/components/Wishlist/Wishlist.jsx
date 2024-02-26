import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import { IconButton } from "@mui/material";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const addToCartHandler = (data) => {
    const newData = { ...data, qty: 1 };
    dispatch(addTocart(newData));
    setOpenWishlist(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-black bg-opacity-10 h-screen z-20">
      <div className="fixed top-0 right-0 w-[70%] min-w-[320px] max-w-[400px] h-screen z-10 overflow-auto p-4 bg-white flex flex-col justify-between shadow-sm">
        {wishlist && wishlist.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <IconButton
                className="cursor-pointer w-10 h-10"
                onClick={() => setOpenWishlist(false)}
              >
                <RxCross1 size={22} />
              </IconButton>
            </div>
            <h5>Wishlist is empty!</h5>
          </div>
        ) : (
          <>
            <div>
              {/* top items */}
              <div className="w-full flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <AiOutlineHeart size={18} />
                  <h5 className="text-lg font-semibold text-black text-opacity-70">
                    {wishlist && wishlist.length} items
                  </h5>
                </div>
                {/* menu-close */}
                <IconButton
                  className="cursor-pointer w-10 h-10"
                  onClick={() => setOpenWishlist(false)}
                >
                  <RxCross1 size={22} />
                </IconButton>
              </div>
              {/* cart Single Items */}
              <div className="w-full bg-opacity-10 my-2 p-2">
                {wishlist &&
                  wishlist.map((i, index) => (
                    <CartSingle
                      key={index}
                      data={i}
                      removeFromWishlistHandler={removeFromWishlistHandler}
                      addToCartHandler={addToCartHandler}
                    />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.discountPrice * value;

  return (
    <div className="w-full flex items-center justify-evenly relative border-b border-black border-opacity-10 py-2 my-2">
      <div className="w-2/5">
        <img
          src={`${data?.images[0]?.url}`}
          alt=""
          className="w-full object-contain aspect-square"
        />
      </div>
      <div className="w-3/5 px-2 text-sm">
        <h1 className="h-[60px] overflow-hidden leading-5 text-black text-opacity-90 my-2">
          {data.name}
        </h1>
        <div className="flex items-center justify-between px-4">
          <h4 className="text-failure">₹{totalPrice}</h4>
          <div>
            <BsCartPlus
              size={18}
              className="cursor-pointer text-black text-opacity-70"
              tile="Add to cart"
              onClick={() => addToCartHandler(data)}
            />
          </div>
        </div>
      </div>
      <div className="cursor-pointer absolute right-0 top-0">
        <IconButton onClick={() => removeFromWishlistHandler(data)}>
          <RxCross1 size={18} />
        </IconButton>
      </div>
    </div>
  );
};

export default Wishlist;
