import Head from 'next/head'
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import LoginComponent from '../../../components/login';
import { OrderCard } from '../../../components/order-card';
import { AuthContext } from "../../../contexts/authContext";
import styles from '../orders/styles.module.css'

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

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
export default function Orders() {
    const { isAuthenticated, userState } = useContext(AuthContext)
    const router = useRouter()

    
    useEffect(() => {
        console.log(userState)
    }, [userState])

    return (
        <>
            <Head>
                <title>Pedidos | Marttech Store</title>
            </Head>
            {
                isAuthenticated ? (
                    <div className={styles.containerOrders}>
                        <div className={styles.headerOrders}>
                            <span className="material-icons">list_alt</span>
                            <h2>Meus pedidos</h2>                            
                        </div>
                        {
                            userState.orders.map((order: Order, index: number) => {
                                return (
                                    <Accordion key={index}>
                                        <AccordionSummary
                                            expandIcon={<span className="material-icons">keyboard_arrow_down</span>}
                                            aria-controls={order.guid}
                                            id={order.guid}
                                            className={styles.titleOrder}
                                        >
                                            <div>
                                                <span className="material-icons">receipt_long</span> <span>Pedido: {order.name}</span>
                                            </div>
                                            
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div className={styles.contentOrder}>
                                                <p>Em nome de: <span>{userState.name}</span></p>
                                                <p>CPF: <span>{userState.cpf}</span></p>
                                                <p>E-mail: <span>{userState.email}</span></p>

                                                <p>Valor do pedido: <span>{order.total}</span></p>
                                                <p>Criado em: <span>{order.date}</span></p>

                                                {
                                                    order.products.map((prod: Product, prodIndex: number) => {
                                                        return(
                                                            <OrderCard product={prod} key={prodIndex}/>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </AccordionDetails>
                                    </Accordion>
                                )
                            })
                        }
                        {
                            userState.orders.length <= 0 && (
                                <div className={styles.ordersEmpty}>
                                    <span className={"material-icons"}>production_quantity_limits</span>
                                    <h1>Sem pedidos</h1>
                                </div>
                            )
                        }
                    </div>
                ) : (
                    <LoginComponent />
                )
            }
        </>
    )
}