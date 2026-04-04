'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import API from '../../../../../api/axios';
import ProtectedRoute from '../../../../../components/protect/ProtectedRoute';
import dynamic from 'next/dynamic';
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(
  () => import('react-quill-new'),
  { ssr: false }
);

export default function EditBlogPage() {
  const router = useRouter();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    content: '',
    image: null as File | null,
  });
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch blog data
  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const res = await API.get(`/news/blogs/${id}/`);
        const data = res.data;

        setFormData({
          title: data.title || '',
          subtitle: data.subtitle || '',
          content: data.content || '',
          image: null,
        });

        setCurrentImage(data.image); // NEW
      } catch (err) {
        setError('Failed to load blog data.');
      }
    };

    fetchBlog();
  }, [id]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'image') {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files?.[0];
      if (file) {
        setFormData((prev) => ({
          ...prev,
          image: file,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Submit blog update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const form = new FormData();
    form.append('title', formData.title);
    form.append('subtitle', formData.subtitle);
    form.append('content', formData.content);
    if (formData.image) {
      form.append('image', formData.image);
    }

    try {
      await API.put(`/news/blogs/${id}/`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Blog updated successfully!');
      router.push('/dashboard/blog');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to update blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute allowedGroups={['Blog_Editors']}>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Edit Blog</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="subtitle"
            placeholder="Subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {formData.content !== undefined && (
            <ReactQuill
              value={formData.content}
              onChange={(val) =>
                setFormData((prev) => ({
                  ...prev,
                  content: val,
                }))
              }
              theme="snow"
              placeholder="Edit your blog content..."
              className="bg-white rounded"
              modules={{
                toolbar: [
                  ["bold", "italic", "underline", "blockquote"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["clean"],
                ],
              }}
            />
          )}
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full"
            accept="image/*"
          />
          {currentImage && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-1">Current Image</p>
              <img
                src={currentImage}
                alt="Current"
                className="w-full max-h-60 object-cover rounded"
              />
            </div>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400"
          >
            {loading ? 'Updating...' : 'Update Blog'}
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
