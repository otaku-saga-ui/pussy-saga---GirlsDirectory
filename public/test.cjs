// Wymagany moduł do operacji na plikach (wbudowany w Node.js)
const fs = require('fs');

// Ścieżka do Twojego pliku JSON
const sciezkaPliku = './GirlsDirectory_en copy.json';

try {
  // 1. Wczytaj zawartość pliku
  const daneZPliku = fs.readFileSync(sciezkaPliku, 'utf8');

  // 2. Sparsuj JSON na obiekt JavaScript
  const obiekt = JSON.parse(daneZPliku);

  const nameMappingsEnglish = {
  "Lenore_GNY": "Lenore",
  "Lesbi_GNY": "Lesbi",
  "GE_011": "Miranda",
  "GE_012": "Emma",
  "GE_013": "Tina",
  "GE_021": "Sandra",
  "GE_022": "Casey",
  "GE_023": "Charlotte",
  "GE_051": "Aiko",
  "GE_052": "Amelie",
  "GE_053": "Laura",
  "GE_061": "Katya",
  "GE_062": "Emma",
  "GE_063": "Kamila",
  "GE_064": "Martina",
  "GE_065": "Berta",
  "GE_066": "Fifa",
  "GE_067": "Lor",
  "GE_068": "Cindy",
  "GE_071": "Kaylee",
  "GE_072": "Zoe",
  "GE_073": "Ilma",
  "GE_074": "Kira",
  "GE_075": "Hannah",
  "Girl_Harem_001": "Wendy",
  "Girl_Harem_002": "Kathleen",
  "Girl_Harem_003": "Brenda",
  "Girl_Harem_004": "Rachel",
  "Girl_Harem_005": "Becky",
  "Girl_Harem_006": "May",
  "Girl_Harem_007": "Candy",
  "Girl_Harem_008": "Mary"
};

  // 3. Przejdź przez wszystkie klucze w obiekcie (np. "Fairy", "Dragon")
  for (const klucz in obiekt) {
    const v = nameMappingsEnglish[klucz]
    if(v) {
      obiekt[klucz].name = v;
    }
  }

  // 5. Konwertuj zmodyfikowany obiekt z powrotem na ładnie sformatowany string JSON
  const zaktualizowanyJson = JSON.stringify(obiekt, null, 2);

  // 6. Nadpisz plik nową zawartością
  fs.writeFileSync(sciezkaPliku, zaktualizowanyJson, 'utf8');

  console.log(`✅ Plik ${sciezkaPliku} został pomyślnie zaktualizowany!`);

} catch (error) {
  console.error('🔴 Wystąpił błąd:', error.message);
}