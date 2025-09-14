'use client';

import { useState } from 'react';
import API from '../../../../api/axios';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../../../../components/protect/ProtectedRoute';

export default function CreatePlayerPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        jersey_number: '',
        position: 'Goalkeeper',
        age: '',
        photo: null as File | null,
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
      
        if (name === 'photo') {
          const file = (e.target as HTMLInputElement).files?.[0];
          setFormData({ ...formData, photo: file || null });
        } else {
          setFormData({ ...formData, [name]: value });
        }
      };      


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
      
        
        if (!formData.photo) {
          setError("Player photo is required.");
          setLoading(false);
          return;
        }
      
        const form = new FormData();
        form.append('name', formData.name);
        form.append('jersey_number', formData.jersey_number);
        form.append('position', formData.position);
        form.append('age', formData.age);
        form.append('photo', formData.photo);
      
        try {
          await API.post('/players/', form, {
            headers: { "Content-Type": "multipart/form-data" }, // ✅ explicit
          });
          router.push('/dashboard/player');
        } catch (err: any) {
          console.error('Create player error:', err.response?.data || err);
          setError(JSON.stringify(err.response?.data || 'Failed to create player'));
        } finally {
          setLoading(false);
        }
      };
      

    return (
        <ProtectedRoute allowedGroups={['Players_manager']}>
            <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
                <h2 className="text-2xl font-semibold mb-4">Create New Player</h2>
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
                    <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        {loading ? 'Submitting...' : 'Create Player'}
                    </button>
                </form>
            </div>
        </ProtectedRoute>
    );
}
