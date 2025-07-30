'use client';

import { useEffect, useState } from 'react';
import API from '../../api/axios';

type Fixture = {
  id: number;
  match_date: string;
  match_time: string;
  location: string;
  opponent: string;
  is_home: boolean;
  result: {
    home_score: number;
    away_score: number;
    notes?: string;
  };
};

export default function ResultsPage() {
  const [results, setResults] = useState<Fixture[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await API.get('/fixtures/fixtures/?status=completed');
        const completedWithResults = res.data.filter((fix: Fixture) => fix.result);
        setResults(completedWithResults);
      } catch (err) {
        console.error('Failed to fetch results', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-black">Match Results</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading match results...</p>
      ) : results.length === 0 ? (
        <p className="text-center text-gray-500">No results have been recorded yet.</p>
      ) : (
        <div className="space-y-6">
          {results.map((match) => {
            const date = new Date(`${match.match_date}T${match.match_time}`).toLocaleDateString(undefined, {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });

            const time = new Date(`${match.match_date}T${match.match_time}`).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            });

            const home = match.is_home ? 'Classic FC' : match.opponent;
            const away = match.is_home ? match.opponent : 'Classic FC';

            return (
              <div
                key={match.id}
                className="bg-white border p-4 rounded shadow-sm hover:shadow transition"
              >
                <div className="text-sm text-gray-500 mb-1">
                  {date} · {time} · {match.location || 'TBD'}
                </div>
                <div className="text-lg font-semibold">
                  {home} {match.result.home_score} - {match.result.away_score} {away}
                </div>
                {match.result.notes && (
                  <div className="text-sm text-gray-600 mt-1 italic">{match.result.notes}</div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
