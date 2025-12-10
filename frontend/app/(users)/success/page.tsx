"use client";

import { CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { useSuccess } from "./[session_id]/_hooks/useSuccess";
import { useSearchParams } from "next/navigation";

export const SuccessPage = () => {
  const sessionId = useSearchParams().get("session_id");
  const { status, loading, error } = useSuccess(sessionId);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center text-red-600">
        <XCircle className="h-12 w-12" />
        <h1 className="mt-4 text-2xl font-bold">Erro no Pagamento</h1>
        <p className="mt-2 text-lg">{error}</p>
        <p className="mt-2">
          Por favor, tente novamente ou entre em contato com o suporte.
        </p>
        <Link
          href="/cart"
          className="mt-6 px-6 py-3 bg-gray-600 text-white rounded-lg text-lg hover:bg-gray-700 transition-colors"
        >
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
          <h1 className="mt-4 text-3xl font-bold text-green-700">
            Pagamento Confirmado!
          </h1>
          <p className="mt-2 text-xl">Sua compra foi processada com sucesso.</p>
          <p className="mt-1 text-lg">
            Seus cursos já estão disponíveis na sua área de aluno.
          </p>
          <Link
            href="/home"
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition-colors"
          >
            Ir para Meus Cursos
          </Link>
        </>
      ) : (
        <>
          <XCircle className="h-16 w-16 text-red-500" />
          <h1 className="mt-4 text-3xl font-bold text-red-700">
            Pagamento Não Concluído
          </h1>
          <p className="mt-2 text-xl">
            Houve um problema com seu pagamento ou ele está pendente.
          </p>
          <p className="mt-1 text-lg">
            Verifique seu extrato ou tente novamente.
          </p>
          <Link
            href="/cart"
            className="mt-6 px-6 py-3 bg-gray-600 text-white rounded-lg text-lg hover:bg-gray-700 transition-colors"
          >
            Voltar ao Carrinho
          </Link>
        </>
      )}
    </div>
  );
};

export default SuccessPage;
