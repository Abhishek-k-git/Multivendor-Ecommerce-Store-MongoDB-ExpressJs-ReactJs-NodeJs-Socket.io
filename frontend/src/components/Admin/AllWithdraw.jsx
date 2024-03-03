// import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../const.js";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { BsPencil } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import { IconButton } from "@mui/material";

const AllWithdraw = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [withdrawData, setWithdrawData] = useState();
  const [withdrawStatus, setWithdrawStatus] = useState("Processing");

  useEffect(() => {
    fetch(`${server}/withdraw/get-all-withdraw-request`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        setData(res.data.withdraws);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);

  const columns = [
    { field: "id", headerName: "Withdraw Id", minWidth: 150, flex: 4 },
    {
      field: "name",
      headerName: "Shop Name",
      minWidth: 180,
      flex: 5,
    },
    {
      field: "shopId",
      headerName: "Shop Id",
      minWidth: 180,
      flex: 5,
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 100,
      flex: 2,
    },
    {
      field: "status",
      headerName: "status",
      type: "text",
      minWidth: 80,
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Request given at",
      type: "number",
      minWidth: 130,
      flex: 3,
    },
    {
      field: " ",
      headerName: "Update Status",
      type: "number",
      minWidth: 130,
      flex: 3,
      renderCell: (params) => {
        return (
          <BsPencil
            size={18}
            className="text-theme text-center cursor-pointer"
            onClick={() => setOpen(true) || setWithdrawData(params.row)}
          />
        );
      },
    },
  ];

  const handleSubmit = async () => {
    await fetch(
      `${server}/withdraw/update-withdraw-request/${withdrawData.id}`,
      {
        method: "PUT",
        body: JSON.stringify({ sellerId: withdrawData.shopId }),
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
      }
    ).then((res) => {
      toast.success("Withdraw request updated successfully!");
      setData(res.data.withdraws);
      setOpen(false);
    });
  };

  const row = [];

  data &&
    data.forEach((item) => {
      row.push({
        id: item._id,
        shopId: item.seller._id,
        name: item.seller.name,
        amount: "₹" + item.amount,
        status: item.status,
        createdAt: item.createdAt.slice(0, 10),
      });
    });
  return (
    <div className="w-full">
      <div className="w-full mt-6">
        <h1 className="text-base font-semibold text-black text-opacity-70 my-2 mb-6">
          All Withdrawals
        </h1>
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
      {open && (
        <div className="w-full fixed top-0 left-0 z-40 bg-black bg-opacity-30 flex items-center justify-center h-screen">
          <div className="w-[95%] max-w-[400px] bg-white rounded shadow p-5 overflow-y-auto">
            <div className="w-full flex justify-end">
              <IconButton
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              >
                <RxCross1 size={18} />
              </IconButton>
            </div>
            <h3 className="text-sm font-semibold text-center py-2">
              Update Status
            </h3>
            <select
              name="status"
              onChange={(e) => setWithdrawStatus(e.target.value)}
              className="w-full text-sm border border-black border-opacity-30 shadow-sm p-2"
            >
              <option className="text-sm" value={withdrawStatus}>
                {withdrawData.status}
              </option>
              <option className="text-sm" value={withdrawStatus}>
                Succeed
              </option>
            </select>
            <button
              type="submit"
              className="text-sm bg-black text-white px-6 py-2 my-4 items-center"
              onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllWithdraw;
