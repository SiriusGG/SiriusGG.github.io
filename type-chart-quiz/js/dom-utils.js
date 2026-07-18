"use strict";

/**
 * Creates a DOM element with the given tag and options, without needing
 * repeated boilerplate (className / text / dataset / attributes) at every
 * call site.
 * @param {string} tag - element tag name, e.g. "div"
 * @param {object} [options]
 * @param {string} [options.className]
 * @param {string} [options.text]
 * @param {Object.<string,string>} [options.dataset]
 * @param {Object.<string,string>} [options.attributes]
 * @returns {HTMLElement}
 */
function createElement(tag, options = {}) {
  const element = document.createElement(tag);

  if (options.className) {
    element.className = options.className;
  }
  if (options.text !== undefined) {
    element.textContent = options.text;
  }
  if (options.dataset) {
    Object.entries(options.dataset).forEach(([key, value]) => {
      element.dataset[key] = value;
    });
  }
  if (options.attributes) {
    Object.entries(options.attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }

  return element;
}

/**
 * Creates a colored pill/badge element for displaying a Pokemon type.
 * @param {string} type - one of the Types enum values
 * @returns {HTMLElement}
 */
function createTypeBadge(type) {
  return createElement("span", {
    className: `badge ${typeCssClass(type)}`,
    text: type
  });
}
