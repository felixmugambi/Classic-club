'use client';

import { useEffect, useState } from 'react';
import PlayerList from '../../components/player/PlayerList';
import API from '../../api/axios';
import Loader from '../../components/common/Loader';

type Player = {
  id: number;
  name: string;
  jersey_number: number;
  position: string;
  photo: string;
};


export default function PlayerPage() {
  const [players, setPlayers] = useState<{ [position: string]: Player[] }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/players/public/')
      .then((res) => {
        const data: Player[] = res.data;
        

        // Group players by position
        const grouped = data.reduce<{ [pos: string]: Player[] }>((acc, player) => {
          if (!acc[player.position]) {
            acc[player.position] = [];
          }
          acc[player.position].push(player);
          return acc;
        }, {});


        // Define the correct order
        const order = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'];

        // Reorder the grouped players based on `order`
        const orderedGrouped: { [pos: string]: Player[] } = {};
        order.forEach((pos) => {
          if (grouped[pos]) {
            orderedGrouped[pos] = grouped[pos];
          }
        });

        setPlayers(orderedGrouped);
      })
      .catch((err) => console.error('Error fetching players', err))
      .finally(() => setLoading(false));
  }, []);


  return (
    <div className="bg-white min-h-screen">
      <h1 className="text-4xl font-bold text-center py-6">Our Squad</h1>

      {loading ? (
        <Loader />
      ) : Object.keys(players).length === 0 ? (
        <div className="text-center py-10 text-gray-600 text-lg">
          No players found!
        </div>
      ) : (
        <PlayerList players={players} />
      )}
    </div>
  );
}
