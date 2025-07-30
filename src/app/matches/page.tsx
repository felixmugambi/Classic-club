'use client';

import { useEffect, useState } from 'react';
import API from '../../api/axios';
import { useRouter } from 'next/navigation';

type Fixture = {
  id: number;
  opponent: string;
  match_date: string;
  match_time: string;
  location: string;
  is_home: boolean;
  zone: string;
  match_day: number;
  status: string;
  game_type: string;
};

type GroupedFixtures = {
  [month: string]: Fixture[];
};

const getFormatted = (dateStr: string, timeStr: string) => {
  const dt = new Date(`${dateStr}T${timeStr}`);
  return {
    date: dt.toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    }),
    time: dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    month: dt.toLocaleString('default', { month: 'long', year: 'numeric' }),
  };
};

export default function AllMatchesPage() {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [filtered, setFiltered] = useState<GroupedFixtures>({});
  const [loading, setLoading] = useState(true);

  const [monthFilter, setMonthFilter] = useState('');
  const [gameTypeFilter, setGameTypeFilter] = useState('');
  const [venueFilter, setVenueFilter] = useState('');
  const router = useRouter()


  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const res = await API.get('/fixtures/fixtures/');
        setFixtures(res.data);
      } catch (err) {
        console.error('Failed to load fixtures', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFixtures();
  }, []);

  useEffect(() => {
    const group: GroupedFixtures = {};

    fixtures.forEach(fix => {
      const { month } = getFormatted(fix.match_date, fix.match_time);

      const matchesMonth = !monthFilter || month === monthFilter;
      const matchesType = !gameTypeFilter || fix.game_type === gameTypeFilter;
      const matchesVenue = !venueFilter || (venueFilter === 'home' ? fix.is_home : !fix.is_home);

      if (matchesMonth && matchesType && matchesVenue) {
        if (!group[month]) group[month] = [];
        group[month].push(fix);
      }
    });

    setFiltered(group);
  }, [fixtures, monthFilter, gameTypeFilter, venueFilter]);

  const months = Array.from(new Set(fixtures.map(fix => getFormatted(fix.match_date, fix.match_time).month)));


  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-black">All Fixtures by Month</h2>
        <div className="flex gap-3">
          <button onClick={() => router.push('/results')} className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 text-sm">Results</button>
          <button className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 text-sm">Table</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm">Add to Calendar</button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <select
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="">All Months</option>
          {months.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <select
          value={gameTypeFilter}
          onChange={(e) => setGameTypeFilter(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="">All Types</option>
          <option value="league">League</option>
          <option value="friendly">Friendly</option>
          <option value="cup">Cup</option>
        </select>

        <select
          value={venueFilter}
          onChange={(e) => setVenueFilter(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="">All Venues</option>
          <option value="home">Home</option>
          <option value="away">Away</option>
        </select>
      </div>

      {/* Fixtures */}
      {loading ? (
        <p className="text-center text-gray-500">Loading fixtures...</p>
      ) : Object.keys(filtered).length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <p className="text-lg font-medium mb-2">No data available for the selected filters.</p>
          <p className="text-sm">Try changing your selected filters.</p>
        </div>
      ) : (
        Object.entries(filtered).map(([month, items]) => (
          <div key={month} className="mb-10">
            <h3 className="text-xl font-semibold text-clubRed mb-4">{month}</h3>
            <div className="space-y-4">
              {items.map((fix) => {
                const { date, time } = getFormatted(fix.match_date, fix.match_time);
                const home = fix.is_home ? 'Classic FC' : fix.opponent;
                const away = fix.is_home ? fix.opponent : 'Classic FC';

                return (
                  <div key={fix.id} className="bg-white p-4 shadow rounded border flex justify-between flex-wrap md:flex-nowrap">
                    <div className="flex-1">
                      <p className="font-bold text-black">{date} | {time}</p>
                      <p className="text-sm text-gray-600 mt-1">{home} <span className="text-gray-400">vs</span> {away}</p>
                      <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">
                        {fix.game_type === 'league'
                          ? `League Game - Zone ${fix.zone} - Matchday ${fix.match_day}`
                          : fix.game_type === 'friendly'
                            ? 'Friendly Match'
                            : 'Cup Match'}
                      </p>
                    </div>
                    <div className="text-sm mt-2 md:mt-0 text-right">
                      <span className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${fix.status === 'completed'
                        ? 'bg-green-600'
                        : fix.status === 'postponed'
                          ? 'bg-yellow-500'
                          : 'bg-blue-600'
                        }`}>
                        {fix.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
