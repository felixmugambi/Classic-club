'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import API from '../../../api/axios';
import ProtectedRoute from '../../../components/protect/ProtectedRoute';
import { useAuth } from '../../context/AuthContext';
import ConfirmModal from '../../confirm/ConfirmModal';
import Loader from '../../common/Loader';

export default function FixtureDashboardPage() {
  const [fixtures, setFixtures] = useState([]);
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    API.get('/fixtures/')
      .then((res) => setFixtures(res.data))
      .catch(() => setFixtures([]))
      .finally(() => setLoading(false));
  }, []);


  const groupedFixtures = {
    upcoming: fixtures.filter((f: any) => f.status === "upcoming"),
    completed: fixtures.filter((f: any) => f.status === "completed"),
    postponed: fixtures.filter((f: any) => f.status === "postponed"),
  };

  const handleDelete = async (id: number) => {
    try {
      await API.delete(`/fixtures/${id}/`);
      setFixtures(fixtures.filter((f: any) => f.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete fixture.");
    } finally {
      setLoading(false)
    }
  };
if (loading) return <Loader />

  return (
    <ProtectedRoute allowedGroups={['Fixtures_Manager']}>
      <div>
        <h2 className="text-2xl font-semibold mb-4">All Fixtures</h2>
        <Link
          href="/dashboard/fixture/create"
          className="bg-green-500 hover:bg-green-400 text-white px-3 py-1 rounded mb-6 inline-block"
        >
          Create New Fixture
        </Link>

        {Object.entries(groupedFixtures).map(([status, list]) => (
          <div key={status} className="mt-6">
            <h3 className="text-xl font-bold capitalize">{status}</h3>
            {list.length === 0 && <p>No {status} fixtures.</p>}
            <div className="space-y-4">
              {list.map((fix: any) => (
                <div
                  key={fix.id}
                  className="bg-white p-4 shadow rounded flex justify-between"
                >
                  <div>
                    <h3 className="font-bold">
                      {fix.opponent} - {fix.game_type}
                    </h3>
                    <p>
                      {new Date(fix.match_date).toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})} - {fix.match_time}
                    </p>
                    <p>
                      {fix.game_type === "friendly"
                        ? fix.is_home
                          ? "Home"
                          : "Away"
                        : <>Zone A | {fix.is_home ? "Home" : "Away"}</>}
                    </p>
                  </div>
                  <div className='flex items-center'>
                    {(fix.status !== "completed" || user?.groups.includes('Higher_admins')) && (
                      <Link
                        href={`/dashboard/fixture/edit/${fix.id}`}
                        className="text-green-500  hover:underline m-2"
                      >
                        Edit
                      </Link>
                    )
                    }
                    {user?.groups.includes('Higher_admins') && (
                      <>
                        <button
                          className="text-red-600 hover:underline m-2"
                          onClick={() => {
                            setSelectedId(fix.id);
                            setIsOpen(true);
                          }}
                        >
                          Delete
                        </button>
                        <ConfirmModal
                          open={isOpen}
                          onClose={() => setIsOpen(false)}
                          onConfirm={() => {
                            if (selectedId) handleDelete(selectedId);
                            setIsOpen(false);
                          }}
                          title="Delete?"
                          description="The Fixture will be deleted."
                          confirmText="Delete"
                          cancelText="Cancel"
                        />
                      </>
                    )}
                  </div>

                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ProtectedRoute>
  );
}
