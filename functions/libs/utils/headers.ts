import { Env } from "@types";
import { Headers } from "@cloudflare/workers-types";

export const getRequestHeaders = (
  headers: Headers,
  env: Env,
  country?: string,
) => {
  const newHeaders = Object.fromEntries(headers.entries());

  delete newHeaders[env.BACKEND_ID_KEY?.toLowerCase()];
  delete newHeaders[env.BACKEND_SECRET_KEY?.toLowerCase()];

  return {
    ...newHeaders,
    country,
    [env.BACKEND_ID_KEY]: env.BACKEND_ID_VALUE,
    [env.BACKEND_SECRET_KEY]: env.BACKEND_SECRET_VALUE,
  };
};
