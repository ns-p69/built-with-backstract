// pages/screen4.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setChallengeDetails } from '@/store/slices/challengeSlice'; // You'll need to create this action
import { useRouteGuard } from '@/utils/routeGuard';
import Timer from '@/components/Timer';
import PixelatedButton from '@/components/common/PixelatedButton';
import ChallengeDetails from '@/components/ChallengeDetails';
import PixelatedLoader from '@/components/common/PixelatedLoader';
import SubmitChallengeModal from '@/components/modals/SubmitChallengeModal';
import FeedbackModal from '@/components/modals/FeedbackModal';
import Confetti from 'react-confetti';
import Link from 'next/link';

const Screen4 = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitModalOpen, setSubmitModalOpen] = useState(false);
    const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [submissionData, setSubmissionData] = useState(null);
    const [isExpired, setIsExpired] = useState(false);

    // Get challenge details from Redux
    const { challengeDetails } = useSelector((state) => state.challenge);

    useRouteGuard();

    useEffect(() => {
        const syncDataWithLocalStorage = () => {
            const startTime = localStorage.getItem('challengeStartTime');
            const storedChallengeDetails = localStorage.getItem('challengeDetails');
            const hackathonStarted = localStorage.getItem('hackathonStarted');

            if (!startTime || !storedChallengeDetails || !hackathonStarted) {
                router.push('/');
                return;
            }

            try {
                const parsedChallengeDetails = JSON.parse(storedChallengeDetails);

                // Sync with Redux
                dispatch(setChallengeDetails(parsedChallengeDetails));

                setIsLoading(false);
            } catch (error) {
                console.error('Error parsing challenge details:', error);
                router.push('/');
            }
        };

        syncDataWithLocalStorage();

        // Add storage event listener to handle changes in other tabs
        const handleStorageChange = (e) => {
            if (e.key === 'challengeDetails' || e.key === 'challengeStartTime') {
                syncDataWithLocalStorage();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [dispatch, router]);

    const handleSubmissionSuccess = (data) => {
        setSubmissionData(data);
        setShowSuccess(true);
        setSubmitModalOpen(false);
    };

    const handleExpired = (expired) => {
        setIsExpired(expired);
    };

    if (isLoading) {
        return <PixelatedLoader loadingText="LOADING CHALLENGE" />;
    }

    return (
        <div className="min-h-screen p-4">
            {showSuccess && (
                <div className="fixed inset-0 z-50">
                    <Confetti />
                    <div className="flex flex-col items-center justify-center min-h-screen text-white">
                        <h1 className="text-4xl font-bold mb-4">
                            Congratulations {localStorage.getItem('username')}!
                        </h1>
                        <p className="mb-8">
                            You have successfully scored your submission in {challengeDetails?.time_taken}
                        </p>
                        <p className="mb-4">How was your experience in this Hackathon?</p>
                        <PixelatedButton
                            onClick={() => setFeedbackModalOpen(true)}
                            label="Submit Feedback"
                        />
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto">
                {/* Timer Section */}
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <Timer onExpired={handleExpired} />
                    <Link href="https://alpha-app.backstract.io/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">https://alpha-app.backstract.io/</Link>
                    <PixelatedButton
                        onClick={() => setSubmitModalOpen(true)}
                        label="Submit Challenge"
                        className="mt-12"
                        disabled={isExpired}
                        style={isExpired ? { opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' } : {}}
                    />
                </div>

                {/* Challenge Details Section */}
                {challengeDetails && <ChallengeDetails details={challengeDetails} />}
            </div>

            {isSubmitModalOpen && (
                <SubmitChallengeModal
                    onClose={() => setSubmitModalOpen(false)}
                    onSuccess={handleSubmissionSuccess}
                />
            )}

            {isFeedbackModalOpen && (
                <FeedbackModal
                    onClose={() => setFeedbackModalOpen(false)}
                />
            )}
        </div>
    );
};

export default Screen4;