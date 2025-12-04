import { formatCurrency } from '../utils/calculations';
import './components.css';

const GlobalSummary = ({ results }) => {
  const eligibleResults = results.filter(r => r && r.eligible);
  const totalTaxCredit = eligibleResults.reduce((sum, r) => sum + (r.taxCredit || 0), 0);

  if (results.length === 0 || results.every(r => !r)) {
    return null;
  }

  return (
    <section className="summary-card">
      <h2 className="card-title">Récapitulatif Global</h2>
      
      {eligibleResults.length === 0 ? (
        <p>Aucun crédit d'impôt éligible pour le moment.</p>
      ) : (
        <>
          {results.map((result, index) => {
            if (!result || !result.eligible) return null;
            return (
              <div key={index} className="summary-item">
                <span className="credit-type">{result.type}</span>
                <span className="credit-amount">{formatCurrency(result.taxCredit)}</span>
              </div>
            );
          })}
          <div className="summary-total">
            <span className="total-label">Total Estimé</span>
            <span className="total-amount">{formatCurrency(totalTaxCredit)}</span>
          </div>
        </>
      )}
    </section>
  );
};

export default GlobalSummary;
