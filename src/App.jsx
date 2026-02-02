import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import VideoModal from './components/VideoModal';
import About from './components/About';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';


function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHoveringVideo, setIsHoveringVideo] = useState(false);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
    }}>
      {/* Custom Cursor */}
      <CustomCursor isHoveringVideo={isHoveringVideo} isModalOpen={isModalOpen} />



      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        padding: '1.5rem 1rem',
      }}>
        <div style={{
          maxWidth: '80rem',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <a
            href="#"
            className="font-display"
            style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#ffffff',
              textDecoration: 'none',
              transition: 'color 0.3s',
            }}
          >
            TA<span style={{ color: '#a855f7' }}>.</span>
          </a>
          <div className="nav-links" style={{
            display: 'none',
            alignItems: 'center',
            gap: '2rem',
          }}>
            {['Work', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="line-reveal"
                style={{
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.6)',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                }}
              >
                {item}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="glass"
            style={{
              padding: '0.625rem 1.25rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#ffffff',
              textDecoration: 'none',
              borderRadius: '9999px',
              transition: 'all 0.3s',
            }}
          >
            Let&apos;s Talk
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Hero />
        <ProjectGrid
          onSelectProject={handleSelectProject}
          onHoverVideo={() => setIsHoveringVideo(true)}
          onLeaveVideo={() => setIsHoveringVideo(false)}
        />
        <About />
        <Contact />
      </main>

      {/* Video Modal */}
      <VideoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
      />

      <style>{`
        @media (min-width: 768px) {
          .nav-links {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
