import { useEffect, useState } from "react";
import { findSessionStatus } from "@/lib/api/stripe";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";

export function useSuccess(sessionId: string | null) {
  const { clearCart } = useCart();
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkSessionStatus = async () => {
      if (!sessionId) {
        setError("ID da sessão não encontrado na URL.");
        setLoading(false);
        return;
      }

      try {
        const res = await findSessionStatus(sessionId);
        setStatus(res.payment_status);
        if (res.payment_status === "paid") {
          toast.success(
            "Pagamento realizado com sucesso! Seus cursos foram matriculados."
          );
          clearCart();
        } else if (res.payment_status === "unpaid") {
          toast.error("O pagamento não foi concluído.");
        } else {
          toast.info(`Status do pagamento: ${res.payment_status}`);
        }
      } catch (e: any) {
        console.error("Erro ao verificar status da sessão:", e);
        setError(e?.message || "Erro ao verificar o status do pagamento.");
        toast.error("Erro ao verificar o status do pagamento.");
      } finally {
        setLoading(false);
      }
    };

    checkSessionStatus();
  }, [sessionId]);

  return { status, loading, error };
}