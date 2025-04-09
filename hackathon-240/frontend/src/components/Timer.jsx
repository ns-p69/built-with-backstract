import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import PixelatedLoader from './common/PixelatedLoader';
import axiosInstance from '@/utils/axiosInstance';

const Timer = ({ onExpired }) => {
    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState(null);
    const [remaining, setRemaining] = useState(null);
    const [isNegative, setIsNegative] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef(null);
    const teamId = localStorage.getItem('team_id');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formatTime = (startTime) => {
        const start = parseInt(startTime);
        const end = Date.now();
        const timeTaken = end - start;
        const hours = Math.floor(timeTaken / (1000 * 60 * 60));
        const minutes = Math.floor((timeTaken % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeTaken % (1000 * 60)) / 1000);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleAutoSubmit = async () => {
        if (isSubmitting) {
            console.log('Submission already in progress');
            return;
        }

        const teamId = localStorage.getItem('team_id');
        const challengeDetails = JSON.parse(localStorage.getItem('challengeDetails'));
        const startTime = localStorage.getItem('challengeStartTime');

        if (!teamId || !challengeDetails || !startTime) {
            console.error('Missing required data for submission');
            return;
        }

        // Calculate if we're past the extended time limit (original + 30 minutes)
        const now = Date.now();
        const totalElapsedTime = now - parseInt(startTime);
        const timeLimit = (challengeDetails.time_limit * 60 * 60 * 1000) + (30 * 60 * 1000); // Added 30 minutes

        // Only proceed with auto-submit if we're past the extended time
        if (totalElapsedTime < timeLimit) {
            return;
        }

        try {
            setIsSubmitting(true);

            // First, check if submission already exists
            const checkResponse = await axiosInstance.get(`/submission/team_id?team_id=${teamId}`);

            if (checkResponse.data?.exists) {
                toast.error('Your team has already submitted this challenge');
                localStorage.setItem('submissionComplete', 'true');
                router.push('/success');
                return;
            }

            const formattedTime = formatTime(startTime);
            const payload = {
                team_id: parseInt(teamId),
                challenge_id: challengeDetails.id,
                time_taken: formattedTime,
                collection_url: '',
                deployed_code: '',
                project_code: ''
            };

            try {
                const response = await axiosInstance.post('/submissions/', payload);

                if (response.data?.submission?.id) {
                    await axiosInstance.put('/update-submission', {
                        team_id: parseInt(teamId),
                        submission_id: response.data.submission.id,
                        end_time: Date.now().toString(),
                        status: "Disqualified"
                    });

                    toast.success('Challenge auto-submitted due to time expiration');
                    localStorage.setItem('submissionComplete', 'true');
                    localStorage.setItem('time_taken', formattedTime);
                    router.push('/success');
                }
            } catch (submitError) {
                if (submitError.response?.status === 500 &&
                    submitError.response?.data?.detail?.includes('already submitted')) {
                    console.error('Your team has already submitted this challenge');
                    localStorage.setItem('submissionComplete', 'true');
                    router.push('/success');
                } else {
                    throw submitError;
                }
            }
        } catch (error) {
            console.error('Auto-submission error:', error);
            toast.error('Error during auto-submission');
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const initializeTimer = async () => {
            try {
                let startTime = parseInt(localStorage.getItem('challengeStartTime'));
                const challengeDetails = JSON.parse(localStorage.getItem('challengeDetails'));

                // If no start time in localStorage, try to fetch from backend
                if (!startTime && teamId) {
                    const response = await axiosInstance.get(`/timer/team_id?team_id=${teamId}`);
                    if (response.data?.data?.start_time) {
                        startTime = parseInt(response.data.data.start_time);
                        console.log("startTime", startTime);
                        console.log("startTime", startTime.toString());
                        // localStorage.setItem('challengeStartTime', startTime.toString());
                    }
                }

                if (!startTime || !challengeDetails) {
                    router.push('/');
                    return;
                }

                // Calculate total elapsed time since challenge start
                const now = Date.now();
                const totalElapsedTime = now - startTime;
                const timeLimit = (challengeDetails.time_limit * 60 * 60 * 1000) + (30 * 60 * 1000); // Added 30 minutes

                // If challenge has already expired, show expired message
                if (totalElapsedTime >= timeLimit) {
                    setIsNegative(true);
                    setTimeLeft('EXPIRED');
                    if (typeof onExpired === 'function') {
                        onExpired(true);
                    }
                    handleAutoSubmit();
                    return;
                }

                // Rest of the timer logic
                audioRef.current = new Audio('/clock-sound.mp3');
                audioRef.current.loop = true;

                const interval = setInterval(() => {
                    const currentTime = Date.now();
                    const elapsedTime = currentTime - startTime;
                    const remaining = timeLimit - elapsedTime;
                    setRemaining(remaining);

                    if (remaining <= 0) {
                        clearInterval(interval);
                        setIsNegative(true);
                        setTimeLeft('EXPIRED');
                        if (typeof onExpired === 'function') {
                            onExpired(true);
                        }
                        if (audioRef.current) {
                            audioRef.current.pause();
                            audioRef.current.currentTime = 0;
                        }
                        handleAutoSubmit();
                    } else {
                        // Handle audio for last 5 minutes
                        if (remaining <= 300000 && !isMuted) {
                            audioRef.current.play();
                        } else {
                            audioRef.current.pause();
                            audioRef.current.currentTime = 0;
                        }

                        setIsNegative(false);
                        const hours = Math.floor(remaining / (1000 * 60 * 60));
                        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
                        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
                        setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
                    }
                }, 1000);

                return () => {
                    clearInterval(interval);
                    if (audioRef.current) {
                        audioRef.current.pause();
                        audioRef.current.currentTime = 0;
                    }
                };
            } catch (error) {
                console.error('Error initializing timer:', error);
                router.push('/');
            }
        };

        initializeTimer();
    }, [router, isMuted, teamId, onExpired]);

    const toggleMute = () => {
        setIsMuted(!isMuted);
        if (audioRef.current) {
            if (!isMuted) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        }
    };

    if (!timeLeft) {
        return <PixelatedLoader loadingText="--:--:--" />;
    }

    return (
        <div className="flex flex-col items-center">
            <div className={`text-[212px] font-bold font-['Space_Grotesk'] ${isNegative ? 'text-red-500' : 'text-white'}`}>
                {timeLeft}
            </div>
            {/* {remaining <= 300000 && (
                <button
                    onClick={toggleMute}
                    className="mt-4 px-4 py-2 text-white rounded transition-colors"
                >
                    {isMuted ? '🔇 Unmute' : '🔊 Mute'} Sound
                </button>
            )} */}
        </div>
    );
};

Timer.defaultProps = {
    onExpired: () => { } // Provide a default empty function
};

export default Timer; 