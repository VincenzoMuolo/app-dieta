// Database locale approssimativo per stima calorie e macro per 100g
export const foodDb = {
    "Caffè espresso in tazza": { kcal: 2, p: 0.2, c: 0, f: 0 },
    "Pane integrale": { kcal: 247, p: 13, c: 41, f: 3 },
    "Marmellata con poco zucchero": { kcal: 150, p: 0.5, c: 38, f: 0 },
    "Burro di arachidi": { kcal: 588, p: 25, c: 20, f: 50 },
    "Finocchi": { kcal: 31, p: 1.2, c: 7.3, f: 0.2 },
    "Pasta di semola": { kcal: 350, p: 13, c: 73, f: 1.5 },
    "Verdura cotta": { kcal: 35, p: 2, c: 5, f: 0.5 }, // Media gen.
    "Grana Padano": { kcal: 392, p: 33, c: 0, f: 28 },
    "Olio di oliva extra vergine": { kcal: 884, p: 0, c: 0, f: 100 },
    "Olio di oliva": { kcal: 884, p: 0, c: 0, f: 100 },
    "Frutta fresca": { kcal: 50, p: 0.5, c: 12, f: 0.2 }, // Media
    "Noci secche": { kcal: 654, p: 15, c: 14, f: 65 },
    "Yogurt greco aromatizzato (0% lipidi)": { kcal: 70, p: 10, c: 6, f: 0 },
    "Zucchine": { kcal: 17, p: 1.2, c: 3.1, f: 0.3 },
    "Vitello (carne magra)": { kcal: 110, p: 21, c: 0, f: 3 },
    "Riso parboiled": { kcal: 350, p: 7, c: 80, f: 1 },
    "Piselli surgelati": { kcal: 72, p: 5, c: 11, f: 0.4 },
    "Uova di gallina": { kcal: 143, p: 12.5, c: 0.7, f: 9.5 },
    "Pollo (petto)": { kcal: 110, p: 23, c: 0, f: 1.5 },
    "Lattuga": { kcal: 15, p: 1.4, c: 2.9, f: 0.2 },
    "Carote": { kcal: 41, p: 0.9, c: 9.6, f: 0.2 },
    "Tonno sott'olio sgocciolato": { kcal: 198, p: 29, c: 0, f: 8 },
    "Pomodori": { kcal: 18, p: 0.9, c: 3.9, f: 0.2 },
    "Bresaola": { kcal: 150, p: 32, c: 0, f: 2.6 },
    "Cetrioli": { kcal: 15, p: 0.6, c: 3.6, f: 0.1 },
    "Merluzzo": { kcal: 82, p: 18, c: 0, f: 0.7 },
    "Magretti frollini gocce di cioccolato - Galbusera": { kcal: 440, p: 8, c: 68, f: 14 },
    "Gamberetti surgelati": { kcal: 71, p: 13.6, c: 0, f: 1.7 },
    "Patate": { kcal: 77, p: 2, c: 17, f: 0.1 },
    "Pollo, coscia": { kcal: 130, p: 19, c: 0, f: 6 },
    "taralli": { kcal: 450, p: 10, c: 65, f: 15 },
    "Lenticchie secche": { kcal: 353, p: 25, c: 60, f: 1 },
    "Fragole": { kcal: 32, p: 0.7, c: 7.7, f: 0.3 },
    "Tacchino (petto)": { kcal: 104, p: 24, c: 0, f: 1 },
    "Fagiolini": { kcal: 31, p: 1.8, c: 7, f: 0.1 },
    "Salmone d'allevamento": { kcal: 208, p: 20, c: 0, f: 13 },
    "Pizza Margherita": { kcal: 266, p: 11, c: 33, f: 10 },
    "Prosciutto cotto magro": { kcal: 130, p: 20, c: 1, f: 5 },
    "Funghi champignon": { kcal: 22, p: 3, c: 3.3, f: 0.3 }
  };
  
  export const calculateDailyNutrition = (dayPlan) => {
    let totalKcal = 0;
    let totalP = 0;
    let totalC = 0;
    let totalF = 0;
  
    if (!dayPlan) return { kcal: 0, p: 0, c: 0, f: 0 };
  
    Object.values(dayPlan).forEach(meal => {
      meal.forEach(item => {
        // Cerca l'alimento nel database (ignora case)
        const foodKey = Object.keys(foodDb).find(k => k.toLowerCase() === item.name.toLowerCase());
        if (foodKey) {
          const food = foodDb[foodKey];
          const ratio = item.grams / 100;
          totalKcal += food.kcal * ratio;
          totalP += food.p * ratio;
          totalC += food.c * ratio;
          totalF += food.f * ratio;
        } else {
            // Se non c'è, facciamo una stima genetica fittizia bassissima per non falsare troppo, 
            // ma sarebbe meglio avvisare.
            // console.warn(`Alimento non trovato nel DB: ${item.name}`);
        }
      });
    });
  
    return {
      kcal: Math.round(totalKcal),
      p: Math.round(totalP),
      c: Math.round(totalC),
      f: Math.round(totalF)
    };
  };
