'use client';

import { useEffect, useState } from "react";
import publicAPI from "../../api/publicAxios";
import LargeNewsCard from "../../components/New/LargeNewsCard";
import SmallNewsCard from "../../components/New/SmallNewsCard";
import Loader from "../../components/common/Loader";

const ITEMS_PER_LOAD = 10;

type Blog = {
    id: number;
    title: string;
    subtitle?: string;
    desc?: string;
    image: string;
    created_at: string;
    author?: string;
  };


const NewsPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await publicAPI.get("/news/public-blogs/");
        const sorted = res.data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        setBlogs(sorted);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      } finally {
        setLoading(false)
      }
    };

    fetchBlogs();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + ITEMS_PER_LOAD);
  };

  // Pattern logic
  const renderBlocks = () => {
    const blocks: React.ReactNode[] = [];
    let i = 0;
    const visibleBlogs = blogs.slice(0, visibleCount);
  
    while (i < visibleBlogs.length) {
      // Block 1: 3 small news
      const smallSet = visibleBlogs.slice(i, i + 3);
      if (smallSet.length) {
        blocks.push(
          <div key={`small-${i}`} className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {smallSet.map((item) => (
              <SmallNewsCard key={item.id} data={item} />
            ))}
          </div>
        );
      }
      i += 3;
  
      // Block 2: 2 large cards
      const largeSet = visibleBlogs.slice(i, i + 2);
      if (largeSet.length) {
        blocks.push(
          <div key={`large-${i}`} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {largeSet.map((item) => (
              <LargeNewsCard key={item.id} data={item} layout="horizontal" />
            ))}
          </div>
        );
      }
      i += 2;
  
      // Optional: Full-width large card (every 3rd loop, just one card)
      const singleLarge = visibleBlogs[i];
      if (singleLarge) {
        blocks.push(
          <div key={`full-${i}`} className="mb-10">
            <LargeNewsCard key={singleLarge.id} data={singleLarge} layout="full" />
          </div>
        );
        i += 1;
      }
    }
  
    return blocks;
  };
  
if (loading) return <Loader />

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-clubRed mb-8">All News</h1>
      {renderBlocks()}

      {visibleCount < blogs.length && (
        <div className="flex justify-center mt-10 bg-slate-400">
          <button
            onClick={handleLoadMore}
            className="bg-clubRed hover:bg-red-700 text-white px-6 py-2 rounded shadow transition"
          >
            Load Older News
          </button>
        </div>
      )}
    </section>
  );
};

export default NewsPage;
