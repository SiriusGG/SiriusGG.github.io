"use strict";

/**
 * Drives the "Full Type Chart" mode: the tool palette, the interactive
 * fill-in grid, scoring the user's answers against the Chart, and
 * rendering the results (score summary + your-chart/correct-chart tables).
 */
class FullChartMode {
  /**
   * @param {Chart} chart
   * @param {ChartTableBuilder} tableBuilder
   */
  constructor(chart, tableBuilder) {
    this.chart = chart;
    this.tableBuilder = tableBuilder;
    this.currentTool = EffectivenessCategory.SUPER;
    this.userAnswers = FullChartMode.createEmptyAnswers();

    this.headRowElement = document.getElementById("chart-head-row");
    this.chartBodyElement = document.getElementById("chart-body");
    this.toolButtons = document.querySelectorAll(".tool-btn");
    this.submitButton = document.getElementById("submit-full");
    this.resetButton = document.getElementById("reset-full");
    this.resultsSection = document.getElementById("full-results");
    this.scoreLinesElement = document.getElementById("score-lines");
    this.yourHeadRowElement = document.getElementById("your-head-row");
    this.yourBodyElement = document.getElementById("your-body");
    this.correctHeadRowElement = document.getElementById("correct-head-row");
    this.correctBodyElement = document.getElementById("correct-body");

    this.initialize();
  }

  /**
   * Builds a fresh attacker -> defender -> category map, all defaulted to neutral.
   * @returns {Object.<string, Object.<string, string>>}
   */
  static createEmptyAnswers() {
    const answers = {};
    TYPE_LIST.forEach((attackerType) => {
      answers[attackerType] = {};
      TYPE_LIST.forEach((defenderType) => {
        answers[attackerType][defenderType] = EffectivenessCategory.NEUTRAL;
      });
    });
    return answers;
  }

  initialize() {
    this.tableBuilder.buildHeaderRow(this.headRowElement);
    this.tableBuilder.buildInteractiveBody(this.chartBodyElement, (attackerType, defenderType) =>
      this.applyToolToCell(attackerType, defenderType)
    );
    this.bindToolButtons();
    this.submitButton.addEventListener("click", () => this.handleSubmit());
    this.resetButton.addEventListener("click", () => this.handleReset());
  }

  bindToolButtons() {
    this.toolButtons.forEach((button) => {
      button.addEventListener("click", () => this.selectTool(button));
    });
  }

  selectTool(button) {
    this.toolButtons.forEach((otherButton) => otherButton.classList.remove("active"));
    button.classList.add("active");
    this.currentTool = button.dataset.tool;
  }

  applyToolToCell(attackerType, defenderType) {
    const isReapplyingSameTool = this.userAnswers[attackerType][defenderType] === this.currentTool;
    const nextCategory = isReapplyingSameTool ? EffectivenessCategory.NEUTRAL : this.currentTool;
    this.setCell(attackerType, defenderType, nextCategory);
  }

  setCell(attackerType, defenderType, category) {
    this.userAnswers[attackerType][defenderType] = category;
    const cell = this.chartBodyElement.querySelector(
      `td[data-attacker="${attackerType}"][data-defender="${defenderType}"]`
    );
    cell.className = `cell val-${category}`;
    cell.textContent = Chart.symbolFor(category);
  }

  handleReset() {
    this.resultsSection.classList.remove("show");
    TYPE_LIST.forEach((attackerType) => {
      TYPE_LIST.forEach((defenderType) => {
        this.setCell(attackerType, defenderType, EffectivenessCategory.NEUTRAL);
      });
    });
  }

  handleSubmit() {
    const scoreSummary = this.scoreAnswers();
    this.renderScoreSummary(scoreSummary);
    this.renderResultCharts();
    this.resultsSection.classList.add("show");
    this.resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /**
   * Compares the user's answers to the correct chart, tallying totals and
   * correct counts per effectiveness category.
   * @returns {{totals: object, correctCounts: object}}
   */
  scoreAnswers() {
    const totals = { super: 0, neutral: 0, nve: 0, no: 0 };
    const correctCounts = { super: 0, neutral: 0, nve: 0, no: 0 };

    TYPE_LIST.forEach((attackerType) => {
      TYPE_LIST.forEach((defenderType) => {
        const correctCategory = this.chart.getCategory(attackerType, defenderType);
        totals[correctCategory]++;
        if (this.userAnswers[attackerType][defenderType] === correctCategory) {
          correctCounts[correctCategory]++;
        }
      });
    });

    return { totals, correctCounts };
  }

  renderScoreSummary({ totals, correctCounts }) {
    const totalPossible = TYPE_LIST.length * TYPE_LIST.length;
    const totalCorrect = correctCounts.super + correctCounts.neutral + correctCounts.nve + correctCounts.no;

    this.scoreLinesElement.innerHTML = [
      buildScoreLine("Super effective", correctCounts.super, totals.super),
      buildScoreLine("Neutral", correctCounts.neutral, totals.neutral),
      buildScoreLine("Not very effective", correctCounts.nve, totals.nve),
      buildScoreLine("No effect", correctCounts.no, totals.no),
      `<div class="total">Total: ${totalCorrect}/${totalPossible} (<span class="pct">${formatPercentage(
        totalCorrect,
        totalPossible
      )}%</span>)</div>`
    ].join("");
  }

  renderResultCharts() {
    const isMistake = (attackerType, defenderType) =>
      this.userAnswers[attackerType][defenderType] !== this.chart.getCategory(attackerType, defenderType);

    this.tableBuilder.buildHeaderRow(this.yourHeadRowElement);
    this.tableBuilder.buildStaticBody(
      this.yourBodyElement,
      (attackerType, defenderType) => this.userAnswers[attackerType][defenderType],
      isMistake
    );

    this.tableBuilder.buildHeaderRow(this.correctHeadRowElement);
    this.tableBuilder.buildStaticBody(
      this.correctBodyElement,
      (attackerType, defenderType) => this.chart.getCategory(attackerType, defenderType),
      isMistake
    );
  }
}
