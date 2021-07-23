import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react';
import LoginComponent from '../../../components/login'
import { AuthContext } from "../../../contexts/authContext";

import styles from '../login/styles.module.css'

export default function Login() {

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
                <LoginComponent />
            </div>
        </>
    )
}