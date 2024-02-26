import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { server } from "../../const.js";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "./Ratings";
import axios from "axios";
import { IconButton } from "@mui/material";
import { MdKeyboardArrowRight } from "react-icons/md";

const ProductDetails = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop._id));
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishlist]);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const avg = totalRatings / totalReviewsLength || 0;

  const averageRating = avg.toFixed(2);

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please login to create a conversation");
    }
  };

  return data ? (
    <div className="w-full p-4 pt-8">
      <div className="w-full flex flex-col md:flex-row">
        {/* left */}
        <div className="w-full max-w-[500px] mx-auto md:w-1/2">
          {/* image div */}
          <div className=" flex flex-row">
            <div className="w-[20%] flex flex-col">
              {data &&
                data.images.map((i, index) => (
                  <div
                    key={index}
                    className="cursor-pointer border border-black border-opacity-10"
                  >
                    <img
                      src={`${i?.url}`}
                      alt=""
                      className="w-full aspect-square"
                      onClick={() => setSelect(index)}
                    />
                  </div>
                ))}
            </div>
            <div className="w-[80%]">
              <img
                src={`${data && data.images[select]?.url}`}
                alt=""
                className="w-full h-full object-contain object-top"
              />
            </div>
          </div>
        </div>
        {/* right */}
        <div className="w-full md:w-1/2 p-4">
          <h1 className="text-xl md:text-2xl font-semibold text-black text-opacity-90">
            {data.name}
          </h1>
          <p className="text-sm text-black text-opacity-70 my-4">
            {data.description}
          </p>
          {/* price */}
          <div className="flex flex-row gap-2 items-center py-4">
            <p className="text-3xl text-black font-base">
              ₹
              {data.originalPrice === 0
                ? data.originalPrice
                : data.discountPrice}
            </p>
            <small className="font-base text-failure line-through">
              {data.originalPrice ? "₹" + data.originalPrice : null}
            </small>
          </div>
          {/* cart increment/decrement button */}
          <div className="flex items-center justify-between">
            <div className="flex flex-row gap-4 items-center">
              <div
                className="w-8 h-8 cursor-pointer bg-theme bg-opacity-20 rounded-full flex items-center justify-center"
                onClick={decrementCount}
              >
                <IconButton className="w-full h-full">-</IconButton>
              </div>
              <span className="text-sm font-semibold">{count}</span>
              <div
                className="w-8 h-8 cursor-pointer bg-theme bg-opacity-20 rounded-full flex items-center justify-center"
                onClick={incrementCount}
              >
                <IconButton className="w-full h-full">+</IconButton>
              </div>
            </div>
            <div>
              {click ? (
                <AiFillHeart
                  size={30}
                  className="cursor-pointer"
                  onClick={() => removeFromWishlistHandler(data)}
                  color={click ? "red" : "#333"}
                  title="Remove from wishlist"
                />
              ) : (
                <AiOutlineHeart
                  size={30}
                  className="cursor-pointer"
                  onClick={() => addToWishlistHandler(data)}
                  color={click ? "red" : "#333"}
                  title="Add to wishlist"
                />
              )}
            </div>
          </div>
          {/* add to cart */}
          <div
            className="w-full max-w-[600px] bg-black text-white p-3 flex items-center justify-center text-sm font-base gap-2 my-6 cursor-pointer"
            onClick={() => addToCartHandler(data._id)}
          >
            <span>Add to cart</span> <AiOutlineShoppingCart size={18} />
          </div>
        </div>
      </div>
      <ProductDetailsInfo
        data={data}
        products={products}
        totalReviewsLength={totalReviewsLength}
        averageRating={averageRating}
      />
    </div>
  ) : null;
};

const ProductDetailsInfo = ({
  data,
  products,
  totalReviewsLength,
  averageRating,
}) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-theme bg-opacity-5 rounded-xl">
      <div className="w-full flex justify-between p-4">
        <div className="relative">
          <h5
            className="text-black text-sm font-semibold cursor-pointer py-2"
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? <div className="border-b-2 border-theme" /> : null}
        </div>
        <div className="relative">
          <h5
            className="text-black text-sm font-semibold cursor-pointer py-2"
            onClick={() => setActive(2)}
          >
            Reviews
          </h5>
          {active === 2 ? <div className="border-b-2 border-theme" /> : null}
        </div>
        <div className="relative">
          <h5
            className="text-black text-sm font-semibold cursor-pointer py-2"
            onClick={() => setActive(3)}
          >
            Seller Info
          </h5>
          {active === 3 ? <div className="border-b-2 border-theme" /> : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="whitespace-pre-line text-sm p-2">{data.description}</p>
        </>
      ) : null}

      {active === 2 ? (
        <div className="w-full flex flex-col items-center p-2 overflow-y-auto gap-2">
          {data &&
            data.reviews.map((item, index) => (
              <div
                key={index}
                className="w-full flex gap-4 p-2 rounded-lg items-center bg-success bg-opacity-20"
              >
                <img
                  src={`${item.user.avatar?.url}`}
                  alt=""
                  className="w-[40px] h-[40px] rounded-full"
                />
                <div className="flex flex-col gap-2">
                  <div className="w-full flex items-center gap-4">
                    <p className="text-sm font-semibold">{item.user.name}</p>
                    <Ratings rating={data?.ratings} />
                  </div>
                  <p className="text-sm">{item.comment}</p>
                </div>
              </div>
            ))}
          <div className="w-full flex justify-center">
            {data && data.reviews.length === 0 && (
              <h5>No Reviews for this product!</h5>
            )}
          </div>
        </div>
      ) : null}

      {active === 3 && (
        <div className="w-full">
          <div className="flex flex-col items-start justify-center my-4 gap-2 p-2">
            <Link
              className="flex flex-row items-center justify-between gap-4 bg-theme text-white p-2"
              to={`/shop/preview/${data?.shop._id}`}
            >
              <img
                src={`${data?.shop?.avatar?.url}`}
                alt=""
                className="w-[40px] h-[40px] rounded-full"
              />
              <div className="flex flex-col">
                <h3 className="text-sm text-white text-opacity-90">
                  {data.shop.name}
                </h3>
                <h5 className="text-sm text-white text-opacity-70">
                  ({averageRating}/5) Ratings
                </h5>
              </div>
              <div className="text-sm">
                <MdKeyboardArrowRight size={20} />
              </div>
            </Link>
            <div>
              <p className="text-sm">{data.shop.description}</p>
            </div>
          </div>
          <div className="w-full flex flex-col text-sm font-semibold px-2">
            <div className="pb-1">
              <span className="text-black text-opacity-90 pr-2">Joined on</span>
              <span className="text-black text-opacity-70">
                {data.shop?.createdAt?.slice(0, 10)}
              </span>
            </div>
            <div className="pb-1">
              <span className="text-black text-opacity-90 pr-2">
                Total Products
              </span>
              <span className="text-black text-opacity-70">
                {products && products.length}
              </span>
            </div>
            <div className="pb-1">
              <span className="text-black text-opacity-90 pr-2">
                Total Reviews
              </span>
              <span className="text-black text-opacity-70">
                {totalReviewsLength}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
