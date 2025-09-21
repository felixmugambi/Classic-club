"use client";

import { useEffect, useState } from "react";
import API from "../../api/axios";

type Fixture = {
    id: number;
    opponent: string;
    match_date: string;
    match_time: string;
    is_home: boolean;
    location: string;
};

type Result = {
    id: number;
    fixture: Fixture;
    home_score: number;
    away_score: number;
};

export default function NextMatch() {
    const [nextFixture, setNextFixture] = useState<Fixture | null>(null);
    const [latestResult, setLatestResult] = useState<Result | null>(null);
    const [timeLeft, setTimeLeft] = useState<string>("");

    const [bgImage, setBgImage] = useState("");
    const [loading, setLoading] = useState(true)

    const images = [
        "https://images.unsplash.com/photo-1535903277987-0160cd22b41e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3RhZGl1bXxlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1599158150601-1417ebbaafdd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHN0YWRpdW18ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHN0YWRpdW18ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1534095199036-ba4fd1eed616?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHN0YWRpdW18ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RhZGl1bXxlbnwwfHwwfHx8MA%3D%3D"
    ];

    useEffect(() => {
        let index = 0;
        setBgImage(images[index]); // set first image
      
        const interval = setInterval(() => {
          index = (index + 1) % images.length;
          setBgImage(images[index]);
        }, 8000); // change every 8 seconds
      
        return () => clearInterval(interval);
      }, []);

    // Fetch next fixture & latest result
    useEffect(() => {
        const fetchData = async () => {
            try {
                const fixtureRes = await API.get("/public-next-fixtures/");
                setNextFixture(fixtureRes.data);
            } catch {
                setNextFixture(null);
            } finally {
                setLoading(false)
            }

            try {
                const resultRes = await API.get("/public-next-results");
                setLatestResult(resultRes.data);
            } catch {
                setLatestResult(null);
            } finally {
                setLoading(false)
            }
        };

        fetchData();
    }, []);

    // Countdown logic
    useEffect(() => {
        if (!nextFixture) return;

        const targetDate = new Date(`${nextFixture.match_date}T${nextFixture.match_time}`);
        const timer = setInterval(() => {
            const now = new Date();
            const diff = targetDate.getTime() - now.getTime();

            if (diff <= 0) {
                setTimeLeft("Kickoff!");
                clearInterval(timer);
            } else {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((diff / (1000 * 60)) % 60);
                setTimeLeft(`${days}d ${hours}h ${minutes}m`);
            }
        }, 60000);

        return () => clearInterval(timer);
    }, [nextFixture]);

    const today = new Date().toISOString().split("T")[0];
    const showResult =
        latestResult && latestResult.fixture.match_date === today;

    if (loading) return <p className="text-center p-7">Loading ...</p>
    return (
        <section
            className="relative w-full h-[600px] flex items-center justify-center text-white"
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="bg-black/60 w-full h-full flex items-center justify-center">
                <div className="text-center px-6">
                    {showResult ? (
                        <>
                            <h2 className="text-3xl font-bold mb-2">Full Time</h2>
                            <p className="text-xl mb-1">
                                {latestResult.fixture.is_home ? "Classic FC" : latestResult.fixture.opponent}{" "}
                                {latestResult.home_score} - {latestResult.away_score}{" "}
                                {latestResult.fixture.is_home ? latestResult.fixture.opponent : "Classic FC"}
                            </p>
                            <p className="text-sm opacity-80">
                                {latestResult.fixture.location} | {latestResult.fixture.match_date}
                            </p>
                        </>
                    ) : nextFixture ? (
                        <>
                            <h2 className="text-3xl font-bold mb-2">Next Match</h2>
                            <p className="text-xl mb-4 mt-4">
                                {nextFixture.is_home ? "Classic FC" : nextFixture.opponent} vs{" "}
                                {nextFixture.is_home ? nextFixture.opponent : "Classic FC"}
                            </p>
                            <p className="text-lg text-yellow-300 font-semibold">{timeLeft}</p>
                            <p className="text-sm opacity-80">
                                {nextFixture.location} | {nextFixture.match_date} {nextFixture.match_time}
                            </p>
                        </>
                    ) : (
                        <p className="text-lg">No upcoming fixtures</p>
                    )}
                </div>
            </div>
        </section>
    );
}
