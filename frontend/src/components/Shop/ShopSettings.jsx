import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../const.js";
import { AiOutlineCamera } from "react-icons/ai";
// import axios from "axios";
import { loadSeller } from "../../redux/actions/user";
import { toast } from "react-toastify";

const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState(seller && seller.name);
  const [description, setDescription] = useState(
    seller && seller.description ? seller.description : ""
  );
  const [address, setAddress] = useState(seller && seller.address);
  const [phoneNumber, setPhoneNumber] = useState(seller && seller.phoneNumber);
  const [zipCode, setZipcode] = useState(seller && seller.zipCode);

  const dispatch = useDispatch();

  const handleImage = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        fetch(`${server}/shop/update-shop-avatar`, {
          method: "PUT",
          body: JSON.stringify({ avatar: reader.result }),
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            dispatch(loadSeller());
            toast.success("Avatar updated successfully!");
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const updateHandler = async (e) => {
    e.preventDefault();

    await fetch(`${server}/shop/update-seller-info`, {
      method: "PUT",
      body: JSON.stringify({
        name,
        address,
        zipCode,
        phoneNumber,
        description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        toast.success("Shop info updated succesfully!");
        dispatch(loadSeller());
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="w-full p-4">
      <div className="flex flex-col w-full">
        <div className="w-full bg-theme bg-pattern h-20"></div>
        <div className="flex items-center justify-center">
          <div className="relative -translate-y-2/3">
            <img
              src={avatar ? avatar : `${seller.avatar?.url}`}
              className="w-[80px] h-[80px] rounded-full object-cover border-4 border-white"
              alt=""
            />
            <div className="w-[30px] h-[30px] bg-black bg-opacity-60 text-white rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImage}
              />
              <label htmlFor="image">
                <AiOutlineCamera />
              </label>
            </div>
          </div>
        </div>
      </div>
      {/* shop info */}
      <form
        aria-required={true}
        className="flex flex-col items-start gap-4 relative -translate-y-8"
        onSubmit={updateHandler}
      >
        <div className="w-[100%] md:w-[50%] flex flex-col gap-1">
          <label className="text-sm text-black text-opacity-70">
            Shop Name
          </label>
          <input
            type="name"
            placeholder={`${seller.name}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
            required
          />
        </div>
        <div className="w-[100%] md:w-[50%] flex flex-col gap-1">
          <label className="text-sm text-black text-opacity-70">
            Shop Description
          </label>
          <input
            type="name"
            placeholder={`${
              seller?.description
                ? seller.description
                : "Enter your shop description"
            }`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
          />
        </div>
        <div className="w-[100%] md:w-[50%] flex flex-col gap-1">
          <label className="text-sm text-black text-opacity-70">
            Shop Address
          </label>
          <input
            type="name"
            placeholder={seller?.address}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
            required
          />
        </div>

        <div className="w-[100%] md:w-[50%] flex flex-col gap-1">
          <label className="text-sm text-black text-opacity-70">
            Phone Number
          </label>
          <input
            type="number"
            placeholder={seller?.phoneNumber}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
            required
          />
        </div>

        <div className="w-[100%] md:w-[50%] flex flex-col gap-1">
          <label className="text-sm text-black text-opacity-70">Zip Code</label>
          <input
            type="number"
            placeholder={seller?.zipCode}
            value={zipCode}
            onChange={(e) => setZipcode(e.target.value)}
            className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
            required
          />
        </div>
        <input
          type="submit"
          value="Update Shop"
          className="w-[100%] md:w-[50%] border border-success text-center text-success rounded-sm cursor-pointer text-sm p-3 my-4"
          required
          readOnly
        />
      </form>
    </div>
  );
};

export default ShopSettings;
