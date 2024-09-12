import { backendClient } from "@/service/backend-client";
import { handleError } from "@/utils/error";

const configEndpoint = "config";

const configClient = {
  post: (
    params?: Record<string, string>,
    queryParams?: Record<string, string>,
  ) => backendClient.post(configEndpoint, params, queryParams),
};

export const getConfig = async (
  country?: string,
  userVersion?: number,
  remember?: boolean,
): Promise<[string | undefined, any | undefined]> => {
  const client = configClient.post();
  const body = { country, userVersion, remember };
  const headers = {};

  return await client(body, headers);
};
