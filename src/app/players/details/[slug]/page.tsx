'use client'

import { useEffect, useState } from "react"
import publicAPI from "../../../../api/publicAxios"
import { slugify } from "../../../../components/helper/slugify"
import { useParams } from "next/navigation"
import OtherNews from "../../../../components/New/OtherNews"
import Loader from "../../../../components/common/Loader"

type Blog = {
    id: number;
    title: string;
    content: string;
    created_at: string;
    author_name?: string;
    image: string;
}

export default function PlayerDetailsPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const [player, setPlayer] = useState<any>(null)
    const [activeTab, setActiveTab] = useState("profile")

    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                const res = await publicAPI.get('/players/public/');
                const allPlayers = res.data;
                const matchedPlayer = allPlayers.find((p: any) => slugify(p.name) === slug)
                if (matchedPlayer) {
                    setPlayer(matchedPlayer)
                } else {
                    console.warn('Player not found for slug', slug)
                }
            } catch (err) {
                console.error('Failed to fetch player')
            } finally {
                setLoading(false)
            }
        }
        if (slug) {
            fetchPlayer()
        }
    }, [slug])

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await publicAPI.get("/news/public-blogs/")
                const sorted = res.data.sort((a: Blog, b: Blog) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                setBlogs(sorted)
            } catch (err) {
                console.error("Failed to load news", err)
            } finally {
                setLoading(false)
            }
        }

        fetchNews();
    })

    if (loading) return <Loader />
    if (!player) return <p className="text-center text-red-500 mt-10">Player Not Found</p>

    return (
        <>
            <div className="max-w-7xl mx-10 px-3 py-3">
                {/* Responsive Layout */}


                {/* Left side (Details) */}
                <div className="flex flex-col md:flex-row items-center justify-between my-3 mx-2 gap-6">
                    {/* Left side (Details) */}
                    <div className="text-center md:text-left md:flex-1">
                        <p className="text-5xl font-bold text-slate-800 mb-3">{player?.jersey_number}</p>
                        <p className="text-4xl font-bold text-slate-700">{player?.name}</p>
                        <p className="text-slate-600 font-semibold text-xl">{player?.position}</p>
                    </div>

                    {/* Right side (Image + Tabs) */}
                    <div className="md:flex-1 flex flex-col items-center">
                        <img
                            src={player?.photo}
                            alt={player?.name}
                            className="w-64 h-64 md:w-96 md:h-96 object-cover rounded-2xl shadow-md bg-transparent"
                        />
                    </div>
                </div>


                {/* Tabs */}
                <div className="mt-4 flex gap-4">
                    <button
                        onClick={() => setActiveTab("profile")}
                        className={`px-4 py-2 rounded-lg font-medium ${activeTab === "profile" ? "bg-slate-950 text-white" : "bg-gray-200"
                            }`}
                    >
                        Profile
                    </button>
                    <button
                        onClick={() => setActiveTab("stats")}
                        className={`px-4 py-2 rounded-lg font-medium ${activeTab === "stats" ? "bg-slate-950 text-white" : "bg-gray-200"
                            }`}
                    >
                        Stats
                    </button>
                </div>

                {/* Tab Content */}
                <div className="mt-4 w-full bg-gray-100 p-4 rounded-xl shadow-sm text-slate-700">
                    {activeTab === "profile" && (
                        <div>
                            <h3 className="font-semibold text-lg mb-2">Profile Biography</h3>
                            <p>Player Biography goes here</p>
                        </div>
                    )}
                    {activeTab === "stats" && (
                        <div>
                            <h3 className="font-semibold text-lg mb-2">Player Stats</h3>
                            <p>Player Stats goes here</p>
                        </div>
                    )}
                </div>

            </div>
            <div className="bg-slate-50">
                <OtherNews />
            </div>
        </>
    )
}
