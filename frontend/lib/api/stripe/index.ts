import http from '@/utils/http';
import { CreateCheckoutSessionRequest, CreateCheckoutSessionResponse, SessionStatusResponse } from '@/lib/api/types/stripe';

export const createCheckoutSession = async (dto: CreateCheckoutSessionRequest): Promise<CreateCheckoutSessionResponse> => {
  const result = await http.post<CreateCheckoutSessionResponse>('/stripe/create-checkout-session', dto);
  return result;
};

export const findSessionStatus = async (sessionId: string): Promise<SessionStatusResponse> => {
  const result = await http.get<SessionStatusResponse>(`/stripe/session-status?session_id=${sessionId}`);
  return result;
};
