"use client";

import { useEffect, useState } from "react";
import publicAPI from "../../api/publicAxios";
import LargeNewsCard from "./LargeNewsCard";
import SmallNewsCard from "./SmallNewsCard";
import { FaChevronRight } from "react-icons/fa";
import Link from "next/link";
import Loader from "../common/Loader";

type Blog = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  author_name?: string;
  image: string;
};

const NewsSection = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await publicAPI.get("/news/public-blogs/");
        // Sort newest first
        const sorted = res.data.sort((a: Blog, b: Blog) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        setBlogs(sorted);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <Loader />

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-clubRed">Latest News</h2>
        <Link href="/news" className="flex items-center text-clubRed cursor-pointer hover:text-red-600 transition">
          <span className="font-medium mr-2">More News</span>
          <FaChevronRight className="text-lg" />
        </Link>
      </div>

      {/* News Content */}
      <div className="flex flex-col gap-8">
        {/* Large News */}
        <div className="grid md:grid-cols-2 gap-6">
          {blogs.slice(0, 2).map((item) => (
            <LargeNewsCard key={item.id} data={item} />
          ))}
        </div>

        {/* Small News */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 items-stretch">
          {blogs.slice(2, 5).map((item) => (
            <SmallNewsCard key={item.id} data={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
