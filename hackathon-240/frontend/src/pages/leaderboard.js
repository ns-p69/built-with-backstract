import { useEffect, useState, useMemo } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import { formatDistanceToNow } from 'date-fns';
import { RandomAvatar } from 'react-random-avatars';
import { motion } from 'framer-motion';

const Leaderboard = () => {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchLeaderboard = async () => {
        try {
            const response = await axiosInstance.get('/leaderboard');
            setLeaderboardData(response?.data?.data || []);
            setError(null);
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
            setError('Failed to fetch leaderboard data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaderboard();
        const interval = setInterval(fetchLeaderboard, 5000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (timestamp) => {
        if (!timestamp) return '-';
        try {
            return formatDistanceToNow(new Date(parseInt(timestamp)), { addSuffix: true });
        } catch (error) {
            return '-';
        }
    };

    // Sort teams by their assigned rank (if available).
    // Teams with no rank will stay at the bottom.
    const sortedLeaderboardData = useMemo(() => {
        return [...leaderboardData].sort((a, b) => {
            // if (a.rank && b.rank) return a.rank - b.rank;
            // if (a.rank) return -1;
            // if (b.rank) return 1;
            return 0;
        });
    }, [leaderboardData]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <p>Loading leaderboard...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen text-white p-8">
            <h1 className="text-6xl font-bold text-center text-green-500 mt-12 font-['Pixelify_Sans'] tracking-wider text-[#B27BF4] text-shadow-lg shadow-indigo-400">LEADERBOARD</h1>

            {/* Leaderboard Table */}
            <div className="overflow-x-auto p-1 bg-gradient-to-r from-indigo-700/20 via-purple-200/10 to-blue-700/20 rounded-lg mt-8 max-w-8xl mx-auto border border-gray-800 shadow-lg shadow-purple-800/20">
                <div className="bg-gray-900/10 backdrop-blur-lg rounded-lg">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left border-b border-gray-800">
                                <th className="p-4 text-sm text-slate-300">RANK</th>
                                <th className="p-4 text-sm text-slate-300">TEAM</th>
                                <th className="p-4 text-sm text-slate-300">CHALLENGE</th>
                                <th className="p-4 text-sm text-slate-300">START TIME</th>
                                <th className="p-4 text-sm text-slate-300">END TIME</th>
                                <th className="p-4 text-sm text-slate-300">STATUS</th>
                                <th className="p-4 text-sm text-slate-300">PENALTY</th>
                                <th className="p-4 text-sm text-slate-300">Judge Score</th>
                                <th className="p-4 text-sm text-slate-300">Final Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedLeaderboardData.map((team, index) => (
                                <motion.tr
                                    key={team?.id || index}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="border-b border-gray-800/50 hover:bg-gray-800/50 transition-colors"
                                >
                                    <td className="p-4">
                                        <span className={team.rank < 4 ? 'text-green-500' : ''}>
                                            [{index + 1}]
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center space-x-2">
                                            <RandomAvatar
                                                name={team?.team_name || `Team ${index + 1}`}
                                                size={30}
                                                mode="random"
                                            />
                                            <span className="text-sm text-slate-300">{team?.team_name || '-'}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-slate-300">{team?.challenge_name || '-'}</td>
                                    <td className="p-4 text-capitalize text-sm text-slate-300">{formatTime(team?.start_time)}</td>
                                    <td className="p-4 text-capitalize text-sm text-slate-300">{formatTime(team?.end_time)}</td>
                                    <td className="p-4">
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${team?.status === 'Submitted'
                                                ? 'bg-green-500/20 text-green-500'
                                                : team?.status === 'DQ'
                                                    ? 'bg-red-500/20 text-red-500'
                                                    : 'bg-yellow-500/20 text-yellow-500'
                                                }`}
                                        >
                                            {team?.status || '-'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-red-600">{team?.penalty}</td>
                                    <td className={`p-4 text-sm ${team?.judge_score > 0 ? 'text-green-500' : 'text-red-500'}`}>{team?.judge_score}</td>
                                    <td className={`p-4 text-sm ${team?.final_score > 0 ? 'text-green-500' : 'text-red-500'}`}>{team?.final_score}</td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard; 