import React, { useState } from "react";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { server } from "../../const.js";
import { toast } from "react-toastify";

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const paymentSubmit = () => {
    if (
      address1 === "" ||
      city === "" ||
      zipCode === "" ||
      country === "" ||
      state === ""
    ) {
      toast.error("Please choose your delivery address!");
    } else {
      const shippingAddress = {
        address1,
        city,
        zipCode,
        country,
        state,
      };

      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        discountPrice,
        shippingAddress,
        user,
      };

      // update local storage with the updated orders array
      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      navigate("/payment");
    }
  };

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  // this is shipping cost variable
  const shipping = subTotalPrice * 0.1;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = couponCode;

    await axios.get(`${server}/coupon/get-coupon-value/${name}`).then((res) => {
      const shopId = res.data.couponCode?.shopId;
      const couponCodeValue = res.data.couponCode?.value;
      if (res.data.couponCode !== null) {
        const isCouponValid =
          cart && cart.filter((item) => item.shopId === shopId);

        if (isCouponValid.length === 0) {
          toast.error("Coupon code is not valid for this shop");
          setCouponCode("");
        } else {
          const eligiblePrice = isCouponValid.reduce(
            (acc, item) => acc + item.qty * item.discountPrice,
            0
          );
          const discountPrice = (eligiblePrice * couponCodeValue) / 100;
          setDiscountPrice(discountPrice);
          setCouponCodeData(res.data.couponCode);
          setCouponCode("");
        }
      }
      if (res.data.couponCode === null) {
        toast.error("Coupon code doesn't exists!");
        setCouponCode("");
      }
    });
  };

  const discountPercentenge = couponCodeData ? discountPrice : "";

  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPercentenge).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  return (
    <div className="w-full flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 lg:w-3/5">
        <ShippingInfo
          user={user}
          country={country}
          setCountry={setCountry}
          state={state}
          setState={setState}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          address1={address1}
          setAddress1={setAddress1}
          city={city}
          setCity={setCity}
          zipCode={zipCode}
          setZipCode={setZipCode}
        />
      </div>
      <div className="w-full md:w-1/2 lg:w-2/5">
        <CartData
          handleSubmit={handleSubmit}
          totalPrice={totalPrice}
          shipping={shipping}
          subTotalPrice={subTotalPrice}
          couponCode={couponCode}
          setCouponCode={setCouponCode}
          discountPercentenge={discountPercentenge}
        />
        <div className="w-full m-4 text-center">
          <span
            className="w-full p-3 bg-black text-white text-center text-sm my-4 cursor-pointer"
            onClick={paymentSubmit}
          >
            Go to Payment
          </span>
        </div>
      </div>
    </div>
  );
};

const ShippingInfo = ({
  user,
  country,
  setCountry,
  state,
  setState,
  userInfo,
  setUserInfo,
  address1,
  setAddress1,
  city,
  setCity,
  zipCode,
  setZipCode,
}) => {
  return (
    <div className="w-full p-4 max-w-xl mx-auto md:mx-0">
      <h2 className="text-lg font-semibold text-black text-opacity-80 mb-6">
        Shipping Address
      </h2>
      <form className="flex flex-col items-center text-sm gap-4">
        <div className="w-full flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/2 flex flex-col gap-1">
            <label className="text-sm text-black text-opacity-70">
              Full Name
            </label>
            <input
              type="text"
              readOnly
              value={user && user.name}
              required
              className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-1">
            <label className="text-sm text-black text-opacity-70">Email</label>
            <input
              type="email"
              readOnly
              value={user && user.email}
              required
              className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
            />
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/2 flex flex-col gap-1">
            <label className="text-sm text-black text-opacity-70">
              Phone Number
            </label>
            <input
              type="number"
              required
              value={user && user.phoneNumber}
              readOnly
              className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-1">
            <label className="text-sm text-black text-opacity-70">
              Zip Code
            </label>
            <input
              type="number"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
              className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
            />
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/2 flex flex-col gap-1">
            <label className="text-sm text-black text-opacity-70">
              Country
            </label>
            <select
              className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            >
              <option className="text-sm text-black text-opacity-70">
                Choose your country
              </option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option
                    className="text-sm text-black"
                    key={item.isoCode}
                    value={item.isoCode}
                  >
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-1">
            <label className="text-sm text-black text-opacity-70">State</label>
            <select
              className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option className="text-sm text-black text-opacity-70">
                Choose your state
              </option>
              {State &&
                State.getStatesOfCountry(country).map((item) => (
                  <option
                    className="text-sm text-black"
                    key={item.isoCode}
                    value={item.isoCode}
                  >
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/2 flex flex-col gap-1">
            <label className="text-sm text-black text-opacity-70">
              Address1
            </label>
            <input
              type="address"
              required
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-1">
            <label className="text-sm text-black text-opacity-70">City</label>
            <input
              type="address"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
            />
          </div>
        </div>
      </form>
      <h5
        className="text-sm cursor-pointer inline-block text-semibold mt-4 mb-2"
        onClick={() => setUserInfo(!userInfo)}
      >
        Choose From saved address
      </h5>
      {userInfo && (
        <div className="flex items-center gap-2 text-sm">
          {user &&
            user.addresses.map((item, index) => (
              <div key={index} className="w-full flex gap-2">
                <input
                  className="cursor-pointer"
                  type="checkbox"
                  value={item.addressType}
                  onClick={() =>
                    setAddress1(item.address1) ||
                    setCity(item.city) ||
                    setZipCode(item.zipCode) ||
                    setCountry(item.country) ||
                    setState(item.state)
                  }
                />
                <h2>{item.addressType}</h2>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercentenge,
}) => {
  return (
    <div className="w-full p-4 max-w-xl mx-auto">
      <div className="w-full p-4 max-w-md border border-black rounded-lg border-opacity-15 shadow-sm">
        <div className="flex justify-between py-1">
          <h3 className="text-sm font-semibold text-black text-opacity-60">
            Subtotal
          </h3>
          <h5 className="text-xl text-black font-light">₹{subTotalPrice}</h5>
        </div>
        <div className="flex justify-between py-1">
          <h3 className="text-sm font-semibold text-black text-opacity-60">
            Shipping
          </h3>
          <h5 className="text-xl text-failure font-light">
            ₹{shipping.toFixed(2)}
          </h5>
        </div>
        <div className="flex justify-between py-1">
          <h3 className="text-sm font-semibold text-black text-opacity-60">
            Discount
          </h3>
          <h5 className="text-xl text-success font-light mb-4">
            -{" "}
            {discountPercentenge ? "₹" + discountPercentenge.toString() : null}
          </h5>
        </div>
        <h5 className="text-sm font-semibold border-t border-black border-opacity-15 shadow-sm text-end py-4">
          ₹{totalPrice}
        </h5>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
            placeholder="Coupoun code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            required
          />
          <input
            className="text-sm cursor-pointer border-2 bg-black text-white py-2 px-4"
            required
            value="Apply code"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default Checkout;
