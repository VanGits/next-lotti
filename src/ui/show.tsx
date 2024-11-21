import Image from "next/image";
import React from "react";

type Props = {
  id: string;
  title: string;
  location: string;
  date: string;
};

const Show = ({ id, title, location, date }: Props) => {
  function formatDate(dateString: string): { month: string; day: string } {
    const date = new Date(dateString);
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return {
      month: monthNames[date.getMonth()],
      day: date.getDate().toString().padStart(2, '0')
    };
  }
  const { month, day } = formatDate(date);
  return (
    <div className="Show" key={id}>
      <div className="show-date">
        <p>{month.slice(0, 3)}</p>
        <p>{day}</p>
      </div>
      <div className="show-separator"></div>
      <div className="show-info">
      <p>{title}</p>
        <p>{month} {day}, 2024</p>
        <p>{location}</p>
      </div>
    </div>
  );
};

export default Show;
