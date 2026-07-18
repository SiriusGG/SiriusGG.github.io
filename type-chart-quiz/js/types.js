"use strict";

/**
 * Enum-like object containing every Pokemon type.
 * Using an object (instead of an array of strings) gives call sites a
 * single source of truth to reference (e.g. Types.FIRE) while TYPE_LIST
 * below is derived from it for iteration.
 */
const Types = Object.freeze({
  NORMAL: "Normal",
  FIRE: "Fire",
  WATER: "Water",
  GRASS: "Grass",
  ELECTRIC: "Electric",
  ICE: "Ice",
  FIGHTING: "Fighting",
  POISON: "Poison",
  GROUND: "Ground",
  FLYING: "Flying",
  PSYCHIC: "Psychic",
  BUG: "Bug",
  ROCK: "Rock",
  GHOST: "Ghost",
  DRAGON: "Dragon",
  DARK: "Dark",
  STEEL: "Steel",
  FAIRY: "Fairy"
});

/**
 * Ordered list of all type values, derived from the Types enum.
 * This is what the UI iterates over when building rows/columns/options.
 */
const TYPE_LIST = Object.freeze(Object.values(Types));
