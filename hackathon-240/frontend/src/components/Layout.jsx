import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import SplashScreen from './SplashScreen';

const Layout = ({ children }) => {
    const router = useRouter();
    const isHackathonStarted = typeof window !== 'undefined' && localStorage.getItem('hackathonStarted');
    const isHomePage = router.pathname === '/';

    if (isHomePage && !isHackathonStarted) {
        return <SplashScreen />;
    }

    return (
        <div className="relative min-h-screen" style={{ backgroundImage: "url('/perspective-grid.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {/* <div className="absolute inset-0 z-10 bg-black opacity-30" /> Optional overlay for better visibility */}
            <div className="relative z-20">
                {children}
                <img src="/bwb-sticker.svg" alt="Perspective Grid" className="absolute top-6 left-6 w-1/6" style={{ transform: 'rotate(-9deg)' }} />
            </div>
        </div>
    );
};

export default Layout;
