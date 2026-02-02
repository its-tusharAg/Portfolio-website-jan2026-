import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
    const titleVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.3,
            },
        },
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 80, rotateX: -90 },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 100,
            },
        },
    };

    const subtitleVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 1.5,
                duration: 0.8,
                ease: [0.23, 1, 0.32, 1],
            },
        },
    };

    const title1 = 'VISUAL';
    const title2 = 'STORYTELLER';

    return (
        <section style={{
            position: 'relative',
            height: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
        }}>
            {/* Background Video */}
            <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: 0,
            }}>
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: 0.3,
                    }}
                >
                    <source
                        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                        type="video/mp4"
                    />
                </video>
                {/* Gradient Overlays */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, #0a0a0a 0%, transparent 30%, transparent 70%, #0a0a0a 100%)',
                }} />
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to right, rgba(10,10,10,0.8) 0%, transparent 30%, transparent 70%, rgba(10,10,10,0.8) 100%)',
                }} />
            </div>

            {/* Content */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                textAlign: 'center',
                padding: '0 1rem',
            }}>
                {/* Main Title - VISUAL */}
                <motion.div
                    variants={titleVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ overflow: 'hidden' }}
                >
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                    }}>
                        {title1.split('').map((letter, index) => (
                            <motion.span
                                key={`v-${index}`}
                                variants={letterVariants}
                                className="font-display"
                                style={{
                                    fontSize: 'clamp(4rem, 15vw, 12rem)',
                                    fontWeight: '800',
                                    letterSpacing: '-0.05em',
                                    color: '#ffffff',
                                    display: 'inline-block',
                                    perspective: '1000px',
                                }}
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>

                {/* Second Title - STORYTELLER */}
                <motion.div
                    variants={titleVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ overflow: 'hidden', marginTop: '0.5rem' }}
                >
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                    }}>
                        {title2.split('').map((letter, index) => (
                            <motion.span
                                key={`s-${index}`}
                                variants={letterVariants}
                                className="font-display text-gradient"
                                style={{
                                    fontSize: 'clamp(2.5rem, 10vw, 6rem)',
                                    fontWeight: '700',
                                    letterSpacing: '-0.02em',
                                    display: 'inline-block',
                                    perspective: '1000px',
                                }}
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    variants={subtitleVariants}
                    initial="hidden"
                    animate="visible"
                    style={{
                        marginTop: '2rem',
                        fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontWeight: '300',
                        letterSpacing: '0.05em',
                        maxWidth: '40rem',
                        margin: '2rem auto 0',
                    }}
                >
                    Crafting cinematic experiences through visual artistry
                </motion.p>

                {/* Name Tag */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2, duration: 0.5 }}
                    className="glass"
                    style={{
                        marginTop: '2rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '9999px',
                    }}
                >
                    <div style={{
                        width: '0.5rem',
                        height: '0.5rem',
                        backgroundColor: '#22c55e',
                        borderRadius: '9999px',
                        animation: 'pulse 2s infinite',
                    }} />
                    <span style={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                    }}>Tushar Agarwal</span>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.8 }}
                style={{
                    position: 'absolute',
                    bottom: '2.5rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                }}
            >
                <span style={{
                    color: 'rgba(255, 255, 255, 0.4)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                }}>Scroll</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <ChevronDown style={{ width: '1.5rem', height: '1.5rem', color: 'rgba(255, 255, 255, 0.4)' }} />
                </motion.div>
            </motion.div>

            {/* Decorative Blurs */}
            <div style={{
                position: 'absolute',
                top: '25%',
                left: '2.5rem',
                width: '8rem',
                height: '8rem',
                backgroundColor: 'rgba(168, 85, 247, 0.2)',
                borderRadius: '50%',
                filter: 'blur(60px)',
            }} />
            <div style={{
                position: 'absolute',
                bottom: '25%',
                right: '2.5rem',
                width: '10rem',
                height: '10rem',
                backgroundColor: 'rgba(34, 211, 238, 0.2)',
                borderRadius: '50%',
                filter: 'blur(60px)',
            }} />
        </section>
    );
};

export default Hero;
