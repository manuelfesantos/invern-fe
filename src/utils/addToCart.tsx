import { IProduct, IProductDetails } from '@/types/store/product'
import { CartItem } from '@/types/store/cart'
import { Cart } from '@/types/store/cart'

export const addToCart = (
    {product,cart,setCart,quantity,setQuantity}:
    {product:IProduct,cart:Cart,setCart:any,quantity:number,setQuantity:any}
) => {

    const cartItem: CartItem = {
      id: product.productId,
      quantity,
      price: product.price,
      product: product
    }
    if(cart.items.find(cartItem => cartItem.id === product.productId)) {
      setCart((prevCart:Cart) => (
        {
          ...prevCart,
          items:prevCart.items.map(cartItem =>
            cartItem.id === product.productId
              ? (
                {...cartItem,quantity:cartItem.quantity+quantity}
              )
              : (
                cartItem
              )
          )
        }
      ));
    }
    else {
      setCart((prevCart:Cart) => ({
        ...prevCart,
        items: [...prevCart.items,cartItem]
      }
      ));
    }
    setQuantity(1)
}