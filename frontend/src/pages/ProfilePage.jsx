import React, { useState } from "react";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProfileSideBar from "../components/Profile/ProfileSidebar";
import ProfileContent from "../components/Profile/ProfileContent";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { loading } = useSelector((state) => state.user);
  const [active, setActive] = useState(1);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="w-full flex flex-row">
            <div className="w-[40px] md:w-[25%] lg:w-[20%]">
              <div className="w-full py-4 px-2 md:px-4 shadow-xl md:shadow-none rounded-md mt-4">
                <ProfileSideBar active={active} setActive={setActive} />
              </div>
            </div>
            <div className="w-side md:w-[75%] lg:w-[80%] ">
              <div className="w-full">
                <ProfileContent active={active} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
