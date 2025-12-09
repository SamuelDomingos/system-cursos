
export interface CreateCheckoutSessionRequest {
  courseIds: string[];
  userId: string;
  customerEmail: string;
}

export interface CreateCheckoutSessionResponse {
  checkoutUrl: string;
}

export interface SessionStatusResponse {
  status: string;
  payment_status: string;
  customer_email: string;
  amount_total: number;
  currency: string;
  client_secret?: string;
  metadata: {
    courseId?: string;
    userId?: string;
    instructorId?: string;
    [key: string]: string | undefined;
  };
}