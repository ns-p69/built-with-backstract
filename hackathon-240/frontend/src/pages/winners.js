import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Confetti from 'react-confetti';
import { RandomAvatar } from 'react-random-avatars';
import PixelatedLoader from '@/components/common/PixelatedLoader';
import axiosInstance from '@/utils/axiosInstance';
import Layout from '@/components/Layout';

// Add this CSS at the top of your component or in a separate CSS file
const revealStyles = {
    container: `
        relative 
        inline-block 
        overflow-hidden
        px-4
    `,
    text: `
        text-6xl 
        font-bold 
        mb-4 
        text-green-500
        opacity-0
        animate-[revealText_0.5s_0.5s_forwards]
        font-['Space_Grotesk']
        relative
        z-20
    `,
    blockTop: `
        absolute 
        top-0 
        left-0 
        w-full 
        h-[52%]
        bg-purple-600
        z-10
        animate-[slideTopBlock_1s_cubic-bezier(0.85,0,0.15,1)_forwards]
    `,
    blockBottom: `
        absolute 
        bottom-0 
        left-0 
        w-full 
        h-[52%]
        bg-fuchsia-500
        z-10
        animate-[slideBottomBlock_1s_cubic-bezier(0.85,0,0.15,1)_forwards]
    `
};

// Add these keyframes to your globals.css
const keyframes = `
    @keyframes slideTopBlock {
        0% {
            transform: translateX(-100%);
        }
        50% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(100%);
        }
    }

    @keyframes slideBottomBlock {
        0% {
            transform: translateX(100%);
        }
        50% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-100%);
        }
    }

    @keyframes revealText {
        0% {
            opacity: 0;
            transform: translateY(100%);
            filter: blur(4px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
        }
    }

    @keyframes glitchEffect {
        0% {
            clip-path: inset(50% 0 50% 0);
            transform: skew(0deg);
        }
        5% {
            clip-path: inset(10% 0 85% 0);
            transform: skew(10deg);
        }
        10% {
            clip-path: inset(85% 0 15% 0);
            transform: skew(-10deg);
        }
        15% {
            clip-path: inset(30% 0 65% 0);
            transform: skew(5deg);
        }
        20% {
            clip-path: inset(15% 0 80% 0);
            transform: skew(-5deg);
        }
        25% {
            clip-path: inset(50% 0 50% 0);
            transform: skew(0deg);
        }
        100% {
            clip-path: inset(50% 0 50% 0);
            transform: skew(0deg);
        }
    }
`;

const Winners = () => {
    const router = useRouter();
    const [windowDimensions, setWindowDimensions] = useState({
        width: 0,
        height: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [teamDetails, setTeamDetails] = useState(null);
    const [participants, setParticipants] = useState([]);
    const audioRef = useRef(null);

    // Set window dimensions for confetti
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
    }, []);

    // Fetch data when router is ready and teamId is available
    useEffect(() => {
        const fetchData = async () => {
            if (!router.isReady || !router.query.team_id) return;

            setLoading(true);
            setError(null);

            try {
                const teamId = parseInt(router.query.team_id);

                // Fetch both team details and participants in parallel
                const [teamResponse, participantsResponse] = await Promise.all([
                    axiosInstance.get(`/teams/id`, {
                        params: { id: teamId }
                    }),
                    axiosInstance.post('/participants/team_id', {
                        team_id: teamId
                    })
                ]);

                setTeamDetails(teamResponse.data.teams_one);
                setParticipants(participantsResponse.data.participants);
            } catch (err) {
                setError(err.message || 'Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [router.isReady, router.query.team_id]);

    // Add this useEffect to inject keyframes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const style = document.createElement('style');
            style.textContent = keyframes;
            document.head.appendChild(style);

            return () => {
                document.head.removeChild(style);
            };
        }
    }, []);

    // Add this useEffect for sound handling
    useEffect(() => {
        // Create audio element
        const audio = new Audio('/clap-sound.mp3');
        audioRef.current = audio;

        // Play sound
        audio.play();

        // Stop after 25 seconds
        const timer = setTimeout(() => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        }, 25000);

        // Cleanup function
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
            clearTimeout(timer);
        };
    }, []); // Run once when component mounts

    // Show loader while router isn't ready or data is loading
    if (!router.isReady || loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-[#0C0512]">
                <PixelatedLoader loadingText="Loading winner details..." />
            </div>
        );
    }

    // Show error if teamId isn't provided
    if (!router.query.team_id) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-[#0C0512]">
                <p className="text-white mb-4">No team id provided.</p>
            </div>
        );
    }

    // Display error messages if any API call fails
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-[#0C0512]">
                <p className="text-red-500 mb-4">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen text-white p-4 pt-16 ">
            <Confetti
                width={windowDimensions.width}
                height={windowDimensions.height}
                numberOfPieces={300}
                recycle={true}
                wind={0.01}
            />
            <div className="text-center mt-12 pt-12">
                <h1 className="text-4xl font-bold mb-4 mt-12">🎉 Congratulations! 🎉</h1>
                <div className={revealStyles.container}>
                    <h2 className={`${revealStyles.text}  font-['Pixelify_Sans'] tracking-wider text-[#B27BF4]`} >
                        {teamDetails?.name}
                        <span className="absolute top-0 left-0 w-full h-full z-10 animate-[glitchEffect_0.3s_0.5s_ease-in-out]"
                            style={{
                                content: teamDetails?.name,
                                color: '#ff00ff',
                                textShadow: '2px 0 #00ffff',
                                // mixBlendMode: 'multiply'
                            }}>
                            {teamDetails?.name}
                        </span>
                    </h2>
                    <div className={revealStyles.blockTop}></div>
                    <div className={revealStyles.blockBottom}></div>
                </div>
                <p className="text-xl mb-12 font-semibold text-slate-300">for winning the Hackathon 240 challenge</p>
                <h3 className="text-2xl mb-4 mt-12 font-bold">Team Members</h3>
                <div className="flex flex-wrap justify-center gap-6">
                    {participants && participants.length > 0 ? (
                        participants.map((participant, index) => (
                            <div
                                key={participant.id || index}
                                className="flex flex-col items-center p-4 rounded-md shadow-md"
                            >
                                <RandomAvatar
                                    name={participant.name || `Member ${index + 1}`}
                                    size={50}
                                    mode="random"
                                />
                                <p className="mt-2 font-bold text-xl">{participant.name || 'Unknown'}</p>
                            </div>
                        ))
                    ) : (
                        <p>No participants found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Winners; 