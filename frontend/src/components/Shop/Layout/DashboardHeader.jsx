import React, { useState } from "react";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { IoLogoVk } from "react-icons/io5";

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);

  const [active, setActive] = useState(false);
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <div
      className={`${
        active === true
          ? "shadow-md fixed top-0 right-1/2 translate-x-1/2"
          : null
      } transition flex items-center justify-between w-full max-w-7xl text-sm bg-white h-[60px] px-4 z-20`}
    >
      <div className="w-full flex items-center justify-between">
        <Link to="/dashboard">
          <IoLogoVk className="text-theme h-10 w-10 text-opacity-70" />
        </Link>
        <Link
          className="flex flex-row items-center gap-2 cursor-pointer"
          to={`/shop/${seller._id}`}
        >
          {/* <p className="text-sm font-semibold text-black text-opacity-70">
            {seller?.name}
          </p> */}
          <img
            src={`${seller.avatar?.url}`}
            alt=""
            className="w-[35px] h-[35px] rounded-full border-[3px] border-theme border-opacity-50"
          />
        </Link>
      </div>
    </div>
  );
};

export default DashboardHeader;
