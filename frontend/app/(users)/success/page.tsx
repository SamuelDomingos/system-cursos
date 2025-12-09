"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { findSessionStatus } from "@/lib/api/stripe";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext"; // Assumindo que você tem um contexto de carrinho
import { CheckCircle, XCircle, Loader2 } from "lucide-react"; // Ícones de exemplo
import Link from "next/link";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart(); // Função para limpar o carrinho
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
        setStatus(res.payment_status); // 'paid', 'unpaid', 'no_payment_required'
        if (res.payment_status === "paid") {
          toast.success("Pagamento realizado com sucesso! Seus cursos foram matriculados.");
          clearCart(); // Limpa o carrinho após o sucesso
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
  }, [sessionId, clearCart]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
        <p className="mt-4 text-lg">Verificando status do pagamento...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center text-red-600">
        <XCircle className="h-12 w-12" />
        <h1 className="mt-4 text-2xl font-bold">Erro no Pagamento</h1>
        <p className="mt-2 text-lg">{error}</p>
        <p className="mt-2">Por favor, tente novamente ou entre em contato com o suporte.</p>
        <Link href="/cart" className="mt-6 px-6 py-3 bg-gray-600 text-white rounded-lg text-lg hover:bg-gray-700 transition-colors">
          Voltar ao Carrinho
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      {status === "paid" ? (
        <>
          <CheckCircle className="h-16 w-16 text-green-500" />
          <h1 className="mt-4 text-3xl font-bold text-green-700">Pagamento Confirmado!</h1>
          <p className="mt-2 text-xl">Sua compra foi processada com sucesso.</p>
          <p className="mt-1 text-lg">Seus cursos já estão disponíveis na sua área de aluno.</p>
          <Link href="/dashboard" className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition-colors">
            Ir para Meus Cursos
          </Link>
        </>
      ) : (
        <>
          <XCircle className="h-16 w-16 text-red-500" />
          <h1 className="mt-4 text-3xl font-bold text-red-700">Pagamento Não Concluído</h1>
          <p className="mt-2 text-xl">Houve um problema com seu pagamento ou ele está pendente.</p>
          <p className="mt-1 text-lg">Verifique seu extrato ou tente novamente.</p>
          <Link href="/cart" className="mt-6 px-6 py-3 bg-gray-600 text-white rounded-lg text-lg hover:bg-gray-700 transition-colors">
            Voltar ao Carrinho
          </Link>
        </>
      )}
    </div>
  );
}