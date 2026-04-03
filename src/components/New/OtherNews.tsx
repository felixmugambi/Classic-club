import { useEffect, useState } from "react"
import { FaChevronRight, FaShareAlt } from "react-icons/fa"
import publicAPI from "../../api/publicAxios"
import { slugify } from "../helper/slugify"
import { getRelativeTime } from "../helper/relativeTime"
import Link from "next/link"
import Loader from "../common/Loader"

type Blog = {
    id: number;
    title: string;
    subtitle: string;
    content: string;
    created_at: string;
    author_name?: string;
    image: string;
}

const OtherNews = () => {
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await publicAPI.get("/news/public-blogs/")


                //sort the blogs
                const sorted = res.data.sort((a: Blog, b: Blog) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                setBlogs(sorted)

            } catch (error) {
                console.error("Failed to fetch blogs", error)
            } finally {
                setLoading(false)
            }
        }

        fetchNews();
    }, [])

    if (loading) return <Loader />

    return (
        <section className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-clubRed">Latest</h2>
                <Link href="/news" className="flex items-center text-clubRed cursor-pointer hover:text-red-600 transition">
                    <span className="font-medium mr-2">Check out More News</span>
                    <FaChevronRight className="text-lg" />
                </Link>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {
                    blogs.slice(0, 6).map(((item) => (
                        <Link href={`/news/${slugify(item.title)}`}>
                            <div className="bg-white rounded shadow hover:shadow-md transition group overflow-hidden flex flex-col">
                                {/* Image wrapper with hover zoom */}
                                <div className="relative h-52 overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                {/* Text Content */}
                                <div className="p-3 flex flex-col justify-between flex-grow">
                                    {/* Red line above title */}
                                    <div className="mb-2">
                                        <div className="h-[2px] w-16 bg-clubRed transition-all duration-500 group-hover:w-full"></div>
                                    </div>

                                    <h4 className="text-base font-semibold text-gray-800">{item.title}</h4>
                                    <p className="text-sm text-gray-500 mt-1">{item.subtitle}</p>

                                    {/* Bottom row */}
                                    <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                                        <span>{getRelativeTime(item.created_at)}</span>
                                        <FaShareAlt className="cursor-pointer hover:text-clubRed" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )))
                }
            </div>

        </section>
    )
}

export default OtherNews