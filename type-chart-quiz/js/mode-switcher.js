"use strict";

/**
 * Handles switching between the top-level quiz modes (tabs + their
 * associated content sections). Knows nothing about what each mode does
 * internally - it only toggles "active" classes.
 */
class ModeSwitcher {
  /**
   * @param {Array<{button: HTMLElement, mode: string, section: HTMLElement}>} tabButtonConfigs
   */
  constructor(tabButtonConfigs) {
    this.tabButtonConfigs = tabButtonConfigs;
    this.bindTabs();
  }

  bindTabs() {
    this.tabButtonConfigs.forEach(({ button, mode }) => {
      button.addEventListener("click", () => this.setMode(mode));
    });
  }

  /**
   * Activates the given mode's tab button and section, deactivating the rest.
   * @param {string} activeMode
   */
  setMode(activeMode) {
    this.tabButtonConfigs.forEach(({ button, mode, section }) => {
      const isActive = mode === activeMode;
      button.classList.toggle("active", isActive);
      section.classList.toggle("active", isActive);
    });
  }
}
