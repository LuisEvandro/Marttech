import Head from 'next/head'
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../../contexts/cartContext';
import { OrderCard } from '../../../components/order-card';

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

interface Address{
    street: string,
    number: string,
    district: string,
    city: string,
    state: string,
    postal_code: string
}

interface User{
    name: string,
    email: string,
    cpf: string,
    password: string,
    address: Address,
    guid: string,
    orders?: Order[]
}

export default function AdminOrders() {

    const [ usersData, setUsersData ] = useState<User[]>()
    const [ usersDataFiltred, setUsersDataFiltred ] = useState<User[]>()

    useEffect(() => {
        const allUsers = JSON.parse(sessionStorage.getItem('users'))
        setUsersData(allUsers)
        setUsersDataFiltred(allUsers)
    }, [])

    

    return (
        <>
            <Head>
                <title>Lista de pedidos | Marttech Store</title>
            </Head>
            {
                <div className={styles.containerAdminOrders}>
                    <div className={styles.headerOrders}>
                        <span className="material-icons">list_alt</span>
                        <h2>Todos pedidos</h2>
                    </div>

                    <div className={styles.filters}>

                    </div>
                    {
                        usersDataFiltred?.map((user: User, userIndex: number) => {
                            return(
                                user.orders?.map((order: Order, index: number) => {
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
                                                    <p>Valor do pedido: <span>{order.total}</span></p>
                                                    <p>Criado em: <span>{order.date}</span></p>
        
                                                    {
                                                        order.products.map((prod: Product, prodIndex: number) => {
                                                            return(
                                                                <OrderCard product={prod} />
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                    )
                                })
                            )
                        })
                    }
                </div>
            }
        </>
    )
}