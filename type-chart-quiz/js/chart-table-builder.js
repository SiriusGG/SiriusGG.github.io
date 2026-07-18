"use strict";

/**
 * Builds the <table> markup used everywhere a type chart is displayed:
 * the interactive fill-in grid, and the two locked "your chart" /
 * "correct chart" result tables. Keeping all of this table-building
 * logic in one place means the three tables can never drift out of sync.
 */
class ChartTableBuilder {
  /**
   * @param {Chart} chart
   */
  constructor(chart) {
    this.chart = chart;
  }

  /**
   * Fills in the shared header row (corner cell + one column per type).
   * @param {HTMLElement} rowElement - a <tr> inside a <thead>
   */
  buildHeaderRow(rowElement) {
    rowElement.innerHTML = "";
    rowElement.appendChild(createElement("th", { className: "corner", text: "Attacker \\ Defender" }));
    TYPE_LIST.forEach((defenderType) => {
      rowElement.appendChild(
        createElement("th", {
          className: `col-head ${typeCssClass(defenderType)}`,
          text: defenderType
        })
      );
    });
  }

  /**
   * Builds the clickable fill-in-the-chart grid.
   * @param {HTMLElement} bodyElement - a <tbody>
   * @param {function(string, string): void} onCellClick - called with (attackerType, defenderType)
   */
  buildInteractiveBody(bodyElement, onCellClick) {
    bodyElement.innerHTML = "";
    TYPE_LIST.forEach((attackerType) => {
      const row = document.createElement("tr");
      row.appendChild(this.buildRowHeader(attackerType, "row-head attacker-name"));
      TYPE_LIST.forEach((defenderType) => {
        row.appendChild(this.buildInteractiveCell(attackerType, defenderType, onCellClick));
      });
      bodyElement.appendChild(row);
    });
  }

  /**
   * Builds a locked, read-only grid (used for the results view).
   * @param {HTMLElement} bodyElement - a <tbody>
   * @param {function(string, string): string} categoryProvider - returns the category to display for a cell
   * @param {function(string, string): boolean} [mistakeProvider] - returns whether a cell should be flagged as a mistake
   */
  buildStaticBody(bodyElement, categoryProvider, mistakeProvider) {
    bodyElement.innerHTML = "";
    TYPE_LIST.forEach((attackerType) => {
      const row = document.createElement("tr");
      row.appendChild(this.buildRowHeader(attackerType, "row-head"));
      TYPE_LIST.forEach((defenderType) => {
        row.appendChild(this.buildStaticCell(attackerType, defenderType, categoryProvider, mistakeProvider));
      });
      bodyElement.appendChild(row);
    });
  }

  buildRowHeader(attackerType, baseClassName) {
    return createElement("th", {
      className: `${baseClassName} ${typeCssClass(attackerType)}`,
      text: attackerType
    });
  }

  buildInteractiveCell(attackerType, defenderType, onCellClick) {
    const cell = createElement("td", {
      className: "cell val-neutral",
      dataset: { attacker: attackerType, defender: defenderType }
    });
    cell.addEventListener("click", () => onCellClick(attackerType, defenderType));
    return cell;
  }

  buildStaticCell(attackerType, defenderType, categoryProvider, mistakeProvider) {
    const category = categoryProvider(attackerType, defenderType);
    const isMistake = Boolean(mistakeProvider && mistakeProvider(attackerType, defenderType));
    const classNames = ["cell", "locked", `val-${category}`];
    if (isMistake) {
      classNames.push("mistake");
    }
    return createElement("td", { className: classNames.join(" "), text: Chart.symbolFor(category) });
  }
}
