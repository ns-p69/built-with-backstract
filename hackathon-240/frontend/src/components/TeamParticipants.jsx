// components/TeamParticipants.js
import React from 'react';

const TeamParticipants = ({ participants }) => {
    // Array of vibrant Tailwind color classes
    const colorClasses = [
        'text-indigo-400',
        'text-fuchsia-400',
        'text-orange-400',
        'text-yellow-300',
        'text-green-400',
        'text-emerald-400',
        'text-teal-400',
        'text-cyan-400',
        'text-pink-400',
        'text-purple-400',
        'text-rose-400',
        'text-lime-400',
        'text-sky-400',
        'text-violet-400'
    ];

    // Function to get a random color class
    const getRandomColor = () => {
        const randomIndex = Math.floor(Math.random() * colorClasses.length);
        return colorClasses[randomIndex];
    };

    return (
        <div className="flex flex-col gap-2 items-center justify-center mt-6">
            <ul className="flex flex-col gap-2 items-center justify-center">
                {participants.map((participant, index) => (
                    <li
                        key={participant.id}
                        className={`${getRandomColor()} text-sm font-['Space_Grotesk'] text-center
                                  transition-colors duration-300 hover:text-white
                                  cursor-default`}
                    >
                        {participant.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TeamParticipants;