export const getStock = async (productId: string) => {
  const responsePromise = await fetch(
    `${process.env.NEXT_PUBLIC_STOCK_BUCKET}${productId}`,
    process.env.NEXT_PUBLIC_ENV === "local"
      ? {
          headers: {
            "CF-Access-Client-Id": "ac5ba45efda6100737a2436a86f2f06e.access",
            "CF-Access-Client-Secret":
              "2d8297f347997c6765d02d211e714d61fee75efab442baa088d7efff24a9a1d3",
          },
        }
      : {},
  );
  if (responsePromise.status !== 200) throw new Error("Failed to get stock");
  const response = await responsePromise.json();
  if (response && response.data) {
    return response.data;
  } else {
    return 0;
  }
};
