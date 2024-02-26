import React, { useEffect } from "react";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { getAllProductsShop } from "../../redux/actions/product";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const DashboardHero = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch]);

  const availableBalance = seller?.availableBalance.toFixed(2);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 4 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 3,
      cellClassName: (params) => {
        return params.row["status"] === "Delivered"
          ? "text-success"
          : "text-failure";
      },
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      minWidth: 80,
      flex: 1,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 100,
      flex: 3,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 80,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={18} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        quantity: item.cart.reduce((acc, item) => acc + item.qty, 0),
        total: "₹ " + item.totalPrice,
        status: item.status,
      });
    });
  return (
    <div className="w-full">
      <h1 className="text-base font-semibold text-black text-opacity-70 mt-4 mb-6">
        Welcome,{" "}
        <span className="text-theme text-opacity-80">{seller?.name}</span>
      </h1>
      <div className="w-full flex flex-wrap items-stretch justify-between gap-4">
        {/* balance */}
        <div className="flex flex-col items-center justify-center border border-theme border-opacity-15 rounded-lg p-4 grow min-w-[10px] max:w-[400px]">
          <h2 className="text-sm font-semibold text-black">
            Account Balance
            <small className="text-xs text-failure font-base flex flex-row justify-center items-center gap-1">
              <AiOutlineMoneyCollect size={14} />
              4% charge
            </small>
          </h2>
          <h3 className="text-2xl text-success my-4">₹{availableBalance}</h3>
          <Link to="/dashboard-withdraw-money">
            <h5 className="text-theme text-opacity-70 hover:text-opacity-90 text-sm font-semibold">
              Withdraw Money
            </h5>
          </Link>
        </div>
        {/* all products */}
        <div className="flex flex-col items-center justify-center border border-theme border-opacity-15 rounded-lg p-4 grow min-w-[10px] max:w-[400px]">
          <h2 className="text-sm font-semibold text-black">Total Products</h2>
          <h3 className="text-2xl text-success my-4">
            {products && products.length}
          </h3>
          <Link to="/dashboard-products">
            <h5 className="text-theme text-opacity-70 hover:text-opacity-90 text-sm font-semibold">
              All Products
            </h5>
          </Link>
        </div>
        {/* all orders */}
        <div className="flex flex-col items-center justify-center border border-theme border-opacity-15 rounded-lg p-4 grow min-w-[10px] max:w-[400px]">
          <h2 className="text-sm font-semibold text-black">Total Orders</h2>
          <h3 className="text-2xl text-success my-4">
            {orders && orders.length}
          </h3>
          <Link to="/dashboard-orders">
            <h5 className="text-theme text-opacity-70 hover:text-opacity-90 text-sm font-semibold">
              All Orders
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
  );
};

export default DashboardHero;
