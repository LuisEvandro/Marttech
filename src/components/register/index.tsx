import styles from '../register/styles.module.css'
import TextField from '@material-ui/core/TextField';
import { Loader } from '../loader/index';
import { useContext, useState } from 'react';
import { AuthContext } from "../../contexts/authContext";
import { IconButton } from '@material-ui/core';
import router from 'next/router';
import { generateGuid, cpfMask, validateCpf, cepMask, numericMask } from "../../utils";
import { toast } from 'react-toastify';
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
    orders?: []
}

export default function RegisterComponent() {
    const [ isLoading, setIsLoading ] = useState(false)
    const [ showPassword, setShowPassword ] = useState(false)
    const { createUser } = useContext(AuthContext)
    const [ userData, setUserData ] = useState<User>()
    const [ name, setName ] = useState<string>('')
    const [ email, setEmail ] = useState<string>('')
    const [ cpf, setCpf ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')
    const [ street, setStreet ] = useState<string>('')
    const [ district, setDistrict ] = useState<string>('')
    const [ numberHouse, setNumberHouse ] = useState<string>('')
    const [ city, setCity ] = useState<string>('')
    const [ state, setState ]  = useState<string>('')
    const [ postalCode, setPostalCode ]  = useState<string>('')

    function reqRegister(e){
        e.preventDefault()

        if(!validateCpf(cpf)){
            toast.error('CPF invalido, digite novamente', {
                autoClose: 4000,
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }else{
            const reqData = {
                "name": name,
                "email": email,
                "cpf": cpf,
                "password": password,
                "address": {
                    "street": street,
                    "number": numberHouse,
                    "district": district,
                    "city": city,
                    "state": state,
                    "postal_code": postalCode
                },
                "guid": generateGuid(),
                "orders": []
            }
    
            createUser(reqData, window.location.pathname)
        }

        return false
    }

    return (
        <>
            <div className={styles.containerRegisterComponent}>

                <h2>Registrar-se</h2>
                <form onSubmit={reqRegister}>
                    <div className={styles.countainerResp}>

                        <div className={styles.divInput}>
                            <TextField
                                id="nome"
                                disabled={isLoading}
                                required
                                label="nome"
                                type="text"
                                variant="outlined"
                                className={styles.inputStyles}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className={styles.divInput}>
                            <TextField
                                id="email"
                                disabled={isLoading}
                                required
                                label="E-mail"
                                type="email"
                                variant="outlined"
                                className={styles.inputStyles}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className={styles.divInput}>
                            <TextField
                                id="cpf"
                                disabled={isLoading}
                                required
                                label="CPF"
                                type="text"
                                variant="outlined"
                                className={styles.inputStyles}
                                value={cpf}
                                onChange={(e) => {
                                    if((e.target.value).length < 15 )
                                        setCpf(cpfMask(e.target.value))
                                }}
                            />
                        </div>

                        <div className={styles.divInput}>
                            <TextField
                                id="password"
                                disabled={isLoading}
                                required
                                label="Senha"
                                type={showPassword ? "text":"password"}
                                autoComplete="current-password"
                                variant="outlined"
                                InputProps={{
                                    endAdornment: 	<IconButton
                                                        aria-label="toque para ver a senha"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        edge="end"
                                                    >
                                                        <span className="material-icons">{showPassword ? ("visibility"):("visibility_off")}</span>
                                                    </IconButton>,
                                }}
                                className={styles.inputStyles}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className={styles.divInput}>
                            <TextField
                                id="CEP"
                                disabled={isLoading}
                                required
                                label="CEP"
                                type="text"
                                variant="outlined"
                                className={styles.inputStyles}
                                value={postalCode}
                                onChange={(e) => {
                                    if((e.target.value).length < 11)
                                    setPostalCode(cepMask(e.target.value))
                                }}
                            />
                        </div>

                        <div className={styles.divInput}>
                            <TextField
                                id="Rua"
                                disabled={isLoading}
                                required
                                label="Rua"
                                type="text"
                                variant="outlined"
                                className={styles.inputStyles}
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                            />
                        </div>

                        <div className={styles.divInput}>
                            <TextField
                                id="bairro"
                                disabled={isLoading}
                                required
                                label="Bairro"
                                type="text"
                                variant="outlined"
                                className={styles.inputStyles}
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                            />
                        </div>

                        <div className={styles.divInput}>
                            <TextField
                                id="numero"
                                disabled={isLoading}
                                required
                                label="Número"
                                type="text"
                                variant="outlined"
                                className={styles.inputStyles}
                                value={numberHouse}
                                onChange={(e) => setNumberHouse(numericMask(e.target.value))}
                            />
                        </div>

                        <div className={styles.divInput}>
                            <TextField
                                id="cidade"
                                disabled={isLoading}
                                required
                                label="Cidade"
                                type="text"
                                variant="outlined"
                                className={styles.inputStyles}
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>

                        <div className={styles.divInput}>
                            <TextField
                                id="estado"
                                disabled={isLoading}
                                required
                                label="Estado"
                                type="text"
                                variant="outlined"
                                className={styles.inputStyles}
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.divInput}>
                        {
                            isLoading ? (
                                <Loader />
                            ) : (
                                <button 
                                    className={styles.buttonStyles}
                                    type="submit"
                                >
                                    Cadastrar
                                </button>
                            )
                        }
                    </div>

                    <div className={styles.divInput}>
                        <div 
                            className={styles.buttonStyles}
                            onClick={() => router.push('/authentication/login')}
                        >
                            Ir para login
                        </div>       
                    </div>
                </form>
            </div>
        </>
    )
}