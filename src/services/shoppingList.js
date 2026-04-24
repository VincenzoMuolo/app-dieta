// Categorie per gli alimenti
const foodCategories = {
    "Caffè espresso in tazza": "Colazione & Snack",
    "Pane integrale": "Carboidrati",
    "Marmellata con poco zucchero": "Colazione & Snack",
    "Burro di arachidi": "Colazione & Snack",
    "Finocchi": "Verdura",
    "Pasta di semola": "Carboidrati",
    "Verdura cotta": "Verdura",
    "Grana Padano": "Latticini & Grassi",
    "Olio di oliva extra vergine": "Condimenti",
    "Olio di oliva": "Condimenti",
    "Frutta fresca": "Frutta",
    "Noci secche": "Frutta Secca",
    "Yogurt greco aromatizzato (0% lipidi)": "Colazione & Snack",
    "Zucchine": "Verdura",
    "Vitello (carne magra)": "Carne",
    "Riso parboiled": "Carboidrati",
    "Piselli surgelati": "Verdura",
    "Uova di gallina": "Altro",
    "Pollo (petto)": "Carne",
    "Lattuga": "Verdura",
    "Carote": "Verdura",
    "Tonno sott'olio sgocciolato": "Pesce",
    "Pomodori": "Verdura",
    "Bresaola": "Carne",
    "Cetrioli": "Verdura",
    "Merluzzo": "Pesce",
    "Magretti frollini gocce di cioccolato - Galbusera": "Colazione & Snack",
    "Gamberetti surgelati": "Pesce",
    "Patate": "Carboidrati",
    "Pollo, coscia": "Carne",
    "taralli": "Colazione & Snack",
    "Lenticchie secche": "Legumi",
    "Fragole": "Frutta",
    "Tacchino (petto)": "Carne",
    "Fagiolini": "Verdura",
    "Salmone d'allevamento": "Pesce",
    "Pizza Margherita": "Altro",
    "Prosciutto cotto magro": "Carne",
    "Funghi champignon": "Verdura"
  };
  
  export const generateShoppingList = (dietPlan, selectedDays) => {
    const list = {};
  
    if (!dietPlan || !dietPlan.days) return [];
  
    selectedDays.forEach(day => {
      const dayPlan = dietPlan.days[day];
      if (dayPlan) {
        Object.values(dayPlan).forEach(meal => {
          meal.forEach(item => {
            if (item.grams > 0) {
              const originalName = item.name.trim();
              const normalizedKey = originalName.toLowerCase();
              
              if (!list[normalizedKey]) {
                // Troviamo la categoria cercando nel dizionario, fallback su "Altro"
                const category = foodCategories[originalName] || "Altro";
                
                list[normalizedKey] = {
                  name: originalName,
                  grams: 0,
                  unit: item.unit,
                  category: category
                };
              }
              list[normalizedKey].grams += item.grams;
            }
          });
        });
      }
    });
  
    return Object.values(list).sort((a, b) => a.name.localeCompare(b.name));
  };
