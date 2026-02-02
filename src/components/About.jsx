import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { stats, skills } from '../data/projects';

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.23, 1, 0.32, 1],
            },
        },
    };

    return (
        <section id="about" ref={ref} style={{
            padding: '5rem 1rem',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Background Decorations */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '-8rem',
                width: '16rem',
                height: '16rem',
                backgroundColor: 'rgba(168, 85, 247, 0.1)',
                borderRadius: '50%',
                filter: 'blur(60px)',
            }} />
            <div style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '24rem',
                height: '24rem',
                backgroundColor: 'rgba(34, 211, 238, 0.1)',
                borderRadius: '50%',
                filter: 'blur(60px)',
            }} />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                style={{ maxWidth: '80rem', margin: '0 auto', position: 'relative', zIndex: 10 }}
            >
                {/* Section Header */}
                <motion.div variants={itemVariants} style={{ marginBottom: '4rem' }}>
                    <h2 className="font-display" style={{
                        fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                        fontWeight: '700',
                        color: '#ffffff',
                        marginBottom: '1rem',
                    }}>
                        About <span className="text-gradient">Me</span>
                    </h2>
                    <p style={{
                        fontSize: '1.25rem',
                        color: 'rgba(255, 255, 255, 0.5)',
                        maxWidth: '40rem',
                    }}>
                        Passionate about transforming raw footage into compelling visual narratives
                    </p>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(1, 1fr)',
                    gap: '3rem',
                }} className="about-grid">
                    {/* Bio */}
                    <motion.div variants={itemVariants}>
                        <p style={{
                            fontSize: '1.25rem',
                            color: 'rgba(255, 255, 255, 0.7)',
                            lineHeight: '1.8',
                            marginBottom: '1.5rem',
                        }}>
                            I&apos;m <span style={{ color: '#ffffff', fontWeight: '600' }}>Tushar Agarwal</span>, a video editor
                            and content creator with a deep passion for visual storytelling. I specialize in
                            crafting cinematic experiences that captivate audiences and leave lasting impressions.
                        </p>
                        <p style={{
                            fontSize: '1.125rem',
                            color: 'rgba(255, 255, 255, 0.6)',
                            lineHeight: '1.8',
                            marginBottom: '2rem',
                        }}>
                            From music videos to brand documentaries, I bring a unique perspective
                            to every project. My approach combines technical precision with creative
                            vision to deliver content that exceeds expectations.
                        </p>

                        {/* Skills */}
                        <div>
                            <h3 style={{
                                fontSize: '0.75rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.15em',
                                color: 'rgba(255, 255, 255, 0.4)',
                                marginBottom: '1rem',
                            }}>Expertise</h3>
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '0.75rem',
                            }}>
                                {skills.map((skill, index) => (
                                    <motion.span
                                        key={skill}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                        transition={{ delay: 0.5 + index * 0.1 }}
                                        className="glass skill-tag"
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        variants={itemVariants}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '1.5rem',
                        }}
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.3 + index * 0.15 }}
                                className="glass stat-card"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={isInView ? { scale: 1 } : {}}
                                    transition={{ delay: 0.5 + index * 0.15, type: 'spring', stiffness: 200 }}
                                    className="font-display text-gradient stat-value"
                                    style={{
                                        fontSize: 'clamp(2rem, 5vw, 3rem)',
                                        fontWeight: '700',
                                        marginBottom: '0.5rem',
                                    }}
                                >
                                    {stat.value}
                                </motion.div>
                                <div style={{
                                    fontSize: '0.875rem',
                                    color: 'rgba(255, 255, 255, 0.5)',
                                }}>
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>

            <style>{`
        @media (min-width: 1024px) {
          .about-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 5rem !important;
          }
        }
      `}</style>
        </section>
    );
};

export default About;
