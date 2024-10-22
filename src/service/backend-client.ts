import { handleError } from "@/utils/error";

const BASE_URL = `/api`;
const headers = {
  [`${process.env.NEXT_PUBLIC_BFF_ID_KEY}`]: `${process.env.NEXT_PUBLIC_BFF_ID_VALUE}`,
  [`${process.env.NEXT_PUBLIC_BFF_SECRET_KEY}`]: `${process.env.NEXT_PUBLIC_BFF_SECRET_VALUE}`,
};

type BackendClientFunction = (
  ...args: any[]
) => Promise<[string | undefined, any | undefined]>;

const get =
  (host: string, commonHeaders: Record<string, string>) =>
  (
    endpoint: string,
    params?: Record<string, string>,
    queryParams?: Record<string, string>,
  ): BackendClientFunction =>
  async (headers?: Record<string, string>) => {
    const responsePromise = await fetch(
      buildRequestUrl({ host, endpoint, params, queryParams }),
      buildRequestOptions({
        method: "GET",
        commonHeaders,
        headers,
      }),
    );
    return await getResponseData(responsePromise, [200], host, endpoint);
  };

const post =
  (host: string, commonHeaders: Record<string, string>) =>
  (
    endpoint: string,
    params?: Record<string, string>,
    queryParams?: Record<string, string>,
  ) =>
  async (
    body: unknown,
    headers?: Record<string, string>,
  ): Promise<[string | undefined, any | undefined]> => {
    const responsePromise = await fetch(
      buildRequestUrl({ host, endpoint, params, queryParams }),
      buildRequestOptions({ method: "POST", commonHeaders, headers, body }),
    );
    return await getResponseData(responsePromise, [200, 201], host, endpoint);
  };

const put =
  (host: string, commonHeaders: Record<string, string>) =>
  (
    endpoint: string,
    params?: Record<string, string>,
    queryParams?: Record<string, string>,
  ): BackendClientFunction =>
  async (body: unknown, headers?: Record<string, string>) => {
    const responsePromise = await fetch(
      buildRequestUrl({ host, endpoint, params, queryParams }),
      buildRequestOptions({ method: "PUT", commonHeaders, headers, body }),
    );
    return await getResponseData(responsePromise, [200, 201], host, endpoint);
  };

const delete_ =
  (host: string, commonHeaders: Record<string, string>) =>
  (
    endpoint: string,
    params?: Record<string, string>,
    queryParams?: Record<string, string>,
  ): BackendClientFunction =>
  async (headers?: Record<string, string>) => {
    const responsePromise = await fetch(
      buildRequestUrl({ host, endpoint, params, queryParams }),
      buildRequestOptions({ method: "DELETE", commonHeaders, headers }),
    );
    return await getResponseData(responsePromise, [200, 201], host, endpoint);
  };

export const backendClient = {
  get: get(BASE_URL, headers),
  post: post(BASE_URL, headers),
  put: put(BASE_URL, headers),
  delete: delete_(BASE_URL, headers),
};

const getResponseData = async (
  responsePromise: Response,
  validStatusCodes: number[],
  host: string,
  endpoint: string,
): Promise<[string | undefined, any | undefined]> => {
  const response = await responsePromise.json();
  if (validStatusCodes.includes(responsePromise.status)) {
    const data = processSuccessfulResponse(response);
    return [undefined, data];
  }
  const errors: string[] = response.errors || [response.proxyError];

  errors.forEach((error) => handleError(error, host, endpoint));

  return [errors[0], undefined];
};

let accessToken: string | null = null;

const processSuccessfulResponse = (response: any) => {
  const { data } = response;
  if ("accessToken" in data) {
    accessToken = data.accessToken;
    return { ...data, accessToken: undefined };
  }
  return data;
};

type RequestOptionsPayload = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  commonHeaders: Record<string, string>;
  headers?: Record<string, string>;
  body?: any;
};

type RequestUrlPayload = {
  host: string;
  endpoint: string;
  params?: Record<string, string>;
  queryParams?: Record<string, string>;
};

const buildRequestUrl = ({
  host,
  endpoint,
  params,
  queryParams,
}: RequestUrlPayload) =>
  `${host}/${endpoint}/${Object.values(params || {}).join("/") || ""}${queryParams ? `?${new URLSearchParams(queryParams)}` : ""}`;

const buildRequestOptions = ({
  method,
  commonHeaders,
  headers,
  body,
}: RequestOptionsPayload) => ({
  method,
  headers: {
    ...commonHeaders,
    ...headers,
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  },
  credentials: "include",
  ...(body && { body: JSON.stringify(body) }),
});
