import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfUser } from "../redux/actions/order";
import { server } from "../const.js";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import { TiStarFullOutline } from "react-icons/ti";
import { CiPhone } from "react-icons/ci";
import { IconButton } from "@mui/material";

const UserOrderDetails = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(1);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch, user._id]);

  const data = orders && orders.find((item) => item._id === id);

  const reviewHandler = async (e) => {
    await axios
      .put(
        `${server}/product/create-new-review`,
        {
          user,
          rating,
          comment,
          productId: selectedItem?._id,
          orderId: id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllOrdersOfUser(user._id));
        setComment("");
        setRating(null);
        setOpen(false);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const refundHandler = async () => {
    await axios
      .put(`${server}/order/order-refund/${id}`, {
        status: "Processing refund",
      })
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllOrdersOfUser(user._id));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="p-4 w-full min-h-[80vh]">
      <h1 className="text-black text-opacity-60 text-xl md:text-3xl font-extrabold text-left mb-10">
        Order Details
      </h1>
      <div className="max-w-[4xl] flex flex-col border border-black border-opacity-20 rounded-lg">
        <div className="bg-black bg-opacity-5 flex flex-col gap-2 md:flex-row items-start md:items-center justify-between py-4 px-6 text-sm">
          <span className="flex flex-col sm:flex-row md:flex-col gap-0 sm:gap-2 md:gap-0">
            <p className="text-black text-opacity-70">Order Placed</p>
            <p className="text-black text-opacity-80 font-semibold">
              {data?.createdAt?.slice(0, 10)}
            </p>
          </span>
          <span className="flex flex-col sm:flex-row md:flex-col gap-0 sm:gap-2 md:gap-0">
            <p className="text-black text-opacity-70">Total</p>
            <p className="text-black text-opacity-80 font-semibold">
              ₹{data?.totalPrice}
            </p>
          </span>
          <span className="flex flex-col sm:flex-row md:flex-col gap-0 sm:gap-2 md:gap-0">
            <p className="text-black text-opacity-70">Ship to</p>
            <p className="text-black text-opacity-80 font-semibold">
              {data?.shippingAddress?.address1.length > 12
                ? data?.shippingAddress.address1.slice(0, 12) +
                  "..., " +
                  data?.shippingAddress.city
                : data?.shippingAddress.address1 +
                  ", " +
                  data?.shippingAddress.city}
            </p>
          </span>
          <span>
            <p className="text-black font-semibold">Order #{data?._id}</p>
            <div className="flex flex-row items-center gap-1 font-semibold mt-2 md:mt-0">
              <CiPhone size={16} />
              {data?.user?.phoneNumber}
            </div>
          </span>
        </div>
        <div className="py-4 px-6 text-sm">
          <h3
            className={`font-semibold text-black ${
              data?.status === "Delivered" ? "text-success" : "text-failure"
            }`}
          >
            {data?.status}
          </h3>
          {/* delivered items card */}
          <div className="flex flex-col my-4">
            {data &&
              data?.cart.map((item, index) => (
                <div
                  className="flex flex-row w-full py-2 my-1 gap-4"
                  key={index}
                >
                  <div className="w-[20%] max-w-[60px] border border-black border-opacity-10 aspect-square">
                    <img
                      className="w-full h-full object-contain"
                      src={item.images[0]?.url}
                      alt=""
                    />
                  </div>
                  <div className="w-[80%] flex flex-col justify-between gap-1">
                    <h1 className="text-black text-opacity-90 text-base font-semibold">
                      {item.name?.length > 80
                        ? item.name?.slice(0, 80) + "..."
                        : item.name}
                    </h1>
                    <h2 className="text-black text-opacity-60 font-semibold flex flex-row items-center">
                      ₹{item.discountPrice} <RxCross2 size={14} /> {item.qty}
                    </h2>
                    {!item.isReviewed && data?.status === "Delivered" ? (
                      <div
                        className="w-full p-2 bg-failure bg-opacity-20 flex flex-row items-center gap-2 cursor-pointer underline"
                        onClick={() => setOpen(true) || setSelectedItem(item)}
                      >
                        <TiStarFullOutline size={14} />{" "}
                        <span>Please rate your experience with us</span>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            <div className="flex flex-row justify-between gap-2">
              {/* <h4 className="text-black text-opacity-80">
                Payment{" "}
                {data?.paymentInfo?.status ? (
                  <span className="text-success font-semibold">
                    {data?.paymentInfo?.status}
                  </span>
                ) : (
                  <span className="text-failure font-semibold">Not Paid</span>
                )}
              </h4> */}
              {data?.status === "Delivered" && (
                <div
                  className="underline text-failure font-semibold cursor-pointer"
                  onClick={refundHandler}
                >
                  Refund
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* review popup */}
      {open && (
        <div className="w-full fixed top-0 left-0 h-screen bg-black bg-opacity-40 z-40 flex items-center justify-center">
          <div className="flex w-[95%] max-w-[400px] flex-col bg-white p-4 rounded-xl shadow-lg z-40">
            <div className="flex w-ful justify-between items-center">
              <h2 className="text-base font-semibold text-black text-opacity-90">
                Give a Review
              </h2>
              <IconButton
                className="w-8 h-8 flex items-center justify-center cursor-pointer"
                onClick={() => setOpen(false)}
              >
                <RxCross1 size={20} />
              </IconButton>
            </div>
            {/* item */}
            <div className="w-full flex gap-4 py-2 my-2">
              <div className="w-[80px] h-[80px] rounded-md">
                <img
                  src={`${selectedItem?.images[0]?.url}`}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col justify-between gap-1 py-2">
                <h1 className="text-black text-opacity-90 text-base font-semibold">
                  {selectedItem?.name?.length > 80
                    ? selectedItem?.name?.slice(0, 80) + "..."
                    : selectedItem?.name}
                </h1>
                <h2 className="text-black text-opacity-70 font-semibold flex flex-row items-center">
                  ₹{selectedItem?.discountPrice} <RxCross2 size={14} />{" "}
                  {selectedItem?.qty}
                </h2>
              </div>
            </div>

            {/* ratings */}
            <p className="text-sm mt-4 mb-1 ml-1">
              Give a Rating <span className="text-failure">*</span>
            </p>
            <div className="flex w-full gap-1">
              {[1, 2, 3, 4, 5].map((i) =>
                rating >= i ? (
                  <AiFillStar
                    key={i}
                    className="cursor-pointer"
                    color="rgb(246,186,0)"
                    size={22}
                    onClick={() => setRating(i)}
                  />
                ) : (
                  <AiOutlineStar
                    key={i}
                    className="cursor-pointer"
                    color="rgb(246,186,0)"
                    size={22}
                    onClick={() => setRating(i)}
                  />
                )
              )}
            </div>
            <div className="w-full mt-4">
              <label className="text-sm mb-1 ml-1">
                Write a comment
                <span className="text-black text-opacity-70 ml-2">
                  (optional)
                </span>
              </label>
              <textarea
                name="comment"
                cols="20"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How was your experience"
                className="w-full text-sm rounded-md placeholder:text-black placeholder:text-opacity-50 p-2 outline-none border border-black border-opacity-15"
              ></textarea>
            </div>
            <div
              className="bg-black text-white cursor-pointer text-sm w-full flex items-center justify-center p-3 mt-4 mb-2"
              onClick={rating > 1 ? reviewHandler : null}
            >
              Submit
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrderDetails;
