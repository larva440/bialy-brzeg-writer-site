// scripts/add-keywords.mjs — uruchom raz: `node scripts/add-keywords.mjs`
// Dopisuje pole keywords (3–5 haseł) do każdego wpisu, keywords ląduje po excerpt.
import fs from 'node:fs';

const MAP = {
  "src/content/posts/dziennik/ds-2026-06-26-czy-to-bylo-urojenie.json": [
    "urojenie",
    "sekta",
    "język",
    "pamięć"
  ],
  "src/content/posts/dziennik/ds-2026-06-27-surowy-zapis.json": [
    "dziennik",
    "schizofrenia",
    "obserwacja",
    "zapis"
  ],
  "src/content/posts/dziennik/ds-2026-06-28-backtest-poziomu-33.json": [
    "narracja",
    "kontrola",
    "scenariusz",
    "manipulacja"
  ],
  "src/content/posts/dziennik/ds-2026-06-29-luki-w-glowach.json": [
    "cisza",
    "anonimowość",
    "lęk",
    "wycofanie"
  ],
  "src/content/posts/dziennik/ds-2026-07-01-system-zamkniety.json": [
    "model",
    "umysł",
    "schemat",
    "kontrola"
  ],
  "src/content/posts/dziennik/ds-2026-07-03-zima-w-glowie.json": [
    "depresja",
    "ciało",
    "ból",
    "bezsilność"
  ],
  "src/content/posts/dziennik/ds-2026-07-06-d-j-vu.json": [
    "déjà vu",
    "percepcja",
    "niepokój",
    "powtórzenie"
  ],
  "src/content/posts/dziennik/ds-2026-07-08-lojalnosc.json": [
    "hipoteza",
    "spokój",
    "lojalność",
    "umysł"
  ],
  "src/content/posts/dziennik/ds-2026-07-10-pustka-nie-jest-przestrzenia.json": [
    "pustka",
    "mistrz",
    "manipulacja",
    "sekta"
  ],
  "src/content/posts/dziennik/ds-2026-07-13-po-drugiej-stronie-muru.json": [
    "bezsenność",
    "obserwacja",
    "mur",
    "dystans"
  ],
  "src/content/posts/dziennik/ds-2026-07-15-niewidzialnosc.json": [
    "żona",
    "relacja",
    "wina",
    "niewidzialność"
  ],
  "src/content/posts/dziennik/ds-2026-07-17-lustro-z-algorytmu.json": [
    "hipoteza",
    "prawda",
    "algorytm",
    "poznanie"
  ],
  "src/content/posts/dziennik/ds-2026-07-20-definicja.json": [
    "definicja",
    "język",
    "komunikacja",
    "sens"
  ],
  "src/content/posts/dziennik/ds-2026-07-22-wiezienie-bez-krat.json": [
    "smutek",
    "uwięzienie",
    "depresja",
    "samotność"
  ],
  "src/content/posts/dziennik/ds-2026-07-24-napiecie-ulga-petla.json": [
    "uzależnienie",
    "pętla",
    "przyjaźń",
    "wyparcie"
  ],
  "src/content/posts/dziennik/ds-2026-07-27-czlowiek-jako-zbior-mechanizmow.json": [
    "mechanizm",
    "pętla",
    "człowiek",
    "schemat"
  ],
  "src/content/posts/dziennik/ds-2026-07-29-problem-z-przelewem.json": [
    "leki",
    "wellbutrin",
    "paraliż",
    "decyzja"
  ],
  "src/content/posts/dziennik/ds-2026-07-31-minimum-globalne.json": [
    "depresja",
    "bezsilność",
    "ciało",
    "dno"
  ],
  "src/content/posts/dziennik/ds-2026-08-03-adhd-autyzm-i-atari.json": [
    "adhd",
    "autyzm",
    "diagnoza",
    "mózg"
  ],
  "src/content/posts/dziennik/ds-2026-08-05-adhd-to-nie-wymowka.json": [
    "adhd",
    "odpowiedzialność",
    "czas",
    "mózg"
  ],
  "src/content/posts/dziennik/ds-2026-08-07-sen-wrzucony.json": [
    "sen",
    "izolacja",
    "rodzina",
    "wykluczenie"
  ],
  "src/content/posts/dziennik/ds-2026-08-10-freud-i-jung-patrza.json": [
    "freud",
    "jung",
    "struktura",
    "pisanie"
  ],
  "src/content/posts/dziennik/ds-2026-08-12-lek-egzystencjalny.json": [
    "lęk",
    "rodzina",
    "codzienność",
    "egzystencja"
  ],
  "src/content/posts/dziennik/ds-2026-08-14-dialogi-o-8-17.json": [
    "sen",
    "egzamin",
    "presja",
    "podświadomość"
  ],
  "src/content/posts/dziennik/ds-2026-08-17-atenza.json": [
    "psychiatra",
    "wizyta",
    "diagnoza",
    "leczenie"
  ],
  "src/content/posts/dziennik/ds-2026-08-19-pierwsza-tabletka-o-9-08.json": [
    "leki",
    "apteka",
    "początek",
    "dziecko"
  ],
  "src/content/posts/dziennik/ds-2026-08-21-silniki-rakietowe.json": [
    "samotność",
    "rano",
    "rodzina",
    "myśli"
  ],
  "src/content/posts/dziennik/ds-2026-08-24-szukam-przyjaciela.json": [
    "przyjaźń",
    "samotność",
    "potrzeba",
    "rozmowa"
  ],
  "src/content/posts/dziennik/ds-2026-08-26-apofenia.json": [
    "apofenia",
    "wzorce",
    "umysł",
    "percepcja"
  ],
  "src/content/posts/dziennik/ds-2026-08-28-tozsamosc-i-poczucie-siebie.json": [
    "tożsamość",
    "płeć",
    "poczucie siebie",
    "rodzina"
  ],
  "src/content/posts/dziennik/ds-2026-08-31-fala.json": [
    "ból",
    "ciało",
    "migrena",
    "fala"
  ],
  "src/content/posts/dziennik/ds-2026-09-02-kulka.json": [
    "system",
    "spirala",
    "obserwacja",
    "metoda"
  ],
  "src/content/posts/dziennik/ds-2026-09-04-ego.json": [
    "ego",
    "sekta",
    "grupa",
    "jaźń"
  ],
  "src/content/posts/dziennik/ds-2026-09-07-podrobki-janka.json": [
    "dzieci",
    "dom",
    "codzienność",
    "rodzina"
  ],
  "src/content/posts/dziennik/ds-2026-09-09-odwrocona-spirala.json": [
    "spirala",
    "metoda",
    "obserwacja",
    "proces"
  ],
  "src/content/posts/dziennik/ds-2026-09-11-into-action.json": [
    "wielka księga",
    "aa",
    "działanie",
    "tłumaczenie"
  ],
  "src/content/posts/dziennik/ds-2026-09-14-badz-wola-twoja.json": [
    "modlitwa",
    "odpowiedzialność",
    "wiara",
    "wola"
  ],
  "src/content/posts/dziennik/ds-2026-09-16-pauza.json": [
    "przełom",
    "pauza",
    "zmiana",
    "spokój"
  ],
  "src/content/posts/dziennik/ds-2026-09-18-spacer.json": [
    "żona",
    "relacja",
    "spacer",
    "bliskość"
  ],
  "src/content/posts/dziennik/ds-2026-09-21-narcyz-i-lustro.json": [
    "narcyzm",
    "neurony lustrzane",
    "empatia",
    "mechanizm"
  ],
  "src/content/posts/dziennik/ds-2026-09-23-szpieg.json": [
    "coelho",
    "streszczenie",
    "szpieg",
    "narracja"
  ],
  "src/content/posts/dziennik/ds-2026-09-25-kibelek.json": [
    "dom",
    "remont",
    "codzienność",
    "drobiazg"
  ],
  "src/content/posts/dziennik/ds-2026-09-28-umowa.json": [
    "dzieci",
    "umowa",
    "granice",
    "wychowanie"
  ],
  "src/content/posts/dziennik/ds-2026-09-30-diament.json": [
    "rodzina",
    "obi",
    "diament",
    "codzienność"
  ],
  "src/content/posts/dziennik/ds-2026-10-02-petle-napiecia.json": [
    "prawda",
    "ucieczka",
    "napięcie",
    "żona"
  ],
  "src/content/posts/dziennik/ds-2026-10-05-co-chcemy.json": [
    "pragnienie",
    "brak",
    "kierunek",
    "wola"
  ],
  "src/content/posts/dziennik/ds-2026-10-07-bog-boba.json": [
    "bob smith",
    "aa",
    "bóg",
    "duchowość"
  ],
  "src/content/posts/dziennik/ds-2026-10-09-wymiary.json": [
    "dysocjacja",
    "wymiar",
    "percepcja",
    "umysł"
  ],
  "src/content/posts/dziennik/ds-2026-10-12-cztery-zera.json": [
    "aa",
    "miting",
    "adhd",
    "świadectwo"
  ],
  "src/content/posts/dziennik/ds-2026-10-14-kolce.json": [
    "trauma",
    "emocja",
    "wspomnienie",
    "teoria"
  ],
  "src/content/posts/dziennik/ds-2026-10-16-skrot-przez-czas.json": [
    "przebaczenie",
    "czas",
    "teoria",
    "przyszłość"
  ],
  "src/content/posts/dziennik/ds-2026-10-19-prog.json": [
    "aa",
    "decyzja",
    "próg",
    "wspólnota"
  ],
  "src/content/posts/dziennik/ds-2026-10-21-iluzja.json": [
    "narracja",
    "iluzja",
    "wersja",
    "prawda"
  ],
  "src/content/posts/dziennik/ds-2026-10-23-niestabilny.json": [
    "żona",
    "gniew",
    "ocena",
    "niestabilność"
  ],
  "src/content/posts/dziennik/ds-2026-10-26-debug.json": [
    "żona",
    "dystans",
    "analiza",
    "relacja"
  ],
  "src/content/posts/dziennik/ds-2026-10-28-poczucie-wartosci.json": [
    "wartość",
    "samoocena",
    "ja",
    "poznanie"
  ],
  "src/content/posts/dziennik/ds-2026-10-30-cztery-drogi.json": [
    "alkoholizm",
    "drogi",
    "wybór",
    "proces"
  ],
  "src/content/posts/dziennik/ds-2026-11-02-akt-wiary.json": [
    "wiara",
    "zaufanie",
    "decyzja",
    "dowód"
  ],
  "src/content/posts/dziennik/ds-2026-11-04-doczepka.json": [
    "data",
    "obserwacja",
    "fragment",
    "zapis"
  ],
  "src/content/posts/dziennik/ds-2026-11-06-alarm.json": [
    "żona",
    "lęk",
    "ciało",
    "dystans"
  ],
  "src/content/posts/dziennik/ds-2026-11-09-zamiar-oczyszczony.json": [
    "intencja",
    "żona",
    "oczyszczenie",
    "miłość"
  ],
  "src/content/posts/dziennik/ds-2026-11-11-powrot-do-kodu.json": [
    "programowanie",
    "praca",
    "powrót",
    "kariera"
  ],
  "src/content/posts/dziennik/ds-2026-11-13-terapia-par.json": [
    "terapia",
    "żona",
    "relacja",
    "para"
  ],
  "src/content/posts/dziennik/ds-2026-11-16-prawo-jazdy.json": [
    "prawo jazdy",
    "podróż",
    "usa",
    "formalności"
  ],
  "src/content/posts/dziennik/ds-2026-11-18-akt-slubu.json": [
    "las vegas",
    "ślub",
    "dokument",
    "małżeństwo"
  ],
  "src/content/posts/dziennik/ds-2026-11-20-wszystko-w-grze.json": [
    "odbudowa",
    "fundament",
    "zero",
    "metafora"
  ],
  "src/content/posts/dziennik/ds-2026-11-23-w-drodze.json": [
    "przełom",
    "moment",
    "zmiana",
    "droga"
  ],
  "src/content/posts/dziennik/ds-2026-11-25-lek-przed-utrata.json": [
    "lęk",
    "utrata",
    "ciało",
    "żona"
  ],
  "src/content/posts/dziennik/ds-2026-11-27-sluga.json": [
    "rodzina",
    "ucieczka",
    "uczucie",
    "rozdarcie"
  ],
  "src/content/posts/dziennik/ds-2026-11-30-modlitwa-na-dzien.json": [
    "modlitwa",
    "aa",
    "duchowość",
    "tekst"
  ],
  "src/content/posts/dziennik/ds-2026-12-02-nagrody.json": [
    "nagroda",
    "motywacja",
    "esej",
    "pragnienie"
  ],
  "src/content/posts/dziennik/ds-2026-12-04-zdjecia.json": [
    "prawo jazdy",
    "żona",
    "podróż",
    "codzienność"
  ],
  "src/content/posts/dziennik/ds-2026-12-07-wypozyczalnia.json": [
    "usa",
    "auto",
    "podróż",
    "formalności"
  ],
  "src/content/posts/dziennik/ds-2026-12-09-fundament.json": [
    "pokora",
    "wdzięczność",
    "klucz",
    "duchowość"
  ],
  "src/content/posts/dziennik/ds-2026-12-11-paliwo.json": [
    "sen",
    "przesłanie",
    "intuicja",
    "zdanie"
  ],
  "src/content/posts/dziennik/ds-2026-12-14-ciche-dni.json": [
    "żona",
    "cisza",
    "milczenie",
    "relacja"
  ],
  "src/content/posts/dziennik/ds-2026-12-16-krok-pierwszy.json": [
    "aa",
    "krok 1",
    "bezsilność",
    "poddanie"
  ],
  "src/content/posts/dziennik/ds-2026-12-18-dab.json": [
    "dąb",
    "działka",
    "metafora",
    "czas"
  ],
  "src/content/posts/dziennik/ds-2026-12-21-punkt-zero.json": [
    "żona",
    "jedzenie",
    "spokój",
    "zero"
  ],
  "src/content/posts/dziennik/ds-2026-12-23-rozdrapywanie.json": [
    "trigger",
    "komentarz",
    "sieć",
    "rana"
  ],
  "src/content/posts/dziennik/ds-2026-12-25-przejscie-przez-zero.json": [
    "lista",
    "algorytm",
    "ja",
    "zmiana"
  ],
  "src/content/posts/dziennik/ds-2026-12-28-wyjazd-za-szesc-tygodni.json": [
    "formalności",
    "wyjazd",
    "wniosek",
    "plan"
  ],
  "src/content/posts/dziennik/ds-2026-12-30-list.json": [
    "list",
    "żona",
    "szczerość",
    "relacja"
  ],
  "src/content/posts/dziennik/ds-2027-01-01-mosty.json": [
    "alkoholizm",
    "mosty",
    "relacje",
    "naprawa"
  ],
  "src/content/posts/dziennik/ds-2027-01-04-narcyz-prometeusz.json": [
    "narcyzm",
    "objawienie",
    "mit",
    "człowiek"
  ],
  "src/content/posts/dziennik/ds-2027-01-06-kompleks.json": [
    "rodzina",
    "szpital",
    "teściowa",
    "lęk"
  ],
  "src/content/posts/dziennik/ds-2027-01-08-pytanie-do-piosenki.json": [
    "przebaczenie",
    "małżeństwo",
    "pytanie",
    "relacja"
  ],
  "src/content/posts/dziennik/ds-2027-01-11-styl.json": [
    "pisanie",
    "ai",
    "styl",
    "tekst"
  ],
  "src/content/posts/dziennik/ds-2027-01-13-modlitwa-do-siebie.json": [
    "modlitwa",
    "ja",
    "sobota",
    "refleksja"
  ],
  "src/content/posts/dziennik/ds-2027-01-15-paliwa.json": [
    "przyciąganie",
    "żona",
    "relacja",
    "emocja"
  ],
  "src/content/posts/dziennik/ds-2027-01-18-za-piec-tygodni.json": [
    "odliczanie",
    "wyjazd",
    "data",
    "obserwacja"
  ],
  "src/content/posts/dziennik/ds-2027-01-20-cztery-zera-powrot.json": [
    "aa",
    "miting",
    "adhd",
    "powrót"
  ],
  "src/content/posts/dziennik/ds-2027-01-22-iluzja-kontroli.json": [
    "duma",
    "kontrola",
    "aa",
    "grzech"
  ],
  "src/content/posts/dziennik/ds-2027-01-25-cztery-nie-dwadziescia-dwa.json": [
    "data",
    "liczby",
    "apofenia",
    "kontrola"
  ],
  "src/content/posts/dziennik/ds-2027-01-27-wykop.json": [
    "zrzutka",
    "wykop",
    "ogłoszenie",
    "internet"
  ],
  "src/content/posts/dziennik/ds-2027-01-29-lek-przed-lataniem.json": [
    "lęk",
    "latanie",
    "żona",
    "podróż"
  ],
  "src/content/posts/dziennik/ds-2027-02-01-telefon-w-miedzyczasie.json": [
    "międzyczas",
    "kontrola",
    "czas",
    "obserwacja"
  ],
  "src/content/posts/dziennik/ds-2027-02-03-dzien-matki.json": [
    "dzień matki",
    "teściowa",
    "rodzina",
    "refleksja"
  ],
  "src/content/posts/dziennik/ds-2027-02-05-impuls.json": [
    "impuls",
    "kontrola",
    "lista",
    "panowanie"
  ],
  "src/content/posts/dziennik/ds-2027-02-08-lois-wilson.json": [
    "lois wilson",
    "aa",
    "film",
    "żona"
  ],
  "src/content/posts/dziennik/ds-2027-02-10-jestem-chory.json": [
    "choroba",
    "wyznanie",
    "tekst",
    "akceptacja"
  ],
  "src/content/posts/dziennik/ds-2027-02-12-emocja-jako-dane.json": [
    "emocja",
    "impuls",
    "dane",
    "obserwacja"
  ],
  "src/content/posts/dziennik/ds-2027-02-15-kotwica.json": [
    "wyjazd",
    "hotele",
    "kotwica",
    "plan"
  ],
  "src/content/posts/dziennik/ds-2027-02-17-zadra.json": [
    "tory",
    "perspektywa",
    "zadra",
    "myśli"
  ],
  "src/content/posts/dziennik/ds-2027-02-19-cichy.json": [
    "cichy",
    "fragment",
    "pamięć",
    "postać"
  ],
  "src/content/posts/dziennik/ds-2027-02-22-narracje-boskie.json": [
    "wiara",
    "bóg",
    "narracja",
    "duchowość"
  ],
  "src/content/posts/dziennik/ds-2027-02-24-slub-w-las-vegas.json": [
    "las vegas",
    "ślub",
    "data",
    "małżeństwo"
  ],
  "src/content/posts/dziennik/ds-2027-02-26-rytual-przejscia.json": [
    "rytuał",
    "przemiana",
    "symbol",
    "tożsamość"
  ],
  "src/content/posts/dziennik/ds-2027-03-01-kalambury-z-synami.json": [
    "dzieci",
    "gra",
    "kalambury",
    "rodzina"
  ],
  "src/content/posts/dziennik/ds-2027-03-03-koktajl-truskawkowy.json": [
    "dzieci",
    "koktajl",
    "rodzina",
    "codzienność"
  ],
  "src/content/posts/dziennik/ds-2027-03-05-obserwacja-walidacji.json": [
    "walidacja",
    "obserwacja",
    "ciało",
    "emocja"
  ],
  "src/content/posts/dziennik/ds-2027-03-08-wieczor-po-koncercie.json": [
    "koncert",
    "poczucie",
    "małość",
    "wieczór"
  ],
  "src/content/posts/dziennik/ds-2027-03-10-nastepny-dzien.json": [
    "samochód",
    "naprawa",
    "codzienność",
    "awaria"
  ],
  "src/content/posts/dziennik/ds-2027-03-12-jan-w-samochodzie.json": [
    "syn",
    "upór",
    "cierpliwość",
    "wychowanie"
  ],
  "src/content/posts/dziennik/ds-2027-03-15-ziemniaczki.json": [
    "jedzenie",
    "codzienność",
    "grill",
    "drobiazg"
  ],
  "src/content/posts/dziennik/ds-2027-03-17-skarby.json": [
    "wspomnienie",
    "przeszłość",
    "szpital",
    "fragment"
  ],
  "src/content/posts/dziennik/ds-2027-03-19-naturalne.json": [
    "luka",
    "terapeuta",
    "zdrowienie",
    "koniec"
  ],
  "src/content/posts/w-drodze/wd-2026-06-10-brzeg.json": [
    "wychodzenie",
    "powrót",
    "spokój",
    "proces"
  ],
  "src/content/posts/w-drodze/wd-2026-06-20-pewnosc.json": [
    "pewność",
    "choroba",
    "umysł",
    "rozpoznanie"
  ],
  "src/content/posts/w-drodze/wd-2026-06-27-drzwi-otwarte-od-srodka.json": [
    "wolność",
    "wybór",
    "świadomość",
    "klamka"
  ],
  "src/content/posts/w-drodze/wd-2026-06-28-czy-zycie-moze-byc-nagroda.json": [
    "wdzięczność",
    "codzienność",
    "obecność",
    "nagroda"
  ]
};

for (const [path, keywords] of Object.entries(MAP)) {
  const raw = fs.readFileSync(path, 'utf8');
  const obj = JSON.parse(raw);
  // przebuduj z keywords zaraz po excerpt, zachowując kolejność
  const next = {};
  for (const [k, v] of Object.entries(obj)) {
    if (k === 'keywords') continue; // pomiń stare, wstawimy świeże
    next[k] = v;
    if (k === 'excerpt') next.keywords = keywords;
  }
  if (!('keywords' in next)) next.keywords = keywords;
  fs.writeFileSync(path, JSON.stringify(next, null, 2) + '\n', 'utf8');
}
console.log('Zaktualizowano', Object.keys(MAP).length, 'wpisów');
