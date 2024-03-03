import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
// import axios from "axios";
import { server } from "../../const.js";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";

const Payment = () => {
  const [orderData, setOrderData] = useState([]);
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "payment on ecommerce store",
            amount: {
              currency_code: "USD",
              value: orderData?.totalPrice,
            },
          },
        ],
        // not needed if a shipping address is actually needed
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        return orderID;
      });
  };

  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user: user && user,
    totalPrice: orderData?.totalPrice,
  };

  const onApprove = async (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;

      let paymentInfo = payer;

      if (paymentInfo !== undefined) {
        paypalPaymentHandler(paymentInfo);
      }
    });
  };

  const paypalPaymentHandler = async (paymentInfo) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    order.paymentInfo = {
      id: paymentInfo.payer_id,
      status: "succeeded",
      type: "Paypal",
    };

    await fetch(`${server}/order/create-order`, {
      method: "POST",
      headers: {
        ...config.headers,
      },
      body: JSON.stringify(order),
    }).then((res) => {
      setOpen(false);
      navigate("/order/success");
      toast.success("Order successful!");
      localStorage.setItem("cartItems", JSON.stringify([]));
      localStorage.setItem("latestOrder", JSON.stringify([]));
      window.location.reload();
    });
  };

  const paymentData = {
    amount: Math.round(orderData?.totalPrice * 100),
    address: orderData?.shippingAddress,
    name: user && user.name,
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await fetch(`${server}/payment/process`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify(paymentData),
      });

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymnentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            type: "Credit Card",
          };

          await fetch(`${server}/order/create-order`, {
            method: "POST",
            headers: config.headers,
            body: JSON.stringify(order),
          }).then((res) => {
            setOpen(false);
            navigate("/order/success");
            toast.success("Order successful!");
            localStorage.setItem("cartItems", JSON.stringify([]));
            localStorage.setItem("latestOrder", JSON.stringify([]));
            window.location.reload();
          });
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    order.paymentInfo = {
      type: "Cash On Delivery",
    };

    await fetch(`${server}/order/create-order`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify(order),
    }).then((res) => {
      setOpen(false);
      navigate("/order/success");
      toast.success("Order successful!");
      localStorage.setItem("cartItems", JSON.stringify([]));
      localStorage.setItem("latestOrder", JSON.stringify([]));
      window.location.reload();
    });
  };

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-center min-h-[50vh]">
      <div className="w-full md:w-1/2 lg:w-3/5">
        <PaymentInfo
          user={user}
          open={open}
          setOpen={setOpen}
          onApprove={onApprove}
          createOrder={createOrder}
          paymentHandler={paymentHandler}
          cashOnDeliveryHandler={cashOnDeliveryHandler}
        />
      </div>
      <div className="w-full md:w-1/2 lg:w-2/5">
        <CartData orderData={orderData} />
      </div>
    </div>
  );
};

const PaymentInfo = ({
  user,
  open,
  setOpen,
  onApprove,
  createOrder,
  paymentHandler,
  cashOnDeliveryHandler,
}) => {
  const [select, setSelect] = useState(1);

  return (
    <div className="w-full p-4 max-w-xl mx-auto md:mx-0">
      <h2 className="text-lg font-semibold text-black text-opacity-80 mb-6">
        Payment
      </h2>
      {/* select buttons */}
      <div className="flex gap-4 flex-col">
        <div
          className="w-full cursor-pointer flex border-b border-black border-opacity-10 shadow-sm pb-4"
          onClick={() => {
            setSelect(1);
          }}
        >
          <div className="flex items-center">
            {select === 1 ? (
              <div className="w-[16px] h-[16px] border-2 border-black bg-black rounded-full mr-2" />
            ) : (
              <div className="w-[16px] h-[16px] border-2 border-black rounded-full mr-2" />
            )}
          </div>
          <h4 className="text-sm text-black font-semibold">
            Pay with Debit / credit card
          </h4>
        </div>

        {/* pay with card */}
        {select === 1 ? (
          <div className="w-full flex">
            <form
              className="w-full flex flex-col gap-4"
              onSubmit={paymentHandler}
            >
              <div className="w-full flex flex-col lg:flex-row gap-4">
                <div className="w-full lg:w-1/2 flex flex-col gap-1">
                  <label className="text-sm text-black text-opacity-70">
                    Name On Card
                  </label>
                  <input
                    required
                    readOnly
                    placeholder={user && user.name}
                    className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
                    value={user && user.name}
                  />
                </div>
                <div className="w-full lg:w-1/2 flex flex-col gap-1">
                  <label className="text-sm text-black text-opacity-70">
                    Exp Date
                  </label>
                  <CardExpiryElement
                    className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
                    options={{
                      style: {
                        base: {
                          fontSize: "14px",
                          lineHeight: 1.5,
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <div className="w-full flex flex-col lg:flex-row gap-4">
                <div className="w-full lg:w-1/2 flex flex-col gap-1">
                  <label className="text-sm text-black text-opacity-70">
                    Card Number
                  </label>
                  <CardNumberElement
                    className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
                    options={{
                      placeholder: "4000 0035 6000 0008",
                      style: {
                        base: {
                          fontSize: "14px",
                          lineHeight: 1.5,
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
                <div className="w-full lg:w-1/2 flex flex-col gap-1">
                  <label className="text-sm text-black text-opacity-70">
                    CVV
                  </label>
                  <CardCvcElement
                    className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
                    options={{
                      style: {
                        base: {
                          fontSize: "14px",
                          lineHeight: 1.5,
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
              <input
                type="submit"
                value="Submit"
                className="bg-failure text-white py-2 px-4 my-4 text-sm cursor-pointer"
              />
            </form>
          </div>
        ) : null}
      </div>

      {/* paypal payment */}
      <div>
        <div
          className="w-full cursor-pointer flex border-b border-black border-opacity-10 shadow-sm py-4"
          onClick={() => {
            setSelect(2);
          }}
        >
          <div className="flex items-center">
            {select === 2 ? (
              <div className="w-[16px] h-[16px] border-2 border-black bg-black rounded-full mr-2" />
            ) : (
              <div className="w-[16px] h-[16px] border-2 border-black rounded-full mr-2" />
            )}
          </div>
          <h4 className="text-sm text-black font-semibold">Pay with Paypal</h4>
        </div>

        {/* pay with payement */}
        {select === 2 ? (
          <div className="w-full flex">
            <div
              className="w-full bg-failure text-white py-2 px-4 my-4 text-sm cursor-pointer"
              onClick={() => setOpen(true)}
            >
              Pay Now
            </div>
            {open && (
              <div className="w-full fixed top-0 left-0 bg-black bg-opacity-30 h-screen flex items-center justify-center z-40">
                <div className="w-[90%] max-w-[400px] bg-white rounded-xl shadow-md flex flex-col justify-center p-4 relative overflow-y-auto text-sm">
                  <div className="w-full flex justify-end mb-10">
                    <RxCross1
                      size={20}
                      className="cursor-pointer absolute top-3 right-3"
                      onClick={() => setOpen(false)}
                    />
                  </div>
                  <PayPalScriptProvider
                    options={{
                      "client-id":
                        "Aczac4Ry9_QA1t4c7TKH9UusH3RTe6onyICPoCToHG10kjlNdI-qwobbW9JAHzaRQwFMn2-k660853jn",
                    }}
                  >
                    <PayPalButtons
                      style={{ layout: "vertical" }}
                      onApprove={onApprove}
                      createOrder={createOrder}
                    />
                  </PayPalScriptProvider>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>

      {/* cash on delivery */}
      <div>
        <div
          className="w-full cursor-pointer flex border-b border-black border-opacity-10 shadow-sm py-4"
          onClick={() => {
            setSelect(3);
          }}
        >
          <div className="flex items-center">
            {select === 3 ? (
              <div className="w-[16px] h-[16px] border-2 border-black bg-black rounded-full mr-2" />
            ) : (
              <div className="w-[16px] h-[16px] border-2 border-black rounded-full mr-2" />
            )}
          </div>
          <h4 className="text-sm text-black font-semibold">Cash on Delivery</h4>
        </div>

        {/* cash on delivery */}
        {select === 3 ? (
          <form className="w-full" onSubmit={cashOnDeliveryHandler}>
            <input
              type="submit"
              value="Confirm"
              className="w-full bg-failure text-white py-2 px-4 my-4 text-sm cursor-pointer"
            />
          </form>
        ) : null}
      </div>
    </div>
  );
};

const CartData = ({ orderData }) => {
  const shipping = orderData?.shipping?.toFixed(2);
  return (
    <div className="w-full p-4 max-w-xl mx-auto">
      <div className="w-full p-4 max-w-md border border-black rounded-lg border-opacity-15 shadow-sm">
        <div className="flex justify-between py-1">
          <h3 className="text-sm font-semibold text-black text-opacity-60">
            Subtotal
          </h3>
          <h5 className="text-xl text-black font-light">
            ₹{orderData?.subTotalPrice}
          </h5>
        </div>
        <div className="flex justify-between py-1">
          <h3 className="text-sm font-semibold text-black text-opacity-60">
            Shipping
          </h3>
          <h5 className="text-xl text-failure font-light">₹{shipping}</h5>
        </div>
        <div className="flex justify-between py-1">
          <h3 className="text-sm font-semibold text-black text-opacity-60">
            Discount
          </h3>
          <h5 className="text-xl text-success font-light mb-4">
            {orderData?.discountPrice ? "$" + orderData.discountPrice : "-"}
          </h5>
        </div>
        <h5 className="text-sm font-semibold border-t border-black border-opacity-15 shadow-sm text-end py-4">
          ₹{orderData?.totalPrice}
        </h5>
      </div>
    </div>
  );
};

export default Payment;
