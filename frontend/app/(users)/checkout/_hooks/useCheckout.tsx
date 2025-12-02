import { useCart } from "@/contexts/CartContext";
import { createCheckoutSession } from "@/lib/api/stripe/index";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { toast } from "sonner";

export const useCheckout = () => {
  const { cartItems } = useCart();
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
  const { user } = useAuth();

  const startCheckout = async () => {
    setIsProcessingCheckout(true);
    try {
      if (!cartItems || cartItems.length === 0) {
        toast.error("Seu carrinho está vazio.");
        return;
      }

      const courseIds = cartItems.map((item) => item.id);
      await createCheckoutSession({
        courseIds,
        userId: user?.id || "",
        customerEmail: user?.email || "",
      });

      const stripe: Stripe | null = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
      );
      if (!stripe) {
        toast.error("Erro ao carregar o Stripe.");
        return;
      }

    } catch (e: any) {
      toast.error(e?.message || "Erro ao criar sessão de checkout.");
    } finally {
      setIsProcessingCheckout(false);
    }
  };

  return {
    startCheckout,
    isProcessingCheckout,
  };
};
