import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { server } from "../../const.js";
import axios from "axios";
import { toast } from "react-toastify";
import { CiPhone } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

const OrderDetails = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  const orderUpdateHandler = async (e) => {
    await axios
      .put(
        `${server}/order/update-order-status/${id}`,
        {
          status,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Order updated!");
        navigate("/dashboard-orders");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const refundOrderUpdateHandler = async (e) => {
    await axios
      .put(
        `${server}/order/order-refund-success/${id}`,
        {
          status,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Order updated!");
        dispatch(getAllOrdersOfShop(seller._id));
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
                  </div>
                </div>
              ))}
            <div className="flex flex-row flex-wrap gap-x-4 gap-y-2">
              <h4 className="text-black text-opacity-80">
                Payment{" "}
                {data?.paymentInfo?.status ? (
                  <span className="text-success font-semibold">
                    {data?.paymentInfo?.status}
                  </span>
                ) : (
                  <span className="text-failure font-semibold">Not Paid</span>
                )}
              </h4>
            </div>
          </div>
          {/* order status */}
          <div className="w-full flex items-center justify-end gap-2">
            {data?.status !== "Processing refund" &&
              data?.status !== "Refund Success" && (
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="text-sm border border-black border-opacity-15 p-2"
                >
                  {[
                    "Processing",
                    "Transferred to delivery partner",
                    "Shipping",
                    "Received",
                    "On the way",
                    "Delivered",
                  ]
                    .slice(
                      [
                        "Processing",
                        "Transferred to delivery partner",
                        "Shipping",
                        "Received",
                        "On the way",
                        "Delivered",
                      ].indexOf(data?.status)
                    )
                    .map((option, index) => (
                      <option className="text-sm" value={option} key={index}>
                        {option}
                      </option>
                    ))}
                </select>
              )}
            {data?.status === "Processing refund" ||
            data?.status === "Refund Success" ? (
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="text-sm border border-black border-opacity-15 p-2"
              >
                {["Processing refund", "Refund Success"]
                  .slice(
                    ["Processing refund", "Refund Success"].indexOf(
                      data?.status
                    )
                  )
                  .map((option, index) => (
                    <option className="text-sm" value={option} key={index}>
                      {option}
                    </option>
                  ))}
              </select>
            ) : null}
            <div
              className="text-sm underline text-failure cursor-pointer"
              onClick={
                data?.status !== "Processing refund"
                  ? orderUpdateHandler
                  : refundOrderUpdateHandler
              }
            >
              apply
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
