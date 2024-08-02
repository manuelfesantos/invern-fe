export function convertPrice(priceInCents:number) {
    return (priceInCents/100).toFixed(2);
}