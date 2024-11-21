import { Shows } from "@/lib/types";
import Show from "@/ui/show";
import Image from "next/image";
import React from "react";

type Props = {
  shows: Shows[];
};

const ShowCalendar = ({ shows }: Props) => {
  return (
    <div className="show-calendar">
      <div className="show-title">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          stroke="white"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-calendar-1"
        >
          <path d="M11 14h1v4" />
          <path d="M16 2v4" />
          <path d="M3 10h18" />
          <path d="M8 2v4" />
          <rect x="3" y="4" width="18" height="18" rx="2" />
        </svg>
        <h3>Upcoming Shows</h3>
      </div>
      {shows.map((show) => (
        <Show key={show._id} id={show._id} title={show.title} location={show.location} date={show.showDate} />
      ))}
      <Image src="/assets/l3.jpeg" alt="show-calendar-bg" width={400} height={550} />
    </div>
  );
};

export default ShowCalendar;
