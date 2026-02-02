import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play } from 'lucide-react';
import { projects } from '../data/projects';

const ProjectCard = ({ project, index, onSelect, onHoverStart, onHoverEnd }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
        onHoverStart();
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        onHoverEnd();
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
            <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '250px', overflow: 'hidden' }}>
                {/* Fallback gradient background */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)',
                    opacity: !imageLoaded || imageError ? 1 : 0,
                    transition: 'opacity 0.5s',
                }} />

                {/* Thumbnail - Always visible with zoom on hover */}
                <motion.img
                    src={project.thumbnail}
                    alt={project.title}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                    animate={{
                        scale: isHovered ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: imageLoaded && !imageError ? 1 : 0,
                    }}
                />

                {/* Dark overlay on hover */}
                <motion.div
                    animate={{
                        opacity: isHovered ? 0.4 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: '#000',
                        zIndex: 5,
                    }}
                />

                {/* Play Button - Shows on hover */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        scale: isHovered ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 15,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <motion.div
                        animate={{
                            boxShadow: isHovered
                                ? ['0 0 20px rgba(168, 85, 247, 0.5)', '0 0 40px rgba(168, 85, 247, 0.8)', '0 0 20px rgba(168, 85, 247, 0.5)']
                                : '0 0 0px rgba(168, 85, 247, 0)',
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        style={{
                            width: '70px',
                            height: '70px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.9) 0%, rgba(139, 92, 246, 0.9) 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backdropFilter: 'blur(10px)',
                        }}
                    >
                        <Play
                            style={{
                                width: '28px',
                                height: '28px',
                                color: '#fff',
                                marginLeft: '4px', // Optical center adjustment
                            }}
                            fill="#fff"
                        />
                    </motion.div>
                </motion.div>

                {/* Overlay Content */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '1.5rem',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)',
                }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
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
                        zIndex: 20,
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
