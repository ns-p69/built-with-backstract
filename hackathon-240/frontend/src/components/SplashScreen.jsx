import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRouter } from 'next/router';
import PixelatedButton from './common/PixelatedButton';

const SplashScreen = () => {
    const router = useRouter();

    // Mouse position values
    const mouse = {
        x: useMotionValue(0),
        y: useMotionValue(0)
    };

    // Smooth mouse values
    const smoothMouse = {
        x: useSpring(mouse.x, { stiffness: 75, damping: 100, mass: 3 }),
        y: useSpring(mouse.y, { stiffness: 75, damping: 100, mass: 3 })
    };

    // Handle mouse movement
    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        // Convert mouse position to normalized values (-1 to 1)
        mouse.x.set((clientX - innerWidth / 2) / innerWidth);
        mouse.y.set((clientY - innerHeight / 2) / innerHeight);
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Transform mouse position into rotation values
    const rotateX = useTransform(smoothMouse.y, [-0.5, 0.5], [30, -30]);
    const rotateY = useTransform(smoothMouse.x, [-0.5, 0.5], [-30, 30]);

    // Transform mouse position into glare position
    const glareX = useTransform(smoothMouse.x, [-1, 1], ['0%', '200%']);
    const glareY = useTransform(smoothMouse.y, [-1, 1], ['0%', '200%']);
    const glareOpacity = useTransform(
        [smoothMouse.x, smoothMouse.y],
        ([x, y]) => Math.min(Math.abs(x) + Math.abs(y), 0.5)
    );

    const handleEnterHackathon = () => {
        localStorage.setItem('hackathonStarted', 'true');
        router.push('/email');
    };

    return (
        <div className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center gap-12 bg-[#0C0512]" style={{ backgroundImage: "url('/perspective-grid.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {/* 3D Banner Container */}
            <motion.div
                className="relative w-[80%] max-w-[800px] perspective-[1000px]"
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* Banner Image */}
                <motion.div
                    className="relative w-full"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <img
                        src="/hackathon-banner.png"
                        alt="Hackathon Banner"
                        style={{
                            width: 'auto',
                            height: '300px',
                            boxShadow: "12px 12px 0px 0px rgba(255, 255, 255)",
                            border: ".5px solid rgba(255, 255, 255, 0.48)",
                        }}
                    />

                    {/* Glare Effect */}
                    <motion.div
                        className="absolute inset-0 rounded-lg"
                        style={{
                            background: `linear-gradient(
                                217deg,
                                rgba(255,255,255,0) 0%,
                                rgba(255,255,255,0.25) 50%,
                                rgba(255,255,255,0) 100%
                            )`,
                            left: glareX,
                            top: glareY,
                            opacity: glareOpacity,
                            mixBlendMode: 'overlay',
                        }}
                    />
                </motion.div>
            </motion.div>

            <PixelatedButton
                onClick={handleEnterHackathon}
                label="ENTER HACKATHON"
            />
        </div>
    );
};

export default SplashScreen; 