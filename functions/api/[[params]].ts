import { Env } from "@types";

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  return await fetch("https://preview-api.invernspirit.com", {
    headers: {
      [env.BACKEND_ID_KEY]: env.BACKEND_ID_VALUE,
      [env.BACKEND_SECRET_KEY]: env.BACKEND_SECRET_VALUE,
    },
  });
};
