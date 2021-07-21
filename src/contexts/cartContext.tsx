import { createContext, ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface Product {
    id: number,
    name: string,
    image: string,
    stock: number,
    price: number,
    new: boolean,
    category: string,
    quantityCart?: number
}

interface Cart {
    Products: Product[],
    QuantityTotal: number
}

interface CartContextInterface{
    cartData: Cart,
    addItemToCart: (product: Product) => boolean
}

interface CartProviderProps {
	children: ReactNode;
}

export const CartContext = createContext({} as CartContextInterface);

export function CartProvider({ children }:CartProviderProps){

    const [ cartData, setCartData ] = useState<Cart>({Products: [], QuantityTotal: 0})

    function addItemToCart(product: Product){
        try {
            let newCart = cartData;
            let countQty = product.quantityCart;

            product.quantityCart = countQty ? (countQty++) : 1;
            newCart.Products.push(product);
            newCart.QuantityTotal = newCart.Products.length;

            setCartData(newCart)
            sessionStorage.setItem('cart', JSON.stringify(newCart));
            
            toast.success(`${product.name}, adicionado ao carrinho!`, {
                autoClose: 5000,
                position: toast.POSITION.TOP_RIGHT
            });

            return true
        } catch (error) {
            console.log(error);
            toast.error(error, {
                autoClose: 5000,
                position: toast.POSITION.TOP_RIGHT
            });
            return false
        }

    }

	useEffect(() => {
        const cartRecovered = sessionStorage.getItem('cart');

        if(cartRecovered)
            setCartData(JSON.parse(cartRecovered))


	}, []);

	return(
		<CartContext.Provider value={{
			cartData,
            addItemToCart
		}}>
			{children}
		</CartContext.Provider>
	);
}