import { backendClient } from "@/service/backend-client";
import { handleError } from "@/utils/error";
const ordersEndpoint = "orders";
const ordersClient = {
  get: (params?: { orderId?: string }, queryParams?: Record<string, string>) =>
    backendClient.get(ordersEndpoint, params, queryParams),
};

export const getOrderById = async (orderId: string) => {
  const client = ordersClient.get({ orderId });
  const headers = {};
  try {
    return await client(headers);
  } catch (error) {
    handleError(error);
  }
};

export const getOrdersByUserId = async (userId: string) => {
  const client = ordersClient.get();
  const headers = { userId };
  try {
    return await client(headers);
  } catch (error) {
    handleError(error);
  }
};
