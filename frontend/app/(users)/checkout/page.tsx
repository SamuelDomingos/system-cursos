"use client";

import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import OrderSummary from "@/app/(users)/checkout/_components/orderSummary";
import PaymentForm from "@/app/(users)/checkout/_components/paymentForm";

export default function CheckoutPage() {
  const { cartItems, cartTotal } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      toast.error("Seu carrinho está vazio. Adicione cursos para prosseguir.");
      router.push("/cart");
      return;
    }
  }, [user, cartItems, router]);

  if (!user || !cartItems || cartItems.length === 0) {
    return null;
  }

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
