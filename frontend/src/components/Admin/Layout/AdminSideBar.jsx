import { Link } from "react-router-dom";
import React from "react";
import { FiPackage } from "react-icons/fi";
import { GrWorkshop } from "react-icons/gr";
import { RxDashboard } from "react-icons/rx";
import { CiSettings } from "react-icons/ci";
import { HiOutlineUserGroup } from "react-icons/hi";
import { SlEarphones } from "react-icons/sl";
import { TbTimelineEventPlus } from "react-icons/tb";
import { BiMoneyWithdraw } from "react-icons/bi";

const AdminSideBar = ({ active }) => {
  return (
    <div className="w-full flex flex-col gap-y-6 z-10">
      <Link
        to="/admin/dashboard"
        className={`flex flex-row items-center text-sm gap-4 cursor pointer hover:text-theme ${
          active === 1 ? "text-failure" : "text-black"
        }`}
      >
        <RxDashboard size={20} />
        <h5 className="hidden md:block">Dashboard</h5>
      </Link>
      <Link
        to="/admin-orders"
        className={`flex flex-row items-center text-sm gap-4 cursor pointer hover:text-theme ${
          active === 2 ? "text-failure" : "text-black"
        }`}
      >
        <FiPackage size={20} />
        <h5 className="hidden md:block">Orders</h5>
      </Link>
      <Link
        to="/admin-sellers"
        className={`flex flex-row items-center text-sm gap-4 cursor pointer hover:text-theme ${
          active === 3 ? "text-failure" : "text-black"
        }`}
      >
        <GrWorkshop size={18} />
        <h5 className="hidden md:block">Sellers</h5>
      </Link>
      <Link
        to="/admin-users"
        className={`flex flex-row items-center text-sm gap-4 cursor pointer hover:text-theme ${
          active === 4 ? "text-failure" : "text-black"
        }`}
      >
        <HiOutlineUserGroup size={20} />
        <h5 className="hidden md:block">Users</h5>
      </Link>
      <Link
        to="/admin-products"
        className={`flex flex-row items-center text-sm gap-4 cursor pointer hover:text-theme ${
          active === 5 ? "text-failure" : "text-black"
        }`}
      >
        <SlEarphones size={18} />
        <h5 className="hidden md:block">Products</h5>
      </Link>
      <Link
        to="/admin-events"
        className={`flex flex-row items-center text-sm gap-4 cursor pointer hover:text-theme ${
          active === 6 ? "text-failure" : "text-black"
        }`}
      >
        <TbTimelineEventPlus size={20} />
        <h5 className="hidden md:block">Events</h5>
      </Link>
      <Link
        to="/admin-withdraw-request"
        className={`flex flex-row items-center text-sm gap-4 cursor pointer hover:text-theme ${
          active === 7 ? "text-failure" : "text-black"
        }`}
      >
        <BiMoneyWithdraw size={20} />
        <h5 className="hidden md:block">Withdrawals</h5>
      </Link>
      <Link
        to="/profile"
        className={`flex flex-row items-center text-sm gap-4 cursor pointer hover:text-theme ${
          active === 8 ? "text-failure" : "text-black"
        }`}
      >
        <CiSettings size={20} />
        <h5 className="hidden md:block">Profile</h5>
      </Link>
    </div>
  );
};

export default AdminSideBar;
