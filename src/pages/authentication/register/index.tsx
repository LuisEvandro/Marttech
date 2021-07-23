import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react';
import RegisterComponent from '../../../components/register'
import { AuthContext } from "../../../contexts/authContext";

import styles from '../register/styles.module.css'

export default function Register() {

    const { isAuthenticated } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        if(isAuthenticated)
            router.push('/')
    }, [])

    return (
        <>
            <Head>
                <title>Login | Marttech Store</title>
            </Head>

            <div className={styles.containerLogin}>
                <RegisterComponent />
            </div>
        </>
    )
}