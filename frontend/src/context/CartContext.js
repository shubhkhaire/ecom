import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Clear cart when user logs out
  useEffect(() => {
    if (!user) {
      setCart([]);
      localStorage.removeItem("cart");
    }
  }, [user]);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const requireAuth = (callback) => {
    if (!user) {
      navigate("/auth");
      return false;
    }
    return callback();
  };

  const addToCart = (product) => {
    requireAuth(() => {
      setCart((prev) => {
        const existing = prev.find((p) => p._id === product._id);
        if (existing) {
          return prev.map((p) =>
            p._id === product._id
              ? { ...p, qty: (p.qty || 1) + (product.qty || 1) }
              : p
          );
        }
        return [...prev, { ...product, qty: product.qty || 1 }];
      });
    });
  };

  const removeFromCart = (id) => {
    requireAuth(() => {
      setCart(cart.filter((item) => item._id !== id));
    });
  };

  const clearCart = () => {
    requireAuth(() => {
      setCart([]);
      localStorage.removeItem("cart");
    });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
