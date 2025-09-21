'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import API from '../../../../../api/axios';
import ProtectedRoute from '../../../../../components/protect/ProtectedRoute';


type FixtureFormData = {
  game_type: string;
  opponent: string;
  match_date: string;
  match_time: string;
  location: string;
  is_home: boolean;
  status: string;
  zone?: string;       // optional
  match_day?: number;  // optional
};


export default function EditFixturePage() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState<FixtureFormData>({
    game_type: 'League Game',
    opponent: '',
    match_date: '',
    match_time: '',
    location: '',
    is_home: true,
    status: 'upcoming',
    match_day: 1,
  });


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFixture = async () => {
      try {
        const res = await API.get(`/fixtures/${id}/`);
        const data = res.data;
        setFormData({
          game_type: data.game_type,
          opponent: data.opponent,
          match_date: data.match_date,
          match_time: data.match_time,
          location: data.location,
          is_home: data.is_home,
          match_day: data.match_day,
          status: data.status,
        });
      } catch (err) {
        setError('Failed to fetch fixture.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchFixture();
  }, [id]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');

    try {
      const payload = { ...formData };

      if (payload.game_type !== 'league') {
        delete payload.match_day;
      }

      await API.put(`/fixtures/${id}/`, payload);
      toast.success('Fixture updated successfully');
      router.push('/dashboard/fixture');
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.non_field_errors?.[0] ||
        Object.values(err.response?.data || {}).flat().join(', ') ||
        'Failed to update fixture';
      toast.error(errorMsg);
    }
  };


  if (loading) return <p className="text-center py-10">Loading fixture...</p>;

  return (
    <ProtectedRoute allowedGroups={['Fixtures_Manager']}>
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Edit Fixture</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="game_type"
            value={formData.game_type}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="league">League Game</option>
            <option value="friendly">Friendly</option>
            <option value="cup">Cup Match</option>
          </select>
          <input
            type="text"
            name="opponent"
            value={formData.opponent}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Opponent"
            required
          />
          <input
            type="date"
            name="match_date"
            value={formData.match_date}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="time"
            name="match_time"
            value={formData.match_time}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Location"
          />

          { /** conditionally render if league is selected */}
          {
            formData.game_type === 'league' && (
              <>
                <input
                  type="number"
                  name="match_day"
                  value={formData.match_day}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  placeholder="Match Day"
                />
              </>
            )
          }
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
            <option value="postponed">Postponed</option>
          </select>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_home"
              checked={formData.is_home}
              onChange={handleChange}
            />
            Is Home Game
          </label>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update Fixture
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
