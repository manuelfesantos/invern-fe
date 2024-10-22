import { onRequest as __api___params___ts_onRequest } from "/Users/ctw03258/personal_projects/INVERN/invern-spirit-project-fe/functions/api/[[params]].ts"
import { onRequest as __api_index_ts_onRequest } from "/Users/ctw03258/personal_projects/INVERN/invern-spirit-project-fe/functions/api/index.ts"

export const routes = [
    {
      routePath: "/api/:params*",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api___params___ts_onRequest],
    },
  {
      routePath: "/api",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_index_ts_onRequest],
    },
  ]