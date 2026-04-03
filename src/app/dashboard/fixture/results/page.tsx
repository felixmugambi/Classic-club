'use client';

import { useEffect, useState } from 'react';
import API from '../../../../api/axios';
import ProtectedRoute from '../../../../components/protect/ProtectedRoute';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Loader from '../../../../components/common/Loader';

type Result = {
    id: number;
    fixture: {
        id: number;
        opponent: string;
        match_date: string;
        is_home: boolean;
        status: string;
    };
    home_score: number;
    away_score: number;
    notes?: string;
};

export default function ResultsPage() {
    const [results, setResults] = useState<Result[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await API.get('/results/');
                setResults(res.data);
            } catch {
                toast.error('Failed to load results');
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, []);

    return (
        <ProtectedRoute allowedGroups={['Fixtures_Manager']}>
            <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Match Results</h2>
                    <Link
                        href="/dashboard/fixture/results/create/"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-500"
                    >
                        + Add Result
                    </Link>
                </div>

                {loading ? (
                    <Loader />
                ) : results.length === 0 ? (
                    <p className="text-gray-500">No results have been recorded yet.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border px-3 py-2">Date</th>
                                    <th className="border px-3 py-2">Home</th>
                                    <th className="border px-3 py-2">Score</th>
                                    <th className="border px-3 py-2">Away</th>
                                    <th className="border px-3 py-2">Notes</th>
                                    <th className="border px-3 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((r) => {
                                    const home = r.fixture.is_home ? 'Classic FC' : r.fixture.opponent;
                                    const away = r.fixture.is_home ? r.fixture.opponent : 'Classic FC';

                                    return (
                                        <tr key={r.id} className="hover:bg-gray-50">
                                            <td className="border px-3 py-2">{r.fixture.match_date}</td>
                                            <td className="border px-3 py-2 font-semibold">{home}</td>
                                            <td className="border px-3 py-2 text-center">
                                                {r.home_score} - {r.away_score}
                                            </td>
                                            <td className="border px-3 py-2 font-semibold">{away}</td>
                                            <td className="border px-3 py-2 text-gray-500">{r.notes || '-'}</td>
                                            <td className="border px-3 py-2 text-center">
                                                <button
                                                    className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-500"
                                                >
                                                    <Link href={`/dashboard/fixture/results/edit/${r.id}`}>
                Edit
              </Link>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </ProtectedRoute>
    );
}
