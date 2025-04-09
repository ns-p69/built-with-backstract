import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';

const ChallengeDetails = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { challengeDetails } = useSelector((state) => state.challenge);

    if (!challengeDetails) return null;

    return (
        <div className="w-full max-w-4xl mx-auto mt-8">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left p-4 bg-white/10 rounded-lg flex justify-between items-center"
            >
                <span className="text-white font-['Space_Grotesk']">Challenge Details</span>
                <span className="text-white">{isOpen ? '−' : '+'}</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white/5 rounded-b-lg p-6 mt-1"
                    >
                        <h2 className="text-2xl font-bold text-white mb-4 font-['Space_Grotesk']">
                            {challengeDetails.problem}
                        </h2>

                        <div className="space-y-6 text-white/80">
                            <div dangerouslySetInnerHTML={{ __html: challengeDetails.description }} />
                            <div dangerouslySetInnerHTML={{ __html: challengeDetails.instructions }} />
                            <div dangerouslySetInnerHTML={{ __html: challengeDetails.constraints }} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ChallengeDetails; 