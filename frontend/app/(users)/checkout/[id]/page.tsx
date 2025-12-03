"use client";

import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { useCheckout } from "@/app/(users)/checkout/[id]/_hooks/useCheckout";
import OrderSummary from "./_components/orderSummary";
import PaymentForm from "./_components/paymentForm";

export default function CheckoutPage() {
  const { cartItems, cartTotal } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const { getSessionStatus } = useCheckout();

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      toast.error("Seu carrinho está vazio.");
      router.push("/cart");
    }
  }, [cartItems, router]);

  useEffect(() => {
    if (id) {
      (async () => {
        const session = await getSessionStatus(id as string);
        if (!session) {
          toast.error("Erro ao verificar status da sessão.");
          router.push("/cart");
          return;
        }

        if (["expired", "canceled"].includes(session.status)) {
          router.push("/cart");
          toast.error("Sessão expirada ou cancelada.");
        }
      })();
    }
  }, [id, getSessionStatus, router]);

  if (!user || !cartItems.length) return null;

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Finalizar Compra</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <OrderSummary cartItems={cartItems} cartTotal={cartTotal} />
        </div>

        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24">
            <PaymentForm />
          </div>
        </div>
      </div>
    </div>
  );
}
