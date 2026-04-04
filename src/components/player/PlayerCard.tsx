// components/player/PlayerCard.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { slugify } from '../helper/slugify';

type Player = {
    id: number;
    name: string;
    jersey_number: number;
    position: string;
    photo: string;
};

export default function PlayerCard({ player }: { player: Player }) {
    return (
        <Link href={`/players/details/${slugify(player.name)}`} className="relative group overflow-hidden rounded-lg shadow-lg bg-black">
            <div className="w-full h-80 relative">
                <Image
                    src={player.photo}
                    alt={player.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/100 via-black/50 to-transparent">
                    <p className="text-xl font-xl font-bold text-white">{player.jersey_number}</p>
                    <h2 className="text-3xl font-bold text-white">{player.name.split(" ")[0]}</h2>
                    <h2 className="text-3xl font-bold text-white">{player.name.split(" ").slice(1).join(" ")}</h2>
                </div>
            </div>
        </Link>
    );
}
