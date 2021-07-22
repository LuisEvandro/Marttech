import Head from 'next/head'
import { CartContext } from '../../contexts/cartContext';
import { CartCard } from "../../components/cart-card";

import styles from '../cart/styles.module.css'
import { useContext, useEffect } from 'react';

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

export default function Cart() {
    const { products, valueTotal} = useContext(CartContext)

    return (
        <>
            <Head>
                <title>Cart | Marttech Store</title>
            </Head>

            <div className={styles.containerCart}>
                {
                    products.length > 0 ? (
                        products.map((item: Product, index) => {
                            return (
                                <CartCard product={item} key={index} />
                            )
                        })
                    ) : (
                        <h1>Carrinho vazio</h1>
                    )
                }
            </div>
            
            <div className={styles.checkoutContainer}>
                <p>Total compra</p>
                <p>{valueTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                <span>
                    COMPRAR
                </span>
            </div>
        </>
    )
}
