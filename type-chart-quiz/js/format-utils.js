"use strict";

/**
 * Formats a fraction as a percentage string with one decimal place.
 * @param {number} numerator
 * @param {number} denominator
 * @returns {string} e.g. "83.3"
 */
function formatPercentage(numerator, denominator) {
  return denominator === 0 ? "0.0" : ((100 * numerator) / denominator).toFixed(1);
}

/**
 * Formats a damage multiplier for display, e.g. 0.5 -> "x0.5".
 * @param {number} multiplierValue
 * @returns {string}
 */
function formatMultiplier(multiplierValue) {
  if (multiplierValue === 0.25) return "x0.25";
  if (multiplierValue === 0.5) return "x0.5";
  return `x${multiplierValue}`;
}

/**
 * Builds a single line of the full-chart score summary as an HTML string.
 * @param {string} label
 * @param {number} correctCount
 * @param {number} totalCount
 * @returns {string}
 */
function buildScoreLine(label, correctCount, totalCount) {
  return `<div>${label}: ${correctCount}/${totalCount} (${formatPercentage(correctCount, totalCount)}%)</div>`;
}
