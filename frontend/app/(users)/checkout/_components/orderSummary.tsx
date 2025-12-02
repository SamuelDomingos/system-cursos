"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";

type Props = {
  cartItems: Array<{
    id: string;
    title: string;
    description?: string;
    imageSrc?: string;
    price: number;
  }>;
  cartTotal: number;
};

export default function OrderSummary({ cartItems, cartTotal }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Pay</h2>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <Card key={item.id} className="border">
            <CardContent className="p-4">
              <div className="flex gap-4 items-start justify-between">
                <div className="flex gap-4">
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="space-y-1">
                    <h3 className="font-semibold line-clamp-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="text-right min-w-[100px]">
                  <div className="font-semibold">{formatCurrency(item.price)}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex justify-between">
          <p className="text-muted-foreground">Subtotal</p>
          <p className="font-medium">{formatCurrency(cartTotal)}</p>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between text-lg font-bold">
          <p>Total due</p>
          <p>{formatCurrency(cartTotal)}</p>
        </div>
      </div>
    </div>
  );
}