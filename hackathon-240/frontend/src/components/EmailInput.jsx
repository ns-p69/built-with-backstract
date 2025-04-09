// components/EmailInput.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axiosInstance from '../utils/axiosInstance';
import { useRouter } from 'next/router';
import PixelatedButton from './common/PixelatedButton';
import toast from 'react-hot-toast';

const EmailInput = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const text = "Enter your organisation email";

    const handleProceed = async () => {
        if (!email) {
            setError('Please enter an email address');
            return;
        }

        try {
            setIsLoading(true);
            setError('');

            const response = await axiosInstance.get(`/get/teams/email`, {
                params: { email },
            }).catch(error => {
                if (error?.response?.status === 500) {
                    toast.error('Email not found. Please check your email address.');
                    return null;
                }
                return Promise.reject(error);
            });

            if (!response || !response?.data?.team_details) {
                setError('No team found with this email address');
                return;
            }

            const { id: teamId, name: teamName, size } = response.data.team_details;

            // Get user details
            const userResponse = await axiosInstance.get(`/participant/email`, {
                params: { email },
            }).catch(error => {
                console.error('Error fetching user details:', error);
                toast.error('Error fetching user details');
                return null;
            });

            if (!userResponse || !userResponse?.data) {
                setError('Error fetching user details');
                return;
            }

            // Store team and user data in localStorage
            localStorage.setItem('team_id', teamId);
            localStorage.setItem('team_name', teamName);
            localStorage.setItem('team_size', size);
            localStorage.setItem('email', email);
            localStorage.setItem('user_data', JSON.stringify(userResponse.data.data));

            await router.push({
                pathname: '/screen2',
                query: {
                    team_id: teamId,
                    team_name: teamName
                }
            });

        } catch (error) {
            console.error('Error:', error);
            toast.error('An unexpected error occurred. Please try again.');
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto flex flex-col items-center justify-center h-[100vh]">
            <motion.div className="mb-8 relative">
                <div className="whitespace-pre">
                    {text.split("").map((char, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                duration: 0.1,
                                delay: index * 0.05,
                            }}
                            className="text-2xl font-['Space_Grotesk'] text-gray-100 inline-block"
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </div>
            </motion.div>

            <div className="relative mb-8 w-[300px]">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@novostack.com"
                    className="w-full px-4 py-3 
                             bg-transparent 
                             border-0 border-b-2 border-white/20
                             text-white font-['Space_Grotesk']
                             focus:outline-none focus:border-white/40
                             transition-colors duration-200
                             placeholder:text-white/30"
                    disabled={isLoading}
                />
                <motion.span
                    animate={{ opacity: [0, 1] }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                    className="absolute left-1 top-1/2 -translate-y-1/2
                              w-[2px] h-[24px] bg-white/70"
                />
            </div>

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 text-red-500 text-sm font-['Space_Grotesk']"
                >
                    {error}
                </motion.div>
            )}

            <PixelatedButton
                onClick={handleProceed}
                label={isLoading ? "LOADING..." : "PROCEED"}
                className="w-[300px]"
                disabled={isLoading || !email}
            />
        </div>
    );
};

export default EmailInput;