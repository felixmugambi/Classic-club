// pages/players/index.tsx
'use client';

import { useEffect, useState } from 'react';
import PlayerList from '../../components/player/PlayerList';
import API from '../../api/axios';

type Player = {
  id: number;
  name: string;
  jersey_number: number;
  position: string;
  photo: string;
};

const PlayerPage = () => {

const [players, setPlayers] = useState<{ [position: string]: Player[] }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/players/public/')
      .then((res) => setPlayers(res.data))
      .catch((err) => console.error('Error fetching players', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <h1 className="text-4xl font-bold text-center py-6">Our Squad</h1>
  
      {loading ? (
        <p className="text-center text-gray-500">Loading players...</p>
      ) : Object.keys(players).length === 0 ? (
        <div className="text-center py-10 text-gray-600 text-lg">
           No players found!
        </div>
      ) : (
        <PlayerList players={players} />
      )}
    </div>
  );
  
};

export default PlayerPage;
