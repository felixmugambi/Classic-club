'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import publicAPI from '../../../api/publicAxios';
import { slugify } from '../../../components/helper/slugify';
import { FaFacebook, FaTwitter, FaUserCircle, FaWhatsapp } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Loader from '../../../components/common/Loader';

export default function NewsDetailPage() {
  const { id, slug } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [shareOpen, setShareOpen] = useState(false)

  const handleShareClick = (platform: string) => {
    const url = window.location.href;
    const text = `Check out this blog: ${blog?.title}`;

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
          "_blank"
        );
        break;
      case "whatsapp":
        window.open(
          `https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`,
          "_blank"
        );
        break;
      case "copy":
        navigator.clipboard.writeText(url).then(() => {
          toast.success("Link copied to clipboard!");
        });
        break;
      default:
        break;
    }
  };


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

  if (loading) return <Loader />;

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
          <div className='flex justify-between text-center'>
            <div className="flex items-center justify-center">
              <FaUserCircle className="text-3xl text-gray-500 pr-2" />
              <p className="text-gray-600 text-sm">by {blog.author_name || 'Admin'}</p>
            </div>
            <div className='flex items-center justify-center'>
            <p className="text-gray-500 text-sm">Published on {new Date(blog.created_at).toLocaleDateString()}</p>
            </div>
          </div>

          <div className='text-gray-300 mt-2 border-b-2'></div>


          <div className="flex justify-center items-center gap-4 mt-2 text-lg">
            <FaFacebook
              onClick={() => handleShareClick("facebook")}
              className="cursor-pointer hover:text-blue-700"
            />
            <FaTwitter
              onClick={() => handleShareClick("twitter")}
              className="cursor-pointer hover:text-sky-500"
            />
            <FaWhatsapp
              onClick={() => handleShareClick("whatsapp")}
              className="cursor-pointer hover:text-green-500"
            />
            <button onClick={() => setShareOpen(true)} className='text-2xl font-bold pb-3'>
              ...
            </button>
          </div>

          {shareOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg relative">
                {/* Close button */}
                <button
                  onClick={() => setShareOpen(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                  ✖
                </button>

                <h2 className="text-xl font-semibold mb-4 text-center">Share Blog</h2>

                {/* Social icons */}
                <div className="flex justify-center gap-6 text-2xl mb-4">
                  <FaFacebook
                    onClick={() => handleShareClick("facebook")}
                    className="cursor-pointer hover:text-blue-700"
                  />
                  <FaTwitter
                    onClick={() => handleShareClick("twitter")}
                    className="cursor-pointer hover:text-sky-500"
                  />
                  <FaWhatsapp
                    onClick={() => handleShareClick("whatsapp")}
                    className="cursor-pointer hover:text-green-500"
                  />
                </div>

                {/* Copy link input */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={typeof window !== "undefined" ? window.location.href : ""}
                    readOnly
                    className="w-full border px-2 py-2 rounded text-gray-600"
                  />
                  <button
                    onClick={() => handleShareClick("copy")}
                    className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Subtitle + Content */}
        <div className="mt-3 space-y-4 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">{blog.subtitle}</h2>
          <p className="text-justify text-gray-700 whitespace-pre-line">{blog.content}</p>
        </div>



      </div>
    </>
  );
}
