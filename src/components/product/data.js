// src/data.js
export const CATEGORY_MAP = {
  ELECTRONICS: [
    "MOBILES",
    "LAPTOPS",
    "TABLETS",
    "CAMERAS",
    "AUDIO",
    "SMART_WATCHES",
    "ACCESSORIES",
  ],

  FASHION: ["MEN_CLOTHING", "WOMEN_CLOTHING", "FOOTWEAR", "WATCHES", "BAGS"],

  HOME: ["FURNITURE", "HOME_DECOR", "LIGHTING", "STORAGE"],

  APPLIANCES: ["KITCHEN_APPLIANCES", "HOME_APPLIANCES"],

  BEAUTY: ["SKIN_CARE", "HAIR_CARE", "MAKEUP"],

  SPORTS: ["FITNESS", "OUTDOOR_SPORTS"],

  GROCERY: ["FRUITS", "VEGETABLES", "BEVERAGES"],

  AUTOMOTIVE: ["BIKE_ACCESSORIES", "CAR_ACCESSORIES"],

  BOOKS: ["ACADEMIC", "FICTION", "NON_FICTION"],
};

export const formatLabel = (value) =>
  value
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
