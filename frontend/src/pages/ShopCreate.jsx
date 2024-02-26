import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../const.js";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { RxAvatar } from "react-icons/rx";

const ShopCreate = () => {
  const navigate = useNavigate();
  const { isSeller, seller } = useSelector((state) => state.seller);
  useEffect(() => {
    if (isSeller === true) {
      navigate(`/shop/${seller._id}`);
    }
  }, []);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState();
  const [avatar, setAvatar] = useState();
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(`${server}/shop/create-shop`, {
        name,
        email,
        password,
        avatar,
        zipCode,
        address,
        phoneNumber,
      })
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setAvatar();
        setZipCode();
        setAddress("");
        setPhoneNumber();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const handleFileInputChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="w-full h-auto bg-white p-4 flex flex-col justify-center items-center">
      <h2 className=" mt-6 text-2xl sm:text-3xl font-extrabold text-gray-900 mb-8">
        Register as a seller
      </h2>
      <div className="w-full max-w-[400px] bg-white px-4 py-8 shadow sm:rounded-lg">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="text-black text-opacity-80 text-sm block"
            >
              Shop Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-sm appearance-none block w-full px-3 py-2 border border-black border-opacity-15 rounded-md shadow-sm placeholder:text-black placeholder:text-opacity-60 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="phone"
              className="text-black text-opacity-80 text-sm block"
            >
              Phone Number
            </label>
            <div className="mt-1">
              <input
                type="number"
                name="phone-number"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="text-sm appearance-none block w-full px-3 py-2 border border-black border-opacity-15 rounded-md shadow-sm placeholder:text-black placeholder:text-opacity-60 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-black text-opacity-80 text-sm block"
            >
              Email
            </label>
            <div className="mt-1">
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-sm appearance-none block w-full px-3 py-2 border border-black border-opacity-15 rounded-md shadow-sm placeholder:text-black placeholder:text-opacity-60 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="address"
              className="text-black text-opacity-80 text-sm block"
            >
              Address
            </label>
            <div className="mt-1">
              <input
                type="address"
                name="address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="text-sm appearance-none block w-full px-3 py-2 border border-black border-opacity-15 rounded-md shadow-sm placeholder:text-black placeholder:text-opacity-60 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="zipcode"
              className="text-black text-opacity-80 text-sm block"
            >
              Zip Code
            </label>
            <div className="mt-1">
              <input
                type="number"
                name="zipcode"
                required
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="text-sm appearance-none block w-full px-3 py-2 border border-black border-opacity-15 rounded-md shadow-sm placeholder:text-black placeholder:text-opacity-60 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-black text-opacity-80 text-sm block"
            >
              Password
            </label>
            <div className="mt-1 relative">
              <input
                type={visible ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-sm appearance-none block w-full px-3 py-2 border border-black border-opacity-15 rounded-md shadow-sm placeholder:text-black placeholder:text-opacity-60 focus:outline-none"
              />
              {visible ? (
                <AiOutlineEye
                  className="absolute right-2 top-2 cursor-pointer"
                  size={20}
                  onClick={() => setVisible(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute right-2 top-2 cursor-pointer"
                  size={20}
                  onClick={() => setVisible(true)}
                />
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-black text-opacity-80"
            ></label>
            <div className="mt-2 flex items-center">
              <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="avatar"
                    className="h-full w-full object-cover rounded-full"
                  />
                ) : (
                  <RxAvatar className="h-8 w-8" />
                )}
              </span>
              <label
                htmlFor="file-input"
                className="ml-2 flex items-center justify-center px-4 py-2 cursor-pointer border border-black border-opacity-15 rounded-md shadow-sm text-sm font-medium"
              >
                <span className="text-black text-opacity-80 text-sm">
                  {avatar ? "change" : "Upload a file"}
                </span>
                <input
                  type="file"
                  name="avatar"
                  id="file-input"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileInputChange}
                  className="sr-only"
                />
              </label>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-black text-white text-sm hover:bg-opacity-80 focus:bg-opacity-90"
            >
              Submit
            </button>
          </div>
          <div className="w-full flex items-center justify-start text-sm gap-2">
            <h4>Already have an account?</h4>
            <Link to="/shop-login" className="text-theme underline">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopCreate;
