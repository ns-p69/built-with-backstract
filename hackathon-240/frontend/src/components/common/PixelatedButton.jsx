import { motion } from 'framer-motion';

const PixelatedButton = ({ onClick, label, className = "", disabled = false }) => {
    return (
        <motion.button
            onClick={onClick}
            disabled={disabled}
            className={`relative z-20
                      text-white font-bold text-lg
                      bg-[#111] border-[3px] border-white
                      transform-gpu pixelated-btn overflow-hidden
                      hover:bg-white hover:text-black
                      transition-colors duration-200
                      disabled:opacity-50 disabled:cursor-not-allowed
                      disabled:hover:bg-[#111] disabled:hover:text-white
                      ${className}`}
            initial={{
                transform: 'perspective(1000px) rotateX(15deg) translateZ(0)',
                clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)'
            }}
            whileHover={!disabled ? {
                transform: [
                    'perspective(1000px) rotateX(15deg) translateZ(0)',
                    'perspective(1000px) rotateX(25deg) translateZ(20px)',
                    'perspective(1000px) rotateX(15deg) translateZ(40px)'
                ],
                clipPath: [
                    'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
                    'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)',
                    'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)'
                ],
                transition: {
                    duration: 0.4,
                    ease: "easeInOut",
                }
            } : {}}
            whileTap={!disabled ? {
                transform: 'perspective(1000px) rotateX(15deg) translateZ(-20px)',
                scale: 0.95,
                transition: {
                    duration: 0.1,
                }
            } : {}}
        >
            <div className="relative px-8 py-4 ">
                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 grid-pattern opacity-30" />

                {/* Shimmer Effect */}
                <div className="absolute inset-0 shimmer-effect" />

                {/* Button Content */}
                <span className="relative z-10 font-mono tracking-wider">
                    {label}
                </span>

                {/* Bottom Shadow */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2
                              w-[90%] h-6 bg-black/30 blur-sm
                              transform-gpu scale-75" />
            </div>
        </motion.button>
    );
};

export default PixelatedButton; 