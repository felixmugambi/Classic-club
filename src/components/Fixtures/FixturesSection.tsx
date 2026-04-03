'use client';

import { useEffect, useRef, useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import FixtureCard from "./FixtureCard";
import API from "../../api/axios";
import { useRouter } from 'next/navigation';
import Loader from "../common/Loader";

type APIFixture = {
  id: number;
  opponent: string;
  match_date: string;
  match_time: string;
  location: string;
  is_home: boolean;
  zone: string;
  match_day: number;
  status: string;
  game_type: string;
};

const FixturesSection = () => {
  const [fixtures, setFixtures] = useState<APIFixture[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter()

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const res = await API.get("/public-fixtures/");
        const allFixtures: APIFixture[] = res.data;

        // Filter for upcoming (not completed)
        const upcomingFixtures = allFixtures.filter(f => f.status !== "completed" && f.status !== "postponed").slice(0, 10);
        setFixtures(upcomingFixtures);
      } catch (err) {
        console.error("Failed to load fixtures", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFixtures();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
        <h2 className="text-xl font-bold text-black">Upcoming Fixtures</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 cursor-pointer text-sm font-medium text-clubRed hover:underline">
            <span onClick={() => router.push('/matches')}>All Fixtures</span>
            <FaChevronRight className="text-xs" />
          </div>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : fixtures.length === 0 ? (
        <p className="text-center py-10 text-gray-500">No upcoming fixtures.</p>
      ) : (
        <div className="relative">
          {/* Scroll Arrows */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border rounded-full shadow p-2 z-10"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border rounded-full shadow p-2 z-10"
          >
            <FaChevronRight />
          </button>

          {/* Cards */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth py-4 px-2"
          >
            {fixtures.map((fixture) => {
              const fullDateTime = new Date(`${fixture.match_date}T${fixture.match_time}`);
              const formattedDate = fullDateTime.toLocaleDateString(undefined, {
                weekday: "long",
                month: "short",
                day: "numeric",
              });
              const formattedTime = fullDateTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });

              const heading =
                fixture.game_type === "league"
                  ? `ZONE A | MATCHDAY ${fixture.match_day}`
                  : "";

              const subheading =
                fixture.game_type === "league"
                  ? "LEAGUE GAME"
                  : fixture.game_type === "friendly"
                  ? "FRIENDLY"
                  : "CUP MATCH";

              return (
                <FixtureCard
                  key={fixture.id}
                  heading={heading}
                  subheading={subheading}
                  date={formattedDate}
                  time={formattedTime}
                  venue={fixture.location || "TBD"}
                  homeTeam={fixture.is_home ? "Classic FC" : fixture.opponent}
                  awayTeam={fixture.is_home ? fixture.opponent : "Classic FC"}
                />
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default FixturesSection;
