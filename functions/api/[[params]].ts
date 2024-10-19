import { Env } from "libs/types";

export const onRequest: PagesFunction<Env, string> = async ({
  request,
  env,
}) => {
  const url = new URL(request.url);
  const path = url.pathname.replace("/api/", "");
  const params = path.split("/");

  let validUrls: any = {
    cart: {},
    checkout: {},
    config: {},
    orders: { dynamic: {} },
    user: {},
  };

  let endpoint = env.BACKEND_HOST;

  for (const param of params) {
    if (
      validUrls &&
      Object.keys(validUrls).length &&
      Object.keys(validUrls).some((key) => key === param || key === "dynamic")
    ) {
      console.log("Found valid param:", param);
      endpoint += `/${param}`;
      validUrls = Object.entries(validUrls).find(
        ([key]) => key === param || key === "dynamic",
      )?.[1];
    } else {
      return new Response("Not a valid URL", { status: 404 });
    }
  }
  console.log("full url:", endpoint);
  if (request.method === "GET" || request.method === "DELETE") {
    return await fetch(endpoint, {
      ...request,
      headers: {
        ...request.headers,
        [env.BACKEND_ID_KEY]: env.BACKEND_ID_VALUE,
        [env.BACKEND_SECRET_KEY]: env.BACKEND_SECRET_VALUE,
      },
    });
  }
  try {
    const body = await request.json();
    console.log("body:", body);
    console.log("request headers:", request.headers);
    console.log("request:", request);
    return await fetch(endpoint, {
      method: request.method,
      headers: {
        ...request.headers,
        [env.BACKEND_ID_KEY]: env.BACKEND_ID_VALUE,
        [env.BACKEND_SECRET_KEY]: env.BACKEND_SECRET_VALUE,
      },
      body: JSON.stringify(body),
    });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
};
