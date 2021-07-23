import Head from 'next/head'
import { useContext } from 'react';
import { AuthContext } from "../../../contexts/authContext";
import styles from '../register/styles.module.css'

export default function Orders() {
    // const { recoverPassword } = useContext(AuthContext)

    return (
        <>
            <Head>
                <title>Pedidos | Marttech Store</title>
            </Head>

            <div>
                <h1>Pedidos</h1>
            </div>
        </>
    )
}