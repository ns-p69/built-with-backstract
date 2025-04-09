import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useRouteGuard } from '@/utils/routeGuard';
import FeedbackModal from '@/components/modals/FeedbackModal';
import PixelatedButton from '@/components/common/PixelatedButton';
import { useSelector } from 'react-redux';
import { getFromLocalStorage } from '@/utils/localStorageUtils';
import toast from 'react-hot-toast';
import axiosInstance from '@/utils/axiosInstance';

// Dynamically import Confetti with SSR disabled
const Confetti = dynamic(() => import('react-confetti'), {
    ssr: false,
});

const SuccessScreen = () => {
    const router = useRouter();
    const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);
    const [submissionDetails, setSubmissionDetails] = useState(null);
    const [windowDimensions, setWindowDimensions] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    });
    const [isMounted, setIsMounted] = useState(false);
    const { challengeDetails } = useSelector((state) => state.challenge);
    const username = getFromLocalStorage('username');

    useRouteGuard();

    useEffect(() => {
        setIsMounted(true);
        // Set window dimensions only after component is mounted
        const updateWindowDimensions = () => {
            if (typeof window !== 'undefined') {
                setWindowDimensions({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }
        };

        // Only add event listener if window exists
        if (typeof window !== 'undefined') {
            updateWindowDimensions();
            window.addEventListener('resize', updateWindowDimensions);

            return () => {
                window.removeEventListener('resize', updateWindowDimensions);
            };
        }
    }, []);

    useEffect(() => {
        const fetchSubmissionDetails = async () => {
            try {
                const teamId = parseInt(getFromLocalStorage('team_id'));
                if (!teamId) {
                    // toast.error('Team information not found');
                    router.push('/');
                    return;
                }

                const response = await axiosInstance.get('/submissions/');

                if (response.data && response.data.submissions_all) {
                    const teamSubmissions = response.data.submissions_all
                        .filter(sub => sub.team_id === teamId)
                        .sort((a, b) => b.id - a.id);

                    if (teamSubmissions.length > 0) {
                        setSubmissionDetails(teamSubmissions[0]);
                    } else {
                        toast.error('No submission found for your team');
                        router.push('/');
                    }
                }
            } catch (error) {
                console.error('Error fetching submission details:', error);
                toast.error('Failed to fetch submission details');
                router.push('/');
            }
        };

        if (isMounted) {
            fetchSubmissionDetails();
        }
    }, [router, isMounted]);

    if (!submissionDetails || !isMounted) {
        return (
            <div className="min-h-screen bg-[#0C0512] flex items-center justify-center">
                <div className="text-white text-xl">Loading submission details...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0C0512] relative">
            {isMounted && windowDimensions.width > 0 && (
                <Confetti
                    width={windowDimensions.width}
                    height={windowDimensions.height}
                    recycle={true}
                    numberOfPieces={200}
                />
            )}

            <div className="flex flex-col items-center justify-center min-h-screen text-white p-4">
                <div className="text-center space-y-8">
                    <h1 className="text-4xl font-bold mb-4">
                        Congratulations {username || 'User'}!
                    </h1>
                    <p className="text-xl mb-8">
                        You have successfully completed your challenge of building {challengeDetails?.problem || 'your challenge'} in
                    </p>
                    <h2 className="text-[72px] font-bold font-['Space_Grotesk'] mb-8">
                        {submissionDetails.time_taken}
                    </h2>

                    <div className="space-y-4 text-lg">
                        {
                            submissionDetails.collection_url && (
                                <p>Collection URL: <a href={submissionDetails.collection_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{submissionDetails.collection_url}</a></p>
                            )
                        }
                        {
                            submissionDetails.deployed_code && (
                                <p>Deployed URL: <a href={submissionDetails.deployed_code} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{submissionDetails.deployed_code}</a></p>
                            )
                        }
                    </div>

                    <p className="text-lg mb-4 mt-8">
                        Wanna share how was your experience in this Hackathon?
                    </p>
                    <PixelatedButton
                        onClick={() => setFeedbackModalOpen(true)}
                        label="Submit Feedback"
                        className="mx-auto"
                    />
                </div>
            </div>

            {isFeedbackModalOpen && (
                <FeedbackModal
                    onClose={() => setFeedbackModalOpen(false)}
                />
            )}
        </div>
    );
};

export default SuccessScreen; 