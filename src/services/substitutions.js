// Configura qui le regole per le sostituzioni degli alimenti
// 'keywords' = le parole chiave da cercare nel nome dell'alimento originale
// 'alternatives' = le opzioni di scambio. 'multiplier' moltiplica i grammi originali per calcolare quelli nuovi.

export const substitutionRules = [];

export const getSubstitutionsFor = (foodName, grams) => {
  if (!grams || grams <= 0) return null;
  const lowerName = foodName.toLowerCase();
  
  for (const rule of substitutionRules) {
    if (rule.keywords.some(kw => lowerName.includes(kw))) {
      return rule.alternatives.map(alt => ({
        name: alt.name,
        grams: alt.multiplier > 0 ? Math.round(grams * alt.multiplier) : 0,
        customLabel: alt.customLabel
      }));
    }
  }
  return null;
};
