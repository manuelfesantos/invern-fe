import { Env } from "libs/types";
import { getRequestHeaders, getUrl } from "@utils";

export const onRequest: PagesFunction<Env, string> = async ({
  request,
  env,
}) => {
  let url: string;
  const headers = getRequestHeaders(request.headers, env, request.cf?.country);
  const shouldHaveBody = ["POST", "PUT"].includes(request.method);

  try {
    url = getUrl(request, env);
  } catch (error: any) {
    return new Response(error.message, { status: 404 });
  }

  try {
    const response = await fetch(url, {
      method: request.method,
      headers,
      ...(shouldHaveBody && { body: JSON.stringify(await request.json()) }),
    });
    if (response.status !== 200 && response.status !== 201) {
      const body = await response.json();

      if (bodyIsError(body)) {
        const errors = body.error.message.startsWith("[")
          ? JSON.parse(body.error.message)
          : [body.error.message];
        return new Response(JSON.stringify({ errors }), {
          status: response.status,
          headers: Object.fromEntries(response.headers.entries()),
        });
      }
    }

    return response;
  } catch (error: any) {
    return new Response(JSON.stringify({ proxyError: error.message }), {
      status: 500,
    });
  }
};

const bodyIsError = (body: unknown): body is { error: { message: string } } => {
  return Boolean(
    typeof body === "object" &&
      body &&
      "error" in body &&
      body.error &&
      typeof body.error === "object" &&
      "message" in body.error &&
      typeof body.error.message === "string",
  );
};
