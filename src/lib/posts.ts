export type Post = {
  slug: string;
  title: string;
  date: string; // ISO
  dateLabel: string;
  excerpt: string;
  content: string[]; // paragraphs
};

// Dodawaj nowe wpisy na początku listy.
export const posts: Post[] = [
  {
    slug: "drzwi-otwarte-od-srodka",
    title: "Drzwi otwarte od środka",
    date: "2026-06-27",
    dateLabel: "27 czerwca 2026",
    excerpt:
      "Najgorsze w zamkniętym pokoju nie jest to, że jest zamknięty. Najgorsze jest to, że klamka jest po twojej stronie, a ty jej nie widzisz.",
    content: [
      "Najgorsze w zamkniętym pokoju nie jest to, że jest zamknięty. Najgorsze jest to, że klamka jest po twojej stronie, a ty jej nie widzisz.",
      "Przez dwa lata stałem przy drzwiach przekonany, że są zaryglowane z zewnątrz. Nikt mnie nie trzymał. Trzymała mnie pewność, że jestem trzymany.",
      "Wyjście nie zaczęło się od szarpnięcia. Zaczęło się od jednego zdania, którego nie umiałem wcześniej pomyśleć: a co, jeśli się mylę.",
    ],
  },
  {
    slug: "pewnosc",
    title: "Pewność",
    date: "2026-06-20",
    dateLabel: "20 czerwca 2026",
    excerpt:
      "Choroba nie mówiła do mnie głosem szaleństwa. Mówiła głosem pewności.",
    content: [
      "Choroba nie mówiła do mnie głosem szaleństwa. Mówiła głosem pewności. Była spokojna, logiczna, układała fakty w jedną nieprzerwaną linię, w której wszystko się zgadzało.",
      "Zdrowienie było brzydsze. Było pełne „nie wiem”, „chyba”, „najprawdopodobniej”.",
      "Nauczyłem się, że zdanie, które nie dopuszcza wątpliwości, to nie jest prawda. To jest objaw.",
    ],
  },
  {
    slug: "brzeg",
    title: "Brzeg",
    date: "2026-06-10",
    dateLabel: "10 czerwca 2026",
    excerpt:
      "Nie ma jednego momentu, w którym wychodzi się na brzeg. Jest woda, która coraz rzadziej sięga ust.",
    content: [
      "Nie ma jednego momentu, w którym wychodzi się na brzeg. Jest woda, która coraz rzadziej sięga ust. Jest grunt, który raz na jakiś czas dotyka stopy i znika.",
      "Długo nie wierzyłem, że to brzeg, bo wyobrażałem sobie ratunek jako coś nagłego. Ratunek był nudny. Był powolny.",
      "Był tym, że pewnego dnia po prostu staliśmy obok siebie w kuchni, jak gdyby nic się nie stało, choć stało się wszystko.",
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
