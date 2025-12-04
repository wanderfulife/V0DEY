import { useState } from 'react';
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

  const handleCalculate = () => {
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
    const calculationResult = calculateCIEM(data);
    setResult(calculationResult);
    if (onResult) onResult({ type: 'CIEM', ...calculationResult });
  };

  return (
    <section className="calculator-form-card">
      <h2 className="card-title">Crédit d'Impôt Éditeurs Musicaux (CIEM)</h2>
      <p className="card-subtitle">Pour éditeurs de musique.</p>

      <div className="form-group">
        <select id="ciem-statut" value={isPME} onChange={(e) => setIsPME(e.target.value)} className="form-select">
          <option value="pme">PME/TPE (Taux 30%)</option>
          <option value="grande">Grande Entreprise (Taux 15%)</option>
        </select>
      </div>
      
      <div className="form-group">
        <input type="date" id="ciem-date" value={contractDate} onChange={(e) => setContractDate(e.target.value)} placeholder=" " className="form-input" />
        <label htmlFor="ciem-date" className="form-label">Date du contrat de préférence</label>
      </div>

      <h3 className="form-section-title">Succès Antérieur de l'Auteur</h3>
      <div className="form-grid">
        <div className="form-group">
          <input type="number" id="ciem-ventes" value={physicalSales} onChange={(e) => setPhysicalSales(e.target.value)} placeholder=" " className="form-input" />
          <label htmlFor="ciem-ventes" className="form-label">Ventes d'œuvres précédentes</label>
        </div>
        <div className="form-group">
          <input type="number" id="ciem-streams-total" value={totalStreams} onChange={(e) => setTotalStreams(e.target.value)} placeholder=" " className="form-input" />
          <label htmlFor="ciem-streams-total" className="form-label">Streams payants totaux</label>
        </div>
        <div className="form-group">
          <input type="number" id="ciem-streams-phare" value={topTrackStreams} onChange={(e) => setTopTrackStreams(e.target.value)} placeholder=" " className="form-input" />
          <label htmlFor="ciem-streams-phare" className="form-label">Streams du titre phare</label>
        </div>
      </div>

      <h3 className="form-section-title">Finances</h3>
      <div className="form-grid">
        <div className="form-group">
          <input type="number" id="ciem-depenses" value={expenses} onChange={(e) => setExpenses(e.target.value)} placeholder=" " className="form-input" />
          <label htmlFor="ciem-depenses" className="form-label">Dépenses totales (€)</label>
        </div>
        <div className="form-group">
          <input type="number" id="ciem-subventions" value={subsidies} onChange={(e) => setSubsidies(e.target.value)} placeholder=" " className="form-input" />
          <label htmlFor="ciem-subventions" className="form-label">Subventions reçues (€)</label>
        </div>
      </div>

      <div className="form-group">
        <select id="ciem-langue" value={isFrancophone} onChange={(e) => setIsFrancophone(e.target.value)} className="form-select">
          <option value="fr">Œuvre Francophone</option>
          <option value="autre">Œuvre Non-francophone</option>
        </select>
      </div>

      <button className="btn-calculate" onClick={handleCalculate}>Calculer le CIEM</button>

      {result && (
        <div className={`result-box ${result.eligible ? 'success' : 'error'}`}>
          <h3>Résultat CIEM</h3>
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

export default CIEMCalculator;
