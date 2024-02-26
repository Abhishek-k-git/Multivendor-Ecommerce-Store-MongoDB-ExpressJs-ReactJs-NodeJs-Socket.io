import React from "react";
import ShopInfo from "../../components/Shop/ShopInfo";
import ShopProfileData from "../../components/Shop/ShopProfileData";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";

const ShopHomePage = () => {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <DashboardHeader />
      <div className="w-full py-6 flex flex-col md:flex-row">
        <div className="w-full md:w-2/5 p-2">
          <ShopInfo isOwner={true} />
        </div>
        <div className="w-full md:w-3/5 p-4">
          <ShopProfileData isOwner={true} />
        </div>
      </div>
    </div>
  );
};

export default ShopHomePage;
