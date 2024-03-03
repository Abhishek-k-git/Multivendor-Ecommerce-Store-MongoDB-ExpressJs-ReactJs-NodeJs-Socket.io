import { Button, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layout/Loader";
import { server } from "../../const.js";
import { toast } from "react-toastify";

const AllCoupons = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [coupouns, setCoupouns] = useState([]);
  const [minAmount, setMinAmout] = useState(199);
  const [maxAmount, setMaxAmount] = useState(5999);
  const [selectedProducts, setSelectedProducts] = useState("");
  const [value, setValue] = useState(10);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${server}/coupon/get-coupon/${seller._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoading(false);
        setCoupouns(res.data.couponCodes);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [dispatch]);

  const handleDelete = async (id) => {
    axios
      .delete(`${server}/coupon/delete-coupon/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success("Coupon code deleted succesfully!");
      });
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/coupon/create-coupon-code`,
        {
          name,
          minAmount,
          maxAmount,
          selectedProducts,
          value,
          shopId: seller._id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Coupon code created successfully!");
        setOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const columns = [
    { field: "id", headerName: "Id", minWidth: 150, flex: 4 },
    {
      field: "name",
      headerName: "Coupon Code",
      minWidth: 150,
      flex: 4,
    },
    {
      field: "price",
      headerName: "Value",
      minWidth: 100,
      flex: 2,
    },
    {
      field: "Delete",
      flex: 1,
      minWidth: 80,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={18} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  coupouns &&
    coupouns.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: item.value + " %",
        sold: 10,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full">
          <div className="w-full flex items-center justify-between mb-4">
            <h1 className="text-base font-semibold text-black text-opacity-70 mt-4 mb-6">
              All Coupons
            </h1>
            <div
              className="bg-black text-white px-4 py-2 text-sm cursor-pointer"
              onClick={() => setOpen(true)}
            >
              Create Coupon
            </div>
          </div>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-30 z-40 flex items-center justify-center">
              <div className="w-[90%] max-w-[400px] rounded-xl shadow-lg bg-white p-4 md:p-6 overflow-x-auto">
                <div className="w-full flex justify-between items-center mb-4">
                  <h5 className="text-md font-semibold text-black text-opacity-90">
                    Create Coupon code
                  </h5>
                  <div
                    className="w-8 h-8 cursor-pointer rounded-full"
                    onClick={() => setOpen(false)}
                  >
                    <IconButton>
                      <RxCross1 size={20} />
                    </IconButton>
                  </div>
                </div>

                {/* create coupoun code */}
                <form
                  className="flex flex-col w-full gap-4 text-sm"
                  onSubmit={handleSubmit}
                  aria-required={true}
                >
                  <div className="w-full flex flex-col gap-1">
                    <label className="text-sm text-black text-opacity-70">
                      Code Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={name}
                      className="border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="GET10"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-1">
                    <label className="text-sm text-black text-opacity-70">
                      Discount Percentenge
                    </label>
                    <input
                      type="number"
                      name="value"
                      value={value}
                      required
                      className="border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="10"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-1">
                    <label className="text-sm text-black text-opacity-70">
                      Min Amount ₹
                    </label>
                    <input
                      type="number"
                      name="value"
                      value={minAmount}
                      className="border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
                      onChange={(e) => setMinAmout(e.target.value)}
                      placeholder="1299"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-1">
                    <label className="text-sm text-black text-opacity-70">
                      Max Amount ₹
                    </label>
                    <input
                      type="number"
                      name="value"
                      value={maxAmount}
                      className="border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
                      onChange={(e) => setMaxAmount(e.target.value)}
                      placeholder="5999"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-1">
                    <label className="text-sm text-black text-opacity-70">
                      Selected Product
                    </label>
                    <select
                      className="border border-black text-sm border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
                      value={selectedProducts}
                      onChange={(e) => setSelectedProducts(e.target.value)}
                    >
                      <option
                        className="text-sm text-black"
                        value="Choose your selected products"
                      >
                        Selected product
                      </option>
                      {products &&
                        products.map((i, index) => (
                          <option
                            className="text-xs truncate"
                            value={i.name}
                            key={i._id}
                          >
                            {i._id}
                          </option>
                        ))}
                    </select>
                  </div>
                  <input
                    type="submit"
                    value="Create"
                    className="w-full border border-success text-center text-success rounded-sm cursor-pointer text-sm p-3 my-4"
                  />
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllCoupons;
