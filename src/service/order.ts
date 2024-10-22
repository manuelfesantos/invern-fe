import { backendClient } from "@/service/backend-client";

const ordersEndpoint = "orders";
const ordersClient = (
  params?: { orderId?: string },
  queryParams?: Record<string, string>,
) => ({
  get: backendClient.get(ordersEndpoint, params, queryParams),
});

export const getOrderById = async (orderId: string) => {
  const client = ordersClient({ orderId });
  const headers = {};
  return await client.get(headers);
};

export const getOrdersByUserId = async (userId: string) => {
  const client = ordersClient();
  const headers = { userId };
  return await client.get(headers);
};
