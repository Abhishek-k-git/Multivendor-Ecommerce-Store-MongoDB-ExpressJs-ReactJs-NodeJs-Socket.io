import React, { useEffect, useState } from "react";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfAdmin } from "../../redux/actions/order";
import Loader from "../Layout/Loader";
import { getAllSellers } from "../../redux/actions/sellers";
import { getAllUsers } from "../../redux/actions/user";

const AdminDashboardMain = () => {
  const dispatch = useDispatch();

  const { adminOrders, adminOrderLoading } = useSelector(
    (state) => state.order
  );
  const { sellers } = useSelector((state) => state.seller);
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
    dispatch(getAllSellers());
    dispatch(getAllUsers());
  }, []);

  const adminEarning =
    adminOrders &&
    adminOrders.reduce((acc, item) => acc + item.totalPrice * 0.1, 0);

  const adminBalance = adminEarning?.toFixed(2);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 4 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 3,
      cellClassName: (params) => {
        return params.row["status"] === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      minWidth: 130,
      flex: 3,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 3,
    },
    {
      field: "createdAt",
      headerName: "Order Date",
      type: "number",
      minWidth: 130,
      flex: 3,
    },
  ];

  const row = [];
  adminOrders &&
    adminOrders.forEach((item) => {
      row.push({
        id: item._id,
        quantity: item?.cart?.reduce((acc, item) => acc + item.qty, 0),
        total: item?.totalPrice + " ₹",
        status: item?.status,
        createdAt: item?.createdAt.slice(0, 10),
      });
    });

  return (
    <>
      {adminOrderLoading ? (
        <Loader />
      ) : (
        <div className="w-full mt-6">
          <h1 className="text-base font-semibold text-black text-opacity-70 my-2 mb-6">
            Welcome to <span className="text-theme">Admin Dashboard</span>
          </h1>
          <div className="w-full flex flex-wrap items-stretch justify-between gap-4">
            {/* balance */}
            <div className="flex flex-col items-center justify-center border border-theme border-opacity-15 rounded-lg p-4 grow min-w-[10px] max:w-[400px]">
              <h2 className="text-sm font-semibold text-black">
                Total Earning
                <small className="text-xs text-failure font-base flex flex-row justify-center items-center gap-1">
                  <AiOutlineMoneyCollect size={14} />
                  4% charge
                </small>
              </h2>
              <h3 className="text-2xl text-success my-4">₹{adminBalance}</h3>
              <Link to="/admin-withdraw-request">
                <h5 className="text-theme text-opacity-70 hover:text-opacity-90 text-sm font-semibold">
                  View Withdrawals
                </h5>
              </Link>
            </div>
            {/* all sellers */}
            <div className="flex flex-col items-center justify-center border border-theme border-opacity-15 rounded-lg p-4 grow min-w-[10px] max:w-[400px]">
              <h2 className="text-sm font-semibold text-black">
                Active Sellers
              </h2>
              <h3 className="text-2xl text-success my-4">
                {sellers && sellers.length}
              </h3>
              <Link to="/admin-sellers">
                <h5 className="text-theme text-opacity-70 hover:text-opacity-90 text-sm font-semibold">
                  View Sellers
                </h5>
              </Link>
            </div>
            {/* all users */}
            <div className="flex flex-col items-center justify-center border border-theme border-opacity-15 rounded-lg p-4 grow min-w-[10px] max:w-[400px]">
              <h2 className="text-sm font-semibold text-black">Active Users</h2>
              <h3 className="text-2xl text-success my-4">
                {users && users.length}
              </h3>
              <Link to="/admin-sellers">
                <h5 className="text-theme text-opacity-70 hover:text-opacity-90 text-sm font-semibold">
                  View Users
                  {console.log(users)}
                </h5>
              </Link>
            </div>
            {/* all orders */}
            <div className="flex flex-col items-center justify-center border border-theme border-opacity-15 rounded-lg p-4 grow min-w-[10px] max:w-[400px]">
              <h2 className="text-sm font-semibold text-black">Total Orders</h2>
              <h3 className="text-2xl text-success my-4">
                {adminOrders && adminOrders.length}
              </h3>
              <Link to="/admin-orders">
                <h5 className="text-theme text-opacity-70 hover:text-opacity-90 text-sm font-semibold">
                  View Orders
                </h5>
              </Link>
            </div>
          </div>

          <h1 className="text-base font-semibold text-black text-opacity-70 mb-2 mt-6">
            Latest Orders
          </h1>
          <div className="w-full min-h-[45vh] bg-white rounded">
            <DataGrid
              rows={row}
              columns={columns}
              pageSize={5}
              disableSelectionOnClick
              autoHeight
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboardMain;
