import styles from './styles.module.css'
import Image from "next/image";

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

export function OrderCard({product}) {
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
                        <p>{product.name} | {product.quantityCart} {product.quantityCart > 1 ? "Unidades":"Unidade"}</p>
                        <p>{(product.price * product.quantityCart).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                    </div>
                </div>
            </div>
        </>
    );
}