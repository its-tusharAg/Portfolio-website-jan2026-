import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';

const VideoModal = ({ isOpen, onClose, project }) => {
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen && videoRef.current) {
            videoRef.current.play();
        }
    }, [isOpen]);

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const modalVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            y: 50,
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: 'spring',
                damping: 25,
                stiffness: 300,
            },
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            y: 30,
            transition: {
                duration: 0.2,
            },
        },
    };

    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 50,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1rem',
                    }}
                    onClick={onClose}
                >
                    {/* Backdrop with blur */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.85)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                    }} />

                    {/* Modal Content */}
                    <motion.div
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="glass-dark"
                        style={{
                            position: 'relative',
                            zIndex: 10,
                            width: '100%',
                            maxWidth: '64rem',
                            borderRadius: '1rem',
                            overflow: 'hidden',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onClose}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                zIndex: 20,
                                width: '2.5rem',
                                height: '2.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s',
                            }}
                        >
                            <X style={{ width: '1.25rem', height: '1.25rem', color: '#ffffff' }} />
                        </motion.button>

                        {/* Video Container */}
                        <div style={{
                            position: 'relative',
                            aspectRatio: '16/9',
                            backgroundColor: '#000000',
                        }}>
                            <video
                                ref={videoRef}
                                src={project.videoUrl}
                                controls
                                muted={isMuted}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                }}
                            />

                            {/* Mute Toggle */}
                            <button
                                onClick={() => setIsMuted(!isMuted)}
                                style={{
                                    position: 'absolute',
                                    bottom: '1rem',
                                    left: '1rem',
                                    width: '2.5rem',
                                    height: '2.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s',
                                }}
                            >
                                {isMuted ? (
                                    <VolumeX style={{ width: '1.25rem', height: '1.25rem', color: '#ffffff' }} />
                                ) : (
                                    <Volume2 style={{ width: '1.25rem', height: '1.25rem', color: '#ffffff' }} />
                                )}
                            </button>
                        </div>

                        {/* Project Info */}
                        <div style={{ padding: '1.5rem 2rem' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                marginBottom: '0.75rem',
                            }}>
                                <span style={{
                                    padding: '0.25rem 0.75rem',
                                    fontSize: '0.75rem',
                                    fontWeight: '500',
                                    color: '#a855f7',
                                    backgroundColor: 'rgba(168, 85, 247, 0.1)',
                                    borderRadius: '9999px',
                                }}>
                                    {project.category}
                                </span>
                            </div>
                            <h3 className="font-display" style={{
                                fontSize: '1.75rem',
                                fontWeight: '700',
                                color: '#ffffff',
                                marginBottom: '0.5rem',
                            }}>
                                {project.title}
                            </h3>
                            <p style={{
                                color: 'rgba(255, 255, 255, 0.6)',
                            }}>
                                {project.description}
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default VideoModal;
