"use strict";

/**
 * Builds the CSS class name used to color-code a given type,
 * e.g. "Fire" -> "type-fire".
 * @param {string} type - one of the Types enum values
 * @returns {string} CSS class name
 */
function typeCssClass(type) {
  return `type-${type.toLowerCase()}`;
}
