import { useContext, useState } from 'react';
import { AuthContext } from "../../contexts/authContext";

import styles from './styles.module.css'
import Image from "next/image"
import Link from 'next/link'

interface Menu {
    name: string,
    icon: string,
    reference: string
}

export function Header() {
    const { isAuthenticated, userState, logout } = useContext(AuthContext);
    const [ isOpen, setIsOpen ] = useState(false);
    const [ menuData, setMenuData ] = useState<Menu[]>([
        {
            name: 'Home',
            icon: 'home',
            reference: '/',
        },
        {
            name: 'Carrinho',
            icon: 'shopping_cart',
            reference: '/cart',
        },
        {
            name: 'Pedidos',
            icon: 'request_quote',
            reference: '/authentication/orders',
        },
        {
            name: 'Login',
            icon: 'account_circle',
            reference: '/authentication/login',
        }
    ])

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

                            if(isAuthenticated && item.name == 'Login'){
                                return (
                                    <Link href={''} key={index}>
                                        <a title={userState.name} style={{cursor:"default"}}><span className={"material-icons"}>{item.icon}</span> {(userState.name).substring(0, 20)}{(userState.name).length > 20 && "..."}</a>
                                    </Link>
                                )
                            }else{
                                return (
                                    <Link href={item.reference} key={index}>
                                        <a><span className={"material-icons"}>{item.icon}</span> {item.name}</a>
                                    </Link>
                                )
                            }
                        })
                    }

                    {
                        isAuthenticated && (
                            <span style={{marginLeft: "15px", cursor:"pointer"}} onClick={() => logout()}>
                                <a><span className={"material-icons"}>logout</span> Sair</a>
                            </span>
                        ) 
                    }

                </div>
                
                <div className={styles.menuItemsMobile}>
                    <span className={"material-icons"} onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'menu_open' : 'menu'}</span>
                </div>
            </header>
            <div className={styles.menuMobile+' '+(isOpen && styles.open)}>
                {
                    menuData.map((item: Menu, index) => {
                        if(isAuthenticated && item.name == 'Login'){
                            return (
                                <div key={index}>
                                    <Link href={''}>
                                        <a title={userState.name} style={{cursor:"default"}}><span className={"material-icons"}>{item.icon}</span> {(userState.name).substring(0, 20)}{(userState.name).length > 20 && "..."}</a>
                                    </Link>
                                </div>
                            )
                        }else{
                            return (
                                <div onClick={() => setIsOpen(!isOpen)} key={index}>
                                    <Link href={item.reference}>
                                        <a><span className={"material-icons"}>{item.icon}</span> {item.name}</a>
                                    </Link>
                                </div>
                            )
                        }
                    })
                }

                {
                    isAuthenticated && (
                        <div>
                            <span style={{marginLeft: "15px", cursor:"pointer"}} onClick={() => logout()}>
                                <a><span className={"material-icons"}>logout</span> Sair</a>
                            </span>
                        </div>
                    ) 
                }
            </div>
        </>
    );
}