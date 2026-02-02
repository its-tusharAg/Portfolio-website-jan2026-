import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomCursor = ({ isHoveringVideo, isModalOpen }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener('mousemove', updateMousePosition);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    // Hide on mobile
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
        return null;
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Main cursor dot */}
                    <motion.div
                        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                        animate={{
                            x: mousePosition.x - 6,
                            y: mousePosition.y - 6,
                            scale: isHoveringVideo ? 0 : 1,
                        }}
                        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                    >
                        <div className="w-3 h-3 bg-white rounded-full" />
                    </motion.div>

                    {/* Outer ring - expands on video hover */}
                    <motion.div
                        className="fixed top-0 left-0 pointer-events-none z-[9999]"
                        animate={{
                            x: mousePosition.x - (isHoveringVideo ? 35 : 20),
                            y: mousePosition.y - (isHoveringVideo ? 35 : 20),
                        }}
                        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
                    >
                        <motion.div
                            className="rounded-full border border-white/30"
                            animate={{
                                width: isHoveringVideo ? 70 : 40,
                                height: isHoveringVideo ? 70 : 40,
                                borderColor: isHoveringVideo ? 'rgba(168, 85, 247, 0.6)' : 'rgba(255, 255, 255, 0.3)',
                                borderWidth: isHoveringVideo ? 2 : 1,
                            }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CustomCursor;
