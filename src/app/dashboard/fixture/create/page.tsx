'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import API from '../../../../api/axios';
import toast from 'react-hot-toast';
import ProtectedRoute from '../../../../components/protect/ProtectedRoute';

export default function CreateFixture() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    game_type: 'league',
    opponent: '',
    match_date: '',
    match_time: '',
    location: '',
    is_home: true,
    zone: 'A',
    match_day: 1,
    status: 'upcoming',
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await API.post('/fixtures/fixtures/', formData);
      toast.success('Fixture created!');
      router.push('/dashboard/fixture');
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.non_field_errors?.[0] || // common error
        Object.values(err.response?.data || {}).flat().join(', ') || // grab all messages
        'Failed to create fixture';
      toast.error(errorMsg);
    }
  };

  return (
    <ProtectedRoute allowedGroups={['Fixtures_Manager']}>
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Create Fixture</h2>
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
          <input name="opponent" value={formData.opponent} onChange={handleChange} placeholder="Opponent" className="w-full border p-2 rounded" required />
          <input name="match_date" type="date" value={formData.match_date} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="match_time" type="time" value={formData.match_time} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="w-full border p-2 rounded" />

          {/* Conditionally render if league is selected */}
          { formData.game_type === 'league' && (
            <>
          <input name="match_day" type="number" value={formData.match_day} onChange={handleChange} placeholder="Match Day" className="w-full border p-2 rounded" />

          <select name="zone" value={formData.zone} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="A">Zone A</option>
            <option value="B">Zone B</option>
            <option value="C">Zone C</option>
          </select>

          <select name="status" value={formData.status} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
            <option value="postponed">Postponed</option>
          </select>
          </>
          )}

          <label className="flex items-center gap-2">
            <input name="is_home" type="checkbox" checked={formData.is_home} onChange={handleChange} />
            Is Home Game
          </label>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create Fixture</button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
