"use strict";

/**
 * Entry point. This file intentionally contains no business logic of its
 * own - it just builds the shared Chart/ChartTableBuilder instances and
 * hands control to the ModeSwitcher and the two quiz mode classes.
 */
document.addEventListener("DOMContentLoaded", initializeApplication);

function initializeApplication() {
  const chart = new Chart();
  const tableBuilder = new ChartTableBuilder(chart);

  const modeSwitcher = new ModeSwitcher([
    { button: document.getElementById("tab-full"), mode: "full", section: document.getElementById("mode-full") },
    { button: document.getElementById("tab-calc"), mode: "calc", section: document.getElementById("mode-calc") }
  ]);

  const fullChartMode = new FullChartMode(chart, tableBuilder);
  const calculationMode = new CalculationMode(chart);
}
