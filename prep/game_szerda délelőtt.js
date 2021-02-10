
function initGame() {
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
    }];


  //Szobák (használd egyelőre a prep/rooms-x file-t)
  let rooms = [
    {
      roomPic: "./img/",
      type: "attack",
      nmePic: "./img/",
      desc: "Rádtámad egy hülye",
      values: [2, 2, 3, 0, 1]
    },
    {
      roomPic: "./img/",
      type: "quiz",
      desc: "Előugrik egy csöves és megkérdezi.",
      question: "Ki vagy?",
      answers: ["Én", "Anyád", "Pista", "Gizi"],
      key: 1,
      score: 100,
      prize: [0, 1]
    },
  ]

  //Tárgyak (használd egyelőre a prep/objects-x file-t)
  let weapons = [
    {
      id: 0,
      pic: "./img/leftHandX.png",
      name: "üres balkéz",
      desc: "",
      change: [0, 0, 0, 0, 0]
    },
    {
      id: 1,
      pic: "./img/armorX.png",
      name: "törölköző",
      desc: "Ezzel orrba nyomhatod az ellenfelet.",
      change: [1, 10, 1, 0, 1]
    }
  ]

  let armors = [
    {
      id: 0,
      pic: "./img/armorX.png",
      name: "nincs páncél",
      desc: "",
      change: [0, 0, 0, 0, 0]
    },
    {

    }
  ]

  let tools = [
    {
      id: 0,
      pic: "./img/rightHandX.png",
      name: "üres jobbkéz",
      desc: "",
    },
    {

    }
  ]

  //Karakterválasztás
  charBtn1.addEventListener("click", choosechar1);
  charBtn2.addEventListener("click", choosechar2);
  charBtn3.addEventListener("click", choosechar3);

  function choosechar1() {
    char[0].img = "./img/"
    char[0].hp = 70;
    char[0].att = 40;
    char[0].def = 60;
    char[0].mAtt = 20;
    char[0].mDef = 30;
    newRoom();
  }
  function choosechar2() {
    char[0].img = "./img/"
    char[0].hp = 50;
    char[0].att = 70;
    char[0].def = 30;
    char[0].mAtt = 50;
    char[0].mDef = 20;
    newRoom();
  }
  function choosechar3() {
    char[0].img = "./img/"
    char[0].hp = 40;
    char[0].att = 30;
    char[0].def = 30;
    char[0].mAtt = 70;
    char[0].mDef = 50;
    newRoom();
  }

  //Új szoba generálás
  function newRoom() {
    step++;
    let curRoom = room;
    room = parseInt(Math.random() * rooms.length);
    if (room === curRoom) {
      room += 1;
      if (room === rooms.length) { room = 0 };
    };
    if (rooms[room].type === "attack") {
      document.getElementById("screen").innerHTML = `
        <div id='counter'>Lépés: ${step}</div>
        <div id='score'>Pont: ${score}</div>
        <img id='roomImg' src='${rooms[room].roomPic}' alt='Attack Room'><br>
        <div id = 'roomDesc'>${rooms[room].desc}</div>
        <button id='attackBtn'>Támadás</button>
        <button id='mAttackBtn'>Hackelés</button>
        <button id='fleeBtn'>Menekülés</button>
        <div id='values'>
          <div id='charValues'>JELLEMZŐID
            <br>Erő: <span id='val_0_1'>${char[0].hp}</span>
            <br>Támadás: <span id='val_0_2'>${char[0].att}</span>
            <br>Védekezés: <span id='val_0_3'>${char[0].def}</span>
            <br>Hackelés: <span id='val_0_4'>${char[0].mAtt}</span>
            <br>Tűzfal: <span id='val_0_5'>${char[0].mDef}</span>
            <br><img id='charPhoto' src='${char[0].pic}'>
          </div>
          <div id='nmeValues'>ELLENFÉL
            <br>Erő: <span id='val_1_1'>${char[1].hp}</span>
            <br>Támadás: <span id='val_1_2'>${char[1].att}</span>
            <br>Védekezés: <span id='val_1_3'>${char[1].def}</span>
            <br>Hackelés: <span id='val_1_4'>${char[1].mAtt}</span>
            <br>Tűzfal: <span id='val_1_5'>${char[1].mDef}</span>
            <br><img id='nmePhoto' src='${rooms[room].nmePic}'>
          </div>
        </div>
        <div id='objects'>
          <img id='weapon' src='${weapons[weaponNo].pic}' title='${weapons[weaponNo].name}'>
          <img id='armor' src='${armors[armorNo].pic}' title='${armors[armorNo].name}'>
          <img id='tool' src='${tools[toolNo].pic}' title='${tools[toolNo].name}'>
        </div>
        <div id='message'></div>
        <div id='other'></div>
      `;
      //ellenfél értékei
      char[1].hp = parseInt(step / 2 + rooms[room].values[0] * 20 + Math.random() * 50);
      changeVal(1, 1, char[1].hp);
      char[1].att = parseInt(step / 2 + rooms[room].values[1] * 20 + Math.random() * 50);
      changeVal(1, 2, char[1].att);
      char[1].def = parseInt(step / 2 + rooms[room].values[2] * 20 + Math.random() * 50);
      changeVal(1, 3, char[1].def);
      char[1].mAtt = parseInt(step / 2 + rooms[room].values[3] * 20 + Math.random() * 50);
      changeVal(1, 4, char[1].mAtt);
      char[1].mDef = parseInt(step / 2 + rooms[room].values[4] * 20 + Math.random() * 50);
      changeVal(1, 5, char[1].mDef);
      document.getElementById("other").innerHTML = "";

      //mit csinálnak az ATTACK gombok
      document.getElementById("attackBtn").addEventListener("click", function () {

      });
      document.getElementById("mAttackBtn").addEventListener("click", function () {

      });
      document.getElementById("fleeBtn").addEventListener("click", function () {

      });
      // Ez az ellentámadás, amit meg kell hívni mindkét Attack gomb után
      function nmeAttack() {

      }
      //Ez meg megnbézi, hogy meghalt-e valaki. Meg kell hívni minden támadás végén és pontvesztéskor
      function checkDeath() {
        if (char[0].hp < 1) {
          changeVal(0, 1, "X");
          message("MEGHALTÁL!");
          //itt kell valami tragikus vég
        }
        if (char[1].hp < 1) {
          changeVal(1, 1, "X");
          message("MEGHALT AZ ELLENFÉL!")
          document.getElementById("other").innerHTML = "<button id='nextBtn'>Tovább</button>";
          document.getElementById("nextBtn").addEventListener("click", newroom);
        }
      }
    } else {
      // Quiz szoba generálása
      document.getElementById("screen").innerHTML = `
        <div id='counter'>Lépés: ${step}</div>
        <div id='score'>Pont: ${score}</div>
        <img id='roomImg' src='${rooms[room].roomPic}' alt='Quiz Room'><br>
        <div id = 'roomDesc'>${rooms[room].desc}</div>
        <div id = 'roomQuestion'>${rooms[room].question}</div>
        <button id='answer0'>${rooms[room].answers[0]}</button>
        <button id='answer1'>${rooms[room].answers[1]}</button>
        <button id='answer2'>${rooms[room].answers[2]}</button>
        <button id='answer3'>${rooms[room].answers[3]}</button>
        <div id='values'>
          <div id='charValues'>JELLEMZŐID
            <br>Erő: <span id='val_0_1'>${char[0].hp}</span>
            <br>Támadás: <span id='val_0_2'>${char[0].att}</span>
            <br>Védekezés: <span id='val_0_3'>${char[0].def}</span>
            <br>Hackelés: <span id='val_0_4'>${char[0].mAtt}</span>
            <br>Tűzfal: <span id='val_0_5'>${char[0].mDef}</span>
            <br><img id='charPhoto' src='${char[0].pic}'>
          </div>
        </div>
        <div id='objects'>
          <img id='weapon' src='${weapons[weaponNo].pic}' title='${weapons[weaponNo].name}'>
          <img id='armor' src='${armors[armorNo].pic}' title='${armors[armorNo].name}'>
          <img id='tool' src='${tools[toolNo].pic}' title='${tools[toolNo].name}'>
        </div>
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
      aBtn0.addEventListener("click", function () {
        if (rightA === 0) { correct = true; }
        checkAnswer(correct);
      });
      aBtn1.addEventListener("click", function () {
        if (rightA === 1) { correct = true; }
        checkAnswer(correct);
      });
      aBtn2.addEventListener("click", function () {
        if (rightA === 2) { correct = true; }
        checkAnswer(correct);
      });
      aBtn3.addEventListener("click", function () {
        if (rightA === 3) { correct = true; }
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
          document.getElementById("score").innerHTML = "Pont: ${score}";
          winObject();
        } else {
          message("Rossz válasz!")
          score -= Math.round(rooms[room].score/2);
        }
        document.getElementById("other").innerHTML = "<button id='nextBtn'>Tovább</button>";
        document.getElementById("nextBtn").addEventListener("click", newRoom);
      }
    }
  }
  //Itt kezdődik az egész kib@szott tárgynyeremény
  function winObject() {
    let award = {};
    let old = {};
    if (rooms[room].prize[0] === 0) {
      // Weapon nyeremény
      award = weapons[rooms[room].prize[1]];
      old = weapons[weaponNo];
      message("Tiéd lett egy " + award.name);
      if (weaponNo > 0) {
        if (award === old) {
          document.getElementById("other").innerHTML = `
          <p>Ilyened már van!</p><br>
          <button id='nextBtn'>Tovább</button>"`;
          document.getElementById("nextBtn").addEventListener("click", newRoom);
        } else {
          document.getElementById("other").innerHTML = `
          <div id="objectField"
            <div id= 'oldVals'>
              <p>Jelenlegi tárgy:</p>
              <br><img scr='${old.pic} alt='új tárgy'>
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
              <br><img scr='${award.pic} alt='új tárgy'>
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
          <br><br><p>Lecseréled?</p>
          <button id='yesBtn'>Igen</button>"
          <button id='noBtn'>Nem</button>"`;
          document.getElementById("yesBtn").addEventListener("click", function () {
            getObject(old, award);
            weaponNo = award.id;
          });
          document.getElementById("noBtn").addEventListener("click", newRoom);
        }
      } else {
        document.getElementById("other").innerHTML = `
          <div id="objectField"
            <div id= 'awardVals'>
              <p>Új tárgy:</p>
              <br><img scr='${award.pic} alt='új tárgy'>
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
          <button id='nextBtn'>Tovább</button>"`;
        getObject(old, award);
        weaponNo = award.id;
        document.getElementById("nextBtn").addEventListener("click", newRoom);
      }
    } else if (rooms[room].prize[0] === 1) {
      //Armor nyeremény
      award = armors[rooms[room].prize[1]];
      old = armors[armorNo];
      message("Tiéd lett egy " + award.name);
      if (armorNo > 0) {
        if (award === old) {
          document.getElementById("other").innerHTML = `
          <p>Ilyened már van!</p><br>
          <button id='nextBtn'>Tovább</button>"`;
          document.getElementById("nextBtn").addEventListener("click", newRoom);
        } else {
          document.getElementById("other").innerHTML = `
          <div id="objectField"
            <div id= 'oldVals'>
              <p>Jelenlegi tárgy:</p>
              <br><img scr='${old.pic} alt='új tárgy'>
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
              <br><img scr='${award.pic} alt='új tárgy'>
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
          <br><br><p>Lecseréled?</p>
          <button id='yesBtn'>Igen</button>"
          <button id='noBtn'>Nem</button>"`;
          document.getElementById("yesBtn").addEventListener("click", function () {
            getObject(old, award);
            armorNo = award.id;
          });
          document.getElementById("noBtn").addEventListener("click", newRoom);
        }
      } else {
        document.getElementById("other").innerHTML = `
          <div id="objectField"
            <div id= 'awardVals'>
              <p>Új tárgy:</p>
              <br><img scr='${award.pic} alt='új tárgy'>
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
          <button id='nextBtn'>Tovább</button>"`;
        getObject(old, award);
        armorNo = award.id;
        document.getElementById("nextBtn").addEventListener("click", newRoom);
      }
    } else {
      // Tools nyeremény
      award = tools[rooms[room].prize[1]];
      old = tools[toolNo];
      message("Tiéd lett egy " + award.name);
      if (toolNo > 0) {
        if (award === old) {
          document.getElementById("other").innerHTML = `
          <p>Ilyened már van!</p><br>
          <button id='nextBtn'>Tovább</button>"`;
          document.getElementById("nextBtn").addEventListener("click", newRoom);
        } else {
          document.getElementById("other").innerHTML = `
          <div id="objectField"
            <div id= 'oldVals'>
              <p>Jelenlegi tárgy:</p>
              <br><img scr='${old.pic} alt='új tárgy'>
              <br>Név: ${old.name}
              <br>Leírás: ${old.desc}
            </div>
            <div id= 'awardVals'>
              <p>Új tárgy:</p>
              <br><img scr='${award.pic} alt='új tárgy'>
              <br>Név: ${award.name}
              <br>Leírás: ${award.desc}
            </div>
          </div>
          <br><br><p>Lecseréled?</p>
          <button id='yesBtn'>Igen</button>"
          <button id='noBtn'>Nem</button>"`;
          document.getElementById("yesBtn").addEventListener("click", function () {
            toolNo = award.id;
          });
          document.getElementById("noBtn").addEventListener("click", newRoom);
        }
      } else {
        document.getElementById("other").innerHTML = `
          <div id="objectField"
            <div id= 'awardVals'>
              <p>Új tárgy:</p>
              <br><img scr='${award.pic} alt='új tárgy'>
              <br>Név: ${award.name}
              <br>Leírás: ${award.desc}
            </div>
          </div>
          <button id='nextBtn'>Tovább</button>"`;
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
    changeVal(0, 1, char[0].hp);
    changeVal(0, 2, char[0].att);
    changeVal(0, 3, char[0].def);
    changeVal(0, 4, char[0].mAtt);
    changeVal(0, 5, char[0].mDef);
  }

  //És itt van az "örömlány" tárgynyeremények vége

  //így változik a saját vagy az ellenség értéke: x=játékos, y= hanyadik érték, z= mire változik
  function changeVal(x, y, z) {
    document.getElementById("val_" + x + "_" + y).innerHTML = z;
    document.getElementById("val_" + x + "_" + y).style = "width: " + (15 + z * 1.5) + "px";
  }

  function message(text) {
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

}

window.addEventListener("load", initGame);