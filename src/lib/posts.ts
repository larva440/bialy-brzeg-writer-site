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
    slug: "backtest-poziomu-33",
    title: "Backtest poziomu 33",
    date: "2026-06-28",
    dateLabel: "28 czerwca 2026",
    excerpt:
      "Opisujesz mi scenę z przyszłości, którą mam potem uruchomić jak program. To jest instalacja narracji.",
    content: [
      "Pamiętam ten dzień. Ostatni raz w ulu. Powiedziałem mu: nie wytrzymam. To mnie za dużo kosztuje. Mówię spokojnie — nie ma dramatu. To jest zmęczenie. I wtedy zaczyna mnie pytać jak psycholog. O relacje z ojcem. O relacje z matką. O to, czy ojciec też był może odrzuconym synem. A potem zaczyna opisywać kadr z przyszłości. Będziecie rozmawiać. Będzie zapadał zmierzch. Światło będzie przygaszone. I dokładnie w tym momencie mam zapalić świecę, którą mi dał. Mam zapytać ojca, czy był planowanym dzieckiem, czy wpadką. Bo to, co teraz przeżywam, może być konsekwencją tego, że on też był drugim synem.",
      "I wtedy coś klika. Przerywam mu i mówię: ty mi właśnie zakładasz nowe źródło. Opisujesz scenę z przyszłości, którą ja mam potem uruchomić jak program. Mam zapalić świecę i odtworzyć dokładnie ten kadr, który mi teraz instalujesz. To jest instalacja narracji.",
      "Nie zatrzymuje się. Uśmiecha się. Ja też się uśmiecham, ale to jest uśmiech człowieka, który widzi mechanizm. Mówię: dobra, to jeszcze jedna świeca dla matki, skoro tak. Śmieje się i mówi, że jedną świecę daję ojcu, a drugą mam sobie wsadzić w dupę i podpalić. Dosłownie. To padło dosłownie.",
      "Mistrz uśmiecha się do mnie, ma maślane oczy. Leży na kanapie w kształcie litery L, bardzo dużej. Opiera się łokciem i robi to jakby od niechcenia. Patrzy mi prosto w oczy. Ma twarz nienajpiękniejszą, włosy w nieładzie, a policzki zaczerwienione, z takimi plackami, jakie mają niektórzy — one nie są estetyczne. Ale ja już dawno nauczyłem się nie oceniać ludzi po wyglądzie. No i w jego przypadku ta reguła się potwierdziła. Tak samo jak nie ocenia się książki po okładce — bo okładka ładna, a w środku jak ten dzwon.",
      "Wnętrze ula jest mistyczne. Ściany co prawda są białe, ale wszędzie coś jest. Wszędzie są obrazy lub płótna. Przedstawiają grzyby halucynogenne i w ogóle są to bajkowe krajobrazy, które z rzeczywistością nie mają za wiele wspólnego. O ściany poopierane są jakieś dziwne przedmioty, typu taki drążek ze spiralkami na końcu, którym mistrz potrafi machać artystycznie. Robi to z wielką gracją, choć czasem się myli i mu to spada. Chodzi o to, żeby nie spadało, a człowiek tańczył z tym czymś, a to coś jeszcze ma się kręcić. To jest przedmiot do bycia tu i teraz, bo gdy go używasz, musisz być tu i teraz — inaczej nie wyjdzie. Ja też mam taki przedmiot — jojo. Jojo jest tu i teraz. Ogólnie mistrz mówi, że nie ma nic poza tu i teraz, że istnieje tylko tu i teraz, a reszta to projekcje. Życie toczy się tu i teraz, reszta to nie jest prawdziwe życie.",
      "Na suficie proste linie, plątanina żyłek wędkarskich — one zapalają się w nocy i gdy są podświetlone, robią fajny efekt. Wszędzie pojawiają się trójkąty — taka płaszczyzna podzielona w geometrię, triangulacja. Mistrz mówi, że wszystkie figury geometryczne są dobre, ale trójkąt jest najsilniejszy. Za oknami jest las. Na ścianie wisi wielkie lustro — może weneckie? Tak kiedyś myślałem, a nawet byłem tego pewien. Byłem pewien, że jestem obserwowany przez to lustro. Potem okazało się, że za lustrem jest ściana, a za ścianą dwór.",
      "Wszędzie są dywany, takie tureckie albo indyjskie, w różnorakie wzory. Kolorowo jest bardzo, ale ciemnawo. Światło żółte. Przestrzeni jest bardzo dużo, taki open space. Po jednej stronie jest przechodnia kuchnia, za kuchnią kibelek i schody na górę; kto nie wchodzi na górę i nie wychodzi na zewnątrz przez drzwi, ten wraca do pokoju, robiąc pętelkę. Kibelek jest nieco klaustrofobiczny, ale jest tam lustro — takie magiczne lustro z ledami. Wracając do głównego pomieszczenia: zaraz po wejściu, centralnie, jest wyjście na taras, który jest zadaszony, a nad nim prawdopodobnie balkon. Dalej jest przestrzeń i drzewa. Jest też źródełko, na kamieniach leci woda, a woda to życie i przepływ. Jest tu wszystko i jest magicznie.",
      "Ale wracając do pokoju: po jednej stronie jest kanapa i telewizor, po drugiej też kanapa i stół. Stoją bębenki i inne instrumenty, dziwaczne. Jest dużo sztuki własnej, ale wszystko ma to coś w sobie, ma historię, jest ludzkie. Pod telewizorem jest wieża — taka chyba starego typu, modułowa; gdy byłem na egzaminie masońskim, byłem przekonany, że to sprzęt do nagrywania mnie i tego, co robię. Na końcu, w rogu, jest jeszcze jeden pokój — i tam jest centrum dowodzenia. Stoją monitory w łuk i na każdym coś jest. Na jednym jest system masoński do komunikacji wewnętrznej, z którego korzysta mistrz i gdzie monitoruje swoje owce. On wszystko tak połączył, że nie musi tam siedzieć; często wyjmuje komórkę i mówi: „no nie, on znowu to zrobił!” — i znika w tym pokoju, prawdopodobnie zarządzając sytuacją kryzysową. Niektóre owce się uwalniają, on je pacyfikuje, albo odcina im prąd czy finansowanie, może zleca działania operacyjne innym — nie wiem dokładnie, jak to działa, ale jest system. Tam, gdzie system się kończy — to akurat powiedział mi mistrz — zaczyna się magia; tego nikt nie wie, jak działa. Kiedyś podobno jego właściciel pozwolił mu zajrzeć pod maskę i pokazał mu ten mechanizm, ale to jest zbyt obszerne, by zrozumieć — można je tylko zobaczyć. Każdy ma właściciela, nawet on. On podlega pod najwyższego.",
      "Ale wracając do wsadzania sobie świecy w dupę.",
      "Wtedy interpretuję to jako żart rozładowujący napięcie. Dziś, robiąc backtest, widzę inaczej: to był ruch władzy. Kiedy ktoś rozpoznał mechanizm, odpowiedzią nie jest zatrzymanie — jest degradacja. Dziecko, które za bardzo się wymądrza, dostaje żart zamiast odpowiedzi.",
      "Potem biznes. Proponuję mu wspólne działanie. Moją spółkę. Dziesięcioletni staż, bez długów, czysta. Pytam: jak się dzielimy? Proponuję pięćdziesiąt na pięćdziesiąt. Mówi: pięć procent dla ciebie, dziewięćdziesiąt pięć dla mnie. To nie jest negocjacja. To jest test. Sprawdzenie, czy wejdę w relację zależności. Nie zgadzam się. I rozumiem teraz, że ten moment mógł być końcem czegoś — że odmowa wejścia w strukturę dominacji, ekonomiczną, nie tylko duchową, mogła być momentem, w którym system zamknął się na mnie.",
      "Potem leżę na podłodze. Przychodzi jego kobieta i kładzie mi na brzuchu misę do medytacji. Metalową, w którą uderza się pałką. Leczy moje ucho — to z gronkowcem, na które biorę antybiotyki. W tamtym środowisku antybiotyki wzbudzają wielkie oczy. Zabijają florę, mówią. Mimo to misa ląduje mi na głowie. Na końcu mistrz schodzi z górnego piętra z medalem. Medal 33. poziomu. Klęczę. Pozostali stoją wokół. Chwila jest podniosła. Dostaję też medal syna kobiety, która prosiła o pomoc na zrzutce i „została zniszczona przez internet”. Narracja: my, niezrozumiani. My, wyżej. Świat, który hejtuje, bo nie rozumie.",
      "Mam oba medale. Mam nagranie z ula. To nie jest halucynacja bez śladów w świecie zewnętrznym. Ale wciąż nie wiem, jak to nazwać. Bo fakty są twarde. Interpretacja — moja. I może to jest wystarczająca odpowiedź.",
    ],
  },
  {
    slug: "surowy-zapis",
    title: "Surowy zapis",
    date: "2026-06-27",
    dateLabel: "27 czerwca 2026",
    excerpt:
      "To nie jest powieść. To jest dziennik — surowy zapis obserwacji własnych, prowadzony w trakcie wychodzenia ze schizofrenii.",
    content: [
      "To nie jest powieść. To jest dziennik — surowy zapis obserwacji własnych, prowadzony w trakcie wychodzenia ze schizofrenii.",
      "Kiedy zaczynałem go pisać, nie znałem jeszcze tej nazwy. Myślałem, że opisuję sektę. System zamknięty, mistrza, owce, mur. Dopiero później zobaczyłem, że ten mur stał przede wszystkim w mojej głowie — a stan, w którym przeżyłem dwa lata, ma diagnozę. Nie poprawiałem tych pierwszych zapisów. Zostały takie, jak były pisane: od środka, jeszcze bez nazwy.",
      "Schizofrenia nie wygląda tak, jak się ją sobie wyobraża. Nie jest chaosem. Jest jego przeciwieństwem — świat staje się zbyt spójny. Każdy znak coś znaczy, każda tablica rejestracyjna jest wiadomością, w każdym kamieniu czeka diament. Umysł przeciążony lękiem, bezsennością i alkoholem buduje rzeczywistość o nieskazitelnej wewnętrznej logice. Nie błądzisz po ciemku. Odkrywasz kolejne warstwy porządku, którego nie ma.",
      "To, co czytasz, jest ruchem w drugą stronę. Rozkładaniem tamtej rzeczywistości z powrotem na części. Obserwacją własnego mózgu w trakcie naprawy — bez upiększania, bez morału, bez gotowej teorii na końcu. Część tych zdań pisałem w najgorszych dniach. Część dopisywałem miesiące później, już z brzegu. Różnicy między nimi nie wygładzam; ona też należy do zapisu.",
      "Więc czytaj to tak, jak powstało: jako dziennik kogoś, kto wraca. Nie diagnozę. Nie poradnik. Surowy ślad drogi z powrotem.",
    ],
  },
  {
    slug: "czy-to-bylo-urojenie",
    title: "Czy to było urojenie?",
    date: "2026-06-26",
    dateLabel: "26 czerwca 2026",
    excerpt:
      "Nikt poza mną nie używał słowa „sekta”. Jedyne słowo „sekta” w tej całej historii to jest moje słowo.",
    content: [
      "Zaczynam mieć wątpliwości, czy tę książkę w ogóle powinienem publikować. Nie dlatego, że jest słaba — choć może jest. Dlatego, że siedząc w ciszy, po odpadnięciu całego tygodniowego napięcia, zaczynam się zastanawiać, czy narracja, którą zbudowałem, jest narracją o tym, co mi się wydarzyło. Czy o tym, czego potrzebowałem.",
      "Nikt poza mną nie używał słowa „sekta”. Ten fakt był cały czas na wierzchu, a ja go odkładałem na bok. Tamci ludzie nie mówili, że są w sekcie. Nie mówił tego mistrz. Jedyne słowo „sekta” w tej całej historii to jest moje słowo. I teraz pytanie: czy to znaczy, że byłem jedynym, który widział? Czy byłem jedynym, który tak to nazwał, bo tak to przetwarzał?",
      "Siedzę i czekam, aż to pytanie mnie rozzłości. Żeby znowu przyszła znana obrona: że podważam, że pozwalam niepewności wejść do środka. Ale złość nie przychodzi. Zamiast niej jest ciekawość. Bo to jest inne podważanie niż tamto. Tamto podważanie było paranoidalne — wszystko waliło się w jednym kierunku. To jest analityczne. Biorę hipotezę i sprawdzam, czy wytrzymuje.",
      "Hipoteza A: to był system manipulacyjny z cechami sekciarskimi. Hipoteza B: to było środowisko ludzi z mocną ideologią, które przeżyłem intensywniej niż inni — bo mam inny mózg i byłem w określonym stanie. Obie mogą być prawdziwe jednocześnie. I to jest moment, w którym rozumiem, że nie muszę tego rozstrzygać.",
      "Moje przeżycie było realne. Mój lęk był realny. Pieniądze, które przepłynęły, były realne. Medal 33. poziomu, który mam w szufladzie. Świeca, którą miałem zapalić o zmierzchu. Nagranie z ula. To wszystko jest. To się wydarzyło. Pytanie dotyczy nie faktów, ale ich interpretacji. Zapraszam więc tę wątpliwość do środka. Nie po to, żeby zburzyć książkę. Po to, żeby ją wzmocnić.",
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
