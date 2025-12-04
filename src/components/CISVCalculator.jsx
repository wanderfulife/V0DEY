import { useState } from 'react';
import { calculateCISV, formatCurrency } from '../utils/calculations';
import './components.css';

const CISVCalculator = ({ francophonieData, onResult }) => {
  const [isPME, setIsPME] = useState('pme');
  const [numberOfDates, setNumberOfDates] = useState('');
  const [numberOfVenues, setNumberOfVenues] = useState('');
  const [averageCapacity, setAverageCapacity] = useState('');
  const [performanceType, setPerformanceType] = useState('actuelle');
  const [expenses, setExpenses] = useState('');
  const [subsidies, setSubsidies] = useState('');
  const [isFrancophone, setIsFrancophone] = useState('fr');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const data = {
      isPME: isPME === 'pme',
      numberOfDates: parseInt(numberOfDates) || 0,
      numberOfVenues: parseInt(numberOfVenues) || 0,
      averageCapacity: parseInt(averageCapacity) || 0,
      performanceType,
      expenses: parseFloat(expenses) || 0,
      subsidies: parseFloat(subsidies) || 0,
      isFrancophone: isFrancophone === 'fr',
      ...francophonieData
    };
    const calculationResult = calculateCISV(data);
    setResult(calculationResult);
    if (onResult) onResult({ type: 'CISV', ...calculationResult });
  };

  return (
    <section className="calculator-form-card">
      <h2 className="card-title">Crédit d'Impôt Spectacle Vivant (CISV)</h2>
      <p className="card-subtitle">Pour tourneurs et producteurs de spectacles.</p>

      <div className="form-group">
        <select id="cisv-statut" value={isPME} onChange={(e) => setIsPME(e.target.value)} className="form-select">
          <option value="pme">PME/TPE (Taux 30%)</option>
          <option value="grande">Grande Entreprise (Taux 15%)</option>
        </select>
      </div>

      <h3 className="form-section-title">Configuration de la Tournée</h3>
      <div className="form-grid">
        <div className="form-group">
          <input type="number" id="cisv-dates" value={numberOfDates} onChange={(e) => setNumberOfDates(e.target.value)} placeholder=" " className="form-input" />
          <label htmlFor="cisv-dates" className="form-label">Nombre de dates</label>
        </div>
        <div className="form-group">
          <input type="number" id="cisv-lieux" value={numberOfVenues} onChange={(e) => setNumberOfVenues(e.target.value)} placeholder=" " className="form-input" />
          <label htmlFor="cisv-lieux" className="form-label">Nombre de lieux</label>
        </div>
        <div className="form-group">
          <input type="number" id="cisv-jauge" value={averageCapacity} onChange={(e) => setAverageCapacity(e.target.value)} placeholder=" " className="form-input" />
          <label htmlFor="cisv-jauge" className="form-label">Jauge moyenne</label>
        </div>
      </div>

      <h3 className="form-section-title">Budget</h3>
      <div className="form-grid">
        <div className="form-group">
          <input type="number" id="cisv-depenses" value={expenses} onChange={(e) => setExpenses(e.target.value)} placeholder=" " className="form-input" />
          <label htmlFor="cisv-depenses" className="form-label">Dépenses totales (€)</label>
        </div>
        <div className="form-group">
          <input type="number" id="cisv-subventions" value={subsidies} onChange={(e) => setSubsidies(e.target.value)} placeholder=" " className="form-input" />
          <label htmlFor="cisv-subventions" className="form-label">Subventions reçues (€)</label>
        </div>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <select id="cisv-type" value={performanceType} onChange={(e) => setPerformanceType(e.target.value)} className="form-select">
            <option value="actuelle">Musique actuelle</option>
            <option value="symphonique">Musique symphonique</option>
          </select>
        </div>
        <div className="form-group">
          <select id="cisv-langue" value={isFrancophone} onChange={(e) => setIsFrancophone(e.target.value)} className="form-select">
            <option value="fr">Spectacle Francophone</option>
            <option value="autre">Spectacle Non-francophone</option>
          </select>
        </div>
      </div>

      <button className="btn-calculate" onClick={handleCalculate}>Calculer le CISV</button>

      {result && (
        <div className={`result-box ${result.eligible ? 'success' : 'error'}`}>
          <h3>Résultat CISV</h3>
          {!result.eligible ? (
            <p><strong>❌ Non Éligible:</strong> {result.reason}</p>
          ) : (
            <div>
              <p><strong>✓ Éligible</strong></p>
              <p>Assiette fiscale: {formatCurrency(result.taxBase)}</p>
              <p className="final-amount">{formatCurrency(result.taxCredit)}</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default CISVCalculator;
