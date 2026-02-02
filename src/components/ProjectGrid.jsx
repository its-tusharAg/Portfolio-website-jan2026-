import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { projects } from '../data/projects';

const ProjectCard = ({ project, index, onSelect, onHoverStart, onHoverEnd }) => {
    const videoRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
        onHoverStart();
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        onHoverEnd();
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    // Bento grid sizing classes
    const getBentoClass = () => {
        const patterns = ['bento-large', '', 'bento-tall', '', 'bento-wide', ''];
        return patterns[index % patterns.length];
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.23, 1, 0.32, 1],
            }}
            className={`video-card group cursor-pointer ${getBentoClass()}`}
            style={{ minHeight: '250px' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => onSelect(project)}
        >
            {/* Thumbnail Image */}
            <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '250px' }}>
                {/* Fallback gradient background */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)',
                    opacity: (!imageLoaded || imageError) && !isHovered ? 1 : 0,
                    transition: 'opacity 0.5s',
                }} />

                <img
                    src={project.thumbnail}
                    alt={project.title}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'opacity 0.5s',
                        opacity: isHovered ? 0 : (imageLoaded && !imageError ? 1 : 0),
                    }}
                />

                {/* Video Preview (on hover) */}
                <video
                    ref={videoRef}
                    src={project.videoUrl}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'opacity 0.5s',
                        opacity: isHovered ? 1 : 0,
                    }}
                />

                {/* Overlay Content */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '1.5rem',
                }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isHovered ? 1 : 0.9, y: isHovered ? 0 : 10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <span style={{
                            display: 'inline-block',
                            padding: '0.25rem 0.75rem',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            color: '#22d3ee',
                            backgroundColor: 'rgba(34, 211, 238, 0.15)',
                            borderRadius: '9999px',
                            marginBottom: '0.5rem',
                        }}>
                            {project.category}
                        </span>
                        <h3 className="font-display" style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            color: '#ffffff',
                        }}>
                            {project.title}
                        </h3>
                    </motion.div>
                </div>

                {/* Border Glow on Hover */}
                <motion.div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '16px',
                        pointerEvents: 'none',
                    }}
                    animate={{
                        boxShadow: isHovered
                            ? '0 0 40px rgba(168, 85, 247, 0.3), inset 0 0 0 2px rgba(168, 85, 247, 0.5)'
                            : '0 0 0px rgba(168, 85, 247, 0), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
                    }}
                    transition={{ duration: 0.3 }}
                />
            </div>
        </motion.div>
    );
};

const ProjectGrid = ({ onSelectProject, onHoverVideo, onLeaveVideo }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="work" ref={ref} style={{ padding: '5rem 1rem' }}>
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                style={{ maxWidth: '80rem', margin: '0 auto 4rem' }}
            >
                <h2 className="font-display" style={{
                    fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                    fontWeight: '700',
                    color: '#ffffff',
                    marginBottom: '1rem',
                }}>
                    Selected <span className="text-gradient">Work</span>
                </h2>
                <p style={{
                    fontSize: '1.25rem',
                    color: 'rgba(255, 255, 255, 0.5)',
                    maxWidth: '40rem',
                }}>
                    A curated collection of projects that showcase my passion for visual storytelling and video editing
                </p>
            </motion.div>

            {/* Bento Grid */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bento-grid"
                style={{ maxWidth: '80rem', margin: '0 auto' }}
            >
                {projects.map((project, index) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        index={index}
                        onSelect={onSelectProject}
                        onHoverStart={onHoverVideo}
                        onHoverEnd={onLeaveVideo}
                    />
                ))}
            </motion.div>
        </section>
    );
};

export default ProjectGrid;
