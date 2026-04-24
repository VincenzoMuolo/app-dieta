import * as pdfjsLib from 'pdfjs-dist';

// Imposta il worker in modo corretto per Vite
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export const parseDietPDF = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  
  let fullText = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(item => item.str).join(' ');
    fullText += pageText + ' \n ';
  }

  return processText(fullText);
};

const processText = (text) => {
  // Puliamo il testo da spazi multipli
  text = text.replace(/ +/g, ' ');

  const daysOfWeek = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];
  const meals = ['Colazione', 'Spuntino Mattina', 'Pranzo', 'Spuntino Pomeriggio', 'Cena'];
  
  const dietPlan = {
    notes: '',
    days: {}
  };

  daysOfWeek.forEach(day => {
    dietPlan.days[day] = {};
  });

  // Extract NOTES
  const notesMatch = text.match(/NOTE\s+(.*)/is);
  if (notesMatch) {
    dietPlan.notes = notesMatch[1].trim();
  }

  let currentDay = null;
  let currentMeal = null;

  // Usa regex per cercare le giornate
  // La parola giorno di solito appare da sola o seguita da spazi
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if line contains a day (with accent normalizations if needed)
    // The PDF has "Luned ì", "Marted ì", etc. We need to handle this.
    const normalizedLine = line.replace(/Luned ì/i, 'Lunedì')
                               .replace(/Marted ì/i, 'Martedì')
                               .replace(/Mercoled ì/i, 'Mercoledì')
                               .replace(/Gioved ì/i, 'Giovedì')
                               .replace(/Venerd ì/i, 'Venerdì')
                               .replace(/Sabato/i, 'Sabato');

    const matchedDay = daysOfWeek.find(d => normalizedLine === d || normalizedLine.endsWith(d));
    if (matchedDay) {
      currentDay = matchedDay;
      currentMeal = null;
      continue;
    }

    if (normalizedLine.startsWith('NOTE')) {
      break; // Fermiamo il parsing dei cibi quando arriviamo alle note
    }

    if (currentDay) {
      // Check for meal
      const matchedMeal = meals.find(m => normalizedLine.startsWith(m));
      if (matchedMeal) {
        currentMeal = matchedMeal;
        dietPlan.days[currentDay][currentMeal] = [];
        continue;
      }

      if (currentMeal) {
        // Parse food item
        // Esempio: "Caffè espresso in tazza 1 tazzine pari a 30 g"
        // Esempio: "Pane integrale 1 fette pari a 50 g"
        const regex = /^(.*?)\s+([\d\.\/½¼¾]+)\s+(.*?)\s+pari a\s+(\d+)\s+g$/i;
        const match = normalizedLine.match(regex);
        
        if (match) {
          dietPlan.days[currentDay][currentMeal].push({
            name: match[1].trim(),
            quantityStr: match[2].trim(),
            unit: match[3].trim(),
            grams: parseInt(match[4].trim(), 10)
          });
        } else if (!normalizedLine.includes("pagina:") && !normalizedLine.includes(new Date().getFullYear().toString())) {
            // Gestione di linee spezzate (potrebbe capitare)
            // Non perfetto, ma per ora lo ignoriamo o proviamo ad accumulare
        }
      }
    }
  }

  // Domenica è libera, inseriamo un pasto fittizio
  dietPlan.days['Domenica'] = {
    'Giornata Libera': [{
      name: 'Pasto Libero',
      quantityStr: '1',
      unit: 'giornata',
      grams: 0
    }]
  };

  return dietPlan;
};
