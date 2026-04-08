'use client';

import { useEffect, useState } from 'react';
import { FaChevronDown, FaFutbol } from 'react-icons/fa';
import API from '../../api/axios';
import Loader from '../../components/common/Loader';
import { useAuth } from '../../components/context/AuthContext';
import toast from 'react-hot-toast';

type Fixture = {
  id: number;
  opponent: string;
  match_date: string;
  match_time: string;
  location: string;
  is_home: boolean;
  match_day: number;
  status: string;
  game_type: string;
};

type Result = {
  id: number;
  fixture: Fixture;
  home_score: number;
  away_score: number;
  notes?: string;
  home_scorers?: { name: string; minute: string; type: string }[];
  away_scorers?: { name: string; minute: string; type: string }[];
};

type GroupedFixtures = {
  [month: string]: Fixture[];

};

type Standing = {
  id: number;
  zone: string;
  position: number;
  team: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
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

const addToCalendar = (fix: Fixture) => {
  const start = new Date(`${fix.match_date}T${fix.match_time}`);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // 2 hours match

  const formatDate = (date: Date) =>
    date.toISOString().replace(/-|:|\.\d+/g, "");

  const title = `Classic FC vs ${fix.opponent}`;
  const location = fix.location;

  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&dates=${formatDate(start)}/${formatDate(end)}&location=${encodeURIComponent(
    location
  )}`;

  window.open(googleUrl, "_blank");
};

export default function AllMatchesPage() {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [filtered, setFiltered] = useState<GroupedFixtures>({});
  const [loading, setLoading] = useState(true);

  const [monthFilter, setMonthFilter] = useState('');
  const [gameTypeFilter, setGameTypeFilter] = useState('');
  const [venueFilter, setVenueFilter] = useState('');

  const [activeTab, setActiveTab] = useState<'fixtures' | 'results' | 'table'>('fixtures');
  const [openResultID, setOpenResultID] = useState<number | null>(null)
  const [standings, setStandings] = useState<Standing[]>([]);

  const { user } = useAuth()


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fixRes, resRes, tableRes] = await Promise.all([
          API.get('/public-fixtures/'),
          API.get('/public-results/'),
          API.get('/standings/zone-a/')
        ]);
        setFixtures(fixRes.data);
        setResults(resRes.data);
        setStandings(tableRes.data)
      } catch (err) {
        console.error('Failed to load data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const group: GroupedFixtures = {};
    fixtures
      .filter(fix => fix.status !== 'completed') // ✅ show only upcoming
      .forEach(fix => {
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

  const filteredResults = results.filter(res => {
    const { month } = getFormatted(res.fixture.match_date, res.fixture.match_time);

    const matchesMonth = !monthFilter || month === monthFilter;
    const matchesType = !gameTypeFilter || res.fixture.game_type === gameTypeFilter;
    const matchesVenue = !venueFilter || (venueFilter === 'home' ? res.fixture.is_home : !res.fixture.is_home);

    return matchesMonth && matchesType && matchesVenue;
  });


  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Tabs */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-black">Matches</h2>
        <div className="flex gap-3">
          {['fixtures', 'results', 'table'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 rounded text-sm ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Filters for Fixtures and Results */}
      {(activeTab === 'fixtures' || activeTab === 'results') && (
        <div className="flex flex-wrap gap-4 mb-8">
          <select value={monthFilter} onChange={e => setMonthFilter(e.target.value)} className="border rounded px-3 py-2 text-sm">
            <option value="">All Months</option>
            {months.map(m => <option key={m} value={m}>{m}</option>)}
          </select>

          <select value={gameTypeFilter} onChange={e => setGameTypeFilter(e.target.value)} className="border rounded px-3 py-2 text-sm">
            <option value="">All Types</option>
            <option value="league">League</option>
            <option value="friendly">Friendly</option>
            <option value="cup">Cup</option>
          </select>

          <select value={venueFilter} onChange={e => setVenueFilter(e.target.value)} className="border rounded px-3 py-2 text-sm">
            <option value="">All Venues</option>
            <option value="home">Home</option>
            <option value="away">Away</option>
          </select>
        </div>
      )}

      {/* Fixtures Tab */}
      {activeTab === 'fixtures' && (
        <>
          {loading ? (
            <Loader />
          ) : Object.keys(filtered).length === 0 ? (
            <p className="text-center text-gray-500 mt-20">No fixtures available</p>
          ) : (
            Object.entries(filtered).map(([month, items]) => (
              <div key={month} className="mb-10">
                <h3 className="text-xl font-semibold text-clubRed mb-4">{month}</h3>
                <div className="space-y-4">
                  {items.map(fix => {
                    const { date, time } = getFormatted(fix.match_date, fix.match_time);
                    const home = fix.is_home ? 'Classic FC' : fix.opponent;
                    const away = fix.is_home ? fix.opponent : 'Classic FC';
                    return (
                      <div key={fix.id} className="bg-white p-4 shadow rounded border flex justify-between flex-wrap md:flex-nowrap">
                        <div>
                          <p className="font-bold text-black">{date} | {time}</p>
                          <p className="text-sm text-gray-600 mt-1">{home} <span className="text-gray-400">vs</span> {away}</p>
                          <span className={`px-2 py-2 rounded-xl text-md font-semibold text-center ${fix.status === 'completed' ? 'text-green-600'
                          : fix.status === 'postponed' ? 'text-yellow-500'
                            : 'text-blue-600'
                          }`}>
                          {fix.status}
                        </span>
                        </div>
                        <div className="flex gap-2 items-center">
                          {user && (
                            <button
                              onClick={() => addToCalendar(fix)}
                              className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                            >
                              Add Fixture to Calendar
                            </button>
                          )}
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </>
      )}

      {/* Results Tab */}
      {activeTab === 'results' && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Match Results</h3>
          {loading ? (
            <Loader />
          ) : results.length === 0 ? (
            <p className="text-center text-gray-500 mt-20">No results available</p>
          ) : (
            filteredResults.map(res => {
              const { date, time } = getFormatted(res.fixture.match_date, res.fixture.match_time);
              const home = res.fixture.is_home ? 'Classic FC' : res.fixture.opponent;
              const away = res.fixture.is_home ? res.fixture.opponent : 'Classic FC';
              return (
                <div key={res.id} className="bg-white p-4 shadow rounded border mb-4">
                  <p className="font-bold text-black">{date} | {time}</p>
                  <p className="text-xs text-gray-500 mb-2">
                    {res.fixture.game_type === 'league'
                      ? `League Game - Matchday ${res.fixture.match_day}`
                      : res.fixture.game_type === 'friendly'
                        ? 'Friendly Match'
                        : 'Cup Match'}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-semibold">{home}</p>
                    <div className="flex items-center justify-center">
                      <p className="bg-gray-100 px-2 mx-2 text-lg font-semibold">{res.home_score}</p>
                      <p className="bg-gray-100 px-2 mx-2 text-lg font-semibold">{res.away_score}</p>
                    </div>
                    <p className="text-xl font-semibold">{away}</p>
                  </div>
                  <div className="flex justify-center items-center py-2 cursor-pointer"
                    onClick={() => setOpenResultID(prev => (prev === res.id ? null : res.id))}>
                    <FaChevronDown className={`text-2xl transition-transform duration-200 ${openResultID === res.id ? 'rotate-180' : ''
                      }`} />
                  </div>
                  {openResultID === res.id &&
                    <div className='flex items-center justify-between'>
                      <div>
                        {res.home_scorers?.map((scorer, index) => (
                          <span key={index} className='flex items-center text-lg'>
                            <FaFutbol className='w-4 h-4' />
                            {scorer.name} {scorer.minute}</span>
                        ))}
                      </div>
                      <div>
                        {res.away_scorers?.map((scorer, index) => (
                          <span key={index} className='flex ml-2 items-center  text-lg'>
                            <FaFutbol className='w-4 h-4' />
                            {scorer.name} {scorer.minute}</span>
                        ))}
                      </div>

                    </div>
                  }
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Table Tab */}
      {activeTab === 'table' && (
        <div>
          <h3 className="text-xl font-semibold mb-4">League Table</h3>
          {/* TODO: Replace with real table endpoint */}
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2">Pos</th>
                <th className="border px-3 py-2">Team</th>
                <th className="border px-3 py-2">P</th>
                <th className="border px-3 py-2">W</th>
                <th className="border px-3 py-2">D</th>
                <th className="border px-3 py-2">L</th>
                <th className="border px-3 py-2">Pts</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-500">Loading standings...</td>
                </tr>
              ) : standings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-500">No standings available</td>
                </tr>
              ) : (
                standings.map((team) => (
                  <tr key={team.id}>
                    <td className="border px-3 py-2">{team.position}</td>
                    <td className="border px-3 py-2">{team.team}</td>
                    <td className="border px-3 py-2">{team.played}</td>
                    <td className="border px-3 py-2">{team.wins}</td>
                    <td className="border px-3 py-2">{team.draws}</td>
                    <td className="border px-3 py-2">{team.losses}</td>
                    <td className="border px-3 py-2 font-bold">{team.points}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
