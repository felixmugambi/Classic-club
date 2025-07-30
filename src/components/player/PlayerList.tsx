'use client';


// components/Players/PlayerList.tsx
import PlayerCard from './PlayerCard';

type Player = {
    id: number;
    name: string;
    jersey_number: number;
    position: string;
    photo: string;
};

type Props = {
    players: Player[];
};

const POSITIONS = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'];

const PlayerList = ({ players }: { players: { [position: string]: Player[] } }) => {
    return (
        <div className="space-y-10 px-4 bg-slate-50">
            {Object.entries(players).map(([position, group]) => (
                <div key={position}>
                    <h2 className="text-2xl font-semibold mb-4">{position}s</h2>
                    <p className='border-b-2 border-slate-200 mx-3 my-4'></p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {group.map(player => (
                            <PlayerCard key={player.id} player={player} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};


export default PlayerList;
