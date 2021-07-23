import Head from 'next/head'
import { useEffect, useState } from 'react';
import { OrderCard } from '../../../components/order-card';
import TextField from '@material-ui/core/TextField';

import styles from '../orders/styles.module.css'

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { IconButton } from '@material-ui/core';
import { cpfMask } from "../../../utils";

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
    const [ strSearchCpf, setStrSearchCpf ] = useState<string>('')
    const [ strSearchName, setStrSearchName ] = useState<string>('')

    useEffect(() => {
        const allUsers = JSON.parse(sessionStorage.getItem('users'))
        setUsersData(allUsers)
        setUsersDataFiltred(allUsers)
    }, [])

    const handleEnterKeyName = (event: any) => {
		if(event.key === 'Enter'){
            searchName(strSearchName);
        }
	};

    const handleEnterKeyCpf = (event: any) => {
		if(event.key === 'Enter'){
            searchCpf(strSearchCpf);
        }
	};

    function searchName(string: string){

        let filter = usersData.filter(f => (f.name).includes(strSearchName))
        setUsersDataFiltred(filter)

    }

    function searchCpf(string: string){

        let filter = usersData.filter(f => (f.cpf).includes(strSearchCpf))
        setUsersDataFiltred(filter)
    }

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
                        <div className={styles.inputs}>
                            <TextField
                                id="searchCpf"
                                label="Pesquisar CPF"
                                type="text"
                                variant="outlined"
                                InputProps={{
                                    endAdornment: 	<IconButton
                                                        aria-label="Pesquisar"
                                                        onClick={(e) => searchCpf(strSearchCpf)}
                                                        edge="end"
                                                    >
                                                        <span className="material-icons">search</span>
                                                    </IconButton>,
                                }}
                                className={styles.inputStyles}
                                value={strSearchCpf}
                                onKeyPress={(e) => handleEnterKeyCpf(e)}
                                onChange={(e) => {
                                    if((e.target.value).length < 15 ){
                                        setStrSearchCpf(cpfMask(e.target.value))
                                    }
                                }}
                            />
                        </div>

                        <div className={styles.inputs}>
                            <TextField
                                id="searchName"
                                label="Pesquisar por nome"
                                type="text"
                                variant="outlined"
                                InputProps={{
                                    endAdornment: 	<IconButton
                                                        aria-label="Pesquisar por nome"
                                                        onClick={(e) => searchName(strSearchName)}
                                                        edge="end"
                                                    >
                                                        <span className="material-icons">search</span>
                                                    </IconButton>,
                                }}
                                className={styles.inputStyles}
                                value={strSearchName}
                                onKeyPress={(e) => handleEnterKeyName(e)}
                                onChange={(e) => setStrSearchName(e.target.value)}
                            />
                        </div>

                        <div className={styles.inputs}>
                            <div 
                                className={styles.buttonStyles}
                                onClick={() => setUsersDataFiltred(usersData)}
                            >
                                Mostrar todos
                            </div>
                        </div>
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
                                                    <p>Em nome de: <span>{user.name}</span></p>
                                                    <p>CPF: <span>{user.cpf}</span></p>
                                                    <p>E-mail: <span>{user.email}</span></p>


                                                    <p>Valor do pedido: <span>{order.total}</span></p>
                                                    <p>Criado em: <span>{order.date}</span></p>
        
                                                    {
                                                        order.products.map((prod: Product, prodIndex: number) => {
                                                            return(
                                                                <OrderCard product={prod} key={prodIndex} />
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