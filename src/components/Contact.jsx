import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, Instagram, Twitter, Linkedin, Check, Copy } from 'lucide-react';
import AnimatedProfile from './AnimatedProfile';

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [copiedField, setCopiedField] = useState(null);

    const contactInfo = {
        phone: '+91 7452981312',
        email: 'officialtjtushar@gmail.com',
    };

    const handleCopy = async (text, field) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedField(field);
            setTimeout(() => setCopiedField(null), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
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

    const socialLinks = [
        { icon: Instagram, href: '#', label: 'Instagram' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Linkedin, href: '#', label: 'LinkedIn' },
    ];

    return (
        <footer
            id="contact"
            ref={ref}
            style={{
                position: 'relative',
                padding: '5rem 1rem',
                overflow: 'hidden',
            }}
        >
            {/* Background Gradient */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(168, 85, 247, 0.05) 0%, transparent 50%)',
            }} />

            {/* Decorative Elements */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: '25%',
                width: '24rem',
                height: '24rem',
                backgroundColor: 'rgba(168, 85, 247, 0.1)',
                borderRadius: '50%',
                filter: 'blur(60px)',
            }} />
            <div style={{
                position: 'absolute',
                top: '25%',
                right: '25%',
                width: '16rem',
                height: '16rem',
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
                {/* Header */}
                <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 className="font-display" style={{
                        fontSize: 'clamp(3rem, 10vw, 6rem)',
                        fontWeight: '700',
                        color: '#ffffff',
                        marginBottom: '1rem',
                    }}>
                        Let&apos;s <span className="text-gradient">Create</span>
                    </h2>
                    <p style={{
                        fontSize: '1.25rem',
                        color: 'rgba(255, 255, 255, 0.5)',
                        maxWidth: '32rem',
                        margin: '0 auto',
                    }}>
                        Have a project in mind? Let&apos;s bring your vision to life.
                    </p>
                </motion.div>

                {/* Creator Profile Section */}
                <motion.div
                    variants={itemVariants}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '2rem',
                        marginBottom: '4rem',
                    }}
                    className="creator-section"
                >
                    {/* Animated Profile Image */}
                    <AnimatedProfile
                        imageSrc={`${import.meta.env.BASE_URL}profile.jpeg`}
                    />

                    {/* Creator Info */}
                    <div style={{ textAlign: 'center' }}>
                        <motion.h3
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.3 }}
                            className="font-display"
                            style={{
                                fontSize: '1.75rem',
                                fontWeight: '700',
                                color: '#ffffff',
                                marginBottom: '0.5rem',
                            }}
                        >
                            Tushar Agarwal
                        </motion.h3>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.4 }}
                            style={{
                                fontSize: '1rem',
                                color: 'rgba(255, 255, 255, 0.5)',
                                marginBottom: '1rem',
                            }}
                        >
                            Video Editor & Visual Storyteller
                        </motion.p>

                        {/* Availability Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.5 }}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem 1rem',
                                borderRadius: '9999px',
                                background: 'rgba(34, 197, 94, 0.15)',
                                border: '1px solid rgba(34, 197, 94, 0.3)',
                            }}
                        >
                            <span
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    backgroundColor: '#22c55e',
                                    animation: 'pulse 2s infinite',
                                }}
                            />
                            <span style={{ color: '#22c55e', fontSize: '0.875rem', fontWeight: '500' }}>
                                Available for projects
                            </span>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Contact Cards */}
                <motion.div
                    variants={itemVariants}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(1, 1fr)',
                        gap: '1.5rem',
                        maxWidth: '48rem',
                        margin: '0 auto 4rem',
                    }}
                    className="contact-grid"
                >
                    {/* Phone */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleCopy(contactInfo.phone, 'phone')}
                        className="glass"
                        style={{
                            padding: '2rem',
                            borderRadius: '1rem',
                            textAlign: 'left',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            border: 'none',
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '1rem',
                        }}>
                            <div style={{
                                width: '3rem',
                                height: '3rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(168, 85, 247, 0.2)',
                            }}>
                                <Phone style={{ width: '1.25rem', height: '1.25rem', color: '#a855f7' }} />
                            </div>
                            <motion.div
                                initial={false}
                                animate={{ scale: copiedField === 'phone' ? 1 : 0 }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.25rem',
                                    color: '#22c55e',
                                    fontSize: '0.875rem',
                                }}
                            >
                                <Check style={{ width: '1rem', height: '1rem' }} />
                                <span>Copied!</span>
                            </motion.div>
                        </div>
                        <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '0.25rem' }}>Phone</p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <p className="font-display" style={{
                                fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                                fontWeight: '700',
                                color: '#ffffff',
                            }}>
                                {contactInfo.phone}
                            </p>
                            <Copy style={{ width: '1.25rem', height: '1.25rem', color: 'rgba(255, 255, 255, 0.3)' }} />
                        </div>
                    </motion.button>

                    {/* Email */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleCopy(contactInfo.email, 'email')}
                        className="glass"
                        style={{
                            padding: '2rem',
                            borderRadius: '1rem',
                            textAlign: 'left',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            border: 'none',
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '1rem',
                        }}>
                            <div style={{
                                width: '3rem',
                                height: '3rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(34, 211, 238, 0.2)',
                            }}>
                                <Mail style={{ width: '1.25rem', height: '1.25rem', color: '#22d3ee' }} />
                            </div>
                            <motion.div
                                initial={false}
                                animate={{ scale: copiedField === 'email' ? 1 : 0 }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.25rem',
                                    color: '#22c55e',
                                    fontSize: '0.875rem',
                                }}
                            >
                                <Check style={{ width: '1rem', height: '1rem' }} />
                                <span>Copied!</span>
                            </motion.div>
                        </div>
                        <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '0.25rem' }}>Email</p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
                            <p className="font-display" style={{
                                fontSize: 'clamp(0.85rem, 2vw, 1.25rem)',
                                fontWeight: '700',
                                color: '#ffffff',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                flex: 1,
                                minWidth: 0,
                            }}>
                                {contactInfo.email}
                            </p>
                            <Copy style={{ width: '1.25rem', height: '1.25rem', color: 'rgba(255, 255, 255, 0.3)', flexShrink: 0 }} />
                        </div>
                    </motion.button>
                </motion.div>

                {/* Social Links */}
                <motion.div variants={itemVariants} style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem',
                    marginBottom: '4rem',
                }}>
                    {socialLinks.map(({ icon: Icon, href, label }) => (
                        <motion.a
                            key={label}
                            href={href}
                            whileHover={{ scale: 1.1, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className="glass"
                            style={{
                                width: '3rem',
                                height: '3rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                            }}
                            aria-label={label}
                        >
                            <Icon style={{ width: '1.25rem', height: '1.25rem', color: 'rgba(255, 255, 255, 0.7)' }} />
                        </motion.a>
                    ))}
                </motion.div>

                {/* Footer Bottom */}
                <motion.div
                    variants={itemVariants}
                    style={{
                        textAlign: 'center',
                        paddingTop: '2rem',
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                >
                    <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.3)' }}>
                        © 2024 <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Tushar Agarwal</span>. All rights reserved.
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.2)', marginTop: '0.5rem' }}>
                        Crafted with passion ✨
                    </p>
                </motion.div>
            </motion.div>

            <style>{`
        @media (min-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
        </footer>
    );
};

export default Contact;
