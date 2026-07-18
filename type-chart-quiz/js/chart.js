"use strict";

/**
 * The four buckets a damage multiplier can fall into.
 */
const EffectivenessCategory = Object.freeze({
  SUPER: "super",
  NEUTRAL: "neutral",
  NOT_VERY: "nve",
  NO_EFFECT: "no"
});

/**
 * Display symbol for each effectiveness category.
 */
const EFFECTIVENESS_SYMBOLS = Object.freeze({
  [EffectivenessCategory.SUPER]: "+",
  [EffectivenessCategory.NEUTRAL]: "",
  [EffectivenessCategory.NOT_VERY]: "\u2212",
  [EffectivenessCategory.NO_EFFECT]: "0"
});

/**
 * Encapsulates the Pokemon type effectiveness chart: the raw matchup data,
 * plus every lookup/derivation the UI needs from it (multipliers, combined
 * multipliers for dual-type defenders, and effectiveness categories).
 */
class Chart {
  constructor() {
    this.matchups = Chart.buildMatchupTable();
  }

  /**
   * Builds the attacker -> defender -> multiplier lookup table.
   * Only non-neutral matchups are listed; anything absent defaults to 1.
   * @returns {Object.<string, Object.<string, number>>}
   */
  static buildMatchupTable() {
    return {
      [Types.NORMAL]: {
        [Types.ROCK]: 0.5,
        [Types.GHOST]: 0,
        [Types.STEEL]: 0.5
      },
      [Types.FIRE]: {
        [Types.FIRE]: 0.5,
        [Types.WATER]: 0.5,
        [Types.GRASS]: 2,
        [Types.ICE]: 2,
        [Types.BUG]: 2,
        [Types.ROCK]: 0.5,
        [Types.DRAGON]: 0.5,
        [Types.STEEL]: 2
      },
      [Types.WATER]: {
        [Types.FIRE]: 2,
        [Types.WATER]: 0.5,
        [Types.GRASS]: 0.5,
        [Types.GROUND]: 2,
        [Types.ROCK]: 2,
        [Types.DRAGON]: 0.5
      },
      [Types.GRASS]: {
        [Types.FIRE]: 0.5,
        [Types.WATER]: 2,
        [Types.GRASS]: 0.5,
        [Types.POISON]: 0.5,
        [Types.GROUND]: 2,
        [Types.FLYING]: 0.5,
        [Types.BUG]: 0.5,
        [Types.ROCK]: 2,
        [Types.DRAGON]: 0.5,
        [Types.STEEL]: 0.5
      },
      [Types.ELECTRIC]: {
        [Types.WATER]: 2,
        [Types.ELECTRIC]: 0.5,
        [Types.GRASS]: 0.5,
        [Types.GROUND]: 0,
        [Types.FLYING]: 2,
        [Types.DRAGON]: 0.5
      },
      [Types.ICE]: {
        [Types.FIRE]: 0.5,
        [Types.WATER]: 0.5,
        [Types.GRASS]: 2,
        [Types.ICE]: 0.5,
        [Types.GROUND]: 2,
        [Types.FLYING]: 2,
        [Types.DRAGON]: 2,
        [Types.STEEL]: 0.5
      },
      [Types.FIGHTING]: {
        [Types.NORMAL]: 2,
        [Types.ICE]: 2,
        [Types.POISON]: 0.5,
        [Types.FLYING]: 0.5,
        [Types.PSYCHIC]: 0.5,
        [Types.BUG]: 0.5,
        [Types.ROCK]: 2,
        [Types.GHOST]: 0,
        [Types.DARK]: 2,
        [Types.STEEL]: 2,
        [Types.FAIRY]: 0.5
      },
      [Types.POISON]: {
        [Types.GRASS]: 2,
        [Types.POISON]: 0.5,
        [Types.GROUND]: 0.5,
        [Types.ROCK]: 0.5,
        [Types.GHOST]: 0.5,
        [Types.STEEL]: 0,
        [Types.FAIRY]: 2
      },
      [Types.GROUND]: {
        [Types.FIRE]: 2,
        [Types.GRASS]: 0.5,
        [Types.ELECTRIC]: 2,
        [Types.POISON]: 2,
        [Types.FLYING]: 0,
        [Types.BUG]: 0.5,
        [Types.ROCK]: 2,
        [Types.STEEL]: 2
      },
      [Types.FLYING]: {
        [Types.GRASS]: 2,
        [Types.ELECTRIC]: 0.5,
        [Types.FIGHTING]: 2,
        [Types.BUG]: 2,
        [Types.ROCK]: 0.5,
        [Types.STEEL]: 0.5
      },
      [Types.PSYCHIC]: {
        [Types.FIGHTING]: 2,
        [Types.POISON]: 2,
        [Types.PSYCHIC]: 0.5,
        [Types.DARK]: 0,
        [Types.STEEL]: 0.5
      },
      [Types.BUG]: {
        [Types.FIRE]: 0.5,
        [Types.GRASS]: 2,
        [Types.FIGHTING]: 0.5,
        [Types.POISON]: 0.5,
        [Types.FLYING]: 0.5,
        [Types.PSYCHIC]: 2,
        [Types.GHOST]: 0.5,
        [Types.DARK]: 2,
        [Types.STEEL]: 0.5,
        [Types.FAIRY]: 0.5
      },
      [Types.ROCK]: {
        [Types.FIRE]: 2,
        [Types.ICE]: 2,
        [Types.FIGHTING]: 0.5,
        [Types.GROUND]: 0.5,
        [Types.FLYING]: 2,
        [Types.BUG]: 2,
        [Types.STEEL]: 0.5
      },
      [Types.GHOST]: {
        [Types.NORMAL]: 0,
        [Types.PSYCHIC]: 2,
        [Types.GHOST]: 2,
        [Types.DARK]: 0.5
      },
      [Types.DRAGON]: {
        [Types.DRAGON]: 2,
        [Types.STEEL]: 0.5,
        [Types.FAIRY]: 0
      },
      [Types.DARK]: {
        [Types.FIGHTING]: 0.5,
        [Types.PSYCHIC]: 2,
        [Types.GHOST]: 2,
        [Types.DARK]: 0.5,
        [Types.FAIRY]: 0.5
      },
      [Types.STEEL]: {
        [Types.FIRE]: 0.5,
        [Types.WATER]: 0.5,
        [Types.ELECTRIC]: 0.5,
        [Types.ICE]: 2,
        [Types.ROCK]: 2,
        [Types.STEEL]: 0.5,
        [Types.FAIRY]: 2
      },
      [Types.FAIRY]: {
        [Types.FIRE]: 0.5,
        [Types.FIGHTING]: 2,
        [Types.POISON]: 0.5,
        [Types.DRAGON]: 2,
        [Types.DARK]: 2,
        [Types.STEEL]: 0.5
      }
    };
  }

  /**
   * Raw damage multiplier of an attacking type against a single defending type.
   * @param {string} attackerType
   * @param {string} defenderType
   * @returns {number}
   */
  getMultiplier(attackerType, defenderType) {
    const row = this.matchups[attackerType];
    if (row && Object.prototype.hasOwnProperty.call(row, defenderType)) {
      return row[defenderType];
    }
    return 1;
  }

  /**
   * Combined multiplier of an attacking type against one or two defending types.
   * @param {string} attackerType
   * @param {string[]} defenderTypes
   * @returns {number}
   */
  getCombinedMultiplier(attackerType, defenderTypes) {
    return defenderTypes.reduce(
      (product, defenderType) => product * this.getMultiplier(attackerType, defenderType),
      1
    );
  }

  /**
   * Effectiveness category of an attacking type against a single defending type.
   * @param {string} attackerType
   * @param {string} defenderType
   * @returns {string} one of EffectivenessCategory
   */
  getCategory(attackerType, defenderType) {
    return Chart.categoryFromMultiplier(this.getMultiplier(attackerType, defenderType));
  }

  /**
   * Maps a raw multiplier to its effectiveness category.
   * @param {number} multiplierValue
   * @returns {string} one of EffectivenessCategory
   */
  static categoryFromMultiplier(multiplierValue) {
    if (multiplierValue === 0) return EffectivenessCategory.NO_EFFECT;
    if (multiplierValue === 0.5) return EffectivenessCategory.NOT_VERY;
    if (multiplierValue === 2) return EffectivenessCategory.SUPER;
    return EffectivenessCategory.NEUTRAL;
  }

  /**
   * Display symbol for a given effectiveness category.
   * @param {string} category - one of EffectivenessCategory
   * @returns {string}
   */
  static symbolFor(category) {
    return EFFECTIVENESS_SYMBOLS[category];
  }
}
