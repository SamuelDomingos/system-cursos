"use client";

import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSuccess } from "./_hooks/useSuccess";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const SuccessPage = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { status, loading, error } = useSuccess(sessionId);

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
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="flex flex-col items-center">
            <XCircle className="h-16 w-16 text-red-500 mb-4" />
            <CardTitle className="text-2xl font-bold text-red-700">
              Erro no Pagamento
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mt-2 text-lg">{error}</p>
            <p className="mt-2">
              Por favor, tente novamente ou entre em contato com o suporte.
            </p>
            <Button asChild className="mt-6 w-full">
              <Link href="/cart">Voltar ao Carrinho</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
      <Card className="w-full max-w-md">
        {status === "paid" ? (
          <>
            <CardHeader className="flex flex-col items-center">
              <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              <CardTitle className="text-2xl font-bold text-green-700">
                Pagamento Confirmado!
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mt-2 text-lg">
                Sua compra foi processada com sucesso.
              </p>
              <p className="mt-1 text-lg">
                Seus cursos já estão disponíveis na sua área de aluno.
              </p>
              <Button asChild className="mt-6 w-full">
                <Link href="/dashboard">Ir para Meus Cursos</Link>
              </Button>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader className="flex flex-col items-center">
              <XCircle className="h-16 w-16 text-red-500 mb-4" />
              <CardTitle className="text-2xl font-bold text-red-700">
                Pagamento Não Concluído
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mt-2 text-lg">
                Houve um problema com seu pagamento ou ele está pendente.
              </p>
              <p className="mt-1 text-lg">
                Verifique seu extrato ou tente novamente.
              </p>
              <Button asChild className="mt-6 w-full">
                <Link href="/cart">Voltar ao Carrinho</Link>
              </Button>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
};

export default SuccessPage;
