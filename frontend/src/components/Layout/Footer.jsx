import React from "react";
import { Link } from "react-router-dom";
import {
  footershop,
  footercompany,
  footersupport,
} from "../../static/data.jsx";
import IconButton from "@mui/material/IconButton";
import { FaLinkedinIn } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import Payments from "../../assets/images/payments.jpg";

const Footer = () => {
  return (
    <div className="w-full pt-4">
      {/* footer links */}
      <div className="w-full p-4 bg-black text-white grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-10">
        {/* company */}
        <ul className="text-start">
          <h1 className="mb-2 text-sm font-semibold">Company</h1>
          {footercompany.map((link, index) => (
            <li key={index}>
              <Link
                className="text-white hover:text-theme text-xs leading-10 underline"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        {/* shop */}
        <ul className="text-start">
          <h1 className="mb-2 text-sm font-semibold">Shop</h1>
          {footershop.map((link, index) => (
            <li key={index}>
              <Link
                className="text-white hover:text-theme text-xs leading-10 underline"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        {/* support */}
        <ul className="text-start">
          <h1 className="mb-2 text-sm font-semibold">Support</h1>
          {footersupport.map((link, index) => (
            <li key={index}>
              <Link
                className="text-white hover:text-theme text-xs leading-10 underline"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        {/* social links */}
        <ul className="flex flex-row gap-4 mr-4">
          <Link
            to="https://www.linkedin.com/in/abhishek--kr/"
            className="cursor-pointer"
          >
            <IconButton className="text-white hover:text-theme">
              <FaLinkedinIn className="text-white hover:text-theme" size={20} />
            </IconButton>
          </Link>
          <Link
            to="https://github.com/Abhishek-k-git/"
            className="cursor-pointer"
          >
            <IconButton className="text-white hover:text-theme">
              <FiGithub className="text-white hover:text-theme" size={20} />
            </IconButton>
          </Link>
          <Link
            to="https://leetcode.com/Abhishek66029/"
            className="cursor-pointer"
          >
            <IconButton className="text-white hover:text-theme">
              <SiLeetcode className="text-white hover:text-theme" size={20} />
            </IconButton>
          </Link>
        </ul>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-2
         text-center py-2 bg-theme text-xs text-white"
      >
        <span>© 2020 Abhishek kumar. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <div className="max-w-[180px] mx-auto">
          <img className="w-full object-contain" src={Payments} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
