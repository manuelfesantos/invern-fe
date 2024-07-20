import {Cart} from "@/types/store/cart";

export const loadCart = () => {
    if (typeof window !== 'undefined') {
        const cart = localStorage.getItem('cart');
        if (cart) {
            console.log("loading cart from local storage:", cart)
            return JSON.parse(cart);
        }
        console.log("no cart found on local storage. Initializing an empty cart")
        return {
            id: 0,
            items: [],
            totalPrice: 0,
            totalQuantity: 0,
        }
    }
    return {
        id: 0,
        items: [],
        totalPrice: 0,
        totalQuantity: 0,
    }
}

export const syncCart = (cart: Cart) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}