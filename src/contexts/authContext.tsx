import { redirect } from 'next/dist/next-server/server/api-utils';
import { useRouter } from 'next/router'
import { createContext, ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

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

interface Address{
    street: string,
    number: number,
    city: string,
    state: string,
    postal_code: string
}

interface User{
    name: string,
    email: string,
    password: string,
    address: Address,
    guid: string,
    orders?: Product[]
}

interface AuthContextInterface{
    userState: User,
    isAuthenticated: boolean,
    tokenState: string,
    login: (paramEmail: string, paramPass: string) => void,
    recoverPassword: (paramEmail: string, paramPass: string) => void,
    createUser: (paramUser: User) => void,
    createOrder: (paramOrder: Product[]) => void,
    logout: () => void,
}

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextInterface);

export function AuthProvider({ children }:AuthProviderProps){
    const [ isAuthenticated, setIsAuthenticated ] = useState<boolean>(false)
    const [ tokenState, setToken ] = useState<string>('')
    const [ userState, setUser ] = useState<User>()
    const router = useRouter()

    useEffect(() => {
        let sessionToken = sessionStorage.getItem('token')

        if(sessionToken){
            setUser(getUser(sessionToken))
            setToken(sessionToken)
            setIsAuthenticated(true)
        }
    }, [])

    function getUser(paramToken: string){
        try {
            if(!paramToken){
                return false
            }else{
                let sessionUsers = JSON.parse(sessionStorage.getItem('users'));
                let result = sessionUsers.find(f => f.guid == paramToken);
                return result ? result : false;
            }
        } catch (error) {
            console.log(error);
            toast.error(error, {
                autoClose: 4000,
                position: toast.POSITION.BOTTOM_RIGHT
            });
            return false
        }
    }

    function login(paramEmail: string, paramPass: string){
        if(!paramEmail || !paramPass){
            toast.error('Erro ao tentar logar, tente novamente !', {
                autoClose: 4000,
                position: toast.POSITION.BOTTOM_RIGHT
            });
            return false
        }else{
            let sessionUsers = JSON.parse(sessionStorage.getItem('users'));
            let result = sessionUsers.find(f => f.email == paramEmail);

            if(result){
                if(result.password === paramPass){
                    setUser(result)
                    setToken(result.guid)
                    setIsAuthenticated(true)

                    toast.success('Login realizado com sucesso !', {
                        autoClose: 4000,
                        position: toast.POSITION.BOTTOM_RIGHT
                    });

                    return true
                }else{
                    toast.error('Senha incorreta, tente novamente !', {
                        autoClose: 4000,
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                    return false
                }
            }else{
                toast.error('E-mail não cadastrado !', {
                    autoClose: 4000,
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                return false
            }
        }
    }    

    function createUser(paramUser: User){
        try {
            if(!paramUser){
                toast.error('Problema ao tentar cadastrar usuário !', {
                    autoClose: 4000,
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                return false
            }else{
                let sessionUsers = JSON.parse(sessionStorage.getItem('users'))
                let isExist = sessionUsers.find(f => f.email == paramUser.email);

                if(isExist){
                    toast.error(`${paramUser.email}, já está cadastrado !`, {
                        autoClose: 4000,
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                    return false
                }else{
                    sessionUsers.push(paramUser)
                    sessionStorage.setItem('users', JSON.stringify(sessionUsers))
                    setUser(paramUser)
                    sessionStorage.setItem('token', sessionUsers.guid)
                    setToken(paramUser.guid)
                    setIsAuthenticated(true)

                    router.reload();

                    return true
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error, {
                autoClose: 4000,
                position: toast.POSITION.BOTTOM_RIGHT
            });
            return false
        }
    }

    function recoverPassword(paramEmail: string, paramPass: string){
        try {
            if(!paramEmail || !paramPass){
                toast.error('Erro ao tentar alterar a senha !', {
                    autoClose: 4000,
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                return false
            }else{
                let sessionUsers = JSON.parse(sessionStorage.getItem('users'));
                let status = false;
                sessionUsers.map((user: User) => {
                    if(user.email == paramEmail){
                        status = true
                        user.password = paramPass
                    }
                })

                if(status){
                    sessionStorage.setItem('users', JSON.stringify(sessionUsers))
                    
                    toast.success('Senha alterada com sucesso !', {
                        autoClose: 4000,
                        position: toast.POSITION.BOTTOM_RIGHT
                    });

                    return true
                }else{
                    toast.warning('Usuário não encontrado !!', {
                        autoClose: 4000,
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                    return false
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error, {
                autoClose: 4000,
                position: toast.POSITION.BOTTOM_RIGHT
            });
            return false
        }
    }

    function createOrder(paramOrder: Product[]){
        try {
            if(!paramOrder){

            }else{
                let sessionUsers = JSON.parse(sessionStorage.getItem('users'));
                let status = false;
                sessionUsers.map((user: User) => {
                    if(user.guid == tokenState){
                        status = true
                        user.orders = paramOrder

                        setUser(user);
                    }
                })

                if(status){
                    sessionStorage.setItem('users', JSON.stringify(sessionUsers))
                    
                    toast.success('Pedido gerado com sucesso !', {
                        autoClose: 4000,
                        position: toast.POSITION.BOTTOM_RIGHT
                    });

                    router.push('/authentication/orders');
                }else{
                    toast.error('Problema ao tentar gerar pedido !!', {
                        autoClose: 4000,
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error, {
                autoClose: 4000,
                position: toast.POSITION.BOTTOM_RIGHT
            });
            return false
        }
    }

    function logout(){
        setUser(null)
        setToken('')
        setIsAuthenticated(false)

        toast.success('Logout realizado com sucesso !', {
            autoClose: 4000,
            position: toast.POSITION.BOTTOM_RIGHT
        });

        router.push('/')
    }

	return(
		<AuthContext.Provider 
            value={{
                userState,
                isAuthenticated,
                tokenState,
                login,
                recoverPassword,
                createUser,
                createOrder,
                logout
            }}
        >
			{children}
		</AuthContext.Provider>
	);
}