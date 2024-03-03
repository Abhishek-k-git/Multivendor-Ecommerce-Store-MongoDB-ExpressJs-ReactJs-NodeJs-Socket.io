import React from "react";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import { server } from "../../const.js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ProfileSidebar = ({ setActive, active }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const logoutHandler = () => {
    fetch(`${server}/user/logout`, {
      credentials: "include",
    })
      .then((res) => {
        const localStorageNames = ["cartItems", "latestOrder", "wishlistItems"];
        for (const localStorageName of localStorageNames) {
          if (window.localStorage.getItem(localStorageName)) {
            window.localStorage.removeItem(localStorageName);
          }
        }
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  return (
    <div className="w-full flex flex-col gap-y-6 z-10">
      <div
        className="flex flex-row items-center text-sm gap-4 cursor-pointer hover:text-theme"
        onClick={() => setActive(1)}
      >
        <RxPerson size={20} color={active === 1 ? "red" : ""} />
        <span
          className={`${active === 1 ? "text-failure" : ""} md:block hidden`}
        >
          Profile
        </span>
      </div>
      <div
        className="flex flex-row items-center text-sm gap-4 cursor-pointer hover:text-theme"
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />
        <span
          className={`${active === 2 ? "text-failure" : ""} md:block hidden`}
        >
          Orders
        </span>
      </div>
      <div
        className="flex flex-row items-center text-sm gap-4 cursor-pointer hover:text-theme"
        onClick={() => setActive(3)}
      >
        <HiOutlineReceiptRefund size={20} color={active === 3 ? "red" : ""} />
        <span
          className={`${active === 3 ? "text-failure" : ""} md:block hidden`}
        >
          Refunds
        </span>
      </div>

      <div
        className="flex flex-row items-center text-sm gap-4 cursor-pointer hover:text-theme"
        onClick={() => setActive(4) || navigate("/inbox")}
        // onClick={() => setActive(4)}
      >
        <AiOutlineMessage size={20} color={active === 4 ? "red" : ""} />
        <span
          className={`${active === 4 ? "text-failure" : ""} md:block hidden`}
        >
          Inbox
        </span>
      </div>

      <div
        className="flex flex-row items-center text-sm gap-4 cursor-pointer hover:text-theme"
        onClick={() => setActive(5)}
      >
        <MdOutlineTrackChanges size={20} color={active === 5 ? "red" : ""} />
        <span
          className={`${active === 5 ? "text-failure" : ""} md:block hidden`}
        >
          Track Order
        </span>
      </div>

      <div
        className="flex flex-row items-center text-sm gap-4 cursor-pointer hover:text-theme"
        onClick={() => setActive(6)}
      >
        <RiLockPasswordLine size={20} color={active === 6 ? "red" : ""} />
        <span
          className={`${active === 6 ? "text-failure" : ""} md:block hidden`}
        >
          Change Password
        </span>
      </div>

      <div
        className="flex flex-row items-center text-sm gap-4 cursor-pointer hover:text-theme"
        onClick={() => setActive(7)}
      >
        <TbAddressBook size={20} color={active === 7 ? "red" : ""} />
        <span
          className={`${active === 7 ? "text-failure" : ""} md:block hidden`}
        >
          Address
        </span>
      </div>

      {user && user?.role === "Admin" && (
        <Link to="/admin/dashboard">
          <div
            className="flex flex-row items-center text-sm gap-4 cursor-pointer hover:text-theme"
            onClick={() => setActive(8)}
          >
            <MdOutlineAdminPanelSettings
              size={20}
              color={active === 7 ? "red" : ""}
            />
            <span
              className={`${
                active === 8 ? "text-failure" : ""
              } md:block hidden`}
            >
              Admin Dashboard
            </span>
          </div>
        </Link>
      )}
      <div
        className="single_item flex flex-row items-center text-sm gap-4 cursor-pointer hover:text-theme"
        onClick={logoutHandler}
      >
        <AiOutlineLogin size={20} color={active === 8 ? "red" : ""} />
        <span
          className={`${active === 8 ? "text-failure" : ""} md:block hidden`}
        >
          Log out
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
