import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../const.js";
import { toast } from "react-toastify";
import { loadSeller } from "../../redux/actions/user";
import { AiOutlineDelete } from "react-icons/ai";
import { IconButton } from "@mui/material";
import { TbCash } from "react-icons/tb";
import Map from "../../assets/images/map.png";
import Chip from "../../assets/images/chip.png";
import { GrPowerCycle } from "react-icons/gr";
import Lottie from "react-lottie";
import withdraw from "../../assets/animations/withdraw.json";
import hero from "../../assets/animations/hero.json";

const WithdrawMoney = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(50);
  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    bankCountry: "",
    bankSwiftCode: "",
    bankAccountNumber: "",
    bankHolderName: "",
    bankAddress: "",
  });

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const withdrawMethod = {
      bankName: bankInfo.bankName,
      bankCountry: bankInfo.bankCountry,
      bankSwiftCode: bankInfo.bankSwiftCode,
      bankAccountNumber: bankInfo.bankAccountNumber,
      bankHolderName: bankInfo.bankHolderName,
      bankAddress: bankInfo.bankAddress,
    };

    setPaymentMethod(false);

    await axios
      .put(
        `${server}/shop/update-payment-methods`,
        {
          withdrawMethod,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Withdraw method added successfully!");
        dispatch(loadSeller());
        setBankInfo({
          bankName: "",
          bankCountry: "",
          bankSwiftCode: null,
          bankAccountNumber: null,
          bankHolderName: "",
          bankAddress: "",
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const deleteHandler = async () => {
    await axios
      .delete(`${server}/shop/delete-withdraw-method`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success("Withdraw method deleted successfully!");
        dispatch(loadSeller());
      });
  };

  const error = () => {
    toast.error("You not have enough balance to withdraw!");
  };

  const withdrawHandler = async () => {
    if (withdrawAmount < 50 || withdrawAmount > availableBalance) {
      toast.error("You can't withdraw this amount!");
    } else {
      const amount = withdrawAmount;
      await axios
        .post(
          `${server}/withdraw/create-withdraw-request`,
          { amount },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success("Withdraw money request is successful!");
        });
    }
  };

  const withdrawOpt = {
    loop: true,
    autoplay: true,
    animationData: withdraw,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const heroOpt = {
    loop: true,
    autoplay: true,
    animationData: hero,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const availableBalance = seller?.availableBalance.toFixed(2);

  return (
    <div className="w-full">
      <div className="w-full bg-white h-full rounded flex items-center justify-center flex-col">
        <Lottie options={heroOpt} height={200} width={"100%"} />
        <div className="bg-white w-[250px] flex flex-col rounded-md border border-theme border-opacity-20 relative -translate-y-[100px] p-4">
          <h1 className="text-sm font-bold text-black text-opacity-90 flex items-center flex-row gap-2">
            <GrPowerCycle size={20} />
            <span>Total Account Balance</span>
          </h1>
          <p className="text-sm leading-5 my-4 text-black text-opacity-70">
            Amount of 0% is chargable on each bank transfer, for security
            services
          </p>
          <span className="py-2">
            <Lottie options={withdrawOpt} width={100} height={100} />
          </span>
          <span className="text-success text-3xl text-center py-2">
            ₹{availableBalance}
          </span>
          <span
            className="text-sm shadow-md cursor-pointer text-white bg-[gold] w-full text-center py-2 px-6 rounded-full my-2"
            onClick={() => (availableBalance < 50 ? error() : setOpen(true))}
          >
            Withdraw Now
          </span>
        </div>
      </div>
      {open && (
        <div className="w-full h-screen z-40 fixed top-0 left-0 flex items-center justify-center bg-black bg-opacity-30">
          <div
            className={`w-[95%] max-w-[400px] bg-white p-4 z-40 md:p-6 shadow-lg rounded-lg ${
              paymentMethod ? "h-[80vh] overflow-y-auto" : "h-[unset]"
            } min-h-[40vh] p-2`}
          >
            <div className="w-full flex justify-between items-center mb-4">
              <h5 className="text-md font-semibold text-black text-opacity-90">
                {paymentMethod ? "Bank Details" : "Available Method"}
              </h5>
              <div
                className="w-8 h-8 rounded-full cursor-pointer"
                onClick={() => setOpen(false) || setPaymentMethod(false)}
              >
                <IconButton>
                  <RxCross1 size={20} />
                </IconButton>
              </div>
            </div>
            {paymentMethod ? (
              <form
                className="flex flex-col w-full gap-4"
                onSubmit={handleSubmit}
              >
                <div className="w-full flex flex-col gap-1">
                  <label className="text-sm text-black text-opacity-70">
                    Bank Holder Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={bankInfo.bankHolderName}
                    onChange={(e) =>
                      setBankInfo({
                        ...bankInfo,
                        bankHolderName: e.target.value,
                      })
                    }
                    placeholder="John Doe"
                    className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
                  />
                </div>
                <div className="w-full flex flex-col gap-1">
                  <label className="text-sm text-black text-opacity-70">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    name="bankName"
                    required
                    value={bankInfo.bankName}
                    onChange={(e) =>
                      setBankInfo({ ...bankInfo, bankName: e.target.value })
                    }
                    placeholder="Bank in which your account exists"
                    className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
                  />
                </div>
                <div className="w-full flex flex-col gap-1">
                  <label className="text-sm text-black text-opacity-70">
                    Bank Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={bankInfo.bankCountry}
                    onChange={(e) =>
                      setBankInfo({
                        ...bankInfo,
                        bankCountry: e.target.value,
                      })
                    }
                    required
                    placeholder="County in which bank is located"
                    className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
                  />
                </div>
                <div className="w-full flex flex-col gap-1">
                  <label className="text-sm text-black text-opacity-70">
                    Bank Swift Code
                  </label>
                  <input
                    type="text"
                    name="swiftCode"
                    required
                    value={bankInfo.bankSwiftCode}
                    onChange={(e) =>
                      setBankInfo({
                        ...bankInfo,
                        bankSwiftCode: e.target.value,
                      })
                    }
                    placeholder="Bank Swift Code"
                    className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
                  />
                </div>
                <div className="w-full flex flex-col gap-1">
                  <label className="text-sm text-black text-opacity-70">
                    Bank Account Number
                  </label>
                  <input
                    type="number"
                    name="accountNumber"
                    id=""
                    value={bankInfo.bankAccountNumber}
                    onChange={(e) =>
                      setBankInfo({
                        ...bankInfo,
                        bankAccountNumber: e.target.value,
                      })
                    }
                    required
                    placeholder="Bank account number"
                    className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
                  />
                </div>

                <div className="w-full flex flex-col gap-1">
                  <label className="text-sm text-black text-opacity-70">
                    Bank Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={bankInfo.bankAddress}
                    onChange={(e) =>
                      setBankInfo({
                        ...bankInfo,
                        bankAddress: e.target.value,
                      })
                    }
                    placeholder="Bank address"
                    className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full border border-success text-center text-success rounded-sm cursor-pointer text-sm p-3 my-4"
                >
                  Add Details
                </button>
              </form>
            ) : (
              <div className="w-full">
                {/* saved payment options */}
                {seller && seller?.withdrawMethod ? (
                  <div>
                    <div className="relative my-6 w-full h-full max-w-[400px] rounded-xl bg-black bg-opacity-80">
                      <img
                        className="w-full h-full object-contain"
                        src={Map}
                        alt=""
                      />
                      <div className="w-full h-full text-white text-lg font-black tracking-widest">
                        <span className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-[40px]">
                          {"*".repeat(
                            seller?.withdrawMethod?.bankAccountNumber.length - 4
                          ) +
                            seller?.withdrawMethod?.bankAccountNumber.slice(-4)}
                        </span>
                        <span className="text-xl md:text-2xl uppercase absolute bottom-1/2 right-1/2 translate-x-1/2 bg-black bg-opacity-40">
                          {seller?.withdrawMethod?.bankHolderName}
                        </span>
                        <span className="text-xs text-white rounded-sm p-1 bg-success font-normal absolute left-[10px] bottom-[10px]">
                          Balance ₹{availableBalance}
                        </span>
                        <span className="text-sm text-[gold] absolute top-[10px] right-[10px]">
                          {seller?.withdrawMethod?.bankName}
                        </span>
                        <span className="w-8 h-8 absolute top-[4px] left-[4px]">
                          <img
                            className="w-full h-full object-contain"
                            src={Chip}
                            alt=""
                          />
                        </span>
                        <span
                          className="w-8 h-8 absolute bottom-[4px] right-[4px] bg-failure text-white rounded-full flex items-center justify-center cursor-pointer"
                          onClick={() => deleteHandler()}
                        >
                          <AiOutlineDelete size={20} />
                        </span>
                      </div>
                    </div>
                    <div className="w-full flex flex-col gap-1 mt-4">
                      <label className="text-sm text-black text-opacity-90">
                        Withdraw Amount ₹
                      </label>
                      <div className="w-full flex flex-row">
                        <input
                          type="number"
                          placeholder="Amount..."
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                          className="text-sm border w-full outline-none focus:border-theme border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50 text-black"
                        />
                        <span
                          className="bg-black text-xs flex items-center justify-center text-white py-2 px-4 cursor-pointer"
                          onClick={withdrawHandler}
                        >
                          <TbCash size={18} />
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex py-4 w-full flex-col items-center justify-center">
                    <p className="text-sm font-semibold text-black text-opacity-70 my-6">
                      No Withdrawal Methods available
                    </p>
                    <div
                      className="bg-black text-white text-sm px-4 py-2 cursor-pointer"
                      onClick={() => setPaymentMethod(true)}
                    >
                      Add Bank Details
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawMoney;
