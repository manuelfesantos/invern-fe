'use client'
import {cartContext, CartContext} from "@/context/cart";
import {Context, useContext} from "react";

const CartItemsCounter = () => {
    const {cart} = useContext<CartContext>(cartContext as Context<CartContext>);
    const cartTotalQuantity = () => cart.items.reduce((sum, item) => (sum + item.quantity), 0)
    return cart.items.length > 0 && (
        <div className="absolute -top-3 -right-3 z-30 h-5 w-5 flex items-center justify-center bg-primary">
            <span>{cartTotalQuantity() > 9 ? "9+" : cartTotalQuantity()}</span>
        </div>
    )
}

export default CartItemsCounter;