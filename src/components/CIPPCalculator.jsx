import { useState } from 'react';
import { calculateCIPP, formatCurrency, formatNumber } from '../utils/calculations';
import './components.css';

const CIPPCalculator = ({ francophonieData, onResult }) => {
  const [isPME, setIsPME] = useState('pme');
  const [physicalSales, setPhysicalSales] = useState('');
  const [totalStreams, setTotalStreams] = useState('');
  const [topTrackStreams, setTopTrackStreams] = useState('');
  const [productionExpenses, setProductionExpenses] = useState('');
  const [developmentExpenses, setDevelopmentExpenses] = useState('');
  const [subsidies, setSubsidies] = useState('');
  const [isFrancophone, setIsFrancophone] = useState('fr');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const data = {
      isPME: isPME === 'pme',
      physicalSales: parseInt(physicalSales) || 0,
      totalStreams: parseInt(totalStreams) || 0,
      topTrackStreams: parseInt(topTrackStreams) || 0,
      productionExpenses: parseFloat(productionExpenses) || 0,
      developmentExpenses: parseFloat(developmentExpenses) || 0,
      subsidies: parseFloat(subsidies) || 0,
      isFrancophone: isFrancophone === 'fr',
      ...francophonieData
    };
    const calculationResult = calculateCIPP(data);
    setResult(calculationResult);
    if (onResult) onResult({ type: 'CIPP', ...calculationResult });
  };

  return (
    <section className="calculator-form-card">
      <h2 className="card-title">Crédit d'Impôt Phonographique (CIPP)</h2>
      <p className="card-subtitle">Pour labels et producteurs de disques.</p>

      <div className="form-group">
        <select id="cipp-statut" value={isPME} onChange={(e) => setIsPME(e.target.value)} className="form-select">
          <option value="pme">PME/TPE (Taux 40%)</option>
          <option value="grande">Grande Entreprise (Taux 20%)</option>
        </select>
      </div>

      <h3 className="form-section-title">Historique de l'Artiste</h3>
      <div className="form-grid">
        <div className="form-group">
          <input type="number" id="cipp-ventes" value={physicalSales} onChange={(e) => setPhysicalSales(e.target.value)} placeholder=" " className="form-input" />
          <label htmlFor="cipp-ventes" className="form-label">Ventes d'albums précédents</label>
        </div>
        <div className="form-group">
          <input type="number" id="cipp-streams-total" value={totalStreams} onChange={(e) => setTotalStreams(e.target.value)} placeholder=" " className="form-input" />
          <label htmlFor="cipp-streams-total" className="form-label">Streams payants totaux</label>
        </div>
        <div className="form-group">
          <input type="number" id="cipp-streams-phare" value={topTrackStreams} onChange={(e) => setTopTrackStreams(e.target.value)} placeholder=" " className="form-input" />
          <label htmlFor="cipp-streams-phare" className="form-label">Streams du titre phare</label>
        </div>
      </div>

      <h3 className="form-section-title">Dépenses du Projet</h3>
      <div className="form-grid">
        <div className="form-group">
          <input type="number" id="cipp-prod" value={productionExpenses} onChange={(e) => setProductionExpenses(e.target.value)} placeholder=" " className="form-input" />
          <label htmlFor="cipp-prod" className="form-label">Dépenses de production (€)</label>
        </div>
        <div className="form-group">
          <input type="number" id="cipp-dev" value={developmentExpenses} onChange={(e) => setDevelopmentExpenses(e.target.value)} placeholder=" " className="form-input" />
          <label htmlFor="cipp-dev" className="form-label">Dépenses de développement (€)</label>
        </div>
        <div className="form-group">
          <input type="number" id="cipp-subventions" value={subsidies} onChange={(e) => setSubsidies(e.target.value)} placeholder=" " className="form-input" />
          <label htmlFor="cipp-subventions" className="form-label">Subventions reçues (€)</label>
        </div>
      </div>
      
      <div className="form-group">
        <select id="cipp-langue" value={isFrancophone} onChange={(e) => setIsFrancophone(e.target.value)} className="form-select">
          <option value="fr">Projet Francophone</option>
          <option value="autre">Projet Non-francophone</option>
        </select>
      </div>

      <button className="btn-calculate" onClick={handleCalculate}>Calculer le CIPP</button>

      {result && (
        <div className={`result-box ${result.eligible ? 'success' : 'error'}`}>
          <h3>Résultat CIPP</h3>
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

export default CIPPCalculator;
