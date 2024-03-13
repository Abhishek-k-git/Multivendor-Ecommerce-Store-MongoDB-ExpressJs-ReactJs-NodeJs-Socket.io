import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../const.js";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
    }
  }, []);

  const [email, setEmail] = useState("keri5@powerxvista.com");
  const [password, setPassword] = useState("Keri5@powerxvista.com");
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${server}/user/login-user`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Login Success!");
        Cookies.set("token", res?.token);
        navigate("/");
        // window.location.reload(true);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="w-full h-screen bg-white p-4 flex flex-col justify-center items-center">
      <h2 className=" mt-6 text-2xl sm:text-3xl font-extrabold text-gray-900 mb-8">
        Login to your account
      </h2>
      <div className="w-full max-w-[400px] bg-white px-4 py-8 shadow sm:rounded-lg">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="text-black text-opacity-80 text-sm block"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-sm appearance-none block w-full px-3 py-2 border border-black border-opacity-15 rounded-md shadow-sm placeholder:text-black placeholder:text-opacity-60 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-black text-opacity-80 text-sm block"
            >
              Password
            </label>
            <div className="mt-1 relative">
              <input
                type={visible ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-sm appearance-none block w-full px-3 py-2 border border-black border-opacity-15 rounded-md shadow-sm placeholder:text-black placeholder:text-opacity-60 focus:outline-none"
              />
              {visible ? (
                <AiOutlineEye
                  className="absolute right-2 top-2 cursor-pointer"
                  size={20}
                  onClick={() => setVisible(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute right-2 top-2 cursor-pointer"
                  size={20}
                  onClick={() => setVisible(true)}
                />
              )}
            </div>
          </div>
          {/* <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="remember-me"
                id="remember-me"
                className="h-4 w-4 rounded-md"
              />
              <label
                htmlFor="remember-me"
                className="text-sm text-black text-opacity-80"
              >
                Remember me
              </label>
            </div>
            <Link
              to=".forgot-password"
              className="font-medium text-black text-opacity-80 text-sm hover:text-theme"
            >
              Forgot password?
            </Link>
          </div> */}
          <div className="mt-2">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-black text-white text-sm hover:bg-opacity-80 focus:bg-opacity-90"
            >
              Submit
            </button>
          </div>
          <div className="w-full flex items-center justify-start text-sm gap-2">
            <h4>Not have any account?</h4>
            <Link to="/sign-up" className="text-theme underline">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
