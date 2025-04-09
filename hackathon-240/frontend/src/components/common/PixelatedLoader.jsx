import React from 'react';

const PixelatedLoader = ({ loadingText = "LOADING" }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="text-center flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold text-white mb-8 font-['Pixelify_Sans'] tracking-wider">
                    {loadingText}
                </h1>
                <div className="relative w-[300px] h-[40px] border-[3px] border-white 
                              pixelated-border overflow-hidden bg-[#0C0512]">
                    {/* Loading dots */}
                    <div className="flex h-full">
                        {[...Array(10)].map((_, index) => (
                            <span
                                key={index}
                                className="flex-1 h-full bg-green-500 loading-dot"
                                style={{
                                    animationDelay: `${index * 0.2}s`,
                                    opacity: 0
                                }}
                            />
                        ))}
                    </div>

                    {/* Pixel corners */}
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-black" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-black" />
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-black" />
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-black" />
                </div>
            </div>
        </div>
    );
};

export default PixelatedLoader; 