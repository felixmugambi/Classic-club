'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import API from '../../../../../api/axios';
import ProtectedRoute from '../../../../../components/protect/ProtectedRoute';

export default function EditPlayerPage() {
  const router = useRouter();
  const { id } = useParams(); // This gets the dynamic route ID

  const [formData, setFormData] = useState({
    name: '',
    jersey_number: '',
    position: 'Goalkeeper',
    age: '',
    photo: null as File | null,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const res = await API.get(`/players/${id}/`);
        const data = res.data;
        setFormData({
          name: data.name,
          jersey_number: data.jersey_number.toString(),
          position: data.position,
          age: data.age.toString(),
          photo: null,
        });
      } catch (err) {
        setError('Failed to load player');
      }
    };

    fetchPlayer();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'photo') {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files?.[0];
      if (file) {
        setFormData({ ...formData, photo: file });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const form = new FormData();
    form.append('name', formData.name);
    form.append('jersey_number', formData.jersey_number);
    form.append('position', formData.position);
    form.append('age', formData.age);
    if (formData.photo) {
      form.append('photo', formData.photo);
    }

    try {
      await API.put(`/players/${id}/`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Player updated successfully!');
      router.push('/dashboard/player');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to update player');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute allowedGroups={['Players_manager']}>
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Edit Player</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input type="number" name="jersey_number" placeholder="Jersey Number" value={formData.jersey_number} onChange={handleChange} className="w-full border p-2 rounded" required />
          <select name="position" value={formData.position} onChange={handleChange} className="w-full border p-2 rounded" required>
            <option value="Goalkeeper">Goalkeeper</option>
            <option value="Defender">Defender</option>
            <option value="Midfielder">Midfielder</option>
            <option value="Forward">Forward</option>
          </select>
          <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input type="file" name="photo" onChange={handleChange} className="w-full" accept="image/*" />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            {loading ? 'Updating...' : 'Update Player'}
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
