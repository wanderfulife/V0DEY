import { useState, useEffect } from 'react';
import FrancophonieChecker from './components/FrancophonieChecker';
import CIPPCalculator from './components/CIPPCalculator';
import CISVCalculator from './components/CISVCalculator';
import CIEMCalculator from './components/CIEMCalculator';
import GlobalSummary from './components/GlobalSummary';
import './App.css';

function App() {
  const [selectedCalculator, setSelectedCalculator] = useState(null);
  const [francophonieData, setFrancophonieData] = useState({
    albumsFR: '',
    albumsNonFR: '',
    isMicroEntreprise: false
  });
  const [results, setResults] = useState({ CIPP: null, CISV: null, CIEM: null });
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (selectedCalculator) {
      window.scrollTo(0, 0);
    }
  }, [selectedCalculator]);

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
      case 'CIPP': return <CIPPCalculator {...props} />;
      case 'CISV': return <CISVCalculator {...props} />;
      case 'CIEM': return <CIEMCalculator {...props} />;
      default: return null;
    }
  };

  const resultsList = Object.values(results);
  const hasResults = resultsList.some(r => r && r.eligible);

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
            <button className="btn-back" onClick={() => setSelectedCalculator(null)}>
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
