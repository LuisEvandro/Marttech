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

interface CartContextInterface{
    products: Product[],
    valueTotal: number,
    addItemToCart: (product: Product) => boolean,
    removeItemCart: (id: number) => void,
    sumItemCart: (id: number) => number,
    minItemCart: (id: number) => number
}

interface CartProviderProps {
	children: ReactNode;
}

export const CartContext = createContext({} as CartContextInterface);

export function CartProvider({ children }:CartProviderProps){

    const [ products, setProducts ] = useState<Product[]>([])
    const [ valueTotal, setValueTotal ] = useState<number>(0)

    useEffect(() => {
        const cartRecovered = sessionStorage.getItem('cart')

        if(cartRecovered)
            setProducts(JSON.parse(cartRecovered))

	}, []);

    useEffect(() => {
        sessionStorage.setItem('cart', JSON.stringify(products))
    }, [products])

    function countTotalCart(){
        let count = 0
        setValueTotal(0)
        products.forEach(prod => {
            count = (count + (prod.quantityCart * prod.price))
            setValueTotal(count)
        })
    }

    function addItemToCart(product: Product){
        try {
            let newCart = products;
            let productExists = newCart.find(f => f.id == product.id)
            
            if(productExists){
                sumItemCart(productExists.id)
            }else{
                product.quantityCart = 1;
                newCart.push(product)
                saveCartData(newCart)
            }

            toast.success(`${product.name}, adicionado ao carrinho!`, {
                autoClose: 4000,
                position: toast.POSITION.BOTTOM_RIGHT
            });
            countTotalCart()
            return true
        } catch (error) {
            console.log(error);
            toast.error(error, {
                autoClose: 4000,
                position: toast.POSITION.BOTTOM_RIGHT
            });
            return false
        }

    }

    function removeItemCart(id: number){
        try {
            saveCartData(products.filter(f => f.id != id))

            countTotalCart()
            toast.success(`Produto removido do carrinho com sucesso!`, {
                autoClose: 4000,
                position: toast.POSITION.BOTTOM_RIGHT
            });
        } catch (error) {
            console.log(error);
            toast.error(error, {
                autoClose: 4000,
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }

    function sumItemCart(id: number){
        let temp = 0;
        products.map((item) => {
            if(item.id == id){
                item.quantityCart = item.quantityCart + 1
                temp = item.quantityCart
            }
        });
        saveCartData(products)
        countTotalCart()
        return temp;
    }

    function minItemCart(id: number){
        let temp = 0;
        products.map((item) => {
            if(item.id == id){
                item.quantityCart = item.quantityCart - 1
                temp = item.quantityCart
            }
                
        });
        saveCartData(products)
        countTotalCart()
        return temp
    }

    function saveCartData(data: Product[]){
        setProducts(data)
        sessionStorage.setItem('cart', JSON.stringify(data))
    }

	return(
		<CartContext.Provider 
            value={{
                products,
                valueTotal,
                addItemToCart,
                removeItemCart,
                sumItemCart,
                minItemCart
            }}
        >
			{children}
		</CartContext.Provider>
	);
}