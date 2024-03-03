import React, { useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../const.js";
import { DataGrid } from "@mui/x-data-grid";
import { Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { MdTrackChanges } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import {
  deleteUserAddress,
  loadUser,
  updatUserAddress,
  updateUserInformation,
} from "../../redux/actions/user";
import { Country, State } from "country-state-city";
import { useEffect } from "react";
import { toast } from "react-toastify";
// import axios from "axios";
import { getAllOrdersOfUser } from "../../redux/actions/order";
import UserInbox from "../../pages/UserInbox.jsx";
import { CiPhone } from "react-icons/ci";

const ProfileContent = ({ active }) => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, successMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(name, email, phoneNumber, password));
  };

  const handleImage = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        fetch(`${server}/user/update-avatar`, {
          method: "PUT",
          body: reader.result,
          credentials: "include",
        })
          .then((response) => {
            dispatch(loadUser());
            toast.success("avatar updated successfully!");
          })
          .catch((error) => {
            toast.error(error);
          });
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="w-full p-4">
      {/* profile */}
      {active === 1 && (
        <>
          <div className="flex flex-col w-full">
            <div className="w-full bg-theme bg-pattern h-20"></div>
            <div className="flex items-center justify-center">
              <div className="relative -translate-y-2/3">
                <img
                  src={`${user?.avatar?.url}`}
                  className="w-[80px] h-[80px] rounded-full object-cover border-4 border-white"
                  alt=""
                />
                <div className="w-[30px] h-[30px] bg-black bg-opacity-60 text-white rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                  <input
                    type="file"
                    id="image"
                    className="hidden"
                    onChange={handleImage}
                  />
                  <label htmlFor="image">
                    <AiOutlineCamera />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <form
            className="flex flex-col items-start text-sm gap-4 relative -translate-y-8"
            onSubmit={handleSubmit}
            aria-required={true}
          >
            <div className="w-[100%] md:w-[50%] flex flex-col gap-1">
              <label className="text-sm text-black text-opacity-70">
                Full Name
              </label>
              <input
                type="text"
                className="border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
                required
                value={name}
                placeholder="John Doe"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-[100%] md:w-[50%] flex flex-col gap-1">
              <label className="text-sm text-black text-opacity-70">
                Email Address
              </label>
              <input
                type="text"
                className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
                required
                value={email}
                placeholder="JohnDoe123@mail.co"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-[100%] md:w-[50%] flex flex-col gap-1">
              <label className="text-sm text-black text-opacity-70">
                Phone Number
              </label>
              <input
                type="number"
                className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
                required
                value={phoneNumber}
                placeholder="2837293739"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="w-[100%] md:w-[50%] flex flex-col gap-1">
              <label className="text-sm text-black text-opacity-70">
                Enter your password
              </label>
              <input
                type="password"
                className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
                required
                value={password}
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input
              className="w-[100%] md:w-[50%] border border-success text-center text-success rounded-sm cursor-pointer text-sm p-3 my-4"
              required
              value="Update"
              type="submit"
            />
          </form>
        </>
      )}

      {/* order */}
      {active === 2 && <AllOrders />}

      {/* Refund */}
      {active === 3 && <AllRefundOrders />}

      {/* Inbox */}
      {active === 4 && <UserInbox />}

      {/* Track order */}
      {active === 5 && <TrackOrder />}

      {/* Change Password */}
      {active === 6 && <ChangePassword />}

      {/*  user Address */}
      {active === 7 && <Address />}
    </div>
  );
};

const AllOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
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
          ? "text-success"
          : "text-failure";
      },
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      minWidth: 100,
      flex: 2,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
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
            <Link to={`/user/order/${params.id}`}>
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
        itemsQty: item.cart.length,
        total: "₹ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="w-full">
      <h1 className="text-base font-semibold text-black text-opacity-70 my-2 mb-6 mt-4">
        Orders
      </h1>
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={5}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const AllRefundOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

  const eligibleOrders =
    orders &&
    orders.filter(
      (item) =>
        item.status === "Processing refund" || item.status === "Refund Success"
    );

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
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 100,
      flex: 2,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
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
            <Link to={`/user/order/${params.id}`}>
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

  eligibleOrders &&
    eligibleOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "₹ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="w-full">
      <h1 className="text-base font-semibold text-black text-opacity-70 my-2 mb-6 mt-4">
        Refunds
      </h1>
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        autoHeight
        disableSelectionOnClick
      />
    </div>
  );
};

const TrackOrder = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
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
          ? "text-success"
          : "text-failure";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 100,
      flex: 2,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
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
            <Link to={`/user/track/order/${params.id}`}>
              <Button>
                <MdTrackChanges size={18} />
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
        itemsQty: item.cart.length,
        total: "₹ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <DataGrid
      rows={row}
      columns={columns}
      pageSize={10}
      disableSelectionOnClick
      autoHeight
    />
  );
};

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await fetch(`${server}/user/update-user-password`, {
      method: "PUT",
      body: JSON.stringify({ oldPassword, newPassword, confirmPassword }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        toast.success(res.data.success);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="w-full">
      <h1 className="text-base font-semibold text-black text-opacity-70 my-2 mb-6 mt-4">
        Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-start text-sm py-4 gap-4"
        >
          <div className="w-[100%] md:w-[50%] flex flex-col gap-1">
            <label className="text-sm text-black text-opacity-70">
              Old Password
            </label>
            <input
              type="password"
              className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="w-[100%] md:w-[50%] flex flex-col gap-1">
            <label className="text-sm text-black text-opacity-70">
              Enter new password
            </label>
            <input
              type="password"
              className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="w-[100%] md:w-[50%] flex flex-col gap-1">
            <label className="text-sm text-black text-opacity-70">
              Confirm new password
            </label>
            <input
              type="password"
              className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              className="w-[100%] border border-success text-center text-success rounded-sm cursor-pointer text-sm p-3 my-6"
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [address1, setAddress1] = useState("");
  const [city, setCity] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType === "" || country === "" || state === "") {
      toast.error("Please fill all the fields!");
    } else {
      dispatch(
        updatUserAddress(country, state, address1, city, zipCode, addressType)
      );
      setOpen(false);
      setCountry("");
      setState("");
      setAddress1("");
      setCity("");
      setZipCode(null);
      setAddressType("");
    }
  };

  const handleDelete = (item) => {
    const id = item._id;
    dispatch(deleteUserAddress(id));
  };

  return (
    <div className="w-full mt-4">
      {/* add new address popup */}
      {open && (
        <div className="fixed w-full h-screen bg-black bg-opacity-30 top-0 left-0 flex items-center justify-center">
          <div className="w-[90%] max-w-[400px] bg-white z-40 rounded-lg shadow-lg overflow-y-auto p-4 md:p-6">
            <div className="w-full flex justify-between items-center mb-4">
              <h5 className="text-md font-semibold text-black text-opacity-90">
                Add New Address
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
            <form
              aria-required
              onSubmit={handleSubmit}
              className="flex flex-col w-full gap-4 text-sm"
            >
              <div className="w-full flex flex-col gap-1">
                <label className="text-sm text-black text-opacity-70">
                  Country
                </label>
                <select
                  name="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="border text-sm border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
                >
                  <option className="text-sm text-black">
                    choose your country
                  </option>
                  {Country &&
                    Country.getAllCountries().map((item) => (
                      <option
                        className="text-sm text-black"
                        key={item.isoCode}
                        value={item.isoCode}
                      >
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="w-full flex flex-col gap-1">
                <label className="text-sm text-black text-opacity-70">
                  Choose your State
                </label>
                <select
                  name="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
                >
                  <option className="text-sm text-black">
                    choose your state
                  </option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option
                        className="text-sm text-black"
                        key={item.isoCode}
                        value={item.isoCode}
                      >
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="w-full flex flex-col gap-1">
                <label className="text-sm text-black text-opacity-70">
                  Address 1
                </label>
                <input
                  type="address"
                  name="address1"
                  className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
                  quired
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-col gap-1">
                <label className="text-sm text-black text-opacity-70">
                  city
                </label>
                <input
                  type="address"
                  name="city"
                  className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
                  quired
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div className="w-full flex flex-col gap-1">
                <label className="text-sm text-black text-opacity-70">
                  Zip Code
                </label>
                <input
                  type="number"
                  name="zipCode"
                  className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
                  quired
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </div>

              <div className="w-full flex flex-col gap-1">
                <label className="text-sm text-black text-opacity-70">
                  Address Type
                </label>
                <select
                  name="addressType"
                  value={addressType}
                  onChange={(e) => setAddressType(e.target.value)}
                  className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
                >
                  <option className="text-sm text-black">
                    Choose your Address Type
                  </option>
                  {addressTypeData &&
                    addressTypeData.map((item) => (
                      <option
                        className="text-sm text-black"
                        key={item.name}
                        value={item.name}
                      >
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>

              <input
                type="submit"
                className="w-[100%] border border-success text-center text-success rounded-sm cursor-pointer text-sm p-3 mt-4"
                required
                readOnly
              />
            </form>
          </div>
        </div>
      )}
      {/* saved addressed */}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-base font-semibold text-black text-opacity-70 my-2 mb-6 mt-4">
          Saved Address
        </h1>
        <div
          className="bg-black text-white text-xs font-semibold p-2 px-3 md:p-3 md:px-6 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          Add New
        </div>
      </div>
      {user &&
        user.addresses.map((item, index) => (
          <div
            className="w-full flex flex-col items-start md:flex-row md:items-center justify-between gap-y-2 gap-x-4 p-4 border border-black border-opacity-10 mb-2"
            key={index}
          >
            <p className="text-xs font-semibold">{item.addressType}</p>
            <p className="text-sm leading-4">
              {item.address1} {item.city}
            </p>
            <p className="text-sm font-semibold flex flex-row items-center gap-1">
              <CiPhone size={16} />
              <span>{user && user.phoneNumber}</span>
            </p>
            <div className="flex items-center justify-center">
              <div
                className="cursor-pointer text-failure"
                onClick={() => handleDelete(item)}
              >
                <IconButton>
                  <AiOutlineDelete size={20} color="red" />
                </IconButton>
              </div>
            </div>
          </div>
        ))}

      {user && user.addresses.length === 0 && (
        <h5 className="text-center text-sm">
          You don't have any saved address!
        </h5>
      )}
    </div>
  );
};
export default ProfileContent;
