import { Tax } from "@/types/store/tax";

export function convertPrice(priceInCents: number, taxes?: Tax[]) {
  const taxedPrice =
    taxes?.reduce((acc, curr) => acc + curr.amount * priceInCents, 0) || 0;
  return ((priceInCents + taxedPrice) / 100).toFixed(2);
}
