'use client';

import { useEffect, useState } from 'react';
import API from '../../../api/axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import ConfirmModal from '../../confirm/ConfirmModal';

type Blog = {
  id: number;
  title: string;
  subtitle?: string;
  content: string;
  image?: string;
  created_at: string;
};

export default function BlogDashboardPage() {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [deleteBlog, setDeleteBlog] = useState<Blog | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get('/news/blogs/');
        setBlogs(res.data);
      } catch (err) {
        toast.error('Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id: number, title: string) => {
    const confirmDelete = confirm(`Are you sure you want to delete "${title}"?`);
    if (!confirmDelete) return;

    try {
      await API.delete(`/news/delete/${id}/`);
      setBlogs(blogs.filter((b) => b.id !== id));
      toast.success('Blog deleted');
    } catch (err) {
      toast.error('Failed to delete blog');
    }
  };

  if (loading) return <p>Loading blogs...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Blogs</h2>
        <button
          onClick={() => router.push('/dashboard/blog/create')}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400"
        >
          Create Blog
        </button>
      </div>

      <table className="min-w-full bg-white border rounded shadow">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2 hidden md:block">Created</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id} className="border-t text-sm">
              <td className="px-4 py-2">{blog.id}</td>
              <td className="px-4 py-2">{blog.title}</td>
              <td className="px-4 py-2 hidden md:block">{new Date(blog.created_at).toLocaleDateString()}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => router.push(`/dashboard/blog/edit/${blog.id}/`)}
                  className="text-green-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setDeleteBlog(blog);
                    setConfirmOpen(true);
                  }}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>

                <ConfirmModal
                  open={confirmOpen}
                  onClose={() => setConfirmOpen(false)}
                  onConfirm={async () => {
                    if (!deleteBlog) return;

                    try {
                      await API.delete(`/news/delete/${deleteBlog.id}/`);
                      setBlogs(blogs.filter((b) => b.id !== deleteBlog.id));
                      toast.success("Blog deleted");
                    } catch (err) {
                      toast.error("Failed to delete blog");
                    } finally {
                      setConfirmOpen(false);
                      setDeleteBlog(null);
                    }
                  }}
                  title="Delete Blog"
                  description={`Are you sure you want to delete "${deleteBlog?.title}"? This action cannot be undone.`}
                  confirmText="Delete"
                />


              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Viewing Blog Details */}
      {showModal && selectedBlog && (
        <div
          onClick={() => setShowModal(false)}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg p-6 w-full max-w-lg relative"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-2">{selectedBlog.title}</h2>
            <p className="text-sm text-gray-600 mb-2 italic">{selectedBlog.subtitle}</p>
            <p className="text-gray-700 whitespace-pre-line">{selectedBlog.content}</p>
            {selectedBlog.image && (
              <img
                src={selectedBlog.image}
                alt={selectedBlog.title}
                className="mt-4 rounded w-full object-cover max-h-64"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
