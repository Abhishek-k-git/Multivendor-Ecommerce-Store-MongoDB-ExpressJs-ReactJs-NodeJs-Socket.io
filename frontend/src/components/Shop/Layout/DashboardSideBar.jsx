import React from "react";
import { FiPackage } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";

import { SlEarphones } from "react-icons/sl";
import { MdOutlineNewLabel } from "react-icons/md";
import { BsCalendar2Event } from "react-icons/bs";
import { TbTimelineEventPlus } from "react-icons/tb";
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdForwardToInbox } from "react-icons/md";
import { RiCoupon3Line } from "react-icons/ri";
import { RiRefund2Fill } from "react-icons/ri";

const DashboardSideBar = ({ active }) => {
  return (
    <div className="w-full flex flex-col gap-y-6 z-10">
      <Link
        to="/dashboard"
        className={`flex flex-row items-center text-sm gap-4 cursor pointer hover:text-theme ${
          active === 1 ? "text-failure" : "text-black"
        }`}
      >
        <RxDashboard size={20} />
        <h5 className="hidden md:block">Dashboard</h5>
      </Link>
      <Link
        to="/dashboard-orders"
        className={`flex flex-row items-center text-sm gap-4 cursor pointer hover:text-theme ${
          active === 2 ? "text-failure" : "text-black"
        }`}
      >
        <FiPackage size={20} />
        <h5 className="hidden md:block">Orders</h5>
      </Link>
      <Link
        to="/dashboard-products"
        className={`flex flex-row items-center text-sm gap-4 cursor pointer hover:text-theme ${
          active === 3 ? "text-failure" : "text-black"
        }`}
      >
        <SlEarphones size={18} />
        <h5 className="hidden md:block">Products</h5>
      </Link>
      <Link
        to="/dashboard-create-product"
        className={`flex flex-row items-center text-sm gap-4 cursor pointer hover:text-theme ${
          active === 4 ? "text-failure" : "text-black"
        }`}
      >
        <MdOutlineNewLabel size={20} />
        <h5 className="hidden md:block">Add Product</h5>
      </Link>
      <Link
        to="/dashboard-events"
        className={`flex flex-row items-center text-sm gap-4 cursor pointer hover:text-theme ${
          active === 5 ? "text-failure" : "text-black"
        }`}
      >
        <BsCalendar2Event size={18} />
        <h5 className="hidden md:block">Events</h5>
      </Link>
      <Link
        to="/dashboard-create-event"
        className={`flex flex-row items-center text-sm gap-4 cursor pointer hover:text-theme ${
          active === 6 ? "text-failure" : "text-black"
        }`}
      >
        <TbTimelineEventPlus size={20} />
        <h5 className="hidden md:block">Add Event</h5>
      </Link>
      <Link
        to="/dashboard-withdraw-money"
        className={`flex flex-row items-center text-sm gap-4 cursor pointer hover:text-theme ${
          active === 7 ? "text-failure" : "text-black"
        }`}
      >
        <BiMoneyWithdraw size={20} />
        <h5 className="hidden md:block">Balance</h5>
      </Link>
      <Link
        to="/dashboard-messages"
        className={`flex flex-row items-center text-sm gap-4 cursor pointer hover:text-theme ${
          active === 8 ? "text-failure" : "text-black"
        }`}
      >
        <MdForwardToInbox size={20} />
        <h5 className="hidden md:block">Inbox</h5>
      </Link>
      <Link
        to="/dashboard-coupouns"
        className={`flex flex-row items-center text-sm gap-4 cursor pointer hover:text-theme ${
          active === 9 ? "text-failure" : "text-black"
        }`}
      >
        <RiCoupon3Line size={20} />
        <h5 className="hidden md:block">Coupons</h5>
      </Link>
      <Link
        to="/dashboard-refunds"
        className={`flex flex-row items-center text-sm gap-4 cursor pointer hover:text-theme ${
          active === 10 ? "text-failure" : "text-black"
        }`}
      >
        <RiRefund2Fill size={20} />
        <h5 className="hidden md:block">Refunds</h5>
      </Link>
      <Link
        to="/settings"
        className={`flex flex-row items-center text-sm gap-4 cursor pointer hover:text-theme ${
          active === 11 ? "text-failure" : "text-black"
        }`}
      >
        <CiSettings size={20} />
        <h5 className="hidden md:block">Settings</h5>
      </Link>
    </div>
  );
};

export default DashboardSideBar;
