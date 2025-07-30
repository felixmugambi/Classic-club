'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import API from '../../../api/axios';
import ProtectedRoute from '../../../components/protect/ProtectedRoute';

export default function FixtureDashboardPage() {
  const [fixtures, setFixtures] = useState([]);

  useEffect(() => {
    API.get('/fixtures/fixtures/')
      .then((res) => setFixtures(res.data))
      .catch(() => setFixtures([]));
  }, []);

  return (
    <ProtectedRoute allowedGroups={['Fixtures_Manager']}>
      <div>
        <h2 className="text-2xl font-semibold mb-4">All Fixtures</h2>
        <Link href="/dashboard/fixture/create" className="bg-blue-600 text-white px-3 py-1 rounded mb-6 inline-block">
          Create New Fixture
        </Link>
        <div className="mt-4 space-y-4">
          {fixtures.length === 0 && <p>No fixtures found.</p>}
          {fixtures.map((fix: any) => (
            <div key={fix.id} className="bg-white p-4 shadow rounded flex justify-between">
              <div>
                <h3 className="font-bold">{fix.opponent} - {fix.game_type}</h3>
                <p>{fix.match_date} - {fix.match_time}</p>
                <p>
                  {fix.game_type === 'friendly'
                    ? (fix.is_home ? 'Home' : 'Away')
                    : <>Zone {fix.zone} | {fix.is_home ? 'Home' : 'Away'}</>
                  }
                </p>
              </div>
              <Link href={`/dashboard/fixture/edit/${fix.id}`} className="text-blue-600 hover:underline">
                Edit
              </Link>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
