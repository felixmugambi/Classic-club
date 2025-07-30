'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import publicAPI from '../../../api/publicAxios';
import { slugify } from '../../../components/helper/slugify';
import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';

export default function NewsDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await publicAPI.get('/news/public-blogs/');
        const allBlogs = res.data;

        const matchedBlog = allBlogs.find((b: any) => slugify(b.title) === slug);

        if (matchedBlog) {
          setBlog(matchedBlog);
        } else {
          console.warn("Blog not found for slug:", slug);
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  if (loading) return <p>Loading...</p>;

  if (!blog) return <p className="text-center text-red-500 mt-10">Blog not found</p>;

  return (
    <>
          <div className="relative w-full h-80 md:h-[400px] overflow-hidden rounded">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full bg-opacity-50 text-white p-4">
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-center">{blog.title}</h1>
        </div>
      </div>
    <div className="max-w-4xl mx-auto mt-6 px-4">
      {/* Cover Image with Title at Bottom */}


      {/* Metadata */}
      <div className="mt-6 text-center">
        <p className="text-gray-500 text-sm">Published on {new Date(blog.created_at).toLocaleDateString()}</p>
        <p className="text-gray-600 text-sm">by {blog.author || 'Admin'}</p>

        <div className="flex justify-center gap-4 mt-4 text-clubRed text-lg">
          <FaFacebook className="cursor-pointer hover:text-blue-700" />
          <FaTwitter className="cursor-pointer hover:text-sky-500" />
          <FaWhatsapp className="cursor-pointer hover:text-green-500" />
        </div>
      </div>

      {/* Subtitle + Content */}
      <div className="mt-6 space-y-4 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">{blog.subtitle}</h2>
        <p className="text-justify text-gray-700 whitespace-pre-line">{blog.content}</p>
      </div>
    </div>
    </>
  );
}
