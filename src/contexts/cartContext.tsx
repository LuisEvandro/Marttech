import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface Product {
    id: number,
    name: string,
    image: string,
    stock: number,
    price: number,
    new: boolean,
    category: string
}

interface Cart {
    Products: Product[],
    QuantityTotal: number
}

interface CartContextInterface{
    cartData: Cart,
    addItemToCart: (product: Product) => void
}

interface CartProviderProps {
	children: ReactNode;
}

export const CartContext = createContext({} as CartContextInterface);

export function CartProvider({ children }:CartProviderProps){

    const [ cartData, setCartData ] = useState<Cart>({Products: [], QuantityTotal: 0})

    function addItemToCart(product: Product){
        console.log(product);
    }

	useEffect(() => {
		
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