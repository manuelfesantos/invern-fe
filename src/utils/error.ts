export const handleError = (error: unknown, host: string, endpoint: string) =>
  console.error(`Error in ${host}/${endpoint}:`, error);
