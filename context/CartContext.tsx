"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  id: string;         // unique key for cart row (use productId)
  productId: string;  // MUST be MongoDB _id
  name: string;
  price: number;
  qty: number;
  image?: string;
};

type CartContextType = {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  addToCart: (item: CartItem) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "blossom_cart";

function safeParse<T>(raw: string | null, fallback: T): T {
  try {
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // load cart on mount
  useEffect(() => {
    // remove OLD wrong carts that store productId like "1"
    localStorage.removeItem("cart");
    localStorage.removeItem("cart_items");

    const saved = safeParse<CartItem[]>(localStorage.getItem(STORAGE_KEY), []);
    // keep only valid items with Mongo-like id (not required, but helps)
    setItems(
      Array.isArray(saved)
        ? saved.filter((i) => i?.productId && typeof i.qty === "number" && i.qty > 0)
        : []
    );
  }, []);

  // save cart
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const subtotal = useMemo(
    () => items.reduce((sum, x) => sum + Number(x.price || 0) * Number(x.qty || 0), 0),
    [items]
  );

  const totalItems = useMemo(
    () => items.reduce((sum, x) => sum + Number(x.qty || 0), 0),
    [items]
  );

  const addToCart = (item: CartItem) => {
    if (!item?.productId) return;

    setItems((prev) => {
      const existing = prev.find((x) => x.productId === item.productId);
      if (existing) {
        return prev.map((x) =>
          x.productId === item.productId ? { ...x, qty: x.qty + (item.qty || 1) } : x
        );
      }
      return [...prev, { ...item, id: item.productId, qty: item.qty || 1 }];
    });
  };

  const setQty = (id: string, qty: number) => {
    const q = Math.max(1, Number(qty || 1));
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, qty: q } : x)));
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  };

  const clearCart = () => setItems([]);

  const value: CartContextType = {
    items,
    subtotal,
    totalItems,
    addToCart,
    setQty,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}