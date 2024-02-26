import React from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../static/data.jsx";

const Navbar = ({ active, isMenu = false }) => {
  return (
    <div className="block md:flex items-center justify-center">
      {isMenu === false ? (
        <div className="flex gap-6 lg:gap-10">
          {navItems &&
            navItems.map((i, index) => (
              <div key={index}>
                <Link
                  to={i.url}
                  className={`text-opacity-70 ${
                    active === index + 1 ? "text-success" : "text-black"
                  } cursor-pointer}`}
                >
                  {i.title}
                </Link>
              </div>
            ))}
        </div>
      ) : (
        <div className="flex flex-col gap-y-4">
          {navItems &&
            navItems.map((i, index) => (
              <div key={index}>
                <Link
                  to={i.url}
                  className={`flex w-[200px] text-opacity-70 text-sm font-semibold p-2 hover:bg-theme hover:bg-opacity-10 ${
                    active === index + 1 ? "text-success" : "text-black"
                  } cursor-pointer}`}
                >
                  {i.title}
                </Link>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
