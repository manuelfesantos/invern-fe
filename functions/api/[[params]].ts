import { Env } from "libs/types";

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  return await fetch(env.BACKEND_HOST, {
    headers: {
      [env.BACKEND_ID_KEY]: env.BACKEND_ID_VALUE,
      [env.BACKEND_SECRET_KEY]: env.BACKEND_SECRET_VALUE,
    },
  });
};
