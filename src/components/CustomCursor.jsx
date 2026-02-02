import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';

const CustomCursor = ({ isHoveringVideo }) => {
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

                    {/* Outer ring / Play button */}
                    <motion.div
                        className="fixed top-0 left-0 pointer-events-none z-[9999]"
                        animate={{
                            x: mousePosition.x - (isHoveringVideo ? 40 : 20),
                            y: mousePosition.y - (isHoveringVideo ? 40 : 20),
                            scale: isHoveringVideo ? 1 : 1,
                        }}
                        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
                    >
                        <motion.div
                            className="flex items-center justify-center rounded-full border border-white/30"
                            animate={{
                                width: isHoveringVideo ? 80 : 40,
                                height: isHoveringVideo ? 80 : 40,
                                backgroundColor: isHoveringVideo ? 'rgba(168, 85, 247, 0.9)' : 'transparent',
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <AnimatePresence>
                                {isHoveringVideo && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Play className="w-6 h-6 text-white fill-white" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CustomCursor;
