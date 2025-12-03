import { useState } from "react";
import { findSessionStatus } from "@/lib/api/stripe";

export const useCheckout = () => {
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);

  const getSessionStatus = async (sessionId: string) => {
    setIsProcessingCheckout(true);
    try {
      return await findSessionStatus(sessionId);
    } catch (e: any) {
      return null;
    } finally {
      setIsProcessingCheckout(false);
    }
  };

  return { getSessionStatus, isProcessingCheckout };
};
