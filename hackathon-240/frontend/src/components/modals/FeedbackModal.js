import axiosInstance from '@/utils/axiosInstance';
import React, { useState } from 'react';

const FeedbackModal = ({ onClose }) => {
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(0);

    const feedbackOptions = [
        { label: "Great platform and challenge structure!", value: 3 },
        { label: "Decent experience but needs improvements", value: 2 },
        { label: "Found it challenging to navigate", value: 1 }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!feedback || !rating) return;

        try {
            await axiosInstance.post('/feedbacks', {
                team_id: localStorage.getItem('team_id'),
                feedback,
                rating
            });
            onClose();
        } catch (error) {
            console.error('Feedback submission error:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-[#0C0512] border-2 border-white p-6 rounded-lg max-w-md w-full">
                <h2 className="text-2xl text-white mb-4">Submit Feedback</h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <p className="text-white mb-2">Select your experience:</p>
                            <div className="space-y-2">
                                {feedbackOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => setRating(option.value)}
                                        className={`w-full p-2 border ${rating === option.value
                                            ? 'border-green-500 bg-green-500/20'
                                            : 'border-white'
                                            } text-white rounded`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <textarea
                                placeholder="Your feedback (max 200 words)"
                                className="w-full p-2 bg-gray-800 text-white rounded"
                                value={feedback}
                                onChange={(e) => {
                                    const words = e.target.value.trim().split(/\s+/);
                                    if (words.length <= 200) {
                                        setFeedback(e.target.value);
                                    }
                                }}
                                rows={4}
                            />
                        </div>

                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border border-white text-white rounded"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={!feedback || !rating}
                                className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
                            >
                                Submit Feedback
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FeedbackModal; 