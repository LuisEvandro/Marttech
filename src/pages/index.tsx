import Head from 'next/head'
import { ProductCard } from "../components/product-card";
import styles from '../styles/home.module.css'
import products from "../../products-data.json";

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

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Marttech Store</title>
      </Head>
      
      <div className={styles.containerCatalog}>
        {
          products.map((item: Product, index) => {
            return (
              <ProductCard product={item} key={index} />
            )
          })
        }
      </div>

    </>
  )
}
