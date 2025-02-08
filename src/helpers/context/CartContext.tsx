"use client";

import { Product } from "@/types";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface CartItem extends Product {
  quantity: number;
  selectedColor?: string; // Добавляем свойство для выбранного цвета
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, selectedColor?: string) => void;
  updateQuantity: (id: string, quantity: number, selectedColor?: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_KEY = "shopping-cart";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    setCart(storedCart);
  }, []);

  const saveCart = (cart: CartItem[]) => {
    setCart(cart);
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  };

  const addToCart = useCallback(
    (product: Product, quantity: number, selectedColor?: string) => {
      const existingItem = cart.find((item) => item.id === product.id);
      let updatedCart;
      if (existingItem) {
        // If item exists, update quantity and selectedColor
        updatedCart = cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity, selectedColor: selectedColor || item.selectedColor }
            : item
        );
      } else {
        // If item doesn't exist, add it with quantity and selectedColor
        updatedCart = [...cart, { ...product, quantity, selectedColor }];
      }
      saveCart(updatedCart);
    },
    [cart]
  );

  const updateQuantity = useCallback(
    (id: string, quantity: number, selectedColor?: string) => {
      const updatedCart = cart.map((item) =>
        item.id === id ? { ...item, quantity, selectedColor } : item
      );
      saveCart(updatedCart);
    },
    [cart]
  );

  const removeFromCart = useCallback(
    (id: string) => {
      const updatedCart = cart.filter((item) => item.id !== id);
      saveCart(updatedCart);
    },
    [cart]
  );

  const clearCart = useCallback(() => {
    saveCart([]);
  }, []);

  const value = useMemo(
    () => ({ cart, addToCart, updateQuantity, removeFromCart, clearCart }),
    [cart, addToCart, removeFromCart, updateQuantity, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
