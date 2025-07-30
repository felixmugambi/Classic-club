'use client';

import React from "react";
import Button from "../ui/Button";

type FixtureCardProps = {
  heading: string;
  subheading: string;
  date: string;
  time: string;
  venue: string;
  homeTeam: string;
  awayTeam: string;
};

const FixtureCard = ({
  heading,
  subheading,
  date,
  time,
  venue,
  homeTeam,
  awayTeam,
}: FixtureCardProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 min-w-[280px] max-w-xs border border-gray-200 flex flex-col justify-between gap-4 hover:shadow-lg transition-all">
      <div className="text-sm text-center font-bold text-clubRed uppercase tracking-wide">
        {heading}
      </div>

      <div className="text-xs text-gray-600 mt-4 mb-4 text-center">
        <p>{date}</p>
        <p>{time} - {venue}</p>
      </div>

      <div className="text-md font-bold text-black text-center mb-3">
        {homeTeam} <span className="text-gray-500">vs</span> {awayTeam}
      </div>

      <div className="text-xs text-center text-gray-500 font-medium uppercase tracking-wide">
        {subheading}
      </div>

      <div className="mt-4">
        <Button variant="solid" fullWidth>More Info</Button>
      </div>
    </div>
  );
};

export default FixtureCard;
