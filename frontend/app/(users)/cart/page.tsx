"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Trash2, Heart, Bookmark } from "lucide-react";

export default function CartPage() {
  const { cartItems, cartTotal, removeItemFromCart } = useCart();
  const [coupon, setCoupon] = useState("");

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-4">Carrinho de compras</h1>
        <Card>
          <CardContent className="p-8 flex flex-col items-center gap-4">
            <p className="text-muted-foreground text-lg">
              Seu carrinho está vazio.
            </p>
            <Link href="/home">
              <Button variant="default">Continuar comprando</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Carrinho de compras</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <p className="text-sm text-muted-foreground mb-4">
            {cartItems.length}{" "}
            {cartItems.length === 1
              ? "curso no carrinho"
              : "cursos no carrinho"}
          </p>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="border">
                <CardContent className="p-4">
                  <div className="flex gap-4 items-start justify-between">
                    <div className="flex gap-4">
                      <img
                        src={item.imageSrc}
                        alt={item.title}
                        className="w-28 h-16 object-cover rounded-md"
                      />
                      <div className="space-y-1">
                        <h3 className="font-semibold line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex gap-4 text-xs mt-2">
                          <button
                            className="text-primary hover:underline flex items-center gap-1"
                            onClick={() => removeItemFromCart(item.id)}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Remover
                          </button>
                          <button className="text-primary hover:underline flex items-center gap-1">
                            <Heart className="w-3.5 h-3.5" />
                            Mover para lista de desejos
                          </button>
                          <button className="text-primary hover:underline flex items-center gap-1">
                            <Bookmark className="w-3.5 h-3.5" />
                            Salvar para mais tarde
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="text-right min-w-[100px]">
                      <div className="font-semibold">
                        {formatCurrency(item.price)}
                      </div>
                      <div className="text-xs text-muted-foreground line-through opacity-0">
                        {formatCurrency(item.price)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24">
            <Card className="shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total</p>
                    <div className="text-2xl font-bold">
                      {formatCurrency(cartTotal)}
                    </div>
                  </div>
                </div>

                <Link href="/checkout" className="w-full">
                  <Button
                    variant="default"
                    className="w-full mt-4"
                  >
                    Prosseguir com a finalização
                  </Button>
                </Link>

                <Separator className="my-6" />

                <div className="space-y-3">
                  <p className="text-sm font-medium">Aplicar cupom</p>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Digite seu cupom"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                    />
                    <Button variant="outline">Aplicar</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Cupom aplicado não retorna desconto ainda
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
