import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Button, IconButton } from "@mui/material";
import { RxCross1 } from "react-icons/rx";
// import axios from "axios";
import { server } from "../../const.js";
import { toast } from "react-toastify";
import { getAllSellers } from "../../redux/actions/sellers";
import { Link } from "react-router-dom";

const AllSellers = () => {
  const dispatch = useDispatch();
  const { sellers } = useSelector((state) => state.seller);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    dispatch(getAllSellers());
  }, [dispatch]);

  const handleDelete = async (id) => {
    fetch(`${server}/shop/delete-seller/${id}`, {
      method: "DELETE",
      credentials: "include",
    }).then((res) => {
      toast.success(res.data.message);
    });

    dispatch(getAllSellers());
  };

  const columns = [
    { field: "id", headerName: "Seller ID", minWidth: 150, flex: 4 },

    {
      field: "name",
      headerName: "name",
      minWidth: 130,
      flex: 3,
    },
    {
      field: "email",
      headerName: "Email",
      type: "text",
      minWidth: 130,
      flex: 3,
    },
    {
      field: "address",
      headerName: "Seller Address",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "joinedAt",
      headerName: "joinedAt",
      type: "text",
      minWidth: 130,
      flex: 3,
    },
    {
      field: "  ",
      flex: 1,
      minWidth: 80,
      headerName: "Preview Shop",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/shop/preview/${params.id}`}>
              <Button>
                <AiOutlineEye size={18} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: " ",
      flex: 1,
      minWidth: 80,
      headerName: "Delete Seller",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => setUserId(params.id) || setOpen(true)}>
              <AiOutlineDelete color="red" size={18} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];
  sellers &&
    sellers.forEach((item) => {
      row.push({
        id: item._id,
        name: item?.name,
        email: item?.email,
        joinedAt: item.createdAt.slice(0, 10),
        address: item.address,
      });
    });

  return (
    <div className="w-full">
      <div className="w-full mt-6">
        <h1 className="text-base font-semibold text-black text-opacity-70 my-2 mb-6">
          All Sellers
        </h1>
        <div className="w-full">
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
                Are you sure you wanna delete this seller?
              </h3>
              <div className="w-full flex items-center justify-center gap-4 py-4">
                <div
                  className="bg-white border border-black border-opacity-30 shadow-sm text-sm cursor-pointer px-6 py-3"
                  onClick={() => setOpen(false)}
                >
                  cancel
                </div>
                <div
                  className="bg-failure text-white text-sm cursor-pointer px-6 py-3"
                  onClick={() => setOpen(false) || handleDelete(userId)}
                >
                  confirm
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllSellers;
