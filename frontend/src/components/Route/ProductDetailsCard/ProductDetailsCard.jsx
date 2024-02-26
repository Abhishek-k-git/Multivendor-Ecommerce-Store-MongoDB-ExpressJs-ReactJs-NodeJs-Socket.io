import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addTocart } from "../../../redux/actions/cart";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import IconButton from "@mui/material/IconButton";

const ProductDetailsCard = ({ setOpen, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  //   const [select, setSelect] = useState(false);

  const handleMessageSubmit = () => {};

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < count) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

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
    <div className="bg-white z-30 cursor-default">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-black bg-opacity-50 z-40 flex items-center justify-center shadow-xl">
          <div className="w-[95%] max-w-5xl max-h-[90vh] overflow-y-auto md:max-h-[75vh] relative p-4 bg-white rounded-xl shadow-xl">
            {/* close icon */}
            <div
              className="absolute right-3 top-3"
              onClick={() => setOpen(false)}
            >
              <IconButton>
                <RxCross1 size={25} />
              </IconButton>
            </div>
            {/* details */}
            <div className="block w-full md:flex">
              {/* left */}
              <div className="w-[70%] min-w-[260px] md:w-[30%] px-4 md:p-0">
                <img
                  className="w-full object-contain"
                  src={`${data.images && data.images[0]?.url}`}
                  alt=""
                />
                <Link
                  to={`/shop/preview/${data.shop._id}`}
                  className="flex flex-row items-center gap-4 bg-theme bg-opacity-10 p-2"
                >
                  <img
                    src={`${data.images && data.images[0]?.url}`}
                    alt=""
                    className="w-[40px] h-[40px] rounded-full object-contain"
                  />
                  <div>
                    <h3 className="text-xs font-semibold">{data.shop.name}</h3>
                    <h5 className="text-xs">{data?.ratings} Ratings</h5>
                  </div>
                </Link>
                <div
                  className="bg-black text-white flex flex-row items-center justify-center p-2 gap-2 text-xs"
                  onClick={handleMessageSubmit}
                >
                  <span>Contact Shop</span> <AiOutlineMessage size={16} />
                </div>
              </div>
              {/* right */}
              <div className="w-full md:w-[70%] pt-10 px-4">
                <h1 className="text-lg font-bold">{data.name}</h1>
                <p className="text-sm">{data.description}</p>
                <div className="flex flex-row gap-2 items-center py-4">
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
                {/* buttons */}
                <div className="flex items-center justify-between">
                  {/* wishlist */}
                  {click ? (
                    <div className="cursor-pointer">
                      <IconButton
                        onClick={() => removeFromWishlistHandler(data)}
                      >
                        <AiFillHeart
                          size={22}
                          color={click ? "red" : "#333"}
                          title="Remove from wishlist"
                        />
                      </IconButton>
                    </div>
                  ) : (
                    <div className="cursor-pointer">
                      <IconButton onClick={() => addToWishlistHandler(data)}>
                        <AiOutlineHeart size={22} title="Add to wishlist" />
                      </IconButton>
                    </div>
                  )}
                  {/* cart */}
                  <div
                    className="cursor-pointer bg-black text-white py-2 px-4 gap-2 flex items-center flex-row"
                    onClick={() => addToCartHandler(data._id)}
                  >
                    <span className="text-xs">Add to Cart</span>
                    <AiOutlineShoppingCart size={18} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;
