import React from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import Footer from "../components/Layout/Footer";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header activeHeading={4} />
          <div className="w-full p-4 min-h-[70vh] bg-black bg-opacity-90 text-white flex flex-col items-center">
            {allEvents && (
              <EventCard active={true} data={allEvents && allEvents[0]} />
            )}
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default EventsPage;
