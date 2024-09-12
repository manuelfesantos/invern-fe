import { backendClient } from "@/service/backend-client";

const ordersEndpoint = "orders";
const ordersClient = {
  get: (params?: { orderId?: string }, queryParams?: Record<string, string>) =>
    backendClient.get(ordersEndpoint, params, queryParams),
};

export const getOrderById = async (orderId: string) => {
  const client = ordersClient.get({ orderId });
  const headers = {};
  return await client(headers);
};

export const getOrdersByUserId = async (userId: string) => {
  const client = ordersClient.get();
  const headers = { userId };
  return await client(headers);
};
