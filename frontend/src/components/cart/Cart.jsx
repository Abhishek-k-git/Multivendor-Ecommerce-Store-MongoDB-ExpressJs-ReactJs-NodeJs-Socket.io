import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import { IconButton } from "@mui/material";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsHandbag } from "react-icons/bs";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addTocart(data));
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-black bg-opacity-10 h-screen z-20">
      <div className="fixed top-0 right-0 w-[70%] min-w-[320px] max-w-[400px] h-screen z-10 overflow-auto p-4 bg-white flex flex-col justify-between shadow-sm">
        {cart && cart.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <IconButton
                className="cursor-pointer w-10 h-10"
                onClick={() => setOpenCart(false)}
              >
                <RxCross1 size={22} />
              </IconButton>
            </div>
            <h5>Cart is empty!</h5>
          </div>
        ) : (
          <>
            <div>
              {/* top items */}
              <div className="w-full flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <BsHandbag size={18} />
                  <h5 className="text-lg font-semibold text-black text-opacity-70">
                    {cart && cart.length} items
                  </h5>
                </div>
                {/* menu-close */}
                <IconButton
                  className="cursor-pointer w-10 h-10"
                  onClick={() => setOpenCart(false)}
                >
                  <RxCross1 size={22} />
                </IconButton>
              </div>
              {/* cart Items */}
              <div className="w-full bg-opacity-10 my-2 p-2">
                {cart &&
                  cart.map((i, index) => (
                    <CartSingle
                      key={index}
                      data={i}
                      quantityChangeHandler={quantityChangeHandler}
                      removeFromCartHandler={removeFromCartHandler}
                    />
                  ))}
              </div>
            </div>

            <div className="my-4 w-full items-center justify-center">
              {/* checkout */}
              <Link
                className="bg-theme text-white flex items-center justify-center rounded-full p-3 text-sm font-semibold gap-2"
                to="/checkout"
              >
                <AiOutlineShoppingCart size={16} />
                <span className="font-light">Checkout</span> ₹{totalPrice}
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock < value) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };

  return (
    <div className="w-full flex items-center justify-evenly relative border-b border-black border-opacity-10 py-2 my-2">
      <div className="flex flex-col w-2/5 gap-y-2">
        <img
          src={`${data?.images[0]?.url}`}
          alt=""
          className="w-full object-contain aspect-square"
        />
        <div className="flex flex-row gap-4 items-center justify-center">
          <span
            className="text-white bg-theme bg-opacity-60 rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => increment(data)}
          >
            <HiPlus size={14} />
          </span>
          <span>{data.qty}</span>
          <span
            className="text-white bg-theme bg-opacity-60 rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => decrement(data)}
          >
            <HiOutlineMinus size={14} />
          </span>
        </div>
      </div>
      <div className="w-3/5 px-2 text-sm">
        <h1 className="h-[60px] overflow-hidden leading-5 text-black text-opacity-90 my-2">
          {data.name}
        </h1>
        <h4 className="text-failure font-semibold flex items-center gap-1">
          ₹{data.discountPrice} <RxCross1 size={10} /> {value} = ₹{totalPrice}
        </h4>
      </div>
      <div className="cursor-pointer absolute right-0 top-0">
        <IconButton onClick={() => removeFromCartHandler(data)}>
          <RxCross1 size={18} />
        </IconButton>
      </div>
    </div>
  );
};

export default Cart;
