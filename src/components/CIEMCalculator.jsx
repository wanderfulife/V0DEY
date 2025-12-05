import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { calculateCIEM, formatCurrency, formatNumber } from '../utils/calculations';
import './components.css';

const CIEMCalculator = ({ francophonieData, onResult }) => {
  const [isPME, setIsPME] = useState('pme');
  const [contractDate, setContractDate] = useState('');
  const [physicalSales, setPhysicalSales] = useState('');
  const [totalStreams, setTotalStreams] = useState('');
  const [topTrackStreams, setTopTrackStreams] = useState('');
  const [expenses, setExpenses] = useState('');
  const [subsidies, setSubsidies] = useState('');
  const [isFrancophone, setIsFrancophone] = useState('fr');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Refs for animation
  const formRef = useRef(null);
  const calculateBtnRef = useRef(null);
  const taxBaseRef = useRef(null);
  const taxCreditRef = useRef(null);

  // Animate form elements when component mounts
  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(formRef.current.querySelectorAll('.form-group, .form-section-title, .card-title, .card-subtitle'),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out'
        }
      );
    }
  }, []);

  // Animate value counters when results are available
  useEffect(() => {
    if (result && !isLoading && result.eligible) {
      // Animate tax base
      if (taxBaseRef.current) {
        gsap.fromTo(taxBaseRef.current,
          { scale: 0.8, opacity: 0.5 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.2
          }
        );
      }

      // Animate final amount (tax credit)
      if (taxCreditRef.current) {
        gsap.fromTo(taxCreditRef.current,
          { scale: 0.8, opacity: 0.5 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            delay: 0.4
          }
        );
      }
    }
  }, [result, isLoading]);

  const handleCalculate = () => {
    // Set loading state
    setIsLoading(true);

    const data = {
      isPME: isPME === 'pme',
      contractDate,
      physicalSales: parseInt(physicalSales) || 0,
      totalStreams: parseInt(totalStreams) || 0,
      topTrackStreams: parseInt(topTrackStreams) || 0,
      expenses: parseFloat(expenses) || 0,
      subsidies: parseFloat(subsidies) || 0,
      isFrancophone: isFrancophone === 'fr',
      ...francophonieData
    };

    // Add button animation
    if (calculateBtnRef.current) {
      gsap.to(calculateBtnRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power1.inOut'
      });
    }

    // Simulate calculation delay for better UX
    setTimeout(() => {
      const calculationResult = calculateCIEM(data);
      setResult(calculationResult);
      if (onResult) onResult({ type: 'CIEM', ...calculationResult });
      setIsLoading(false);
    }, 500); // Simulate calculation time
  };

  // Micro-interactions for input fields
  const handleInputFocus = (e) => {
    gsap.to(e.target, {
      scale: 1.02,
      duration: 0.2,
      borderColor: 'var(--color-primary)',
      ease: 'power2.out'
    });
  };

  const handleInputBlur = (e) => {
    gsap.to(e.target, {
      scale: 1,
      duration: 0.2,
      borderColor: 'var(--color-border)',
      ease: 'power2.out'
    });
  };

  return (
    <section ref={formRef} className="calculator-form-card">
      <h2 className="card-title">Crédit d'Impôt Éditeurs Musicaux (CIEM)</h2>
      <p className="card-subtitle">Pour éditeurs de musique.</p>

      <div className="form-group">
        <select
          id="ciem-statut"
          value={isPME}
          onChange={(e) => setIsPME(e.target.value)}
          className="form-select"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        >
          <option value="pme">PME/TPE (Taux 30%)</option>
          <option value="grande">Grande Entreprise (Taux 15%)</option>
        </select>
      </div>

      <div className="form-group">
        <input
          type="date"
          id="ciem-date"
          value={contractDate}
          onChange={(e) => setContractDate(e.target.value)}
          placeholder=" "
          className="form-input"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        <label htmlFor="ciem-date" className="form-label">Date du contrat de préférence</label>
      </div>

      <h3 className="form-section-title">Succès Antérieur de l'Auteur</h3>
      <div className="form-grid">
        <div className="form-group">
          <input
            type="number"
            id="ciem-ventes"
            value={physicalSales}
            onChange={(e) => setPhysicalSales(e.target.value)}
            placeholder=" "
            className="form-input"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          <label htmlFor="ciem-ventes" className="form-label">Ventes d'œuvres précédentes</label>
        </div>
        <div className="form-group">
          <input
            type="number"
            id="ciem-streams-total"
            value={totalStreams}
            onChange={(e) => setTotalStreams(e.target.value)}
            placeholder=" "
            className="form-input"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          <label htmlFor="ciem-streams-total" className="form-label">Streams payants totaux</label>
        </div>
        <div className="form-group">
          <input
            type="number"
            id="ciem-streams-phare"
            value={topTrackStreams}
            onChange={(e) => setTopTrackStreams(e.target.value)}
            placeholder=" "
            className="form-input"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          <label htmlFor="ciem-streams-phare" className="form-label">Streams du titre phare</label>
        </div>
      </div>

      <h3 className="form-section-title">Finances</h3>
      <div className="form-grid">
        <div className="form-group">
          <input
            type="number"
            id="ciem-depenses"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
            placeholder=" "
            className="form-input"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          <label htmlFor="ciem-depenses" className="form-label">Dépenses totales (€)</label>
        </div>
        <div className="form-group">
          <input
            type="number"
            id="ciem-subventions"
            value={subsidies}
            onChange={(e) => setSubsidies(e.target.value)}
            placeholder=" "
            className="form-input"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          <label htmlFor="ciem-subventions" className="form-label">Subventions reçues (€)</label>
        </div>
      </div>

      <div className="form-group">
        <select
          id="ciem-langue"
          value={isFrancophone}
          onChange={(e) => setIsFrancophone(e.target.value)}
          className="form-select"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        >
          <option value="fr">Œuvre Francophone</option>
          <option value="autre">Œuvre Non-francophone</option>
        </select>
      </div>

      <button
        ref={calculateBtnRef}
        className="btn-calculate"
        onClick={handleCalculate}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="loading-spinner-small"></span> Calcul en cours...
          </>
        ) : (
          'Calculer le CIEM'
        )}
      </button>

      {isLoading && (
        <div className="loading-result">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <p>Analyse des données fiscales en cours...</p>
        </div>
      )}

      {result && !isLoading && (
        <div className={`result-box ${result.eligible ? 'success' : 'error'}`}>
          <h3>Résultat CIEM</h3>
          {!result.eligible ? (
            <p><strong>❌ Non Éligible:</strong> {result.reason}</p>
          ) : (
            <div>
              <p><strong>✓ Éligible</strong></p>
              <p>Assiette fiscale: <span ref={taxBaseRef} className="animated-value">{formatCurrency(result.taxBase)}</span></p>
              <p className="final-amount">Crédit d'impôt: <span ref={taxCreditRef} className="animated-amount">{formatCurrency(result.taxCredit)}</span></p>
              <div className="eligibility-meter">
                <div className="meter-bar">
                  <div className="meter-fill" style={{ width: '100%' }}></div>
                </div>
                <div className="meter-label">100% éligible</div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default CIEMCalculator;
