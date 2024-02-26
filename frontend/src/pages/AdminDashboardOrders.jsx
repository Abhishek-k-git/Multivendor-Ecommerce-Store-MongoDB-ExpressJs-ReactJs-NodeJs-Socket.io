import React, { useEffect } from "react";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfAdmin } from "../redux/actions/order";

const AdminDashboardOrders = () => {
  const dispatch = useDispatch();

  const { adminOrders, adminOrderLoading } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
  }, []);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 4 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 3,
      cellClassName: (params) => {
        return params.row["status"] === "Delivered"
          ? "text-green-600"
          : "text-red-600";
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
        total: " ₹" + item?.totalPrice,
        status: item?.status,
        createdAt: item?.createdAt.slice(0, 10),
      });
    });
  return (
    <>
      <div className="w-full flex flex-row">
        <div className="w-[40px] md:w-[25%] lg:w-[20%]">
          <div className="w-full py-4 px-2 md:px-4 shadow-xl md:shadow-none rounded-md mt-2">
            <AdminSideBar active={2} />
          </div>
        </div>
        <div className="w-side md:w-[75%] lg:w-[80%]">
          <div className="w-full mt-6">
            <h1 className="text-base font-semibold text-black text-opacity-70 my-2 mb-6">
              All Orders
            </h1>
            <DataGrid
              rows={row}
              columns={columns}
              pageSize={4}
              disableSelectionOnClick
              autoHeight
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardOrders;
