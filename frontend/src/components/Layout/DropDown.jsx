import React from "react";
import { useNavigate } from "react-router-dom";

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();
  const submitHandle = (i) => {
    navigate(`/products?category=${i.title}`);
    setDropDown(false);
    window.location.reload();
  };
  return (
    <div className="whitespace-nowrap w-[220px] p-2 bg-white shadow-lg absolute left-0 z-30 select-none rounded-xl">
      {categoriesData &&
        categoriesData.map((i, index) => (
          <div
            key={index}
            className="flex items-center hover:bg-theme hover:bg-opacity-10 my-2 p-2 rounded-md gap-2"
            onClick={() => submitHandle(i)}
          >
            <img
              src={i.image_Url}
              style={{
                width: "25px",
                height: "25px",
                objectFit: "contain",
              }}
              alt=""
            />
            <h3 className="">{i.title}</h3>
          </div>
        ))}
    </div>
  );
};

export default DropDown;
