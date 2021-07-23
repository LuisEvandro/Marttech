import Head from 'next/head'
import { CartContext } from '../../contexts/cartContext';
import { AuthContext } from '../../contexts/authContext';
import { CartCard } from "../../components/cart-card";
import LoginComponent from '../../components/login';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { generateGuid } from "../../utils";
import styles from '../cart/styles.module.css'
import { useContext, useState } from 'react';
import { Button, DialogActions } from '@material-ui/core';

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

interface Order{
    name: string,
    guid: string,
    total: string,
    date: string,
    products: Product[]
}

export default function Cart() {
    const { products, valueTotal, cleanCart} = useContext(CartContext)
    const { isAuthenticated, createOrder } = useContext(AuthContext)
    const [ modalLogin, setModalLogin ] = useState(false)
    const [ orderData, setOrderData ] = useState<Order>()

    function buyCart(){
        let date = new Date;

        const order = {
            name: "pedido-"+Math.floor(Math.random() * 999999999),
            guid: generateGuid(),
            total: valueTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}),
            date: format(parseISO(date.toISOString()), 'dd/MM/yyyy HH:mm:ss', {locale: ptBR}),
            products: products
        }
        
        setOrderData(order)
        createOrder(order)
        cleanCart()
    }

    return (
        <>
            <Head>
                <title>Cart | Marttech Store</title>
            </Head>

            <div className={styles.containerCart}>
                {
                    products && (
                        <div className={styles.checkoutContainer}>
                            <div>
                                <p>Total compra :</p>
                                <span>{valueTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
                            </div>
                            {
                                isAuthenticated ? (
                                    <span className={styles.buttonFinish}  onClick={ () => buyCart()}>
                                        Finalizar compra 
                                    </span>
                                ) : (
                                    <span className={styles.buttonFinish} style={{filter: "brightness(.90)"}} onClick={ () => setModalLogin(true)}>
                                        Finalizar compra 
                                    </span>
                                )
                            }
                        </div>
                    )
                }

                {
                    products.length > 0 ? (
                        products.map((item: Product, index) => {
                            return (
                                <CartCard product={item} key={index} />
                            )
                        })
                    ) : (
                        <div className={styles.cartEmpty}>
                            <span className={"material-icons"}>production_quantity_limits</span>
                            <h1>Carrinho vazio</h1>
                        </div>
                    )
                }
            </div>

            <Dialog onClose={() => setModalLogin(false)} aria-labelledby="loginModal" open={modalLogin}>
                <DialogContent dividers>
                    <LoginComponent />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setModalLogin(false)} color="inherit">
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
