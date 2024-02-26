import React from "react";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import AllEvents from "../components/Admin/AllEvents";

const AdminDashboardEvents = () => {
  return (
    <>
      <div className="w-full flex flex-row">
        <div className="w-[40px] md:w-[25%] lg:w-[20%]">
          <div className="w-full py-4 px-2 md:px-4 shadow-xl md:shadow-none rounded-md mt-2">
            <AdminSideBar active={6} />
          </div>
        </div>
        <div className="w-side md:w-[75%] lg:w-[80%] ">
          <div className="w-full">
            <AllEvents />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardEvents;
