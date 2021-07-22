import styles from './styles.module.css'
import Image from "next/image";
import { CartContext } from '../../contexts/cartContext';
import { useContext } from 'react';

export function CartCard({product}) {

    const { removeItemCart, sumItemCart, minItemCart } = useContext(CartContext);

    function sum(id: number){
        sumItemCart(id);
    }

    function minus(id: number, isMin: boolean){
        if(isMin){
            minItemCart(id);
        }else{
            removeItemCart(id);
        }
    }

    return (
        <>
            <div className={styles.containerCartCard}>
                <div className={styles.descriptionContent}>
                    <div className={styles.imageContent}>
                        <Image 
                            width={60}
                            height={60}
                            src={product.image}
                            objectFit="cover"
                        />
                    </div>
                    <div className={styles.nameAndPrice}>
                        <p>{product.name}</p>
                        <p>{(product.price).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                    </div>
                </div>

                <div className={styles.countContent}>
                    <div className={styles.minusOrPlus}>
                        <span className={"material-icons"} onClick={() => {product.quantityCart > 1 ? minus(product.id, true) : minus(product.id, false)}}>remove</span>
                        <input type="text" value={product.quantityCart} disabled />
                        <span className={"material-icons"} onClick={() => sum(product.id)}>add</span>
                    </div>
                </div>
            </div>
        </>
    );
}