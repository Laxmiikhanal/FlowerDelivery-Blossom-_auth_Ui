export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
};

export const products: Product[] = [
  { id: "redrosebouquet", name: "Romantic Red Roses", price: 1499, image: "/redrosebouquet.jpg", inStock: true },
  { id: "whiterose", name: "White Lily Bouquet", price: 999, image: "/whiterose.jpg", inStock: true },
  { id: "pinkbouquet", name: "Luxury Wedding Bouquet", price: 3499, image: "/pinkbouquet.jpg", inStock: true },
  { id: "sunflower2", name: "Sunflower Surprise", price: 1299, image: "/sunflower2.jpg", inStock: true },
  { id: "pinkrose", name: "Pink Peony Mix", price: 1799, image: "/pinkrose.jpg", inStock: true },
  { id: "orchid", name: "Orchid Elegance", price: 2499, image: "/orchid.jpg", inStock: true },
  { id: "tulips", name: "Mixed Tulips", price: 1099, image: "/tulips.jpg", inStock: true },
  { id: "imageflower", name: "Lavender Dreams", price: 1399, image: "/imageflower.jpg", inStock: true },
  { id: "yellowtulip", name: "Tulip Delight", price: 899, image: "/yellowtulip.jpg", inStock: true },
];