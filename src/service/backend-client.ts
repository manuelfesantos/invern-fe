const host = "https://preview.invern-be.pages.dev";
const headers = {
  "CF-Access-Client-Id": "9a316892e7496497c4d7ac97e20a05c0.access",
  "CF-Access-Client-Secret":
    "a08859efde27988e755b742783ca4160b90bef8d494812a4df4f00b453a0b7c9",
};

const get =
  (host: string, commonHeaders: Record<string, string>) =>
  (
    endpoint: string,
    params?: Record<string, string>,
    queryParams?: Record<string, string>,
  ) =>
  async (headers?: Record<string, string>) => {
    const responsePromise = await fetch(
      `${host}/${endpoint}/${Object.values(params || {}).join("/") || ""}${queryParams ? `?${new URLSearchParams(queryParams)}` : ""}`,
      {
        headers: { ...commonHeaders, ...headers },
      },
    );
    const response = await responsePromise.json();
    if (responsePromise.status === 200) {
      return response;
    }
    throw new Error(response.error.message);
  };

const post =
  (host: string, commonHeaders: Record<string, string>) =>
  (
    endpoint: string,
    params?: Record<string, string>,
    queryParams?: Record<string, string>,
  ) =>
  async (body: unknown, headers?: Record<string, string>) => {
    const responsePromise = await fetch(
      `${host}/${endpoint}/${Object.values(params || {}).join("/") || ""}${queryParams ? `?${new URLSearchParams(queryParams)}` : ""}`,
      {
        method: "POST",
        headers: { ...commonHeaders, ...headers },
        body: JSON.stringify(body),
      },
    );
    const response = await responsePromise.json();
    if (responsePromise.status === 200 || responsePromise.status === 201) {
      return response;
    }
    throw new Error(response.error.message);
  };

const put =
  (host: string, commonHeaders: Record<string, string>) =>
  (
    endpoint: string,
    params?: Record<string, string>,
    queryParams?: Record<string, string>,
  ) =>
  async (body: unknown, headers?: Record<string, string>) => {
    const responsePromise = await fetch(
      `${host}/${endpoint}/${Object.values(params || {}).join("/") || ""}${queryParams ? `?${new URLSearchParams(queryParams)}` : ""}`,
      {
        method: "PUT",
        headers: { ...commonHeaders, ...headers },
        body: JSON.stringify(body),
      },
    );
    const response = await responsePromise.json();
    if (responsePromise.status === 200 || responsePromise.status === 201) {
      return response;
    }
    throw new Error(response.error.message);
  };

const delete_ =
  (host: string, commonHeaders: Record<string, string>) =>
  (
    endpoint: string,
    params?: Record<string, string>,
    queryParams?: Record<string, string>,
  ) =>
  async (headers?: Record<string, string>) => {
    const responsePromise = await fetch(
      `${host}/${endpoint}/${Object.values(params || {}).join("/") || ""}${queryParams ? `?${new URLSearchParams(queryParams)}` : ""}`,
      {
        method: "DELETE",
        headers: { ...commonHeaders, ...headers },
      },
    );
    const response = await responsePromise.json();
    if (responsePromise.status === 200 || responsePromise.status === 201) {
      return response;
    }
    throw new Error(response.error.message);
  };

export const backendClient = {
  get: get(host, headers),
  post: post(host, headers),
  put: put(host, headers),
  delete: delete_(host, headers),
};
