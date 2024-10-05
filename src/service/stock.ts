export const getStock = async (productId: string) => {
  const responsePromise = await fetch(
    `${process.env.NEXT_PUBLIC_STOCK_BUCKET}${productId}`,
  );
  if (responsePromise.status !== 200) throw new Error("Failed to get stock");
  const response = await responsePromise.json();
  if (response && response.data) {
    return response.data;
  } else {
    return 0;
  }
};
