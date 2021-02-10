function initGame() {
  //karakterválasztás (tudom, lehetne rövidebb is)
  let choose1 = document.getElementById("char1");
  let choose2 = document.getElementById("char2");
  let choose3 = document.getElementById("char3");
  let timer;
  let audio = document.getElementById("audio");

  choose1.addEventListener("mouseenter", function () {
    choose1.classList.add("zoomUp");
    timer = setInterval(function () {
      choose1.classList.toggle("zoomUp");
    }, 60000);
  });
  choose2.addEventListener("mouseenter", function () {
    choose2.classList.add("zoomUp");
    timer = setInterval(function () {
      choose2.classList.toggle("zoomUp");
    }, 60000);
  });
  choose3.addEventListener("mouseenter", function () {
    choose3.classList.add("zoomUp");
    timer = setInterval(function () {
      choose3.classList.toggle("zoomUp");
    }, 60000);
  });

  choose1.addEventListener("mouseleave", function () {
    clearInterval(timer);
    choose1.classList.remove("zoomUp");
  });
  choose2.addEventListener("mouseleave", function () {
    clearInterval(timer);
    choose2.classList.remove("zoomUp");
  });
  choose3.addEventListener("mouseleave", function () {
    clearInterval(timer);
    choose3.classList.remove("zoomUp");
  });

  //a játék "globális" változói
  let charBtn1 = document.getElementById("char1");
  let charBtn2 = document.getElementById("char2");
  let charBtn3 = document.getElementById("char3");
  let step = 0;
  let room = 0;
  let score = 0;
  let hiScore = score;
  let weaponNo = 0;
  let armorNo = 0;
  let toolNo = 0;
  let timo = 0;
  let consoleArray = [];
  let starting = true;

  // Játékos és ellenfél jellemzői
  let char = [
    {
      pic: "",
      hp: 0,
      att: 0,
      def: 0,
      mAtt: 0,
      mDef: 0,
    },
    {
      hp: 0,
      att: 0,
      def: 0,
      mAtt: 0,
      mDef: 0,
    },
  ];

  //Szobák (használd egyelőre a prep/rooms-x file-t)
  let rooms = [
    {
      roomPic: "./img/arena1.jpg",
      type: "attack",
      nmePic: "./img/nme1pyrojack.png",
      desc: "Pyro Jack megtámadott!",
      values: [1, 0, 1, 1, 0],
    },
    {
      roomPic: "./img/arena2.jpg",
      type: "attack",
      nmePic: "./img/nme2jackfrost.png",
      desc: "Hee-Hoo!! Jack Frost rád vetette magát!",
      values: [1, 0, 0, 2, 1],
    },
    {
      roomPic: "./img/arena3.jpg",
      type: "attack",
      nmePic: "./img/nme3blackfrost.png",
      desc: "Black Frost kiszemelt áldozatának!",
      values: [2, 0, 1, 2, 1],
    },
    {
      roomPic: "./img/arena4.jpg",
      type: "attack",
      nmePic: "./img/nme4blackooze.png",
      desc: "Black Ooze eljött, hogy felemésszen!",
      values: [2, 1, 2, 0, 2],
    },
    {
      roomPic: "./img/arena5.jpg",
      type: "attack",
      nmePic: "./img/nme5najaraga.png",
      desc: "Naja Raga betoppant, hogy felnyársaljon!",
      values: [2, 2, 2, 0, 1],
    },
    {
      roomPic: "./img/arena6.jpg",
      type: "attack",
      nmePic: "./img/nme6hellbiker.png",
      desc: "Hell Biker kész átgázolni rajtad!",
      values: [2, 3, 2, 0, 1],
    },
    {
      roomPic: "./img/arena7.jpeg",
      type: "attack",
      nmePic: "./img/nme7surt.png",
      desc: "Surt, a tűzóriások istene készen áll, hogy hamuvá égessen!",
      values: [2, 0, 2, 3, 2],
    },
    {
      roomPic: "./img/arena8.jpg",
      type: "attack",
      nmePic: "./img/nme8beelzebub.png",
      desc: "Beelzebub, a Legyek Ura! Kell egy légycsapó?",
      values: [3, 3, 2, 0, 2],
    },
    {
      roomPic: "./img/arena9.jpg",
      type: "attack",
      nmePic: "./img/nme9satan.png",
      desc: "Satan lelopja a kódodat, küldd vissza a w3schools.com-ra!",
      values: [3, 0, 2, 3, 3],
    },
    {
      roomPic: "./img/arena10.jpg",
      type: "attack",
      nmePic: "./img/nme10lucifer.png",
      desc:
        "Lucifer kiszabadult az internet mélyéről, küldd vissza a Dark Webre!",
      values: [3, 3, 3, 0, 3],
    },
    {
      roomPic: "./img/arena11.png",
      type: "attack",
      nmePic: "./img/nme11babayaga.png",
      desc: "Baba Yaga rádförmedt!",
      values: [1, 0, 2, 3, 3],
    },
    {
      roomPic: "./img/arena12.jpg",
      type: "attack",
      nmePic: "./img/nme12death.png",
      desc: "Eljött érted a Halál!",
      values: [6, 6, 5, 0, 4],
    },
    //kvíz szobák
    {
      roomPic: "./img/ricsi_kerdez.jpg",
      type: "quiz",
      desc: "Mentorod teszteli a tudásod!",
      question:
        "Fejezd be az angol viccet: Why do JAVA developers wear glasses? - Because...",
      answers: [
        ".eyes #left, #right {visibility: hidden}",
        "they watch screens 24/7",
        "they don’t C#",
        "if (coding=true && focus===100) {vision: null}",
      ],
      key: 2,
      score: 110,
      prize: [0, 1],
    },
    {
      roomPic: "./img/ricsi_kerdez.jpg",
      type: "quiz",
      desc: "Mentorod teszteli, tudatosan internetezel-e!",
      question:
        "Ennek segítségével ismerik fel az online áruházak a korábbi vásárlóikat és személyre szabott információkat tudnak nekik kínálni.",
      answers: ["Javascript", "Cookie", "Html", "Node.js"],
      key: 1,
      score: 60,
      prize: [0, 2],
    },
    {
      roomPic: "./img/ricsi_kerdez.jpg",
      type: "quiz",
      desc: "Mentorod kíváncsi a designer tudásodra!",
      question: "CSS-ben mivel készíthetünk nagybetűs, piros feliratot?",
      answers: [
        "fill: red; text-transform: uppercase;",
        "color: red; font-size: uppercase;",
        "fill: red; font-size: uppercase;",
        "color: red; text-transform: uppercase;",
      ],
      key: 3,
      score: 100,
      prize: [0, 3],
    },
    {
      roomPic: "./img/ricsi_kerdez.jpg",
      type: "quiz",
      desc: "Mentorod nem hagy békén a Git-tel!",
      question:
        "Melyik Git parancs mutatja meg az aktuális munkakönyvtár és commit közötti eltérést?",
      answers: ["git change", "git diff", "git log", "git show"],
      key: 1,
      score: 90,
      prize: [1, 1],
    },
    {
      roomPic: "./img/ricsi_kerdez.jpg",
      type: "quiz",
      desc: "Mentorod teszteli, hogy figyeltél-e!",
      question:
        "A ‘margin-top’ és a ‘margin-bottom’ hatással vannak az inline elemekre?",
      answers: ["Igen", "Csak a margin-top", "Csak a margin-bottom", "Nem"],
      key: 3,
      score: 80,
      prize: [1, 2],
    },
    {
      roomPic: "./img/ricsi_kerdez.jpg",
      type: "quiz",
      desc: "Mentorod igényes a reszponzív megjelenítésre!",
      question:
        "Mire vonatkozik a ‘screen’ az alábbi példában? @media only screen (max-width: 1024px)",
      answers: [
        "A böngésző viewport-jára",
        "A kijelző eszköz fizikai méretére",
        "A befoglaló szülő element méretére",
        "A telefon/tablet kijelző méretére",
      ],
      key: 0,
      score: 110,
      prize: [1, 3],
    },
    {
      roomPic: "./img/ricsi_kerdez.jpg",
      type: "quiz",
      desc: "Mentorod kíváncsi, mennyire vagy tisztában az alapokkal!",
      question: "Mely esetben érdemes használni a &#60;small&#62; tag-et?",
      answers: [
        "Amikor egy &#60;h1&#62; -be még egy &#60;h1&#62; elemet akarunk beépíteni",
        "Amikor copyright információt rakunk a &#60;footer&#62; elembe",
        "Ha egy elem méretét a felére akarjuk csökkenteni",
        "Mindhárom esetben",
      ],
      key: 1,
      score: 130,
      prize: [2, 1],
    },
    {
      roomPic: "./img/ricsi_kerdez.jpg",
      type: "quiz",
      desc: "Mentorod kíváncsi, hogy mivel emelsz ki!",
      question:
        "Ha a felhasználó rákeres egy kifejezésre egy webhelyen, melyik tag-gel jelölhetjük az egyezőséget a találati listában?",
      answers: ["mark", "strong", "em", "highlight"],
      key: 0,
      score: 140,
      prize: [2, 2],
    },
    {
      roomPic: "./img/ricsi_kerdez.jpg",
      type: "quiz",
      desc: "Mentorod kíváncsi, hogy állsz a matekkal!",
      question:
        "Javascript nyelvben mi az alábbi művelet eredménye? “1” + “2” + “3” + 4",
      answers: ["10", "37", "1234", "64"],
      key: 2,
      score: 60,
      prize: [2, 3],
    },
    {
      roomPic: "./img/ricsi_kerdez.jpg",
      type: "quiz",
      desc: "Mentorod tudni akarja, milyen viszonyt ápolsz a console-lal!",
      question:
        "Milyen érték jelenik meg alert-ben?  var foo = function bar() {}; alert(typeof bar);",
      answers: ["function", "object", "undefined", "typeof bar"],
      key: 2,
      score: 130,
      prize: [2, 4],
    },
    {
      roomPic: "./img/ricsi_kerdez.jpg",
      type: "quiz",
      desc: "Mentorod tudni akarja, hogyan pozícionálsz!",
      question:
        "Mi fog történni az #example pozíciójával? #example {margin-bottom: -5px;}",
      answers: [
        "Feljebb megy 5px távolsággal",
        "Az alatta lévő elemek 5px-el közelebb kerülnek hozzá",
        "Az alatta lévő elemek 5px-el messzebb csúsznak tőle",
        "Egyik sem",
      ],
      key: 1,
      score: 90,
      prize: [2, 5],
    },
    {
      roomPic: "./img/ricsi_kerdez.jpg",
      type: "quiz",
      desc: "Mentorod teszteli a történelmi tudásod!",
      question: "Mi a HTML?",
      answers: [
        "Hot Thai Massaging Ladies",
        "Heavy Texting Messenger Lizard",
        "HyperText Markup Language",
        "How To Make Lollipops",
      ],
      key: 2,
      score: 50,
      prize: [2, 5],
    },
    {
      roomPic: "./img/ricsi_kerdez.jpg",
      type: "quiz",
      desc: "Mentorod teszteli a történelmi tudásod!",
      question: "Mi a HTTP?",
      answers: [
        "Hyper Text Protocol",
        "HyperText Transfer Protocol",
        "High Text Transfer Page",
        "High Text Page",
      ],
      key: 1,
      score: 60,
      prize: [2, 5],
    },
    {
      roomPic: "./img/ricsi_kerdez.jpg",
      type: "quiz",
      desc: "Mentorod tudni akarja, milyen viszonyt ápolsz a console-al!",
      question:
        "Milyen érték jelenik meg alert-ben?   function foo() {}; delete foo.length; alert (typeof foo.length);",
      answers: ["number", "undefined", "object", "Error"],
      key: 0,
      score: 140,
      prize: [2, 6],
    },
  ];

  //Tárgyak (használd egyelőre a prep/objects-x file-t)
  let weapons = [
    {
      id: 0,
      pic: "./img/leftHandX.png",
      name: "üres balkéz",
      desc: "",
      change: [0, 0, 0, 0, 0],
    },
    {
      id: 1,
      pic: "./img/weapon1.png",
      name: "Vizipisztoly",
      desc:
        "Ezzel úgy kinevetteted magad, hogy az ellenfeled sem fog védekezni",
      change: [8, 16, 6, 0, 0],
    },
    {
      id: 2,
      pic: "./img/weapon2.png",
      name: "Hyper-pisztoly",
      desc: "Meglepsz vele mindenkit, aki fizikai támadásra számít",
      change: [7, 2, 5, 20, 8],
    },
    {
      id: 3,
      pic: "./img/weapon3.png",
      name: "Kódtörő kard",
      desc: "A Fontend harcosok ősi fegyvere, minden védelmen átüt",
      change: [10, 15, 8, 15, 8],
    },
  ];

  let armors = [
    {
      id: 0,
      pic: "./img/armorX.png",
      name: "nincs páncél",
      desc: "",
      change: [0, 0, 0, 0, 0],
    },
    {
      id: 1,
      pic: "./img/armor1.png",
      name: "Nyuszipapucs",
      desc: "Gyorsabb nem leszel tőle, de divatos",
      change: [11, -1, 6, 1, 1],
    },
    {
      id: 2,
      pic: "./img/armor2.png",
      name: "Hacker sapka",
      desc: "Növeli a védelmed, áthackeled magad néhány támadáson",
      change: [10, 5, 10, 5, 20],
    },
    {
      id: 3,
      pic: "./img/armor3.png",
      name: "Hacker páncél",
      desc: "Szívos állat leszel a legtöbb támadással szemben",
      change: [25, 2, 20, 5, 15],
    },
  ];

  let tools = [
    {
      id: 0,
      pic: "./img/rightHandX.png",
      name: "üres jobbkéz",
      desc: "",
    },
    {
      id: 1,
      pic: "./img/tool1.png",
      name: "Szent Szoftver kézigránát",
      desc: "30 másodpercig növeli a támadásodat",
    },
    {
      id: 2,
      pic: "./img/tool2.png",
      name: "Cyberse pajzs",
      desc: "30 másodpercig növeli a védelmedet",
    },
    {
      id: 3,
      pic: "./img/tool3.png",
      name: "Dark Web vírus",
      desc: "Csökkenti az ellenfeled erejét a harcban",
    },
    {
      id: 4,
      pic: "./img/tool4.png",
      name: "GitHub cica",
      desc: "Súg egy keveset a kvízkérdésekben",
    },
    {
      id: 5,
      pic: "./img/tool5.png",
      name: "Kávé Potion",
      desc: "Ha kell egy kis energia",
    },
    {
      id: 6,
      pic: "./img/tool6.jpg",
      name: "Smart GitHub Cat",
      desc: "Sokat súg a kvízkérdésekben",
    },
  ];

  //Karakterválasztás
  charBtn1.addEventListener("click", chooseChar1);
  charBtn2.addEventListener("click", chooseChar2);
  charBtn3.addEventListener("click", chooseChar3);

  function chooseChar1() {
    char[0].pic = "./img/char1.png";
    char[0].hp = 90;
    char[0].att = 40;
    char[0].def = 60;
    char[0].mAtt = 20;
    char[0].mDef = 40;
    document.body.style.backgroundImage = "url('./img/matrix.png')";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "100% 100%";
    newRoom();
  }
  function chooseChar2() {
    char[0].pic = "./img/char2.png";
    char[0].hp = 70;
    char[0].att = 70;
    char[0].def = 30;
    char[0].mAtt = 50;
    char[0].mDef = 30;
    document.body.style.backgroundImage = "url('./img/matrix.png')";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "100% 100%";
    newRoom();
  }
  function chooseChar3() {
    char[0].pic = "./img/char3.png";
    char[0].hp = 60;
    char[0].att = 30;
    char[0].def = 40;
    char[0].mAtt = 70;
    char[0].mDef = 50;
    document.body.style.backgroundImage = "url('./img/matrix.png')";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "100% 100%";
    newRoom();
  }

  //Új szoba generálás
  function newRoom() {
    step++;
    let curRoom = room;
    room = parseInt(Math.random() * rooms.length);
    if (room === curRoom || (room === 11 && step < 10)) {
      room += 1 + Math.round(Math.random() * 3);
      if (room >= rooms.length) {
        room = 0;
      }
    }
    if (curRoom !== 11 && step > 50 + Math.random() * 70) {
      room = 11;
    }
    if (rooms[room].type === "attack") {
      if (starting === true || rooms[curRoom].type === "quiz") {
        audio.src = "./audio/attackMusic.mp3";
        starting = false;
      }
      audio.play();
      document.getElementById("screen").innerHTML = `
      <img id='roomImg' src='${rooms[room].roomPic}' alt='Attack Room'><br>
        <div id='stepNcounter'>
          <div id='score'>Pont: ${score}</div>
          <div id='counter'>Szint: ${step}</div>
        </div>
        <div id="fightersPic">
          <div id="fightButtons">
            <button class ='fightBtns' id='attackBtn'>Támadás</button> <br>
            <button class ='fightBtns' id='mAttackBtn'>Hackelés</button> <br>
            <button class ='fightBtns' id='fleeBtn'>Menekülés</button> <br>
            <div id='other'></div>
          </div>
          <img id='charPhoto' src='${char[0].pic}'>
          <img id='nmePhoto' src='${rooms[room].nmePic}'>
          <div id='consoleDiv'> 
            <br><br>
            <p id='consoleText'>${consoleArray}<p>
          </div>  
        </div>
        <div id="panel">
          <div id = 'roomDescAtk'>${rooms[room].desc}</div>
          <div id='message'></div>
          <div id='values'>
            <div id='charValues'>JELLEMZŐID
              <br><span class="valueText">Erő: </span><span class="spanValue" id='val_0_1' style='width: ${
                17 + char[0].hp * 1.1
              }px;'>${char[0].hp}</span>
              <br><span class="valueText">Támadás: </span><span class="spanValue" id='val_0_2' style='width: ${
                17 + char[0].att * 1.1
              }px;'>${char[0].att}</span>
              <br><span class="valueText">Védekezés: </span><span class="spanValue" id='val_0_3' style='width: ${
                17 + char[0].def * 1.1
              }px;'>${char[0].def}</span>
              <br><span class="valueText">Hackelés: </span><span class="spanValue" id='val_0_4' style='width: ${
                17 + char[0].mAtt * 1.1
              }px;'>${char[0].mAtt}</span>
              <br><span class="valueText">Tűzfal: </span><span class="spanValue" id='val_0_5' style='width: ${
                17 + char[0].mDef * 1.1
              }px;'>${char[0].mDef}</span>
            </div>
            <div id='objectsInAtk'>
              <img class='smallObj' id='weapon' src='${
                weapons[weaponNo].pic
              }' title='${weapons[weaponNo].name}'>
              <img class='smallObj' id='armor' src='${
                armors[armorNo].pic
              }' title='${armors[armorNo].name}'>
              <img class='smallObj' id='tool' src='${
                tools[toolNo].pic
              }' title='${tools[toolNo].name}&#10;${tools[toolNo].desc}'>
            </div>
            <div id='nmeValues'>ELLENFÉL
              <br><span class="valueText">Erő: </span><span class="spanValue" id='val_1_1' style='width: ${
                17 + char[1].hp * 1.1
              }px;'>${char[1].hp}</span>
              <br><span class="valueText">Támadás: </span><span class="spanValue" id='val_1_2' style='width: ${
                17 + char[1].att * 1.1
              }px;'>${char[1].att}</span>
              <br><span class="valueText">Védekezés: </span><span class="spanValue" id='val_1_3' style='width: ${
                17 + char[1].def * 1.1
              }px;'>${char[1].def}</span>
              <br><span class="valueText">Hackelés: </span><span class="spanValue" id='val_1_4' style='width: ${
                17 + char[1].mAtt * 1.1
              }px;'>${char[1].mAtt}</span>
              <br><span class="valueText">Tűzfal: </span><span class="spanValue" id='val_1_5' style='width: ${
                17 + char[1].mDef * 1.1
              }px;'>${char[1].mDef}</span>
            </div>
          </div>
        </div>
      `;
      //ellenfél értékei
      char[1].hp = parseInt(
        step * 1.25 + rooms[room].values[0] * 25 + Math.random() * step * 1.55
      );
      changeVal(1, 1, char[1].hp);
      char[1].att = parseInt(
        step * 1.25 + rooms[room].values[1] * 25 + Math.random() * step * 1.55
      );
      changeVal(1, 2, char[1].att);
      char[1].def = parseInt(
        step * 1.25 + rooms[room].values[2] * 25 + Math.random() * step * 1.55
      );
      changeVal(1, 3, char[1].def);
      char[1].mAtt = parseInt(
        step * 1.25 + rooms[room].values[3] * 25 + Math.random() * step * 1.55
      );
      changeVal(1, 4, char[1].mAtt);
      char[1].mDef = parseInt(
        step * 1.25 + rooms[room].values[4] * 25 + Math.random() * step * 1.55
      );
      changeVal(1, 5, char[1].mDef);
      document.getElementById("other").innerHTML = "";
      var attBtn = document.getElementById("attackBtn");
      var mAttBtn = document.getElementById("mAttackBtn");
      var fleeBtn = document.getElementById("fleeBtn");
      var toolBtn = document.getElementById("tool");

      toolBtn.addEventListener("click", magic);

      //mit csinálnak az ATTACK gombok
      //Normal attack
      document
        .getElementById("attackBtn")
        .addEventListener("click", function () {
          attBtn.disabled = true;
          mAttBtn.disabled = true;
          fleeBtn.disabled = true;
          document
            .getElementById("nmePhoto")
            .classList.remove("nmeAttackClass");
          document.getElementById("nmePhoto").classList.remove("mAttackClass");
          document.getElementById("nmePhoto").classList.remove("damageClass");
          document.getElementById("nmePhoto").classList.remove("mDamageClass");
          document.getElementById("charPhoto").classList.remove("mAttackClass");
          document.getElementById("charPhoto").classList.remove("damageClass");
          document.getElementById("charPhoto").classList.remove("mDamageClass");

          document.getElementById("charPhoto").classList.add("attackClass");

          let x = Math.floor(char[0].att + Math.random() * 40 - char[1].def);
          let y = 1 + Math.floor(x / 2);
          if (x < 1) {
            message("Gyenge támadásod lazán hárította az ellenfél!");
            char[0].att += Math.round(Math.random());
            changeVal(0, 2, char[0].att);
          } else {
            document.getElementById("nmePhoto").classList.add("damageClass");
            char[1].hp -= y;
            changeVal(1, 1, char[1].hp);
            char[0].att++;
            changeVal(0, 2, char[0].att);
            message("Vad támadásoddal " + y + " Erőt sebeztél ellenfeleden!");
            checkDeath();
          }
          if (char[1].hp > 0) {
            setTimeout(function () {
              document
                .getElementById("charPhoto")
                .classList.remove("attackClass");
              document
                .getElementById("nmePhoto")
                .classList.remove("damageClass");
              nmeAttack();
            }, 4600);
          }
        });

      //Magic attack
      document
        .getElementById("mAttackBtn")
        .addEventListener("click", function () {
          attBtn.disabled = true;
          mAttBtn.disabled = true;
          fleeBtn.disabled = true;
          document
            .getElementById("nmePhoto")
            .classList.remove("nmeAttackClass");
          document.getElementById("nmePhoto").classList.remove("mAttackClass");
          document.getElementById("nmePhoto").classList.remove("damageClass");
          document.getElementById("nmePhoto").classList.remove("mDamageClass");
          document.getElementById("charPhoto").classList.remove("AttackClass");
          document.getElementById("charPhoto").classList.remove("damageClass");
          document.getElementById("charPhoto").classList.remove("mDamageClass");

          document.getElementById("charPhoto").classList.add("mAttackClass");

          let x = Math.floor(char[0].mAtt + Math.random() * 40 - char[1].mDef);
          let y = 1 + Math.floor(x / 2);
          if (x < 1) {
            message("Gyenge malware-edet felfedezte ellenfeled!");
            char[0].mAtt += Math.round(Math.random());
            changeVal(0, 4, char[0].mAtt);
          } else {
            document.getElementById("nmePhoto").classList.add("mDamageClass");
            char[1].hp -= y;
            changeVal(1, 1, char[1].hp);
            char[0].mAtt++;
            changeVal(0, 4, char[0].mAtt);
            message("Sikeres hacked " + y + " Erőt szívott le ellenfeledtől!");
            checkDeath();
          }
          if (char[1].hp > 0) {
            setTimeout(function () {
              document
                .getElementById("charPhoto")
                .classList.remove("mAttackClass");
              document
                .getElementById("nmePhoto")
                .classList.remove("mDamageClass");
              nmeAttack();
            }, 4600);
          }
        });

      //coward! (flee)
      document.getElementById("fleeBtn").addEventListener("click", function () {
        document.getElementById("nmePhoto").classList.remove("mAttackClass");
        document.getElementById("nmePhoto").classList.remove("damageClass");
        document.getElementById("nmePhoto").classList.remove("mDamageClass");
        document.getElementById("charPhoto").classList.remove("AttackClass");
        document.getElementById("charPhoto").classList.remove("damageClass");
        document.getElementById("charPhoto").classList.remove("mDamageClass");
        document.getElementById("charPhoto").classList.add("mAttackClass");

        document.getElementById("nmePhoto").classList.add("nmeFleeClass");
        document.getElementById("charPhoto").classList.add("fleeClass");
        attBtn.disabled = true;
        mAttBtn.disabled = true;
        fleeBtn.disabled = true;
        let x =
          1 +
          Math.abs(
            Math.floor((char[1].att + char[1].mAtt - Math.random() * step) / 4)
          );
        message("Gyáva futásod közben " + x + " Erőt sebesülsz!");
        char[0].hp -= x;
        changeVal(0, 1, char[0].hp);
        let y = 50 - x;
        if (y < 10) {
          y = 10;
        }
        score -= y;
        document.getElementById("score").innerHTML = "Pont: " + score;
        document.getElementById("other").innerHTML =
          "<button id='nextBtn'>Tovább</button>";
        document.getElementById("other").innerHTML =
          "<button id='nextBtn'>Tovább</button>";
        document.getElementById("nextBtn").addEventListener("click", newRoom);
        checkDeath();
      });

      // Ez az ellentámadás, amit meg kell hívni mindkét Attack gomb után
      function nmeAttack() {
        if (rooms[room].values[1] > 0) {
          document.getElementById("nmePhoto").classList.add("nmeAttackClass");
          let x = Math.floor(char[1].att + Math.random() * 30 - char[0].def);
          let y = 1 + Math.floor(x / 4.2);
          if (x < 1) {
            message("Blokkoltad ellendeled támadását!");
            char[0].def++;
            changeVal(0, 3, char[0].def);
          } else {
            document.getElementById("charPhoto").classList.add("damageClass");
            char[0].hp -= y;
            changeVal(0, 1, char[0].hp);
            char[0].def += Math.round(Math.random());
            changeVal(0, 3, char[0].def);
            message("Szadista ellenfeled " + y + " sebzést sózott rád!");
          }
        } else {
          document.getElementById("nmePhoto").classList.add("mAttackClass");
          let x = Math.floor(char[1].mAtt + Math.random() * 30 - char[0].mDef);
          let y = 1 + Math.floor(x / 4.2);
          if (x < 1) {
            message("Törölted ellenfeled primitív malware-jét.");
            char[0].mDef++;
            changeVal(0, 5, char[0].mDef);
          } else {
            document.getElementById("charPhoto").classList.add("damageClass");
            char[0].hp -= y;
            changeVal(0, 1, char[0].hp);
            char[0].mDef += Math.round(Math.random());
            changeVal(0, 5, char[0].mDef);
            message(
              "Ellenfeled maleware-je " + y + " Erőnyi alváshiányt okozott."
            );
            attBtn.disabled = false;
            mAttBtn.disabled = false;
            fleeBtn.disabled = false;
          }
        }
        attBtn.disabled = false;
        mAttBtn.disabled = false;
        fleeBtn.disabled = false;
        checkDeath();
      }

      //Ez meg megnézi, hogy meghalt-e valaki. Meg kell hívni minden támadás végén és pontvesztéskor
      function checkDeath() {
        if (char[0].hp < 1) {
          document.getElementById("charPhoto").classList.remove("damageClass");
          document.getElementById("charPhoto").classList.remove("mDamageClass");
          document.getElementById("charPhoto").classList.add("deathClass");
          changeVal(0, 1, "X");
          message("MEGHALTÁL!");
          let screen = document.getElementById("screen");
          document.body.className = "disappear darkening";
          setTimeout(function () {
            audio.pause();
            audio.load();
            screen.innerHTML = `
            <img class="endPics" src="./img/ricsi_wrong.jpg">
            <h3>AN UNEXPECTED ERROR OCCURRED</h3>
            <p class="deadText">Azért szép életed volt, ne búsulj!</p>
            <p class="deadText">Eljutottál a ${step}. szintig.</p>
            <p class="deadText">Összeszedtél ${score} pontot.</p>
            `;
            if (score > hiScore) {
              hiScore = score;
              screen.insertAdjacentHTML(
                "beforeend",
                `
              <h3>Ezzel új rekordot állítottál fel! GRATULÁLUNK!</h3>
              `
              );
            } else {
              screen.insertAdjacentHTML(
                "beforeend",
                `
              <p class="deadText">Ezzel sajnos nem sikerült megdönteni az eddigi ${hiScore} rekordot.</p>
              `
              );
            }
            screen.insertAdjacentHTML(
              "beforeend",
              `
              <p class="deadText">Kérlek, értékeld a játékot az alábbi gombok egyikével!</p>
              <button id="newGameBtn">A világ legjobb játéka, akarok még játszani!</button>
              <br>
              <p class="deadText">Köszönettel:</p>
              <img class="endPics" src="./img/frontend-logos1.png">
              `
            );
            document.body.className = "appear";
            document
              .getElementById("newGameBtn")
              .addEventListener("click", function () {
                step = 0;
                score = 0;
                weaponNo = 0;
                armorNo = 0;
                toolNo = 0;
                char[0].hp = Math.round(50 + 70 * Math.random());
                char[0].att = Math.round(30 + 50 * Math.random());
                char[0].def = Math.round(40 + 60 * Math.random());
                char[0].mAtt = Math.round(30 + 50 * Math.random());
                char[0].mDef = Math.round(40 + 60 * Math.random());
                consoleArray = [
                  "<br><br>Nyújtózol egyet sikeres feltámadásod után...",
                ];
                start = true;
                newRoom();
              });
          }, 2501);
        }
        if (char[1].hp < 1) {
          document.getElementById("nmePhoto").classList.remove("damageClass");
          document.getElementById("nmePhoto").classList.remove("mDamageClass");
          document.getElementById("nmePhoto").classList.add("deathClass");
          changeVal(1, 1, "X");
          attBtn.disabled = true;
          mAttBtn.disabled = true;
          fleeBtn.disabled = true;
          message("Ellenfeled nem bírta tovább támadásaid súlyát!");
          char[0].hp += rooms[room].values[0] * 4;
          char[0].att += rooms[room].values[1] * 3;
          char[0].def += rooms[room].values[2] * 2;
          char[0].mAtt += rooms[room].values[3] * 3;
          char[0].mDef += rooms[room].values[4] * 2;
          changeVal(0, 1, char[0].hp);
          changeVal(0, 2, char[0].att);
          changeVal(0, 3, char[0].def);
          changeVal(0, 4, char[0].mAtt);
          changeVal(0, 5, char[0].mDef);
          for (let i = 0; i < 5; i++) {
            score += rooms[room].values[i] * 10;
          }
          score += step;
          document.getElementById("score").innerHTML = "Pont: " + score;
          document.getElementById("other").innerHTML =
            "<button id='nextBtn'>Tovább</button>";
          document.getElementById("nextBtn").addEventListener("click", newRoom);
        }
      }
    } else {
      // Quiz szoba generálása
      if (starting === true || rooms[curRoom].type === "attack") {
        audio.src = "./audio/quizMusic.mp3";
        starting = false;
      }
      audio.play();
      if (char[0].hp < 100) {
        char[0].hp += Math.round(Math.random() * 7) + 1;
      }
      document.getElementById("screen").innerHTML = `
        <img id='roomImgQ' src='${rooms[room].roomPic}' alt='Quiz Room'><br>
        <div id='stepNcounter'>
          <div id='score'>Pont: ${score}</div>
          <div id='counter'>Szint: ${step}</div>
        </div>
        <div id = 'roomDesc'>${rooms[room].desc}</div>
        <div id = 'roomQuestion'>${rooms[room].question}</div>
        <div id="questionBtns">
          <button class='answerBtns' id='answer0'>${rooms[room].answers[0]}</button>
          <button class='answerBtns' id='answer1'>${rooms[room].answers[1]}</button>
          <br>
          <button class='answerBtns' id='answer2'>${rooms[room].answers[2]}</button>
          <button class='answerBtns' id='answer3'>${rooms[room].answers[3]}</button>
        </div>
        
        <div id='objects'>
          <img class='smallObj' id='tool' src='${tools[toolNo].pic}' title='${tools[toolNo].name}&#10;${tools[toolNo].desc}'>
        </div>
        <br>
        <div id='message'></div>
        <div id='other'></div>
      `;
      document.getElementById("other").innerHTML = "";

      //mit csinálnak a QUIZ gombok
      let correct = false;
      let rightA = rooms[room].key;
      let aBtn0 = document.getElementById("answer0");
      let aBtn1 = document.getElementById("answer1");
      let aBtn2 = document.getElementById("answer2");
      let aBtn3 = document.getElementById("answer3");
      let toolBtn = document.getElementById("tool");

      toolBtn.addEventListener("click", magic);

      aBtn0.addEventListener("click", function () {
        if (rightA === 0) {
          correct = true;
        }
        checkAnswer(correct);
      });
      aBtn1.addEventListener("click", function () {
        if (rightA === 1) {
          correct = true;
        }
        checkAnswer(correct);
      });
      aBtn2.addEventListener("click", function () {
        if (rightA === 2) {
          correct = true;
        }
        checkAnswer(correct);
      });
      aBtn3.addEventListener("click", function () {
        if (rightA === 3) {
          correct = true;
        }
        checkAnswer(correct);
      });
      // Ide jön, hogy mi lesz a válaszok esetén
      function checkAnswer(correct) {
        aBtn0.disabled = true;
        aBtn1.disabled = true;
        aBtn2.disabled = true;
        aBtn3.disabled = true;
        if (correct) {
          score += rooms[room].score;
          document.getElementById("score").innerHTML = "Pont: " + score;
          char[0].hp += Math.round(Math.random() * 3) + 1;
          winObject();
        } else {
          message("Rossz válasz!");
          score -= Math.round((150 - rooms[room].score) / 2);
          document.getElementById("score").innerHTML = "Pont: " + score;
          document.getElementById("other").innerHTML =
            "<button id='nextBtn'>Tovább</button>";
          document.getElementById("nextBtn").addEventListener("click", newRoom);
        }
      }
    }
  }

  //Itt kezdődik az egész szép tárgynyeremény történet
  function winObject() {
    let award = {};
    let old = {};
    if (rooms[room].prize[0] === 0) {
      // Weapon nyeremény
      award = weapons[rooms[room].prize[1]];
      old = weapons[weaponNo];
      if (weaponNo > 0) {
        if (award === old) {
          document.getElementById("screen").innerHTML = `
          <h3>Tiéd lett egy ${award.name}!</h3>
          <br><br>
          <p>De ilyened már van!</p><br>
          <button id='nextBtn'>Tovább</button>`;
          document.getElementById("nextBtn").addEventListener("click", newRoom);
        } else {
          document.getElementById("screen").innerHTML = `
          <h3>Tiéd lett egy ${award.name}!</h3>
          <br><br><br><br>
          <div id="objectField">
            <div id= 'oldVals'>
              <p>Jelenlegi tárgy:</p>
              <br><img id='oldPhoto' class='smallObject' scr='${old.pic}'>
              <br>Név: ${old.name}
              <br>Leírás: ${old.desc}
              <br>Hatás: <br>
              <ul>
                <li>${old.change[0]} Erő</li>
                <li>${old.change[1]} Támadás</li>
                <li>${old.change[2]} Védekezés</li>
                <li>${old.change[3]} Hackelés</li>
                <li>${old.change[4]} Tűzfal</li>
              </ul>
            </div>
            <div id= 'awardVals'>
              <p>Új tárgy:</p>
              <br><img id='awardPhoto' class='smallObject' scr='${award.pic}'>
              <br>Név: ${award.name}
              <br>Leírás: ${award.desc}
              <br>Hatás: <br>
              <ul>
                <li>${award.change[0]} Erő</li>
                <li>${award.change[1]} Támadás</li>
                <li>${award.change[2]} Védekezés</li>
                <li>${award.change[3]} Hackelés</li>
                <li>${award.change[4]} Tűzfal</li>
              </ul>
            </div>
          </div>
          <br>
          <p id="askChange">Lecseréled?</p>
          <button id='yesBtn'>Igen</button>
          <button id='noBtn'>Nem</button>`;
          document.getElementById("awardPhoto").src = `${award.pic}`;
          document.getElementById("oldPhoto").src = `${old.pic}`;
          document
            .getElementById("yesBtn")
            .addEventListener("click", function () {
              getObject(old, award);
              weaponNo = award.id;
              newRoom();
            });
          document.getElementById("noBtn").addEventListener("click", newRoom);
        }
      } else {
        document.getElementById("screen").innerHTML = `
        <h3>Tiéd lett egy ${award.name}!</h3>
        <br><br><br><br>
          <div id="objectField">
            <div id= 'awardVals'>
            <br>
              <img id= 'awardPhoto' class='smallObject' scr='${award.pic}'/>
              <br>Név: ${award.name}
              <br>Leírás: ${award.desc}
              <br>Hatás: <br>
              <ul>
                <li>${award.change[0]} Erő</li>
                <li>${award.change[1]} Támadás</li>
                <li>${award.change[2]} Védekezés</li>
                <li>${award.change[3]} Hackelés</li>
                <li>${award.change[4]} Tűzfal</li>
              </ul>
            </div>
          </div>
          <button id='nextBtn'>Tovább</button>`;
        document.getElementById("awardPhoto").src = `${award.pic}`;
        getObject(old, award);
        weaponNo = award.id;
        document.getElementById("nextBtn").addEventListener("click", newRoom);
      }
    } else if (rooms[room].prize[0] === 1) {
      //Armor nyeremény
      award = armors[rooms[room].prize[1]];
      old = armors[armorNo];
      if (armorNo > 0) {
        if (award === old) {
          document.getElementById("screen").innerHTML = `
          <h3>Tiéd lett egy ${award.name}!</h3>
          <br><br>
          <p> De ilyened már van!</p><br>
          <button id='nextBtn'>Tovább</button>`;
          document.getElementById("nextBtn").addEventListener("click", newRoom);
        } else {
          document.getElementById("screen").innerHTML = `
          <h3>Tiéd lett egy ${award.name}!</h3>
          <br><br><br><br>
          <div id="objectField">
            <br>
            <div id= 'oldVals'>
              <p>Jelenlegi tárgy:</p>
              <br><img id='oldPhoto' class='smallObject' scr='${old.pic}'>
              <br>Név: ${old.name}
              <br>Leírás: ${old.desc}
              <br>Hatás: <br>
              <ul>
                <li>${old.change[0]} Erő</li>
                <li>${old.change[1]} Támadás</li>
                <li>${old.change[2]} Védekezés</li>
                <li>${old.change[3]} Hackelés</li>
                <li>${old.change[4]} Tűzfal</li>
              </ul>
            </div>
            <div id= 'awardVals'>
              <p>Új tárgy:</p>
              <br><img id='awardPhoto' class='smallObject' scr='${award.pic}'>
              <br>Név: ${award.name}
              <br>Leírás: ${award.desc}
              <br>Hatás: <br>
              <ul>
                <li>${award.change[0]} Erő</li>
                <li>${award.change[1]} Támadás</li>
                <li>${award.change[2]} Védekezés</li>
                <li>${award.change[3]} Hackelés</li>
                <li>${award.change[4]} Tűzfal</li>
              </ul>
            </div>
          </div>
          <p id="askChange">Lecseréled?</p>
          <button id='yesBtn'>Igen</button>
          <button id='noBtn'>Nem</button>`;
          document.getElementById("oldPhoto").src = `${old.pic}`;
          document.getElementById("awardPhoto").src = `${award.pic}`;
          document
            .getElementById("yesBtn")
            .addEventListener("click", function () {
              getObject(old, award);
              armorNo = award.id;
              newRoom();
            });
          document.getElementById("noBtn").addEventListener("click", newRoom);
        }
      } else {
        document.getElementById("screen").innerHTML = `
          <h3>Tiéd lett egy ${award.name}!</h3>
          <br><br><br><br>
          <div id="objectField">
            <div id= 'awardVals'>
              <br><img id='awardPhoto' class='smallObject' scr='${award.pic}'>
              <br>Név: ${award.name}
              <br>Leírás: ${award.desc}
              <br>Hatás: <br>
              <ul>
                <li>${award.change[0]} Erő</li>
                <li>${award.change[1]} Támadás</li>
                <li>${award.change[2]} Védekezés</li>
                <li>${award.change[3]} Hackelés</li>
                <li>${award.change[4]} Tűzfal</li>
              </ul>
            </div>
          </div>
          <button id='nextBtn'>Tovább</button>`;
        document.getElementById("awardPhoto").src = `${award.pic}`;
        getObject(old, award);
        armorNo = award.id;
        document.getElementById("nextBtn").addEventListener("click", newRoom);
      }
    } else {
      // Tools nyeremény
      award = tools[rooms[room].prize[1]];
      old = tools[toolNo];
      if (toolNo > 0) {
        if (award === old) {
          document.getElementById("screen").innerHTML = `
          <h3>Tiéd lett egy ${award.name}!</h3>
          <br><br>
          <p> De ilyened már van!</p><br>
          <button id='nextBtn'>Tovább</button>`;
          document.getElementById("nextBtn").addEventListener("click", newRoom);
        } else {
          document.getElementById("screen").innerHTML = `
          <h3>Tiéd lett egy ${award.name}!</h3>
          <br><br><br><br>
          <div id="objectField">
            <div id= 'oldVals'>
              <p>Jelenlegi tárgy:</p>
              <br><img id='oldPhoto' class='smallObject' scr='${old.pic}'>
              <br>Név: ${old.name}
              <br>Leírás: ${old.desc}
            </div>
            <div id= 'awardVals'>
              <p>Új tárgy:</p>
              <br><img id='awardPhoto' class='smallObject' scr='${award.pic}'>
              <br>Név: ${award.name}
              <br>Leírás: ${award.desc}
            </div>
          </div>
          <br><br><p id="askChange">Lecseréled?</p>
          <button id='yesBtn'>Igen</button>
          <button id='noBtn'>Nem</button>`;
          document.getElementById("oldPhoto").src = `${old.pic}`;
          document.getElementById("awardPhoto").src = `${award.pic}`;
          document
            .getElementById("yesBtn")
            .addEventListener("click", function () {
              toolNo = award.id;
              newRoom();
            });
          document.getElementById("noBtn").addEventListener("click", newRoom);
        }
      } else {
        document.getElementById("screen").innerHTML = `
        <h3>Tiéd lett egy ${award.name}!</h3>
        <br><br><br><br>
        <div id="objectField">
            <div id= 'awardVals'>
              <br><img id='awardPhoto' class='smallObject' scr='${award.pic}'>
              <br>Név: ${award.name}
              <br>Leírás: ${award.desc}
            </div>
          </div>
          <button id='nextBtn'>Tovább</button>`;
        document.getElementById("awardPhoto").src = `${award.pic}`;
        toolNo = award.id;
        document.getElementById("nextBtn").addEventListener("click", newRoom);
      }
    }
  }

  //Az elfogadott tárgy (weapon/armor) változtatja az értékeket
  function getObject(old, award) {
    char[0].hp = char[0].hp - old.change[0] + award.change[0];
    char[0].att = char[0].att - old.change[1] + award.change[1];
    char[0].def = char[0].def - old.change[2] + award.change[2];
    char[0].mAtt = char[0].mAtt - old.change[3] + award.change[3];
    char[0].mDef = char[0].mDef - old.change[4] + award.change[4];
    /* if (rooms[room].type === "attack") {
      changeVal(0, 1, char[0].hp);
      changeVal(0, 2, char[0].att);
      changeVal(0, 3, char[0].def);
      changeVal(0, 4, char[0].mAtt);
      changeVal(0, 5, char[0].mDef);
    } */
  }

  //És itt van a tárgynyeremények vége

  //így változik a saját vagy az ellenség értéke: x=játékos, y= hanyadik érték, z= mire változik
  function changeVal(x, y, z) {
    document.getElementById("val_" + x + "_" + y).innerHTML = z;
    document.getElementById("val_" + x + "_" + y).style =
      "width: " + (17 + z * 1.1) + "px";
  }

  function message(text) {
    // A konzol funkció még nem teljesen működik, ha tudsz vele kezdeni valamit póbáld meg Gergő, ha nem akkor kivesszük!
    consoleArray.unshift("<br><br>" + text);
    if (rooms[room].type === "attack") {
      document.getElementById("consoleText").innerHTML = consoleArray;
    }
    const m = document.getElementById("message");
    m.className = "messageDiv appear";
    m.innerHTML = text;
    clearTimeout(timo);
    timo = setTimeout(function () {
      m.className = "messageDiv disappear";
    }, text.length * 70);
    timo = setTimeout(function () {
      m.innerHTML = "";
    }, text.length * 70 + 1501);
  }

  //itt jön a toolok varázslatos világa!
  function magic() {
    switch (toolNo) {
      case 0:
        message("Kemény marok, csak még üres...");
        return;

      case 1:
        if (rooms[room].type === "quiz") {
          message("Ez itt nem használható!");
          return;
        }
        message("Felforr szent haragod!");
        var attDif = Math.round(char[0].att * 0.4);
        var mAttDif = Math.round(char[0].mAtt * 0.4);
        char[0].att += attDif;
        char[0].mAtt += mAttDif;
        changeVal(0, 2, char[0].att);
        changeVal(0, 4, char[0].mAtt);
        setTimeout(function () {
          message("Feltámadt benned a könyörület.");
          char[0].att -= attDif;
          char[0].mAtt -= mAttDif;
          if (rooms[room].type === "attack") {
            changeVal(0, 2, char[0].att);
            changeVal(0, 4, char[0].mAtt);
          }
        }, 30000);
        break;

      case 2:
        if (rooms[room].type === "quiz") {
          message("Ez itt nem használható!");
          return;
        }
        message("Befeszülsz...");
        var defDif = Math.round(char[0].def * 0.4);
        var mDefDif = Math.round(char[0].mDef * 0.4);
        char[0].def += defDif;
        char[0].mDef += mDefDif;
        changeVal(0, 3, char[0].def);
        changeVal(0, 5, char[0].mDef);
        setTimeout(function () {
          message("Elernyedsz...");
          char[0].def -= defDif;
          char[0].mDef -= mDefDif;
          if (rooms[room].type === "attack") {
            changeVal(0, 3, char[0].def);
            changeVal(0, 5, char[0].mDef);
          }
        }, 30000);
        break;

      case 3:
        if (rooms[room].type === "quiz") {
          message("Ez itt nem használható!");
          return;
        }
        message("Halál az ellenfélre!");
        char[1].hp = Math.floor(char[1].hp * 0.6);
        char[1].att = Math.floor(char[1].att * 0.8);
        char[1].def = Math.floor(char[1].def * 0.7);
        char[1].mAtt = Math.floor(char[1].mAtt * 0.8);
        char[1].mDef = Math.floor(char[1].mDef * 0.7);
        changeVal(1, 1, char[1].hp);
        changeVal(1, 2, char[1].att);
        changeVal(1, 3, char[1].def);
        changeVal(1, 4, char[1].mAtt);
        changeVal(1, 5, char[1].mDef);
        break;

      case 4:
        if (rooms[room].type === "attack") {
          message("Ez itt nem használható!");
          return;
        }
        message("Ez egy marhaság!");
        let x = parseInt(Math.random() * 4);
        if (x === rooms[room].key) {
          x += 1;
          if (x === 4) {
            x = 0;
          }
        }
        let b = document.getElementById("answer" + x);
        b.disabled = true;
        break;

      case 5:
        if (rooms[room].type === "quiz") {
          message("Ez itt nem használható!");
          return;
        }
        message("Hú, ez jobb, mint a szteroid!");
        char[0].hp += Math.round(30 + (step / 2) * Math.random());
        char[0].att += Math.round(1 + 6 * Math.random());
        char[0].def += Math.round(1 + 6 * Math.random());
        char[0].mAtt += Math.round(1 + 6 * Math.random());
        char[0].mDef += Math.round(1 + 6 * Math.random());
        changeVal(0, 1, char[0].hp);
        changeVal(0, 2, char[0].att);
        changeVal(0, 3, char[0].def);
        changeVal(0, 4, char[0].mAtt);
        changeVal(0, 5, char[0].mDef);
        break;

      case 6:
        if (rooms[room].type === "attack") {
          message("Ez itt nem használható!");
          return;
        }
        message("Jegyezd meg egy életre!");
        for (let x = 0; x < 4; x++) {
          if (x !== rooms[room].key) {
            document.getElementById("answer" + x).disabled = true;
          }
        }
        break;

      default:
    }
    toolNo = 0;
    document.getElementById("tool").src = `${tools[toolNo].pic}`;
    document.getElementById("tool").title = ``;
  }
}

window.addEventListener("load", initGame);
