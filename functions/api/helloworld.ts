export const onRequest: PagesFunction = async (context) => {
  return new Response(JSON.stringify({ message: "hello world!" }));
};
