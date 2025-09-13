'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import API from '../../../api/axios';
import { useAuth } from '../../../components/context/AuthContext';

type Player = {
  id: number;
  name: string;
  position: string;
  jersey_number: number;
  age: number;
  photo?: string;
};


export default function PlayerDashboardHome() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await API.get('/players/');
        setPlayers(res.data);
      } catch (err) {
        console.error('Failed to fetch players:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  if (loading) return <p>Loading players...</p>;

  return (
    <>
      <div className="px-2 sm:px-2 md:px-4 lg:px-6">
      <div className="overflow-x-auto w-full">
        <table className="min-w-full border border-gray-200 text-xs sm:text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="px-2 py-1 sm:px-2 sm:py-2 text-left whitespace-nowrap">#</th>
              <th className="px-2 py-1 sm:px-2 sm:py-2 text-left whitespace-nowrap">Name</th>
              <th className="px-2 py-1 sm:px-2 sm:py-2 text-left whitespace-nowrap">Position</th>
              <th className="px-2 py-1 sm:px-2 sm:py-2 text-left whitespace-nowrap">Jersey #</th>
              <th className="px-2 py-1 sm:px-2 sm:py-2 text-left whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.id} className="border-t text-sm">
                <td className="px-2 py-1 sm:px-2 sm:py-2 text-left whitespace-nowrap">{player.id}</td>
                <td className="px-2 py-1 sm:px-2 sm:py-2 text-left whitespace-nowrap">{player.name}</td>
                <td className="px-2 py-1 sm:px-2 sm:py-2 text-left whitespace-nowrap">{player.position}</td>
                <td className="px-2 py-1 sm:px-2 sm:py-2 text-left whitespace-nowrap">{player.jersey_number}</td>
                <td className="px-2 py-1 sm:px-2 sm:py-2 text-left space-x-2 whitespace-nowrap">
                  <button
                    onClick={async () => {
                      try {
                        const res = await API.get(`/players/${player.id}/`);
                        setSelectedPlayer(res.data);
                        setShowModal(true);
                      } catch (err) {
                        toast.error('Failed to load player info');
                      }
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </button>
                  <button onClick={() => router.push(`/dashboard/player/edit/${player.id}/`)} className="text-green-600 hover:underline">Edit</button>
                  <button
                    onClick={async () => {
                      const confirmDelete = confirm(`Are you sure you want to delete ${player.name}?`);
                      if (!confirmDelete) return;

                      try {
                        await API.delete(`/players/${player.id}/`);
                        toast.success('Player deleted');
                        setPlayers(players.filter((p) => p.id !== player.id)); // Remove from list
                      } catch (err) {
                        toast.error('Failed to delete player');
                      }
                    }}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>
      {showModal && selectedPlayer && (
        <div
          onClick={() => setShowModal(false)}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg p-6 w-full max-w-md relative"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-2">{selectedPlayer.name}</h2>
            <p><strong>Position:</strong> {selectedPlayer.position}</p>
            <p><strong>Jersey #:</strong> {selectedPlayer.jersey_number}</p>
            <p><strong>Age:</strong> {selectedPlayer.age}</p>
            {selectedPlayer.photo && (
              <img
                src={selectedPlayer.photo}
                alt={selectedPlayer.name}
                className="mt-4 rounded w-full object-cover max-h-64"
              />
            )}
          </div>
        </div>
      )}

    </>
  );
}
