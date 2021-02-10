let rooms = [
  {
    roomPic: "./img/",
    type: "attack",
    nmePic: "./img/nme1pyrojack.png",
    desc: "Pyro Jack megtámadott!",
    values: [1, 0, 1, 1, 1]
  },
  {
    roomPic: "./img/",
    type: "attack",
    nmePic: "./img/nme2jackfrost.png",
    desc: "Hee-Hoo!! Jack Frost rád vetette magát!",
    values: [1, 0, 1, 2, 1]
  },
  {
    roomPic: "./img/",
    type: "attack",
    nmePic: "./img/nme3blackfrost.png",
    desc: "Black Frost kiszemelt áldozatának!",
    values: [2, 0, 1, 2, 1]
  },
  {
    roomPic: "./img/",
    type: "attack",
    nmePic: "./img/nme4blackooze.png",
    desc: "Black Ooze eljött, hogy felemésszen!",
    values: [2, 1, 2, 0, 2]
  },
  {
    roomPic: "./img/",
    type: "attack",
    nmePic: "./img/nme5najaraga.png",
    desc: "Naja Raga eljött, hogy felnyársaljon!",
    values: [2, 2, 2, 0, 1]
  },
  {
    roomPic: "./img/",
    type: "attack",
    nmePic: "./img/nme6cerberus.png",
    desc: "Cerberus rád feni a fogát, légy óvatos!",
    values: [2, 3, 2, 0, 1]
  },
  {
    roomPic: "./img/",
    type: "attack",
    nmePic: "./img/nme7surt.png",
    desc: "Surt, a tűzóriások istene készen áll, hogy hamuvá égessen!",
    values: [2, 0, 2, 3, 2]
  },
  {
    roomPic: "./img/",
    type: "attack",
    nmePic: "./img/nme8beelzebub.png",
    desc: "Beelzebub, a Legyek Ura! Kell egy légycsapó?",
    values: [3, 0, 2, 3, 2]
  },
  {
    roomPic: "./img/",
    type: "attack",
    nmePic: "./img/nme9satan.png",
    desc: "Satan a lelopja a kódodat, küldd vissza a w3schools.com-ra!",
    values: [3, 0, 2, 3, 3]
  },
  {
    roomPic: "./img/",
    type: "attack",
    nmePic: "./img/nme10lucifer.png",
    desc: "Lucifer kiszabadult az internet sötét bugyrából, küldd vissza a Dark Webre!",
    values: [3, 3, 3, 0, 3]
  },
  //kvíz szobák
  {
    roomPic: "./img/ricsi_kerdez.jpg",
    type: "quiz",
    desc: "Mentorod teszteli, a tudásod!",
    question: "Fejezd be az angol viccet: Why do JAVA developers wear glasses? - Because...",
    answers: [".eyes #left, #right {visibility: hidden}", "they watch screens 24/7", "they don’t C#", "if (coding=true && focus===100) {vision: null}"],
    key: 2,
    score: 100,
    prize: [0, 1]
  },
  {
    roomPic: "./img/ricsi_kerdez.jpg",
    type: "quiz",
    desc: "Mentorod teszteli, tudatosan internetezel-e!",
    question: "Ennek segítségével ismerik fel az online áruházak a korábbi vásárlóikat, és személyre szabott információkat tudnak nekik kínálni.",
    answers: ["Javascript", "Cookie", "Html", "Node.js"],
    key: 1,
    score: 100,
    prize: [0, 1]
  },
  {
    roomPic: "./img/ricsi_kerdez.jpg",
    type: "quiz",
    desc: "Mentorod kíváncsi a designer tudásodra!",
    question: "CSS-ben mivel készíthetünk nagybetűs, piros feliratot?",
    answers: ["fill: red; text-transform: uppercase;", "color: red; font-size: uppercase;", "fill: red; font-size: uppercase;", "color: red; text-transform: uppercase;"],
    key: 3,
    score: 100,
    prize: [0, 1]
  },
  {
    roomPic: "./img/ricsi_kerdez.jpg",
    type: "quiz",
    desc: "Mentorod nem hagy békén a Git-tel!",
    question: "Melyik Git parancs mutatja meg az aktuális munkakönyvtár és commit közötti eltérést?",
    answers: ["git change", "git diff", "git log", "git show"],
    key: 1,
    score: 100,
    prize: [0, 1]
  },
  {
    roomPic: "./img/ricsi_kerdez.jpg",
    type: "quiz",
    desc: "Mentorod teszteli, hogy figyeltél-e!",
    question: "A ‘margin-top’ és a ‘margin-bottom’ hatással vannak az inline elemekre?",
    answers: ["Igen", "Csak a margin-top", "Csak a margin-bottom", "Nem"],
    key: 3,
    score: 100,
    prize: [0, 1]
  },
  {
    roomPic: "./img/ricsi_kerdez.jpg",
    type: "quiz",
    desc: "Mentorod igényes a reszponzív megjelenítésre!",
    question: "Mire vonatkozik a ‘screen’ az alábbi példában? @media only screen (max-width: 1024px)",
    answers: ["A böngésző viewport-jára", "A kijelző eszköz fizikai méretére", "A befoglaló szülő element méretére", "A telefon/tablet kijelző méretére"],
    key: 0,
    score: 100,
    prize: [0, 1]
  },
  {
    roomPic: "./img/ricsi_kerdez.jpg",
    type: "quiz",
    desc: "Mentorod kíváncsi, hogy mennyire vagy tisztában az alapokkal!",
    question: "Mely esetben érdemes használni a <small> tag-et?",
    answers: ["Amikor egy <h1> -be még egy <h1> elemet akarunk beépíteni", "Amikor copyright információt rakunk a <footer> elembe", "Ha egy elem méretét a felére akarjuk csökkenteni", "Mindhárom esetben"],
    key: 1,
    score: 100,
    prize: [0, 1]
  },
  {
    roomPic: "./img/ricsi_kerdez.jpg",
    type: "quiz",
    desc: "Mentorod kíváncsi, hogy mivel emelsz ki!",
    question: "Melyik HTML tag-el emelhetjük ki a szöveget a keresőben?",
    answers: ["<mark>", "<strong>", "<em>", "<highlight>"],
    key: 0,
    score: 100,
    prize: [0, 1]
  },
  {
    roomPic: "./img/ricsi_kerdez.jpg",
    type: "quiz",
    desc: "Mentorod kíváncsi, hogy állsz a matekkal!",
    question: "Javascript nyelvben mi az alábbi művelet eredménye? “1” + “2” + “3” + 4",
    answers: ["10", "37", "1234", "64"],
    key: 2,
    score: 100,
    prize: [0, 1]
  },
  {
    roomPic: "./img/ricsi_kerdez.jpg",
    type: "quiz",
    desc: "Mentorod tudni akarja, hogy viszonyt ápolsz a console-al!",
    question: "Milyen érték jelenik meg alert-ben?  var foo = function bar() {}; alert(typeof bar);",
    answers: ["function", "object", "undefined", "typeof bar"],
    key: 2,
    score: 100,
    prize: [0, 1]
  }
]