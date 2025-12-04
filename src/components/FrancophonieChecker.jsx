import { useState } from 'react';
import './components.css';

const FrancophonieChecker = ({ onDataChange }) => {
  const [albumsFR, setAlbumsFR] = useState('');
  const [albumsNonFR, setAlbumsNonFR] = useState('');
  const [isMicroEntreprise, setIsMicroEntreprise] = useState(false);

  const handleChange = (newData) => {
    const data = {
      albumsFR: newData.albumsFR !== undefined ? newData.albumsFR : albumsFR,
      albumsNonFR: newData.albumsNonFR !== undefined ? newData.albumsNonFR : albumsNonFR,
      isMicroEntreprise: newData.isMicroEntreprise !== undefined ? newData.isMicroEntreprise : isMicroEntreprise
    };
    if (onDataChange) onDataChange(data);
  };

  const albumsFRNum = parseInt(albumsFR) || 0;
  const albumsNonFRNum = parseInt(albumsNonFR) || 0;
  const totalProduction = albumsFRNum + albumsNonFRNum;
  const francophonieRatio = totalProduction > 0 ? (albumsFRNum / totalProduction) * 100 : 0;
  const meetsRequirement = francophonieRatio >= 50 || isMicroEntreprise;

  return (
    <section className="franco-card">
      <h2 className="card-title">🇫🇷 Obligation de Francophonie</h2>
      <p className="card-subtitle">
        Cette condition s'applique à l'ensemble de votre production annuelle.
      </p>

      <div className="form-grid">
        <div className="form-group">
          <input
            type="number"
            id="albumsFR"
            value={albumsFR}
            onChange={(e) => {
              setAlbumsFR(e.target.value);
              handleChange({ albumsFR: e.target.value });
            }}
            placeholder=" "
            className="form-input"
          />
          <label htmlFor="albumsFR" className="form-label">Albums francophones</label>
        </div>

        <div className="form-group">
          <input
            type="number"
            id="albumsNonFR"
            value={albumsNonFR}
            onChange={(e) => {
              setAlbumsNonFR(e.target.value);
              handleChange({ albumsNonFR: e.target.value });
            }}
            placeholder=" "
            className="form-input"
          />
          <label htmlFor="albumsNonFR" className="form-label">Albums non-francophones</label>
        </div>
      </div>

      <div className="checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={isMicroEntreprise}
            onChange={(e) => {
              setIsMicroEntreprise(e.target.checked);
              handleChange({ isMicroEntreprise: e.target.checked });
            }}
          />
          <span>Je suis une micro-entreprise (exemption du ratio)</span>
        </label>
      </div>

      {totalProduction > 0 && (
        <div className={`result-box ${meetsRequirement ? 'success' : 'warning'}`}>
          <h3>Statut Francophonie</h3>
          <p>
            <strong>Ratio francophone :</strong> {francophonieRatio.toFixed(1)}%
            {meetsRequirement ? ' (✓ Obligation respectée)' : ' (✗ Obligation non respectée)'}
          </p>
        </div>
      )}
    </section>
  );
};

export default FrancophonieChecker;
