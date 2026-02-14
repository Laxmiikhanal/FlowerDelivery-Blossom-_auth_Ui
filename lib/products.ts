import { Product } from "./types";

export const specialOffers: Product[] = [
  { id: "o1", name: "Mixed Flower Offer", price: 1499, image: "/flowers.jpg" },
  { id: "o2", name: "Sunflower Bouquet", price: 1299, image: "/sunflowerrrr.jpg" },
  { id: "o3", name: "Birthday Rose Box", price: 1999, image: "/birthday.jpg" },
];

export const freshFlowers: Product[] = [
  { id: "f1", name: "White Roses", price: 899, image: "/whiterose.jpg" },
  { id: "f2", name: "Wrapped Bouquet", price: 1099, image: "/imageflower.jpg" },
  { id: "f3", name: "Handheld Bouquet", price: 999, image: "/flowerholding.jpg" },
];

export const premiumBouquets: Product[] = [
  { id: "b1", name: "Pink Premium Bouquet", price: 1799, image: "/pinkbouquet.jpg" },
  { id: "b2", name: "Colorful Premium Mix", price: 1899, image: "/colorfulflower.jpg" },
  { id: "b3", name: "Sunflower Premium", price: 1699, image: "/sunflower2.jpg" },
];

export const allProducts: Product[] = [
  ...specialOffers,
  ...freshFlowers,
  ...premiumBouquets,
];
