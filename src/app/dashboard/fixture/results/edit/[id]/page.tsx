'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import API from '../../../../../../api/axios';
import ProtectedRoute from '../../../../../../components/protect/ProtectedRoute';

export default function EditResultPage() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    fixture: '', // will be fixture ID
    home_score: '',
    away_score: '',
    notes: '',
  });

  const [homeScorers, setHomeScorers] = useState<any[]>([]);
  const [awayScorers, setAwayScorers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [fixtures, setFixtures] = useState<{ id: number; opponent: string; match_date: string }[]>([]);

  // Fetch fixtures
  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const res = await API.get('/fixtures/');
        setFixtures(res.data);
      } catch {
        toast.error("Failed to load fixtures");
      }
    };
    fetchFixtures();
  }, []);

  // Fetch result by ID
  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await API.get(`/results/${id}/`);
        const data = res.data;

        setFormData({
          fixture: data.fixture.id, // fixture ID
          home_score: String(data.home_score),
          away_score: String(data.away_score),
          notes: data.notes || '',
        });

        setHomeScorers(data.classic_scorers || []);
        setAwayScorers(data.away_scorers || []);
      } catch {
        setError('Failed to fetch result');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchResult();
  }, [id]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updateScorer = (team: 'home' | 'away', index: number, field: string, value: string) => {
    const update = team === 'home' ? [...homeScorers] : [...awayScorers];
    update[index][field] = value;
    team === 'home' ? setHomeScorers(update) : setAwayScorers(update);
  };

  const generateScorerFields = (team: 'home' | 'away', score: number) => {
    const current = team === 'home' ? homeScorers : awayScorers;
    const updated = Array.from(
      { length: score },
      (_, i) => current[i] || { name: '', minute: '', type: 'Goal' }
    );
    team === 'home' ? setHomeScorers(updated) : setAwayScorers(updated);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const parsedHome = parseInt(formData.home_score);
    const parsedAway = parseInt(formData.away_score);

    if (homeScorers.length !== parsedHome)
      return toast.error('Classic FC scorers count mismatch');
    if (awayScorers.length !== parsedAway)
      return toast.error('Away team scorers count mismatch');

    try {
      await API.put(`/results/${id}/`, {
        fixture: formData.fixture, // must be ID
        home_score: parsedHome,
        away_score: parsedAway,
        notes: formData.notes,
        classic_scorers: homeScorers,
        away_scorers: awayScorers,
      });

      toast.success('Result updated!');
      router.push('/dashboard/results');
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.non_field_errors?.[0] ||
        Object.values(err.response?.data || {}).flat().join(', ') ||
        'Failed to update result';
      toast.error(errorMsg);
    }
  };

  return (
    <ProtectedRoute allowedGroups={['Fixtures_Manager']}>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Edit Match Result</h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Fixture Select */}
            <div className="mb-3">
              <label className="block text-sm font-medium">Fixture</label>
              <select
                name="fixture"
                value={formData.fixture}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              >
                {fixtures.map((f) => (
                  <option key={f.id} value={f.id}>
                    Match Day {f.id} - {f.opponent} ({f.match_date})
                  </option>
                ))}
              </select>
            </div>

            {/* Scores */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="home_score"
                value={formData.home_score}
                onChange={(e) => {
                  handleChange(e);
                  generateScorerFields('home', parseInt(e.target.value || '0'));
                }}
                placeholder="Home Score"
                className="border p-2 rounded"
                required
                min={0}
              />

              <input
                type="number"
                name="away_score"
                value={formData.away_score}
                onChange={(e) => {
                  handleChange(e);
                  generateScorerFields('away', parseInt(e.target.value || '0'));
                }}
                placeholder="Away Score"
                className="border p-2 rounded"
                required
                min={0}
              />
            </div>

            {/* Home Scorers */}
            {homeScorers.length > 0 && (
              <div>
                <h4 className="font-semibold mt-4 mb-2">Home Team Scorers</h4>
                {homeScorers.map((s, i) => (
                  <div key={i} className="grid grid-cols-3 gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Scorer name"
                      className="border p-2 rounded"
                      value={s.name}
                      onChange={(e) => updateScorer('home', i, 'name', e.target.value)}
                      required
                    />
                    <input
                      type="number"
                      placeholder="Minute"
                      className="border p-2 rounded"
                      value={s.minute}
                      onChange={(e) => updateScorer('home', i, 'minute', e.target.value)}
                      required
                      min={0}
                    />
                    <select
                      className="border p-2 rounded"
                      value={s.type}
                      onChange={(e) => updateScorer('home', i, 'type', e.target.value)}
                    >
                      <option value="Goal">Goal</option>
                      <option value="Penalty">Penalty</option>
                      <option value="Own Goal">Own Goal</option>
                    </select>
                  </div>
                ))}
              </div>
            )}

            {/* Away Scorers */}
            {awayScorers.length > 0 && (
              <div>
                <h4 className="font-semibold mt-4 mb-2">Away Team Scorers</h4>
                {awayScorers.map((s, i) => (
                  <div key={i} className="grid grid-cols-3 gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Scorer name"
                      className="border p-2 rounded"
                      value={s.name}
                      onChange={(e) => updateScorer('away', i, 'name', e.target.value)}
                      required
                    />
                    <input
                      type="number"
                      placeholder="Minute"
                      className="border p-2 rounded"
                      value={s.minute}
                      onChange={(e) => updateScorer('away', i, 'minute', e.target.value)}
                      required
                      min={0}
                    />
                    <select
                      className="border p-2 rounded"
                      value={s.type}
                      onChange={(e) => updateScorer('away', i, 'type', e.target.value)}
                    >
                      <option value="Goal">Goal</option>
                      <option value="Penalty">Penalty</option>
                      <option value="Own Goal">Own Goal</option>
                    </select>
                  </div>
                ))}
              </div>
            )}

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Optional notes"
              className="w-full border p-2 rounded"
            />

            <button
            disabled={loading}
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400 w-full"
            >
              {loading ? "Updating ..." : "Update Result"}
            </button>
          </form>
        )}
      </div>
    </ProtectedRoute>
  );
}
