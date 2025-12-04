/**
 * Calculation utilities for French music industry tax credits
 * All calculations based on official French tax regulations
 */

/**
 * Calculate equivalent sales from streaming data
 * Formula: Physical sales + [(Total Streams - (Top Track Streams / 2)) / 1500]
 */
export const calculateEquivalentSales = (physicalSales, totalStreams, topTrackStreams) => {
  const adjustedStreams = totalStreams - (topTrackStreams / 2);
  const streamEquivalent = adjustedStreams / 1500;
  return physicalSales + streamEquivalent;
};

/**
 * Check if artist/author qualifies as "Nouveau Talent"
 * Must have < 100,000 equivalent sales across 2 distinct albums
 */
export const isNewTalent = (physicalSales, totalStreams, topTrackStreams) => {
  const equivalentSales = calculateEquivalentSales(physicalSales, totalStreams, topTrackStreams);
  return equivalentSales < 100000;
};

/**
 * Get tax rate based on company status
 */
export const getTaxRate = (isPME, creditType) => {
  switch(creditType) {
    case 'CIPP':
      return isPME ? 0.40 : 0.20;
    case 'CISV':
      return isPME ? 0.30 : 0.15;
    case 'CIEM':
      return isPME ? 0.30 : 0.15;
    default:
      return 0;
  }
};

/**
 * CIPP (Phonographic) Tax Credit Calculation
 */
export const calculateCIPP = (data) => {
  const {
    isPME,
    physicalSales,
    totalStreams,
    topTrackStreams,
    productionExpenses,
    developmentExpenses,
    subsidies,
    isFrancophone,
    albumsFR,
    albumsNonFR,
    isMicroEntreprise
  } = data;

  // Check eligibility: New Talent
  const newTalent = isNewTalent(physicalSales, totalStreams, topTrackStreams);

  if (!newTalent) {
    return {
      eligible: false,
      reason: "L'artiste ne qualifie pas comme 'Nouveau Talent' (≥100 000 équivalent-ventes)",
      equivalentSales: calculateEquivalentSales(physicalSales, totalStreams, topTrackStreams),
      taxCredit: 0
    };
  }

  // Check Francophonie requirement
  const francophonieOK = checkFrancophonieRequirement(
    isFrancophone,
    albumsFR,
    albumsNonFR,
    isMicroEntreprise
  );

  if (!francophonieOK) {
    return {
      eligible: false,
      reason: "L'obligation de francophonie n'est pas respectée (< 50% de production francophone)",
      equivalentSales: calculateEquivalentSales(physicalSales, totalStreams, topTrackStreams),
      taxCredit: 0
    };
  }

  // Calculate tax base
  const cappedDevelopment = Math.min(developmentExpenses, 700000); // Cap at 700k per album
  const taxBase = Math.max(0, (productionExpenses + cappedDevelopment) - subsidies);

  // Calculate credit
  const rate = getTaxRate(isPME, 'CIPP');
  let taxCredit = taxBase * rate;

  // Apply annual cap: 1.5M€ per company per year
  taxCredit = Math.min(taxCredit, 1500000);

  return {
    eligible: true,
    equivalentSales: calculateEquivalentSales(physicalSales, totalStreams, topTrackStreams),
    taxBase,
    rate,
    taxCredit: Math.round(taxCredit * 100) / 100,
    cappedDevelopment
  };
};

/**
 * CISV (Live Performance) Tax Credit Calculation
 */
export const calculateCISV = (data) => {
  const {
    isPME,
    numberOfDates,
    numberOfVenues,
    averageCapacity,
    performanceType, // 'actuelle' or 'symphonique'
    expenses,
    subsidies,
    isFrancophone,
    albumsFR,
    albumsNonFR,
    isMicroEntreprise
  } = data;

  // Check structural eligibility
  if (numberOfDates < 4) {
    return {
      eligible: false,
      reason: "Nombre de dates insuffisant (minimum 4 dates requises)",
      taxCredit: 0
    };
  }

  if (numberOfVenues < 3) {
    return {
      eligible: false,
      reason: "Nombre de lieux insuffisant (minimum 3 lieux différents requis)",
      taxCredit: 0
    };
  }

  // Check capacity eligibility
  const maxCapacity = performanceType === 'symphonique' ? 2500 : 2100;
  if (averageCapacity > maxCapacity) {
    return {
      eligible: false,
      reason: `Jauge moyenne trop élevée (maximum ${maxCapacity} places pour ${performanceType === 'symphonique' ? 'musique symphonique' : 'musique actuelle'})`,
      taxCredit: 0
    };
  }

  // Check Francophonie requirement
  const francophonieOK = checkFrancophonieRequirement(
    isFrancophone,
    albumsFR,
    albumsNonFR,
    isMicroEntreprise
  );

  if (!francophonieOK) {
    return {
      eligible: false,
      reason: "L'obligation de francophonie n'est pas respectée (< 50% de production francophone)",
      taxCredit: 0
    };
  }

  // Calculate tax base
  const cappedExpenses = Math.min(expenses, 500000); // Cap at 500k per show
  const taxBase = Math.max(0, cappedExpenses - subsidies);

  // Calculate credit
  const rate = getTaxRate(isPME, 'CISV');
  let taxCredit = taxBase * rate;

  // Apply annual cap: 750k€ per company per year
  taxCredit = Math.min(taxCredit, 750000);

  return {
    eligible: true,
    taxBase,
    rate,
    taxCredit: Math.round(taxCredit * 100) / 100,
    cappedExpenses
  };
};

/**
 * CIEM (Music Publishing) Tax Credit Calculation
 */
export const calculateCIEM = (data) => {
  const {
    isPME,
    contractDate,
    physicalSales,
    totalStreams,
    topTrackStreams,
    expenses,
    subsidies,
    isFrancophone,
    albumsFR,
    albumsNonFR,
    isMicroEntreprise
  } = data;

  // Check contract date eligibility (must be after 2022-01-01)
  const minDate = new Date('2022-01-01');
  const contractDateObj = new Date(contractDate);

  if (contractDateObj < minDate) {
    return {
      eligible: false,
      reason: "Le contrat de préférence doit être signé après le 01/01/2022",
      taxCredit: 0
    };
  }

  // Check if author is a new talent
  const newTalent = isNewTalent(physicalSales, totalStreams, topTrackStreams);

  if (!newTalent) {
    return {
      eligible: false,
      reason: "L'auteur ne qualifie pas comme 'Nouveau Talent' (≥100 000 équivalent-ventes)",
      equivalentSales: calculateEquivalentSales(physicalSales, totalStreams, topTrackStreams),
      taxCredit: 0
    };
  }

  // Check Francophonie requirement
  const francophonieOK = checkFrancophonieRequirement(
    isFrancophone,
    albumsFR,
    albumsNonFR,
    isMicroEntreprise
  );

  if (!francophonieOK) {
    return {
      eligible: false,
      reason: "L'obligation de francophonie n'est pas respectée (< 50% de production francophone)",
      equivalentSales: calculateEquivalentSales(physicalSales, totalStreams, topTrackStreams),
      taxCredit: 0
    };
  }

  // Calculate tax base
  const cappedExpenses = Math.min(expenses, 300000); // Cap at 300k per contract
  const taxBase = Math.max(0, cappedExpenses - subsidies);

  // Calculate credit
  const rate = getTaxRate(isPME, 'CIEM');
  let taxCredit = taxBase * rate;

  // Apply annual cap: 500k€ per company per year
  taxCredit = Math.min(taxCredit, 500000);

  return {
    eligible: true,
    equivalentSales: calculateEquivalentSales(physicalSales, totalStreams, topTrackStreams),
    taxBase,
    rate,
    taxCredit: Math.round(taxCredit * 100) / 100,
    cappedExpenses
  };
};

/**
 * Check Francophonie requirement
 * If project is non-Francophone, check if company meets 50% Francophone production
 * Exception: Micro-entreprises get 1-for-1 exemption
 */
export const checkFrancophonieRequirement = (
  isFrancophone,
  albumsFR,
  albumsNonFR,
  isMicroEntreprise
) => {
  // If this project is Francophone, it's automatically OK
  if (isFrancophone) {
    return true;
  }

  // If micro-entreprise, exemption applies (1-for-1)
  if (isMicroEntreprise) {
    return true;
  }

  // Otherwise, check if overall production meets 50% requirement
  const totalProduction = albumsFR + albumsNonFR;

  // If no production data provided, we can't validate
  if (totalProduction === 0) {
    return false;
  }

  const francophonieRatio = albumsFR / totalProduction;
  return francophonieRatio >= 0.5;
};

/**
 * Format currency for display
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * Format number with thousand separators
 */
export const formatNumber = (number) => {
  return new Intl.NumberFormat('fr-FR').format(number);
};
