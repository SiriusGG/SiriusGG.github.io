(function () {
  "use strict";

  /* ---------------- Data ---------------- */
  var TYPES = ["Normal", "Fire", "Water", "Grass", "Electric", "Ice", "Fighting", "Poison", "Ground",
    "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy"];

  var CHART = {
    Normal: { Rock: 0.5, Ghost: 0, Steel: 0.5 },
    Fire: { Fire: 0.5, Water: 0.5, Grass: 2, Ice: 2, Bug: 2, Rock: 0.5, Dragon: 0.5, Steel: 2 },
    Water: { Fire: 2, Water: 0.5, Grass: 0.5, Ground: 2, Rock: 2, Dragon: 0.5 },
    Grass: { Fire: 0.5, Water: 2, Grass: 0.5, Poison: 0.5, Ground: 2, Flying: 0.5, Bug: 0.5, Rock: 2, Dragon: 0.5, Steel: 0.5 },
    Electric: { Water: 2, Electric: 0.5, Grass: 0.5, Ground: 0, Flying: 2, Dragon: 0.5 },
    Ice: { Fire: 0.5, Water: 0.5, Grass: 2, Ice: 0.5, Ground: 2, Flying: 2, Dragon: 2, Steel: 0.5 },
    Fighting: { Normal: 2, Ice: 2, Poison: 0.5, Flying: 0.5, Psychic: 0.5, Bug: 0.5, Rock: 2, Ghost: 0, Dark: 2, Steel: 2, Fairy: 0.5 },
    Poison: { Grass: 2, Poison: 0.5, Ground: 0.5, Rock: 0.5, Ghost: 0.5, Steel: 0, Fairy: 2 },
    Ground: { Fire: 2, Grass: 0.5, Electric: 2, Poison: 2, Flying: 0, Bug: 0.5, Rock: 2, Steel: 2 },
    Flying: { Grass: 2, Electric: 0.5, Fighting: 2, Bug: 2, Rock: 0.5, Steel: 0.5 },
    Psychic: { Fighting: 2, Poison: 2, Psychic: 0.5, Dark: 0, Steel: 0.5 },
    Bug: { Fire: 0.5, Grass: 2, Fighting: 0.5, Poison: 0.5, Flying: 0.5, Psychic: 2, Ghost: 0.5, Dark: 2, Steel: 0.5, Fairy: 0.5 },
    Rock: { Fire: 2, Ice: 2, Fighting: 0.5, Ground: 0.5, Flying: 2, Bug: 2, Steel: 0.5 },
    Ghost: { Normal: 0, Psychic: 2, Ghost: 2, Dark: 0.5 },
    Dragon: { Dragon: 2, Steel: 0.5, Fairy: 0 },
    Dark: { Fighting: 0.5, Psychic: 2, Ghost: 2, Dark: 0.5, Fairy: 0.5 },
    Steel: { Fire: 0.5, Water: 0.5, Electric: 0.5, Ice: 2, Rock: 2, Steel: 0.5, Fairy: 2 },
    Fairy: { Fire: 0.5, Fighting: 2, Poison: 0.5, Dragon: 2, Dark: 2, Steel: 0.5 }
  };

  function multiplier(attacker, defender) {
    var row = CHART[attacker];
    if (row && Object.prototype.hasOwnProperty.call(row, defender)) return row[defender];
    return 1;
  }
  function categoryOf(m) {
    if (m === 0) return "no";
    if (m === 0.5) return "nve";
    if (m === 2) return "super";
    return "neutral";
  }
  function typeClass(type) {
    return "type-" + type;
  }

  var SYMBOLS = { super: "+", neutral: "", nve: "\u2212", no: "0" };

  /* ---------------- Mode switching ---------------- */
  var tabFull = document.getElementById("tab-full");
  var tabCalc = document.getElementById("tab-calc");
  var modeFull = document.getElementById("mode-full");
  var modeCalc = document.getElementById("mode-calc");

  function setMode(mode) {
    var isFull = mode === "full";
    tabFull.classList.toggle("active", isFull);
    tabCalc.classList.toggle("active", !isFull);
    modeFull.classList.toggle("active", isFull);
    modeCalc.classList.toggle("active", !isFull);
  }
  tabFull.addEventListener("click", function () { setMode("full"); });
  tabCalc.addEventListener("click", function () { setMode("calc"); });

  /* ================= FULL CHART MODE ================= */
  var headRow = document.getElementById("chart-head-row");
  var chartBody = document.getElementById("chart-body");
  var currentTool = "super";
  var userChart = {}; // userChart[attacker][defender] = category
  var submitted = false;

  TYPES.forEach(function (a) {
    userChart[a] = {};
    TYPES.forEach(function (d) { userChart[a][d] = "neutral"; });
  });

  function buildHeadRow(target) {
    var corner = document.createElement("th");
    corner.className = "corner";
    corner.textContent = "Attacker \\ Defender";
    target.appendChild(corner);
    TYPES.forEach(function (d) {
      var th = document.createElement("th");
      th.className = "col-head " + typeClass(d.toLowerCase());
      th.textContent = d;
      target.appendChild(th);
    });
  }
  buildHeadRow(headRow);

  function buildBody() {
    chartBody.innerHTML = "";
    TYPES.forEach(function (a) {
      var tr = document.createElement("tr");
      var rh = document.createElement("th");
      rh.className = "row-head attacker-name " + typeClass(a.toLowerCase());
      rh.textContent = a;
      tr.appendChild(rh);

      TYPES.forEach(function (d) {
        var td = document.createElement("td");
        td.className = "cell val-neutral";
        td.dataset.attacker = a;
        td.dataset.defender = d;
        td.textContent = "";
        td.addEventListener("click", function () {
          if (submitted) return;
          setCell(a, d, currentTool);
        });
        tr.appendChild(td);
      });
      chartBody.appendChild(tr);
    });
  }
  buildBody();

  function setCell(a, d, cat) {
    userChart[a][d] = cat;
    var td = chartBody.querySelector('td[data-attacker="' + a + '"][data-defender="' + d + '"]');
    td.className = "cell val-" + cat;
    td.textContent = SYMBOLS[cat];
  }

  var toolButtons = document.querySelectorAll(".tool-btn");
  toolButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      toolButtons.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      currentTool = btn.dataset.tool;
    });
  });

  document.getElementById("reset-full").addEventListener("click", function () {
    submitted = false;
    document.getElementById("full-results").classList.remove("show");
    TYPES.forEach(function (a) { TYPES.forEach(function (d) { setCell(a, d, "neutral"); }); });
    chartBody.querySelectorAll("td.cell").forEach(function (td) { td.classList.remove("locked"); });
  });

  function renderStaticChart(headTarget, bodyTarget, valueFn, markMistakes) {
    headTarget.innerHTML = "";
    buildHeadRow(headTarget);
    bodyTarget.innerHTML = "";
    TYPES.forEach(function (a) {
      var tr = document.createElement("tr");
      var rh = document.createElement("th");
      rh.className = "row-head " + typeClass(a.toLowerCase());
      rh.textContent = a;
      tr.appendChild(rh);
      TYPES.forEach(function (d) {
        var cat = valueFn(a, d);
        var td = document.createElement("td");
        td.className = "cell locked val-" + cat;
        td.textContent = SYMBOLS[cat];
        if (markMistakes) {
          var correctCat = categoryOf(multiplier(a, d));
          if (cat !== correctCat) td.classList.add("mistake");
        }
        tr.appendChild(td);
      });
      bodyTarget.appendChild(tr);
    });
  }

  document.getElementById("submit-full").addEventListener("click", function () {
    submitted = true;
    chartBody.querySelectorAll("td.cell").forEach(function (td) { td.classList.add("locked"); });

    var totals = { super: 0, neutral: 0, nve: 0, no: 0 };
    var correctCounts = { super: 0, neutral: 0, nve: 0, no: 0 };
    TYPES.forEach(function (a) {
      TYPES.forEach(function (d) {
        var correctCat = categoryOf(multiplier(a, d));
        totals[correctCat]++;
        if (userChart[a][d] === correctCat) correctCounts[correctCat]++;
      });
    });
    var totalPossible = TYPES.length * TYPES.length;
    var totalCorrect = correctCounts.super + correctCounts.neutral + correctCounts.nve + correctCounts.no;

    function pct(x, y) { return y === 0 ? "0.0" : (100 * x / y).toFixed(1); }

    var lines = document.getElementById("score-lines");
    lines.innerHTML =
      "<div>Super effective: " + correctCounts.super + "/" + totals.super + " (" + pct(correctCounts.super, totals.super) + "%)</div>" +
      "<div>Neutral: " + correctCounts.neutral + "/" + totals.neutral + " (" + pct(correctCounts.neutral, totals.neutral) + "%)</div>" +
      "<div>Not very effective: " + correctCounts.nve + "/" + totals.nve + " (" + pct(correctCounts.nve, totals.nve) + "%)</div>" +
      "<div>No effect: " + correctCounts.no + "/" + totals.no + " (" + pct(correctCounts.no, totals.no) + "%)</div>" +
      "<div class='total'>Total: " + totalCorrect + "/" + totalPossible + " (<span class='pct'>" + pct(totalCorrect, totalPossible) + "%</span>)</div>";

    renderStaticChart(
      document.getElementById("your-head-row"),
      document.getElementById("your-body"),
      function (a, d) { return userChart[a][d]; },
      true
    );
    renderStaticChart(
      document.getElementById("correct-head-row"),
      document.getElementById("correct-body"),
      function (a, d) { return categoryOf(multiplier(a, d)); },
      false
    );

    document.getElementById("full-results").classList.add("show");
    document.getElementById("full-results").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  /* ================= CALCULATE MODE ================= */
  var calcAttackerEl = document.getElementById("calc-attacker");
  var calcDefendersEl = document.getElementById("calc-defenders");
  var calcOptionsEl = document.getElementById("calc-options");
  var calcFeedbackEl = document.getElementById("calc-feedback");
  var calcScoreEl = document.getElementById("calc-score");
  var calcNextBtn = document.getElementById("calc-next");

  var OPTIONS = [0, 0.25, 0.5, 1, 2, 4];
  function fmtMult(m) {
    if (m === 0.25) return "x0.25";
    if (m === 0.5) return "x0.5";
    return "x" + m;
  }

  var calcScore = { correct: 0, total: 0 };
  var currentQuestion = null;

  function makeBadge(type) {
    var span = document.createElement("span");
    span.className = "badge " + typeClass(type.toLowerCase());
    span.textContent = type;
    return span;
  }

  function newQuestion() {
    var attacker = TYPES[Math.floor(Math.random() * TYPES.length)];
    var twoTypes = Math.random() < 0.5;
    var d1 = TYPES[Math.floor(Math.random() * TYPES.length)];
    var d2 = null;
    if (twoTypes) {
      do { d2 = TYPES[Math.floor(Math.random() * TYPES.length)]; } while (d2 === d1);
    }
    var m = multiplier(attacker, d1) * (d2 ? multiplier(attacker, d2) : 1);
    m = Math.round(m * 100) / 100;

    currentQuestion = { attacker: attacker, defenders: d2 ? [d1, d2] : [d1], answer: m };

    calcAttackerEl.innerHTML = "";
    calcAttackerEl.appendChild(makeBadge(attacker));

    calcDefendersEl.innerHTML = "";
    currentQuestion.defenders.forEach(function (d) { calcDefendersEl.appendChild(makeBadge(d)); });

    calcOptionsEl.innerHTML = "";
    calcOptionsEl.dataset.answered = "false";
    OPTIONS.forEach(function (opt) {
      var btn = document.createElement("button");
      btn.className = "opt-btn";
      btn.textContent = fmtMult(opt);
      btn.addEventListener("click", function () { answerQuestion(opt, btn); });
      calcOptionsEl.appendChild(btn);
    });

    calcFeedbackEl.textContent = "";
    calcFeedbackEl.className = "calc-feedback";
    calcNextBtn.disabled = false;
  }

  function answerQuestion(chosen, btnEl) {
    if (!currentQuestion || calcOptionsEl.dataset.answered === "true") return;
    calcOptionsEl.dataset.answered = "true";

    var isCorrect = chosen === currentQuestion.answer;
    calcScore.total++;
    if (isCorrect) calcScore.correct++;

    Array.prototype.forEach.call(calcOptionsEl.children, function (btn, idx) {
      btn.disabled = true;
      if (OPTIONS[idx] === currentQuestion.answer) btn.classList.add("correct");
    });
    if (!isCorrect) btnEl.classList.add("incorrect");

    calcFeedbackEl.textContent = isCorrect
      ? "Correct! " + currentQuestion.attacker + " vs " + currentQuestion.defenders.join("/") + " is " + fmtMult(currentQuestion.answer) + "."
      : "Not quite. The correct answer is " + fmtMult(currentQuestion.answer) + ".";
    calcFeedbackEl.classList.add(isCorrect ? "correct" : "incorrect");

    updateCalcScore();
  }

  function updateCalcScore() {
    var pct = calcScore.total === 0 ? "\u2014" : (100 * calcScore.correct / calcScore.total).toFixed(1) + "%";
    calcScoreEl.textContent = "Score: " + calcScore.correct + "/" + calcScore.total + " (" + pct + ")";
  }

  calcNextBtn.addEventListener("click", function () {
    newQuestion();
  });

  // init
  newQuestion();
  updateCalcScore();
})();
