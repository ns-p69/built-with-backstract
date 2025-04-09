import axiosInstance from '@/utils/axiosInstance';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

const formatTime = (startTime) => {
    const now = Date.now();
    const timeDiff = now - parseInt(startTime);

    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    const formattedTime = `${hours}h ${minutes}mins ${seconds} Seconds`;
    return formattedTime;
};

const SubmitChallengeModal = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        collection_url: '',
        deployed_code: '',
        // project_code will be handled later with S3 upload
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e, isAutoSubmit = false) => {
        if (!isAutoSubmit) {
            e.preventDefault();
        }

        // Get challenge details from localStorage
        const challengeDetailsStr = localStorage.getItem('challengeDetails');
        if (!challengeDetailsStr) {
            toast.error('Challenge details not found. Please refresh and try again.');
            return;
        }

        const challengeDetails = JSON.parse(challengeDetailsStr);
        const teamId = parseInt(localStorage.getItem('team_id'));
        const startTime = localStorage.getItem('challengeStartTime');

        if (!challengeDetails || !challengeDetails.id || !startTime) {
            toast.error('Challenge details or start time not found. Please try again.');
            return;
        }

        try {
            setIsSubmitting(true);

            // Format time taken
            const formattedTime = formatTime(startTime);

            const payload = {
                team_id: teamId,
                challenge_id: challengeDetails.id,
                time_taken: formattedTime,
                collection_url: isAutoSubmit ? '' : formData.collection_url,
                deployed_code: isAutoSubmit ? '' : formData.deployed_code,
                project_code: isAutoSubmit ? '' : "temporary_project_code_string"
            };

            const response = await axiosInstance.post('/submissions/', payload)
                .catch(error => {
                    if (error?.response?.status === 500) {
                        // Check for the specific 409 conflict message
                        if (error.response?.data?.detail?.includes('409: Your team has already submitted this challenge')) {
                            toast.error('Your team has already submitted this challenge');
                            onClose();
                            localStorage.setItem('submissionComplete', 'true');
                            router.push('/success');
                            return null;
                        }
                        toast.error('An error occurred while submitting');
                        return null;
                    }
                    return Promise.reject(error);
                });

            if (!response) return; // Exit if there was an error
            console.log(response?.data?.submission?.id);

            // Update submission status
            await axiosInstance.put('/update-submission', {
                team_id: teamId,
                submission_id: response?.data?.submission?.id, // Assuming the submission ID is returned in the response
                end_time: Date.now().toString(),
                status: "Submitted"
            });

            // Success case
            toast.success('Challenge submitted successfully!');
            localStorage.setItem('submissionComplete', 'true');
            localStorage.setItem('time_taken', formattedTime);
            router.push('/success'); // Direct navigation to success page

        } catch (error) {
            console.error('Submission error:', error);
            toast.error('Error submitting challenge. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-[#0C0512] border-2 border-white p-6 rounded-lg max-w-md w-full">
                <h2 className="text-2xl text-white mb-4">Submit Challenge</h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Collection URL"
                                className="w-full p-2 bg-gray-800 text-white rounded"
                                value={formData.collection_url}
                                onChange={(e) => setFormData({ ...formData, collection_url: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <input
                                type="text"
                                placeholder="Deployed Code URL"
                                className="w-full p-2 bg-gray-800 text-white rounded"
                                value={formData.deployed_code}
                                onChange={(e) => setFormData({ ...formData, deployed_code: e.target.value })}
                                required
                            />
                        </div>

                        {/* File upload will be implemented later */}
                        {/* <div className="opacity-50">
                            <p className="text-white text-sm mb-2">
                                File upload will be available soon
                            </p>
                            <input
                                type="file"
                                disabled
                                className="w-full p-2 bg-gray-800 text-white rounded cursor-not-allowed"
                            />
                        </div> */}

                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border border-white text-white rounded"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubmitChallengeModal; 