'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import API from '../../../../api/axios';
import toast from 'react-hot-toast';
import ProtectedRoute from '../../../../components/protect/ProtectedRoute';
import dynamic from 'next/dynamic';
import "react-quill-new/dist/quill.snow.css";


const ReactQuill = dynamic(
  () => import('react-quill-new'),   // <= new package
  { ssr: false }
);


export default function CreateBlogPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    content: '',
    image: null as File | null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;

    if (name === 'image') {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files?.[0];
      if (file) {
        setFormData({ ...formData, image: file });
      }
    } else {
      setFormData({ ...formData, [name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const blogData = new FormData();
    blogData.append('title', formData.title);
    blogData.append('subtitle', formData.subtitle);
    blogData.append('content', formData.content); // HTML from Quill
    if (formData.image) {
      blogData.append('image', formData.image);
    }

    try {
      await API.post('/news/blogs/', blogData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Blog created');
      router.push('/dashboard/blog');
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Failed to create blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute allowedGroups={['Blog_Editors']}>
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Create New Blog</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            placeholder="Subtitle"
            className="w-full border p-2 rounded"
            required
          />

          {/* Rich Text Editor */}
          <ReactQuill
            value={formData.content}
            onChange={(val) => setFormData({ ...formData, content: val })}
            theme="snow"
            placeholder="Write your blog content here..."
            className="bg-white rounded"
            modules={{
              toolbar: [
                // remove [{ header: [1, 2, 3, false] }] if you don’t want the dropdown
                ["bold", "italic", "underline", "blockquote"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["clean"],
              ],
            }}
            
          />


          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full"
            accept="image/*"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400"
          >
            {loading ? 'Creating...' : 'Create Blog'}
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
