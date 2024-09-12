export const saveCheckoutUrl = (url: string) => {
  localStorage.setItem(
    "checkout-url",
    JSON.stringify({
      url,
      expires: new Date(Date.now() + 30 * 60000),
    }),
  );
};

export const getCheckoutUrl = (): {
  url: string | undefined;
  expires: Date | undefined;
} => {
  return JSON.parse(localStorage.getItem("checkout-url") || "{}");
};

export const removeCheckoutUrl = () => {
  localStorage.removeItem("checkout-url");
};
