"use client";

import { useCheckout } from "@/app/(users)/checkout/[id]/_hooks/useCheckout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { CreditCard, QrCode, Banknote, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import {
  validateCardNumber,
  formatCardNumber,
  formatCardExpiry,
  formatCardCvc,
} from "@/app/(users)/checkout/[id]/_utils/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PaymentForm() {
  const { startCheckou, isProcessingCheckout } = useCheckout();
  const { user } = useAuth();

  const [country, setCountry] = useState("BR");
  const [address, setAddress] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<
    "card" | "pix" | "boleto" | "wallet"
  >("card");
  const [nameOnCard, setNameOnCard] = useState(user?.name || "");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

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
                selectedMethod === key
                  ? "border-primary bg-primary/5"
                  : "hover:bg-muted"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm font-medium">{label}</span>
            </motion.button>
          ))}
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium">Email</label>
          <Input placeholder="email@exemplo.com" value={user?.email} disabled />

          {selectedMethod === "card" && (
            <div className="space-y-3">
              <label className="text-sm font-medium">Card information</label>
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    placeholder="4242 4242 4242 4242"
                    value={formatCardNumber(cardNumber)}
                    onChange={(e) =>
                      setCardNumber(formatCardNumber(e.target.value))
                    }
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground flex items-center gap-1">
                    {(() => {
                      const { icon: Icon } = validateCardNumber(cardNumber);
                      return Icon ? <Icon className="h-8 w-8" /> : null;
                    })()}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Input
                    placeholder="MM / YY"
                    value={formatCardExpiry(cardExpiry)}
                    onChange={(e) =>
                      setCardExpiry(formatCardExpiry(e.target.value))
                    }
                  />
                  <Input
                    placeholder="CVC"
                    value={formatCardCvc(cardCvc)}
                    onChange={(e) => setCardCvc(formatCardCvc(e.target.value))}
                  />
                  <div />
                </div>
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
                  <span>
                    Você poderá pagar via Pix na etapa final do Stripe.
                  </span>
                </div>
              )}
              {selectedMethod === "boleto" && (
                <div className="flex items-center gap-2">
                  <Banknote className="h-5 w-5" />
                  <span>
                    Você poderá gerar o boleto na etapa final do Stripe.
                  </span>
                </div>
              )}
              {selectedMethod === "wallet" && (
                <div className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  <span>
                    Use carteiras digitais compatíveis (Apple Pay / Google Pay).
                  </span>
                </div>
              )}
            </div>
          )}

          <label className="text-sm font-medium">Billing address</label>
          <div className="grid grid-cols-2 gap-2">
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger className="h-10 text-sm w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BR">Brazil</SelectItem>
                <SelectItem value="US">United States</SelectItem>
                <SelectItem value="PT">Portugal</SelectItem>
              </SelectContent>
            </Select>
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
            {isProcessingCheckout
              ? "Processing..."
              : selectedMethod === "pix"
              ? "Pagar com Pix"
              : selectedMethod === "boleto"
              ? "Pagar com Boleto"
              : selectedMethod === "wallet"
              ? "Pagar com Wallet"
              : "Pay"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
