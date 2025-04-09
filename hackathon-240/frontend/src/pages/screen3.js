// pages/screen3.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeamDetails, fetchChallengeDetails, startChallenge } from '../store/slices/challengeSlice';
import PixelatedButton from '../components/common/PixelatedButton';
import PixelatedLoader from '../components/common/PixelatedLoader';
import { motion } from 'framer-motion';
import { useRouteGuard } from '@/utils/routeGuard';
import { toast } from 'react-hot-toast';
import { store } from '../store/store';
import axiosInstance from '@/utils/axiosInstance';
import Link from 'next/link';

const Screen3 = () => {
    useRouteGuard();
    const router = useRouter();
    const dispatch = useDispatch();
    const {
        teamDetails,
        challengeDetails,
        status,
        error
    } = useSelector((state) => state.challenge);

    const teamId = router.query.team_id || localStorage.getItem('team_id');

    useEffect(() => {
        const initializeChallenge = async () => {
            try {
                const teamAction = await dispatch(fetchTeamDetails(parseInt(teamId)));
                if (teamAction.payload?.challenge_id) {
                    await dispatch(fetchChallengeDetails(teamAction.payload.challenge_id));
                }
            } catch (error) {
                console.error('Error initializing challenge:', error);
                toast.error('Failed to load challenge details');
            }
        };

        initializeChallenge();
    }, []); // Empty dependency array since we only want this to run once on mount

    const handleStartChallenge = async () => {
        try {
            // Check if challengeStartTime exists in localStorage
            const existingStartTime = localStorage.getItem('challengeStartTime');
            if (existingStartTime) {
                router.push('/screen4');
                return;
            }

            // Check if timer exists for team_id
            const timerResponse = await axiosInstance.get(`/timer/team_id?team_id=${teamId}`);
            if (timerResponse.data?.data?.start_time) {
                // If timer exists, check leaderboard
                const leaderboardResponse = await axiosInstance.get(`/leaderboard/team_id?team_id=${teamId}`);
                if (leaderboardResponse.data?.data?.start_time) {
                    localStorage.setItem('challengeStartTime', leaderboardResponse.data.data.start_time);
                    localStorage.setItem('challengeDetails', JSON.stringify(challengeDetails));
                    await dispatch(startChallenge());
                    router.push('/screen4');
                    return;
                } else {
                    // Use start_time from timer response for leaderboard
                    const startTime = timerResponse.data.data.start_time;

                    // Create leaderboard entry
                    await axiosInstance.patch('/leaderboard/update_team', {
                        team_id: parseInt(teamId),
                        team_name: teamDetails?.name,
                        challenge_id: challengeDetails?.id,
                        challenge_name: challengeDetails?.problem,
                        start_time: startTime,
                        judge_score: 0,
                        penalty: -1
                    });
                }
            } else {
                // If no existing records found, start new challenge
                // First create timer record
                const userId = JSON.parse(localStorage.getItem('user_data'))?.id;

                const timerCreateResponse = await axiosInstance.post('/record-timer', {
                    user_id: userId,
                    challenge_id: challengeDetails?.id,
                    team_id: parseInt(teamId),
                    start_time: Date.now().toString(),
                    end_time: ""
                });

                // Use start_time from timer response for leaderboard
                const startTime = timerCreateResponse.data.data.start_time;

                // Create leaderboard entry
                await axiosInstance.patch('/leaderboard/update_team', {
                    team_id: parseInt(teamId),
                    team_name: teamDetails?.name,
                    challenge_id: challengeDetails?.id,
                    challenge_name: challengeDetails?.problem,
                    start_time: startTime,
                    judge_score: 0,
                    penalty: -1
                });

                localStorage.setItem('challengeStartTime', startTime);
            }

            // Save to localStorage and redirect
            localStorage.setItem('challengeDetails', JSON.stringify(challengeDetails));
            await dispatch(startChallenge());
            router.push('/screen4');

        } catch (error) {
            console.error('Error in challenge initialization:', error);
            toast.error('Failed to initialize challenge. Please try again.');
        }
    };

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-500 text-center font-['Space_Grotesk']">
                    <h2 className="text-2xl mb-4">Error Loading Challenge</h2>
                    <p>{error}</p>
                    <PixelatedButton
                        onClick={() => router.push('/')}
                        label="GO BACK"
                        className="mt-8"
                    />
                </div>
            </div>
        );
    }

    if (status === 'loading' || !challengeDetails) {
        return <PixelatedLoader loadingText="LOADING CHALLENGE" />;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8">
            <Link href="https://alpha-app.backstract.io/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline mb-6">BackStract Platform Link</Link>
            <div className="max-w-4xl mx-auto max-h-[600px] overflow-y-auto 
                scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300/10 
                scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500 
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:bg-gray-300/10
                [&::-webkit-scrollbar-thumb]:bg-gray-600
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:hover:bg-gray-500">
                <motion.div className="mb-8">
                    <div className="whitespace-pre">
                        {challengeDetails.problem.split("").map((char, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    duration: 0.15,  // Slower typing for title
                                    delay: index * 0.08,
                                }}
                                className="text-4xl font-bold font-['Space_Grotesk'] text-white inline-block"
                            >
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
                <div className="space-y-8 text-white/80 mb-12">
                    {[
                        { content: challengeDetails.description, delay: 0 },
                        { content: challengeDetails.instructions, delay: 1 },
                        { content: challengeDetails.constraints, delay: 2 }
                    ].map((section, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: section.delay * 0.5 +
                                    (challengeDetails.problem.length * 0.08) // Wait for title to finish
                            }}
                            className="prose prose-invert max-w-none
                                     [&>h3]:text-2xl [&>h3]:font-['Space_Grotesk'] [&>h3]:mb-4 [&>h3]:mt-6
                                     [&>p]:mb-4 [&>p]:leading-relaxed
                                     [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2
                                     [&>li]:leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: section.content }}
                        />
                    ))}
                </div>
            </div>
            <motion.div
                className="text-center mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    delay: 3 + (challengeDetails.problem.length * 0.08)
                }}
            >
                <PixelatedButton
                    onClick={handleStartChallenge}
                    label="Accept Challenge and Start the Timer"
                    className="mx-auto px-4"
                />
            </motion.div>
        </div>
    );
};

export default Screen3;