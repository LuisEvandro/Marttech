import Head from 'next/head'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cartContext';

import styles from '../cart/styles.module.css'


export default function Cart() {
    const { cartData } = useContext(CartContext);
    
    return (
        <>
            <Head>
                <title>Cart | Marttech Store</title>
            </Head>

            <div className={styles.containerCart}>
                <h1>{cartData.QuantityTotal}</h1>
            </div>

        </>
    )
}
