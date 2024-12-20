import { Tax } from "@/types/store/tax";

export function convertPrice(priceInCents: number, taxes?: Tax[]) {
  if (!taxes) {
    return 0;
  }
  const taxedPrice = taxes.reduce(
    (taxedAmount, { rate }) => taxedAmount + rate * priceInCents,
    0,
  );
  return ((priceInCents + taxedPrice) / 100).toFixed(2);
}

export function convertToEuro(priceInCents: number) {
  return (priceInCents / 100).toFixed(2);
}
