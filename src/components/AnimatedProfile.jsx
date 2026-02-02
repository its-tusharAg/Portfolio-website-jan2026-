import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const AnimatedProfile = ({ imageSrc }) => {
    const containerRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    // Mouse position motion values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring physics for smooth animation
    const springConfig = { damping: 20, stiffness: 300 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

    const handleMouseMove = (event) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const x = (event.clientX - centerX) / rect.width;
        const y = (event.clientY - centerY) / rect.height;

        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            style={{
                position: 'relative',
                width: '280px',
                height: '280px',
                perspective: '1000px',
                cursor: 'pointer',
            }}
        >
            {/* Animated Rotating Gradient Border */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                style={{
                    position: 'absolute',
                    inset: '-4px',
                    borderRadius: '50%',
                    background: 'conic-gradient(from 0deg, #a855f7, #22d3ee, #a855f7)',
                    opacity: isHovered ? 1 : 0.7,
                    filter: isHovered ? 'blur(0px)' : 'blur(2px)',
                    transition: 'opacity 0.3s, filter 0.3s',
                }}
            />

            {/* Glowing Orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                    position: 'absolute',
                    top: '-20px',
                    right: '-20px',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(168,85,247,0.8) 0%, transparent 70%)',
                    filter: 'blur(10px)',
                }}
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.5, 0.3, 0.5],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                    position: 'absolute',
                    bottom: '-10px',
                    left: '-15px',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(34,211,238,0.8) 0%, transparent 70%)',
                    filter: 'blur(8px)',
                }}
            />

            {/* 3D Tilt Container */}
            <motion.div
                style={{
                    position: 'absolute',
                    inset: '4px',
                    borderRadius: '50%',
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* Inner dark border ring */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '50%',
                        background: '#0a0a0a',
                        padding: '6px',
                    }}
                >
                    {/* Profile Image Container */}
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            position: 'relative',
                        }}
                    >
                        <motion.img
                            src={imageSrc}
                            alt="Profile"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                filter: isHovered ? 'brightness(1.1) contrast(1.05)' : 'brightness(1)',
                                transition: 'filter 0.3s ease',
                            }}
                        />

                        {/* Hover Overlay Shine Effect */}
                        <motion.div
                            initial={{ x: '-100%', opacity: 0 }}
                            animate={isHovered ? { x: '200%', opacity: 0.3 } : { x: '-100%', opacity: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)',
                                transform: 'skewX(-20deg)',
                            }}
                        />
                    </div>
                </div>
            </motion.div>

            {/* Floating Particles */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        y: [0, -15, 0],
                        x: [0, Math.sin(i * 60) * 8, 0],
                        opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                        duration: 2 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: 'easeInOut',
                    }}
                    style={{
                        position: 'absolute',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: i % 2 === 0 ? '#a855f7' : '#22d3ee',
                        left: `${15 + i * 14}%`,
                        bottom: `${10 + (i % 3) * 10}%`,
                        boxShadow: i % 2 === 0
                            ? '0 0 10px rgba(168, 85, 247, 0.6)'
                            : '0 0 10px rgba(34, 211, 238, 0.6)',
                    }}
                />
            ))}
        </motion.div>
    );
};

export default AnimatedProfile;
