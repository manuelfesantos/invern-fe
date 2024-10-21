import { Env } from "@types";
import { Headers, Request } from "@cloudflare/workers-types";

const initalValidUrls = {
  cart: {
    headers: {
      action: ["add", "remove", "merge"],
      authorization: [],
    },
    methods: ["POST"],
  },
  checkout: {
    headers: {
      authorization: [],
    },
    methods: ["POST"],
  },
  config: { methods: ["POST"] },
  orders: {
    dynamic: {
      headers: {
        authorization: [],
      },
      methods: ["GET"],
    },
  },
  user: {
    headers: {
      authorization: [],
      action: ["login", "signup", "logout"],
    },
    methods: ["POST"],
  },
  products: {
    headers: {
      authorization: [],
    },
    methods: ["GET"],
  },
};

export const getUrl = (request: Request, env: Env) => {
  let validUrls: any = initalValidUrls;
  const url = new URL(request.url);
  const { method, headers } = request;
  const path = url.pathname.replace("/api/", "");

  if (
    env.ENV === "local" &&
    (path === "country/all" || path.startsWith("stock/"))
  ) {
    const endpoint = `${env.BACKEND_HOST}/${path}`;
    console.log("endpoint: ", endpoint);
    return endpoint;
  }

  const params = path.split("/");
  let endpoint = env.BACKEND_HOST;

  for (const param of params) {
    if (!param) continue;
    if (
      param !== "methods" &&
      param !== "headers" &&
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

  if (!validUrls.methods.includes(method)) {
    throw new Error("Not a valid method");
  }
  if (validUrls.headers) {
    validateHeaders(validUrls.headers, headers);
  }

  endpoint += url.search;

  return endpoint;
};

const validateHeaders = (
  validHeaders: { [key: string]: string[] },
  headers: Headers,
) => {
  Object.keys(validHeaders).forEach((header) => {
    if (!headers.has(header)) {
      throw new Error("Missing required headers");
    }
    const value = headers.get(header);
    if (
      validHeaders[header].length &&
      value &&
      !validHeaders[header].includes(value)
    ) {
      throw new Error("Not a valid header");
    }
  });
};
