"use client";

import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { createCheckoutSession } from "@/lib/api/stripe";

export const useCartProcess = () => {
  const { cartItems } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const goToCheckout = async () => {
    if (!cartItems || cartItems.length === 0) {
      toast.error("Seu carrinho está vazio.");
      return;
    }
    setIsRedirecting(true);
    try {
      const courseIds = cartItems.map((item) => item.id);
      const res = await createCheckoutSession({
        courseIds,
        userId: user?.id || "",
        customerEmail: user?.email || "",
      });
      if (res?.sessionId) {
        router.push(`/checkout/${res.sessionId}`);
      } else {
        toast.error("Não foi possível criar a sessão de checkout.");
      }
    } catch (e: any) {
      toast.error(e?.message || "Erro ao iniciar checkout.");
    } finally {
      setIsRedirecting(false);
    }
  };

  return { goToCheckout, isRedirecting };
};