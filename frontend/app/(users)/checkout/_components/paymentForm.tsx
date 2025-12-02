"use client";

import { useCheckout } from "@/app/(users)/checkout/_hooks/useCheckout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { CreditCard, QrCode, Banknote, Wallet } from "lucide-react";
import { motion } from "framer-motion";

export default function PaymentForm() {
  const { startCheckout, isProcessingCheckout } = useCheckout();
  const { user } = useAuth();

  const [email, setEmail] = useState(user?.email || "");
  const [nameOnCard, setNameOnCard] = useState(user?.name || "");
  const [country, setCountry] = useState("BR");
  const [address, setAddress] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<"card" | "pix" | "boleto" | "wallet">("card");

  useEffect(() => {
    if (user?.email) setEmail(user.email);
    if (user?.name) setNameOnCard(user.name);
  }, [user]);

  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">Select payment method</h2>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { key: "card", label: "Card", icon: CreditCard },
            { key: "pix", label: "Pix", icon: QrCode },
            { key: "boleto", label: "Boleto", icon: Banknote },
            { key: "wallet", label: "Wallet", icon: Wallet },
          ].map(({ key, label, icon: Icon }) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedMethod(key as typeof selectedMethod)}
              className={`flex items-center gap-2 border rounded-md p-3 transition-colors ${
                selectedMethod === key ? "border-primary bg-primary/5" : "hover:bg-muted"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm font-medium">{label}</span>
            </motion.button>
          ))}
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium">Email</label>
          <Input
            placeholder="email@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {selectedMethod === "card" && (
            <div className="space-y-3">
              <label className="text-sm font-medium">Debit/Credit Card information</label>
              <div className="grid grid-cols-3 gap-2">
                <Input placeholder="1234 1234 1234 1234" disabled />
                <Input placeholder="MM / YY" disabled />
                <Input placeholder="CVC" disabled />
              </div>

              <label className="text-sm font-medium">Name on card</label>
              <Input
                placeholder="Seu nome completo"
                value={nameOnCard}
                onChange={(e) => setNameOnCard(e.target.value)}
              />
            </div>
          )}

          {selectedMethod !== "card" && (
            <div className="text-sm text-muted-foreground">
              {selectedMethod === "pix" && (
                <div className="flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  <span>Você poderá pagar via Pix na etapa final do Stripe.</span>
                </div>
              )}
              {selectedMethod === "boleto" && (
                <div className="flex items-center gap-2">
                  <Banknote className="h-5 w-5" />
                  <span>Você poderá gerar o boleto na etapa final do Stripe.</span>
                </div>
              )}
              {selectedMethod === "wallet" && (
                <div className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  <span>Use carteiras digitais compatíveis (Apple Pay / Google Pay).</span>
                </div>
              )}
            </div>
          )}

          <label className="text-sm font-medium">Billing address</label>
          <div className="grid grid-cols-2 gap-2">
            <select
              className="border rounded-md h-10 px-3 text-sm"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="BR">Brazil</option>
              <option value="US">United States</option>
              <option value="PT">Portugal</option>
            </select>
            <Input
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <Separator className="my-4" />

          <Button
            variant="default"
            className="w-full mt-2"
            onClick={startCheckout}
            disabled={isProcessingCheckout}
          >
            {isProcessingCheckout ? "Processing..." : selectedMethod === "pix" ? "Pagar com Pix" : selectedMethod === "boleto" ? "Pagar com Boleto" : selectedMethod === "wallet" ? "Pagar com Wallet" : "Pay"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}