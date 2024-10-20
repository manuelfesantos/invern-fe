import { Env } from "@types";
import { Request } from "@cloudflare/workers-types";

const initalValidUrls = {
  cart: {},
  checkout: {},
  config: {},
  orders: { dynamic: {} },
  user: {},
  products: {},
};

export const getUrl = (request: Request, env: Env) => {
  let validUrls: any = initalValidUrls;

  const url = new URL(request.url);

  const path = url.pathname.replace("/api/", "");
  console.log("path:", path);
  const params = path.split("/");
  console.log("params:", params);

  let endpoint = env.BACKEND_HOST;

  for (const param of params) {
    if (!param) continue;
    if (
      validUrls &&
      Object.keys(validUrls).length &&
      Object.keys(validUrls).some((key) => key === param || key === "dynamic")
    ) {
      endpoint += `/${param}`;
      validUrls = Object.entries(validUrls).find(
        ([key]) => key === param || key === "dynamic",
      )?.[1];
    } else {
      throw new Error("Not a valid URL");
    }
  }

  endpoint += url.search;

  return endpoint;
};
