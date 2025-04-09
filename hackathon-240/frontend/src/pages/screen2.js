// pages/screen2.js
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import TeamParticipants from '@/components/TeamParticipants';
import PixelatedButton from '../components/common/PixelatedButton';
import { fetchParticipants, clearParticipants } from '../store/slices/participantsSlice';
import PixelatedLoader from '@/components/common/PixelatedLoader';
import { useRouteGuard } from '@/utils/routeGuard';

const Screen2 = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    useRouteGuard();

    // Get data from Redux store
    const {
        participants,
        status: loadingStatus,
        error
    } = useSelector((state) => state.participants);

    const isLoading = loadingStatus === 'loading';

    // Get teamId from router query or localStorage
    const teamId = router.query.team_id || (typeof window !== 'undefined' ? localStorage.getItem('team_id') : null);
    const teamName = router.query.team_name || (typeof window !== 'undefined' ? localStorage.getItem('team_name') : null);

    useEffect(() => {
        if (teamId) {
            dispatch(fetchParticipants(parseInt(teamId)));
        }

        // Cleanup on unmount
        return () => {
            dispatch(clearParticipants());
        };
    }, [teamId, dispatch]);

    const handleStartChallenge = () => {
        router.push({
            pathname: '/screen3',
            query: { team_id: teamId, team_name: teamName }
        });
    };

    if (!teamId) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-[#0C0512]">
                <p className="text-white mb-4">No team information found.</p>
                <PixelatedButton
                    onClick={() => router.push('/')}
                    label="GO BACK"
                />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            {isLoading ? (
                <PixelatedLoader loadingText="LOADING TEAM DETAILS" />
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <>
                    <div className="mb-8">
                        <h1 className="text-2xl font-normal text-white mb-4 font-['Space_Grotesk'] text-center">
                            Welcome, your team is <br />
                        </h1>
                        <h3 className="text-3xl font-bold text-white mb-4 font-['Space_Grotesk'] text-center">{teamName}</h3>
                        <p className="text-white/70 text-sm font-['Space_Grotesk'] text-center">Your team mates are</p>
                        <TeamParticipants participants={participants} />
                    </div>

                    <PixelatedButton
                        onClick={handleStartChallenge}
                        label="START CHALLENGE"
                        className="mt-8"
                    />
                </>
            )}
        </div>
    );
};

export default Screen2;