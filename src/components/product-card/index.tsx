import styles from './styles.module.css'
import Image from "next/image";
import { useContext } from 'react';
import { CartContext } from '../../contexts/cartContext';

interface Product {
    product: {
        id: number,
        name: string,
        image: string,
        stock: number,
        price: number,
        new: boolean,
        category: string,
        quantityCart?: number
    }
}

export function ProductCard({product}: Product) {
    const { cartData, addItemToCart } = useContext(CartContext);
    return (
        <div className={styles.containerProductCard} >
            <div className={styles.image}>
                <Image
                    width={150}
                    height={150}
                    src={product.image}
                    objectFit="cover"
                />
            </div>
            <div className={styles.productDetails}>
                <p className={styles.title}>{product.name}</p>
                <p className={styles.price}>
                    <span><strong>{(product.price).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</strong> à vista</span>
                    <br/>
                    12x de {((product.price / 12)).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} sem juros 
                </p>
            </div>
            <div className={styles.buttonAddToCart} onClick={() => addItemToCart(product)}>
                <div>
                    Comprar <span className={"material-icons"}>add_shopping_cart</span>
                </div>
            </div>
        </div>
    );
}