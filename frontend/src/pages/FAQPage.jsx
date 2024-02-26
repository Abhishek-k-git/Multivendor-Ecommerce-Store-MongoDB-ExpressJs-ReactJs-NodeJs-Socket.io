import React, { useState } from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import { RxCross2 } from "react-icons/rx";
import { RiArrowRightSLine } from "react-icons/ri";

const FAQPage = () => {
  return (
    <div>
      <Header activeHeading={5} />
      <Faq />
      <Footer />
    </div>
  );
};

const Faq = () => {
  const [activeTab, setActiveTab] = useState(0);

  const toggleTab = (tab) => {
    if (activeTab === tab) {
      setActiveTab(0);
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className="p-4 min-h-[70vh]">
      <h2 className="text-lg md:text-2xl font-bold text-black text-opacity-70 pb-10">
        Frequently Asked Questions
      </h2>
      <div className="mx-auto space-y-4">
        {/* single Faq */}
        <div className="border-b border-black border-opacity-15 py-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(2)}
          >
            <span className="text-sm font-semibold text-black text-opacity-90">
              What is your return policy?
            </span>
            {activeTab === 2 ? <RxCross2 /> : <RiArrowRightSLine />}
          </button>
          {activeTab === 2 && (
            <div className="mt-4">
              <p className="text-sm text-black text-opacity-70 leading-6">
                If you're not satisfied with your purchase, we accept returns
                within 30 days of delivery. To initiate a return, please email
                us at support@myecommercestore.com with your order number and a
                brief explanation of why you're returning the item.
              </p>
            </div>
          )}
        </div>

        <div className="border-b border-black border-opacity-15 py-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(3)}
          >
            <span className="text-sm font-semibold text-black text-opacity-90">
              How do I track my order?
            </span>
            {activeTab === 3 ? <RxCross2 /> : <RiArrowRightSLine />}
          </button>
          {activeTab === 3 && (
            <div className="mt-4">
              <p className="text-sm text-black text-opacity-70 leading-6">
                You can track your order by clicking the tracking link in your
                shipping confirmation email, or by logging into your account on
                our website and viewing the order details.
              </p>
            </div>
          )}
        </div>

        <div className="border-b border-black border-opacity-15 py-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(4)}
          >
            <span className="text-sm font-semibold text-black text-opacity-90">
              How do I contact customer support?
            </span>
            {activeTab === 4 ? <RxCross2 /> : <RiArrowRightSLine />}
          </button>
          {activeTab === 4 && (
            <div className="mt-4">
              <p className="text-sm text-black text-opacity-70 leading-6">
                You can contact our customer support team by emailing us at
                support@myecommercestore.com, or by calling us at (555) 123-4567
                between the hours of 9am and 5pm EST, Monday through Friday.
              </p>
            </div>
          )}
        </div>

        <div className="border-b border-black border-opacity-15 py-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(5)}
          >
            <span className="text-sm font-semibold text-black text-opacity-90">
              Can I change or cancel my order?
            </span>
            {activeTab === 5 ? <RxCross2 /> : <RiArrowRightSLine />}
          </button>
          {activeTab === 5 && (
            <div className="mt-4">
              <p className="text-sm text-black text-opacity-70 leading-6">
                Unfortunately, once an order has been placed, we are not able to
                make changes or cancellations. If you no longer want the items
                you've ordered, you can return them for a refund within 30 days
                of delivery.
              </p>
            </div>
          )}
        </div>

        <div className="border-b border-black border-opacity-15 py-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(6)}
          >
            <span className="text-sm font-semibold text-black text-opacity-90">
              Do you offer international shipping?
            </span>
            {activeTab === 6 ? <RxCross2 /> : <RiArrowRightSLine />}
          </button>
          {activeTab === 6 && (
            <div className="mt-4">
              <p className="text-sm text-black text-opacity-70 leading-6">
                Currently, we only offer shipping within the India.
              </p>
            </div>
          )}
        </div>

        <div className="border-b border-black border-opacity-15 py-4">
          <button
            className="flex items-center justify-between w-full"
            onClick={() => toggleTab(7)}
          >
            <span className="text-sm font-semibold text-black text-opacity-90">
              What payment methods do you accept?
            </span>
            {activeTab === 7 ? <RxCross2 /> : <RiArrowRightSLine />}
          </button>
          {activeTab === 7 && (
            <div className="mt-4">
              <p className="text-sm text-black text-opacity-70 leading-6">
                We accept visa,mastercard,paypal payment method also we have
                cash on delivery system.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
