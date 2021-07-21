import { useState } from 'react';

import styles from './styles.module.css'
import Image from "next/image"
import Link from 'next/link'

interface Menu {
    name: string,
    icon: string,
    reference: string,
    auth: boolean
}

export function Header() {
    const [ isOpen, setIsOpen ] = useState(false);

    const menuData = [
        {
            name: 'Home',
            icon: 'home',
            reference: '/',
            auth: false
        },
        {
            name: 'Cart',
            icon: 'shopping_cart',
            reference: '/cart',
            auth: false
        },
        {
            name: 'Orders',
            icon: 'request_quote',
            reference: '/authentication/orders',
            auth: true
        },
        {
            name: 'Login/Register',
            icon: 'account_circle',
            reference: '/authentication/login',
            auth: false
        }
    ]


    return (
        <>
            <header className={styles.containerHeader}>
                <div>
                    <Link href={'/'}>
                        <a>
                            <Image
                                width={60}
                                height={60}
                                src={'/store_logo.png'}
                                objectFit="cover"
                            />
                            <h2>Marttech store</h2>
                        </a>
                    </Link>
                </div>
                
                <div className={styles.menuItems}>
                    {
                        menuData.map((item: Menu, index) => {
                            return (
                                <Link href={item.reference} key={index}>
                                    <a><span className={"material-icons"}>{item.icon}</span> {item.name}</a>
                                </Link>
                            )
                        })
                    }
                </div>
                
                <div className={styles.menuItemsMobile}>
                    <span className={"material-icons"} onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'menu_open' : 'menu'}</span>
                </div>
            </header>
            <div className={styles.menuMobile+' '+(isOpen && styles.open)}>
                {
                    menuData.map((item: Menu, index) => {
                        return (
                            <div key={index}>
                                <Link href={item.reference}>
                                    <a><span className={"material-icons"}>{item.icon}</span> {item.name}</a>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
}