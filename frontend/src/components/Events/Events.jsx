import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import EventCard from "./EventCard";

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  return (
    <>
      {!isLoading && (
        <div className="w-full p-4 flex flex-col gap-4 bg-black text-white">
          <h1 className="text-sm font-semibold text-white text-opacity-90 uppercase">
            Recent Event
          </h1>
          {allEvents.length !== 0 && (
            <EventCard data={allEvents && allEvents[0]} />
          )}
          <h4 className="text-center text-xl font-semibols text-white text-opacity-80">
            {allEvents?.length === 0 && "No Event Available"}
          </h4>
        </div>
      )}
    </>
  );
};

export default Events;
