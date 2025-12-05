import { useState, useEffect, lazy, Suspense, useMemo } from 'react';
import { gsap } from 'gsap';
import FrancophonieChecker from './components/FrancophonieChecker';
import GlobalSummary from './components/GlobalSummary';
import './App.css';

// Lazy load calculator components for better performance
const CIPPCalculator = lazy(() => import('./components/CIPPCalculator'));
const CISVCalculator = lazy(() => import('./components/CISVCalculator'));
const CIEMCalculator = lazy(() => import('./components/CIEMCalculator'));

// Loading component for lazy-loaded calculators
const CalculatorLoader = () => (
  <div className="calculator-loader">
    <div className="loading-spinner"></div>
    <p>Chargement du simulateur...</p>
  </div>
);

function App() {
  const [selectedCalculator, setSelectedCalculator] = useState(null);
  const [francophonieData, setFrancophonieData] = useState({
    albumsFR: '',
    albumsNonFR: '',
    isMicroEntreprise: false
  });
  const [results, setResults] = useState({ CIPP: null, CISV: null, CIEM: null });
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);

  // Animation setup for calculator transitions
  useEffect(() => {
    if (selectedCalculator) {
      // Smooth scroll to top
      window.scrollTo(0, 0);

      // Animate in the calculator view
      gsap.fromTo('.calculator-view',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          delay: 0.2
        }
      );
    }
  }, [selectedCalculator]);

  // Animation when going back to calculator selection
  const handleBackToSelection = () => {
    gsap.to('.calculator-view',
      {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => setSelectedCalculator(null)
      }
    );
  };

  // Handle header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate hasResults - must be defined before useEffect that uses it
  const resultsList = useMemo(() => Object.values(results), [results]);
  const hasResults = useMemo(() => resultsList.some(r => r && r.eligible), [resultsList]);

  // Scroll-triggered animations using Intersection Observer (CSP-safe alternative to ScrollTrigger)
  useEffect(() => {
    if (!selectedCalculator) {
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      };

      const animateOnIntersect = (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target;

            if (target.classList.contains('calculator-card')) {
              gsap.fromTo(target,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
              );
            } else if (target.classList.contains('hero-content')) {
              gsap.fromTo(target.querySelector('h1'),
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
              );
              gsap.fromTo(target.querySelector('.subtitle'),
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: 'power2.out' }
              );
            } else if (target.classList.contains('summary-card')) {
              gsap.fromTo(target,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
              );
            }

            observer.unobserve(target);
          }
        });
      };

      const observer = new IntersectionObserver(animateOnIntersect, observerOptions);

      // Observe elements
      const timer = setTimeout(() => {
        document.querySelectorAll('.calculator-card').forEach(card => observer.observe(card));

        const heroContent = document.querySelector('.hero-content');
        if (heroContent) observer.observe(heroContent);

        if (hasResults) {
          const summaryCard = document.querySelector('.summary-card');
          if (summaryCard) observer.observe(summaryCard);
        }
      }, 100);

      return () => {
        clearTimeout(timer);
        observer.disconnect();
      };
    }
  }, [selectedCalculator, hasResults]);

  const handleFrancophonieChange = (data) => setFrancophonieData(data);
  const handleResult = (result) => setResults(prev => ({ ...prev, [result.type]: result }));

  const calculators = [
    { id: 'CIPP', name: 'CIPP', title: 'Crédit d\'Impôt Phonographique', subtitle: 'Pour labels et producteurs de disques' },
    { id: 'CISV', name: 'CISV', title: 'Crédit d\'Impôt Spectacle Vivant', subtitle: 'Pour tourneurs et producteurs de spectacles' },
    { id: 'CIEM', name: 'CIEM', title: 'Crédit d\'Impôt Éditeurs Musicaux', subtitle: 'Pour éditeurs de musique' },
  ];

  const renderCalculator = () => {
    const props = { francophonieData, onResult: handleResult };
    switch(selectedCalculator) {
      case 'CIPP':
        return (
          <Suspense fallback={<CalculatorLoader />}>
            <CIPPCalculator {...props} />
          </Suspense>
        );
      case 'CISV':
        return (
          <Suspense fallback={<CalculatorLoader />}>
            <CISVCalculator {...props} />
          </Suspense>
        );
      case 'CIEM':
        return (
          <Suspense fallback={<CalculatorLoader />}>
            <CIEMCalculator {...props} />
          </Suspense>
        );
      default: return null;
    }
  };

  return (
    <div className="app">
      <header className={`app-header ${isHeaderScrolled ? 'scrolled' : ''}`}>
        <div className="container header-nav">
          <div className="logo">Mᵉ VAUDEY</div>
          <nav className="nav-links">
            <a href="#calculators">Simulateurs</a>
          </nav>
        </div>
      </header>

      <main className="main-content">
        {!selectedCalculator ? (
          <>
            <section className="hero-section">
              <div className="hero-background-elements">
                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
                <div className="wave wave-1"></div>
                <div className="wave wave-2"></div>
              </div>
              <div className="hero-content container">
                <h1>Estimez vos crédits d'impôt pour la musique.</h1>
                <p className="subtitle">
                  Un outil simple et rapide pour les professionnels de l'industrie musicale française.
                  Sélectionnez un simulateur pour commencer.
                </p>
              </div>
            </section>

            <section id="calculators" className="calculator-selection container">
              <div className="calculator-grid">
                {calculators.map(calc => (
                  <div key={calc.id} className="calculator-card" onClick={() => setSelectedCalculator(calc.id)}>
                    <div className="calculator-card-header">
                      <h3>{calc.name}</h3>
                      <p className="subtitle">{calc.title}</p>
                    </div>
                    <div className="calculator-card-body">
                      <p>{calc.subtitle}</p>
                      <span className="btn-select">Commencer →</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            
            {hasResults && (
              <div className="container">
                <GlobalSummary results={resultsList} />
              </div>
            )}
          </>
        ) : (
          <div className="calculator-view container">
            <button className="btn-back" onClick={handleBackToSelection}>
              <span>←</span> Retour à la sélection
            </button>
            <FrancophonieChecker onDataChange={handleFrancophonieChange} />
            {renderCalculator()}
            <GlobalSummary results={resultsList} />
          </div>
        )}
      </main>

      <footer className="app-footer">
        <div className="container">
          <p className="disclaimer">
            <strong>Avertissement Légal :</strong> Ce simulateur est fourni à titre indicatif.
            Les résultats ne constituent pas un conseil juridique ou fiscal.
            Consultez un expert-comptable ou un avocat fiscaliste pour valider votre éligibilité.
          </p>
          <p className="copyright">
            &copy; 2025 VAUDEY. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
