import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { server } from "../../const.js";
import Loader from "../Layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import Rating from "../../components/Products/Ratings.jsx";
import { CiPhone } from "react-icons/ci";
import { VscEdit } from "react-icons/vsc";

const ShopInfo = ({ isOwner }) => {
  const [data, setData] = useState({});
  const { products } = useSelector((state) => state.products);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    setIsLoading(true);
    axios
      .get(`${server}/shop/get-shop-info/${id}`)
      .then((res) => {
        setData(res.data.shop);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setIsLoading(false);
      });
  }, []);

  const logoutHandler = async () => {
    axios.get(`${server}/shop/logout`, {
      withCredentials: true,
    });
    window.location.reload();
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

  const averageRating = totalRatings / totalReviewsLength || 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="relative w-full border border-black border-opacity-10 shadow-sm rounded-xl flex items-center justify-center flex-col p-2 gap-4">
          <div className="w-24 h-24 rounded-full bg-theme flex item-center justify-center">
            <img
              src={`${data?.avatar?.url}`}
              alt=""
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="w-full flex items-center justify-center flex-col gap-2">
            <h1 className="text-lg text-black text-opacity-80 font-semibold">
              {data?.name}
            </h1>
            <span className="text-sm text-black font-semibold text-center text-opacity-50">
              {data?.address}
            </span>
            <span className="">
              <Rating rating={averageRating} />
            </span>
            <span className="text-sm text-black text-opacity-70 my-2 p-4 border border-black border-opacity-10 shadow-sm rounded-xl">
              {data?.description}
            </span>
            <span className="w-full flex items-center justify-between text-sm text-black text-opacity-50 font-semibold">
              <span className="flex items-center gap-1">
                <CiPhone /> <span>{data?.phoneNumber}</span>
              </span>
              <span>{data?.createdAt?.slice(0, 10)}</span>
            </span>
          </div>
          {isOwner && (
            <>
              <Link
                className="absolute top-2 right-2 flex items-center justify-center text-theme w-8 h-8 rounded-full bg-black bg-opacity-5"
                to="/settings"
              >
                <VscEdit size={18} />
              </Link>
              <div
                className="w-full bg-black text-white text-sm py-3 px-4 rounded-md text-center cursor-pointer"
                onClick={logoutHandler}
              >
                Log Out
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ShopInfo;
