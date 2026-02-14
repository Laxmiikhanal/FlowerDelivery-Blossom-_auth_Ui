"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem, Product } from "@/lib/types";

type CartContextType = {
  items: CartItem[];
  addToCart: (p: Product) => void;
  removeFromCart: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clearCart: () => void;
  subtotal: number;
  totalItems: number;
};

const CartContext = createContext<CartContextType | null>(null);
const LS_KEY = "blossom_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) setItems(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (p: Product) => {
    setItems((prev) => {
      const found = prev.find((x) => x.id === p.id);
      if (found) return prev.map((x) => (x.id === p.id ? { ...x, qty: x.qty + 1 } : x));
      return [...prev, { ...p, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) => setItems((prev) => prev.filter((x) => x.id !== id));

  const setQty = (id: string, qty: number) => {
    const safe = Math.max(1, qty);
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, qty: safe } : x)));
  };

  const clearCart = () => setItems([]);

  const subtotal = useMemo(() => items.reduce((sum, x) => sum + x.price * x.qty, 0), [items]);
  const totalItems = useMemo(() => items.reduce((sum, x) => sum + x.qty, 0), [items]);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, setQty, clearCart, subtotal, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
