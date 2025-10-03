'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import API from '../../../../../api/axios';
import ProtectedRoute from '../../../../../components/protect/ProtectedRoute';

export default function CreateResultPage() {
  const router = useRouter();

  const [fixtures, setFixtures] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    fixture: '',
    home_score: '',
    away_score: '',
    notes: '',
  });

  const [homeScorers, setHomeScorers] = useState<any[]>([]);
  const [awayScorers, setAwayScorers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompletedFixtures = async () => {
      try {
        const res = await API.get('/fixtures/?status=completed');
        const unscored = res.data.filter((f: any) => !f.result);
        setFixtures(unscored);
      } catch {
        toast.error('Failed to fetch fixtures');
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedFixtures();
  }, []);

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
    const updated = Array.from({ length: score }, (_, i) => current[i] || { name: '', minute: '', type: 'Goal' });
    team === 'home' ? setHomeScorers(updated) : setAwayScorers(updated);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!formData.fixture) return toast.error("Please select a fixture");

    const parsedHome = parseInt(formData.home_score);
    const parsedAway = parseInt(formData.away_score);

    if (homeScorers.length !== parsedHome) return toast.error("Classic FC scorers count mismatch");
    if (awayScorers.length !== parsedAway) return toast.error("Away team scorers count mismatch");

    try {
      await API.post('/results/', {
        fixture_id: parseInt(formData.fixture), 
        home_score: parsedHome,
        away_score: parsedAway,
        notes: formData.notes,
        home_scorers: homeScorers, 
        away_scorers: awayScorers,
      });

      toast.success("Result saved!");
      router.push("/dashboard/fixture");
    } catch (err: any) {
      console.error("Result error:", err.response?.data);
      const errorMsg =
        err.response?.data?.non_field_errors?.[0] ||
        Object.values(err.response?.data || {}).flat().join(', ') ||
        'Failed to save result';
      toast.error(errorMsg);
    }

  };

  return (
    <ProtectedRoute allowedGroups={['Fixtures_Manager']}>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Add Match Result</h2>

        {loading ? (
          <p className="text-gray-500">Loading fixtures...</p>
        ) : fixtures.length === 0 ? (
          <p className="text-gray-500">No completed matches pending results.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <select
              name="fixture"
              value={formData.fixture}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select Completed Fixture</option>
              {fixtures.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.is_home ? 'Classic FC' : f.opponent} vs {f.is_home ? f.opponent : 'Classic FC'} | {f.match_date}
                </option>
              ))}
            </select>

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
              placeholder="Optional notes (e.g. red cards, injuries)"
              className="w-full border p-2 rounded"
            />

            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded w-full ${loading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-400 text-white'}`}
            >
              {loading ? 'Saving...' : 'Submit Result'}
            </button>

          </form>
        )}
      </div>
    </ProtectedRoute>
  );
}
