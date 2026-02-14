export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export type CartItem = Product & { qty: number };

export type Order = {
  id: string;
  createdAt: string;
  items: CartItem[];
  total: number;
};
