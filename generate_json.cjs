const fs = require('fs');

const rawText = `Lunedì
Colazione Quantità
Caffè espresso in tazza 1 tazzine pari a 30 g
Pane integrale 1 fette pari a 50 g
Marmellata con poco zucchero 2 cucchiaini pari a 20 g
Burro di arachidi 2 cucchiaini pari a 10 g

Pranzo Quantità
Finocchi ½ porzioni pari a 50 g
Pasta di semola 1 porzioni pari a 80 g
Verdura cotta 1 porzioni pari a 100 g
Grana Padano 2 cucchiai pari a 20 g
Olio di oliva extra vergine 4 cucchiaini pari a 20 g
Frutta fresca 1 porzioni pari a 150 g

Spuntino Pomeriggio Quantità
Frutta fresca 1 porzioni pari a 150 g
Noci secche 1 ¼ pezzi pari a 20 g
Yogurt greco aromatizzato (0% lipidi) ¾ vasetti pari a 150 g

Cena Quantità
Pane integrale 1 ½ fette pari a 80 g
Zucchine 1 porzioni pari a 200 g
Vitello (carne magra) 1 ¾ porzioni pari a 180 g
Olio di oliva extra vergine 4 cucchiaini pari a 20 g

Martedì
Colazione Quantità
Caffè espresso in tazza 1 tazzine pari a 30 g
Pane integrale 1 fette pari a 50 g
Marmellata con poco zucchero 2 cucchiaini pari a 20 g
Burro di arachidi 2 cucchiaini pari a 10 g

Pranzo Quantità
Finocchi ½ porzioni pari a 50 g
Riso parboiled ¾ porzioni pari a 80 g
Piselli surgelati 1 porzioni pari a 150 g
Uova di gallina 1 pezzi pari a 50 g
Olio di oliva extra vergine 4 cucchiaini pari a 20 g
Frutta fresca 1 porzioni pari a 150 g

Spuntino Pomeriggio Quantità
Noci secche 2 pezzi pari a 30 g
Frutta fresca 1 porzioni pari a 150 g
Yogurt greco aromatizzato (0% lipidi) ¾ vasetti pari a 150 g

Cena Quantità
Finocchi 1 porzioni pari a 100 g
Pane integrale 1 ½ fette pari a 80 g
Pollo (petto) 1 ¾ porzioni pari a 180 g
Lattuga 10 foglie pari a 100 g
Olio di oliva extra vergine 4 cucchiaini pari a 20 g

Mercoledì
Colazione Quantità
Caffè espresso in tazza 1 tazzine pari a 30 g
Pane integrale 1 fette pari a 50 g
Marmellata con poco zucchero 2 cucchiaini pari a 20 g
Burro di arachidi 2 cucchiaini pari a 10 g

Spuntino Mattina Quantità
Frutta fresca 1 porzioni pari a 150 g

Pranzo Quantità
Carote 4 pezzi pari a 200 g
Pasta di semola 1 porzioni pari a 80 g
Tonno sott'olio sgocciolato 1 ½ porzioni pari a 75 g
Pomodori 1 porzioni pari a 100 g
Olio di oliva extra vergine 4 cucchiaini pari a 20 g
Frutta fresca 1 porzioni pari a 150 g

Spuntino Pomeriggio Quantità
Pane integrale 1 fette pari a 50 g
Bresaola 5 fette pari a 50 g

Cena Quantità
Cetrioli 1 porzioni pari a 100 g
Pane integrale 1 ½ fette pari a 80 g
Merluzzo 1 ¼ porzioni pari a 200 g
Lattuga 10 foglie pari a 100 g
Olio di oliva extra vergine 4 cucchiaini pari a 20 g

Giovedì
Colazione Quantità
Caffè espresso in tazza 1 tazzine pari a 30 g
Yogurt greco aromatizzato (0% lipidi) 1 vasetti pari a 170 g
Magretti frollini gocce di cioccolato - Galbusera 4 biscotti pari a 22 g

Spuntino Mattina Quantità
Frutta fresca 1 porzioni pari a 150 g

Pranzo Quantità
Riso parboiled ¾ porzioni pari a 80 g
Gamberetti surgelati 1 porzioni pari a 150 g
Zucchine 1 porzioni pari a 200 g
Olio di oliva extra vergine 4 cucchiaini pari a 20 g
Frutta fresca 1 porzioni pari a 150 g

Spuntino Pomeriggio Quantità
Frutta fresca 1 porzioni pari a 150 g
Noci secche 1 ¼ pezzi pari a 20 g

Cena Quantità
Cetrioli 1 porzioni pari a 100 g
Pane integrale 1 fette pari a 50 g
Patate 2 ¾ porzioni pari a 280 g
Pollo, coscia 1 ¼ porzioni pari a 150 g
Olio di oliva extra vergine 4 cucchiaini pari a 20 g

Venerdì
Colazione Quantità
Caffè espresso in tazza 1 tazzine pari a 30 g
taralli 1 bustina pari a 40 g
Noci secche 2 pezzi pari a 30 g

Pranzo Quantità
Cetrioli 1 porzioni pari a 100 g
Pasta di semola ¾ porzioni pari a 60 g
Lenticchie secche 1 ½ porzioni pari a 80 g
Olio di oliva extra vergine 4 cucchiaini pari a 20 g
Fragole ½ porzioni pari a 100 g

Spuntino Pomeriggio Quantità
Frutta fresca 1 porzioni pari a 150 g

Cena Quantità
Carote 4 pezzi pari a 200 g
Pane integrale 1 ½ fette pari a 80 g
Tacchino (petto) 1 ½ porzioni pari a 150 g
Fagiolini 1 porzioni pari a 150 g
Olio di oliva extra vergine 4 cucchiaini pari a 20 g

Sabato
Colazione Quantità
Caffè espresso in tazza 1 tazzine pari a 30 g
Yogurt greco aromatizzato (0% lipidi) ¾ vasetti pari a 150 g
Magretti frollini gocce di cioccolato - Galbusera 4 biscotti pari a 22 g

Pranzo Quantità
Finocchi ½ porzioni pari a 50 g
Pane integrale 1 ½ fette pari a 80 g
Lattuga 20 foglie pari a 200 g
Salmone d'allevamento 1 porzioni pari a 150 g
Olio di oliva 4 cucchiaini pari a 20 g

Spuntino Pomeriggio Quantità
Frutta fresca 1 porzioni pari a 150 g

Cena Quantità
Pizza Margherita 1 pezzi pari a 350 g
Prosciutto cotto magro 5 fette pari a 50 g
Funghi champignon 1 porzioni pari a 100 g`;

const notesRaw = [
  "In una giornata alimentare tutti gli alimenti scritti vanno mangiati non sono scelte se allo spuntino, ci sono 2 alimenti vanno mangiati entrambi.",
  "Frutta e verdura non vanno pesate anche se troverai le grammature.",
  "I frutti più grandi, ne mangerai uno: una mela, una pera, una banana, una pesca, un percoco, un’arancia. Se le pesche sono medie 2, 2 kiwi, 2 clementine, 3-4 albicocche, 3-4 nespole, un pugnetto di fragole, uno di ciliegie, 200 g di anguria.",
  "Importante è che tu pesi pasta, pane, pesce, carne formaggi e salumi e presta attenzione all’olio.",
  "La verdura la puoi scambiare liberamente (es se c’è scritto lattuga potrai mangiare gli spinaci o le zucchine).",
  "I legumi secchi, fave, ceci, fagioli e lenticchie li potrai scambiare fra loro nella stessa grammatura. Ricorda che i legumi in cottura triplicano il peso (es. 80 g secchi = 240g cotti) i piselli 150 g surgelati.",
  "Per condire le pietanze oltre all’olio segnato puoi usare aceto, limone e spezie.",
  "Il caffè puoi berne più di 1 al giorno meglio se amaro.",
  "Potrai scambiare fra loro con la stessa grammatura pasta, pane, riso o altro cereale.",
  "E’ possibile scambiare fra loro anche pranzi e cene della stessa giornata o lo spuntino mattina pomeriggio.",
  "E’ possibile anche scambiare le intere giornate Lunedi con Venerdi e viceversa.",
  "La domenica potrai mangiare quello che vuoi prestando attenzione alle quantità.",
  "Mi raccomando fattori importante e non trascurabile è l’idratazione bevi almeno un litro e mezzo di acqua al giorno."
];

const dietPlan = {
  notes: notesRaw,
  days: {}
};

const daysOfWeek = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
let currentDay = null;
let currentMeal = null;

const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

lines.forEach(line => {
  if (daysOfWeek.includes(line)) {
    currentDay = line;
    dietPlan.days[currentDay] = {};
    return;
  }
  
  if (line.includes('Quantità')) {
    currentMeal = line.replace(' Quantità', '');
    dietPlan.days[currentDay][currentMeal] = [];
    return;
  }
  
  if (currentDay && currentMeal) {
    const match = line.match(/^(.*?)\s+([\d\.\/½¼¾]+)\s+(.*?)\s+pari a\s+(\d+)\s+g$/i);
    if (match) {
      dietPlan.days[currentDay][currentMeal].push({
        name: match[1].trim(),
        quantityStr: match[2].trim(),
        unit: match[3].trim(),
        grams: parseInt(match[4].trim(), 10)
      });
    }
  }
});

dietPlan.days['Domenica'] = {
  'Giornata Libera': [{
    name: 'Pasto Libero',
    quantityStr: '1',
    unit: 'giornata',
    grams: 0
  }]
};

fs.mkdirSync('src/data', { recursive: true });
fs.writeFileSync('src/data/diet.json', JSON.stringify(dietPlan, null, 2));
console.log('JSON generated successfully');
