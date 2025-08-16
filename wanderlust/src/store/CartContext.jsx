import { createContext, useContext, useMemo, useEffect, useState } from "react";
import { api } from "../lib/api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    api("/cart")
      .then((data) => setItems(data?.items || []))
      .catch(() => setItems([]));
  }, []);

  const add = async (item) => {
    const data = await api("/cart", { method: "POST", body: item });
    setItems(data?.items || []);
  };

  const remove = async (id) => {
    const data = await api(`/cart/${encodeURIComponent(id)}`, { method: "DELETE" });
    setItems(data?.items || []);
  };

  const clear = async () => {
    const data = await api("/cart", { method: "DELETE" });
    setItems(data?.items || []);
  };

  const book = async (item) => {
    // records “User Booked a Cab”
    await api("/bookings", { method: "POST", body: item });
    // (optional) you could also clear from cart or show a toast
  };

  const value = useMemo(() => ({ items, add, remove, clear, book }), [items]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
