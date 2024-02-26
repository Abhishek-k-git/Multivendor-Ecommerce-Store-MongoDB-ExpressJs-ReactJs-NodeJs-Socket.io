import React from "react";
import ShopInfo from "../../components/Shop/ShopInfo";
import ShopProfileData from "../../components/Shop/ShopProfileData";

const ShopPreviewPage = () => {
  return (
    <div className="w-full max-w-5xl mx-auto py-6 flex flex-col md:flex-row">
      <div className="w-full md:w-2/5 p-2">
        <ShopInfo isOwner={false} />
      </div>
      <div className="w-full md:w-3/5 p-4">
        <ShopProfileData isOwner={false} />
      </div>
    </div>
  );
};

export default ShopPreviewPage;
