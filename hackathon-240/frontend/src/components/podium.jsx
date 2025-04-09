import React from 'react'

export default function podium() {
    return (
        <div>
            {/* Top 3 Podium */}
            <div className="flex justify-center items-end mt-8 space-x-8">
                {/* Second Place */}
                <div className="text-center border-2 border-green-500/20 rounded-lg pt-4">
                    {leaderboardData?.[1] && (
                        <div className="flex flex-col items-center">
                            <RandomAvatar
                                name={leaderboardData[1]?.team_name || 'Team 2'}
                                size={80}
                                mode="random"
                            />
                            <div className="mt-2 p-4 rounded-lg ">
                                <p className="text-sm">[2] <br /> {leaderboardData[1]?.team_name}</p>
                                {/* <p className="text-blue-400">Sytatus: {leaderboardData[1]?.status || '-'}</p> */}
                            </div>
                        </div>
                    )}
                </div>

                {/* First Place */}
                <div className="text-center -mt-8">
                    {leaderboardData?.[0] && (
                        <div className="flex flex-col items-center">
                            <RandomAvatar
                                name={leaderboardData[0]?.team_name || 'Team 1'}
                                size={100}
                                mode="random"
                            />
                            <div className="mt-2 p-4 rounded-lg h-32">
                                <p className="text-sm">[1] <br /> {leaderboardData[0]?.team_name}</p>
                                {/* <p className="text-blue-400">Status: {leaderboardData[0]?.status || '-'}</p> */}
                            </div>
                        </div>
                    )}
                </div>

                {/* Third Place */}
                <div className="text-center">
                    {leaderboardData?.[2] && (
                        <div className="flex flex-col items-center">
                            <RandomAvatar
                                name={leaderboardData[2]?.team_name || 'Team 3'}
                                size={80}
                                mode="random"
                            />
                            <div className="mt-2 p-4 rounded-lg ">
                                <p className="text-sm">[3] <br /> {leaderboardData[2]?.team_name}</p>
                                {/* <p className="text-blue-400">Status: {leaderboardData[2]?.status || '-'}</p> */}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
