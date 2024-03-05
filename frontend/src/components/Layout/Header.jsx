import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { categoriesData } from "../../static/data.jsx";
import IconButton from "@mui/material/IconButton";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown.jsx";
import Navbar from "./Navbar.jsx";
import { useSelector } from "react-redux";
import Cart from "../cart/Cart.jsx";
import Wishlist from "../Wishlist/Wishlist.jsx";
import { RxCross1 } from "react-icons/rx";
import { IoLogoVk } from "react-icons/io";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

const Header = ({ activeHeading }) => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);

    if (term.length === 0) {
      setSearchData("");
    }
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      {/* large devices */}
      {/* logo-nav */}
      <div className="hidden md:h-[50px] md:flex items-center justify-between p-4 bg-white border-b border-black border-opacity-10 z-20">
        {/* logo */}
        <Link to="/">
          <IoLogoVk className="text-theme h-10 w-10 text-opacity-70" />
        </Link>
        {/* search product */}
        <div className="relative flex items-center w-[50%] h-12 rounded-lg text-sm font-base">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <AiOutlineSearch size={20} className="text-black text-opacity-40" />
          </div>
          <input
            className="h-full w-full outline-none text-sm text-gray-700 pr-2"
            type="search"
            placeholder="Search Product..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchData && searchData.length !== 0 ? (
            <div className="absolute w-full h-auto top-[40px] max-h-[300px] bg-white shadow-2xl rounded-xl z-10 p-2 overflow-y-auto">
              {searchData &&
                searchData.map((i, index) => {
                  return (
                    <Link key={index} to={`/product/${i._id}`}>
                      <div className="flex items-center gap-2 p-1 rounded-xl hover:bg-theme hover:bg-opacity-5">
                        <img
                          src={`${i.images[0]?.url}`}
                          alt=""
                          className="w-[40px] h-[40px] object-contain rounded-sm"
                        />
                        <p className="truncate">{i.name}</p>
                      </div>
                    </Link>
                  );
                })}
            </div>
          ) : null}
        </div>
        {/* become seller / go to dashboard */}
        <button className="bg-theme text-white py-1 pl-3 rounded-full text-sm hover:bg-opacity-80 active:bg-opacity-90">
          <Link
            className="flex items-center justify-center"
            to={`${isSeller ? "/dashboard" : "/shop-create"}`}
          >
            {isSeller ? (
              <span className="flex items-center justify-center">
                Dashboard{" "}
                <MdKeyboardArrowRight
                  size={20}
                  className="w-6 h-6 rounded-full bg-white bg-opacity-30 mx-1"
                />
              </span>
            ) : (
              <span className="flex items-center justify-center">
                Become Seller{" "}
                <MdKeyboardArrowRight
                  size={20}
                  className="w-6 h-6 rounded-full bg-white bg-opacity-30 mx-1"
                />
              </span>
            )}
          </Link>
        </button>
      </div>
      {/* option-nav */}
      <div
        className={`${
          active === true
            ? "shadow-md fixed top-0 right-1/2 translate-x-1/2"
            : null
        } transition hidden md:flex items-center justify-between w-full max-w-7xl text-sm bg-white h-[60px] px-4 z-20`}
      >
        <div className="w-full flex items-center justify-between">
          {/* select-category */}
          <div className="relative" onClick={() => setDropDown(!dropDown)}>
            <div className="flex justify-between items-center text-black text-opacity-60 gap-4 p-2 cursor-pointer border border-black border-opacity-10 rounded-md select-none">
              <button>Categories</button>
              <MdKeyboardArrowDown
                size={22}
                className="text-black text-opacity-50"
              />
            </div>
            {/* {dropDown ? ( */}
            <div className={`${dropDown ? "block" : "hidden"}`}>
              <DropDown
                categoriesData={categoriesData}
                setDropDown={setDropDown}
              />
            </div>
            {/* ) : null} */}
          </div>
          {/* navbar */}
          <div className="flex items-center">
            <Navbar active={activeHeading} isMenu={false} />
          </div>
          {/* right-options whishlist, cart, profile */}
          <div className="flex gap-3 items-center">
            {/* whishlist */}
            <IconButton
              className="cursor-pointer relative"
              onClick={() => setOpenWishlist(true)}
            >
              <AiOutlineHeart size={22} />
              <span className="absolute right-[4px] top-[6px] rounded-full bg-success text-white text-xs w-4 h-4 top right leading-tight text-center">
                {wishlist && wishlist.length}
              </span>
            </IconButton>
            {/* cart */}
            <IconButton
              className="cursor-pointer relative"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={22} />
              <span className="absolute right-[4px] top-[6px] rounded-full bg-success text-white text-xs w-4 h-4 top right leading-tight text-center">
                {cart && cart.length}
              </span>
            </IconButton>
            {/* avatar-profile */}
            <div className="cursor-pointer relative ml-1">
              {isAuthenticated ? (
                <Link to="/profile">
                  <img
                    src={`${user?.avatar?.url}`}
                    className="w-[32px] h-[32px] rounded-full border-[3px] border-theme border-opacity-50"
                    alt=""
                  />
                </Link>
              ) : (
                <Link to="/login">
                  <CgProfile size={30} />
                </Link>
              )}
            </div>

            {/* cart popup */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

            {/* wishlist popup */}
            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
        </div>
      </div>

      {/* small devices */}
      <div
        className={`${
          active === true ? "shadow-md fixed top-0 left-0" : null
        } w-full h-[60px] bg-white md:hidden flex items-center px-4 z-30`}
      >
        <div className="w-full flex items-center justify-between">
          {/* hamburger */}
          <div className="cursor-pointer">
            <BiMenuAltLeft size={30} onClick={() => setOpen(true)} />
          </div>
          {/* logo */}
          <Link to="/">
            <IoLogoVk className="text-theme h-10 w-10 text-opacity-70" />
          </Link>
          {/* cart */}
          <IconButton
            className="cursor-pointer relative"
            onClick={() => setOpenCart(true)}
          >
            <AiOutlineShoppingCart size={30} />
            <span className="absolute right-[4px] top-[6px] rounded-full bg-success text-white text-xs w-4 h-4 top right leading-tight text-center">
              {cart && cart.length}
            </span>
          </IconButton>
          {/* cart popup */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
          {/* wishlist popup */}
          {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
        </div>

        {/* sidebar */}
        {open && (
          <div className="fixed w-full z-30 h-full top-0 left-0 bg-white">
            <div className="fixed w-[70%] min-w-[320px] bg-white h-screen top-0 left-0 overflow-y-auto p-4 shadow-xl">
              <div className="w-full flex justify-between my-4">
                {/* menu-profile */}
                <div className="flex justify-center">
                  {isAuthenticated ? (
                    <Link
                      className="flex items-center justify-between gap-2"
                      to="/profile"
                    >
                      <span>
                        <img
                          src={`${user.avatar?.url}`}
                          alt=""
                          className="w-[45px] h-[45px] rounded-full border-[3px] border-theme border-opacity-50"
                        />
                      </span>
                      <span className="flex flex-col leading-5">
                        <span className="text-sm font-semibold text-black text-opacity-80">
                          {user.name}
                          <small className="font-bold text-failure text-opacity-80 mx-2">
                            {user.role}
                          </small>
                        </span>
                        <span className="text-sm font-semibold text-black text-opacity-50">
                          {user.email}
                        </span>
                      </span>
                    </Link>
                  ) : (
                    <>
                      <Link to="/login" className="text-sm text-black m-2">
                        Login
                      </Link>
                      <span className="m-2 text-sm">or</span>
                      <Link to="/sign-up" className="text-sm text-black m-2">
                        Signup
                      </Link>
                    </>
                  )}
                </div>
                {/* menu-close */}
                <IconButton
                  className="cursor-pointer w-10 h-10"
                  onClick={() => setOpen(false)}
                >
                  <RxCross1 size={22} />
                </IconButton>
              </div>
              {/* menu-searchbar */}
              <div className="relative flex flex-col">
                <div className="relative w-full rounded-lg my-4">
                  <input
                    className="text-black w-full outline-none text-sm placeholder:text-black placeholder:text-opacity-60 py-2 px-4 pl-8"
                    type="search"
                    placeholder="Search Product..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <div className="absolute top-2 left-1">
                    <AiOutlineSearch
                      size={20}
                      className="text-black text-opacity-40"
                    />
                  </div>
                </div>
                <div className="w-[90vw] max-w-[300px] top-[60px] right-1/2 translate-x-1/2 absolute">
                  {searchData && searchData.length !== 0 ? (
                    <div className="w-full max-h-[70vh] bg-white shadow-2xl rounded-xl z-[100] p-2 overflow-y-auto">
                      {searchData &&
                        searchData.map((i, index) => {
                          return (
                            <Link key={index} to={`/product/${i._id}`}>
                              <div className="flex items-center gap-2 p-2 my-2 rounded-xl hover:bg-theme hover:bg-opacity-5">
                                <img
                                  src={`${i.images[0]?.url}`}
                                  alt=""
                                  className="w-[14px] h-[14px] object-contain rounded-sm"
                                />
                                <p className="truncate text-sm">{i.name}</p>
                              </div>
                            </Link>
                          );
                        })}
                    </div>
                  ) : null}
                </div>
              </div>
              {/* menu-navbar */}
              <Navbar active={activeHeading} isMenu={true} />
              <div className="flex flex-row items-center justify-between my-4">
                {/* become seller / go to dashboard */}
                <button className="bg-theme text-white py-2 pl-3 rounded-full text-sm hover:bg-opacity-80 active:bg-opacity-90">
                  <Link
                    className="flex items-center justify-center"
                    to={`${isSeller ? "/dashboard" : "/shop-create"}`}
                  >
                    {isSeller ? (
                      <span className="flex items-center justify-center">
                        Dashboard{" "}
                        <MdKeyboardArrowRight
                          size={20}
                          className="w-6 h-6 rounded-full bg-white bg-opacity-30 mx-1"
                        />
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        Become Seller{" "}
                        <MdKeyboardArrowRight
                          size={20}
                          className="w-6 h-6 rounded-full bg-white bg-opacity-30 mx-1"
                        />
                      </span>
                    )}
                  </Link>
                </button>
                {/* menu-wishlist */}
                <IconButton
                  className="relative"
                  onClick={() => setOpenWishlist(true) || setOpen(false)}
                >
                  <AiOutlineHeart size={30} />
                  <span className="absolute right-[6px] top-[6px] rounded-full bg-success w-4 h-4 top right text-xs text-white text-center">
                    {wishlist && wishlist.length}
                  </span>
                </IconButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
